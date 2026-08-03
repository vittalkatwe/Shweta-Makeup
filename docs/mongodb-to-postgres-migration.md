# MongoDB → PostgreSQL migration (Prisma)

Runbook + context for the migration executed on the `main` working tree. The full
design rationale lives in the plan file; this is the operational summary you can
come back to.

## What changed (code, already done)

- **`backend/prisma/schema.prisma`** — normalized model:
  - `Customer` — one row per person, **deduped by normalized phone** (`\D` stripped). Holds identity + demographics + `hasPurchasedCourse` + `legacy_profile_ids[]` (the Mongo Profile `_id`s merged into it).
  - `Order` — one row per transaction, FK `customer_id → customers.id`. **PK is TEXT**, so migrated rows keep their legacy Mongo Payment `_id`; new rows get a `cuid()`.
  - Enums `OrderStatus`, `Source`; `razorpay_order_id` is `UNIQUE` (Postgres allows multiple NULLs, so manual orders are fine).
- **`backend/db.js`** — the single shared Prisma client.
- **`backend/server.js`** — every DB call converted to Prisma. Response handlers alias `id → _id` and `created_at → timestamp`, so **`admin/src/lib/types.ts` and the admin UI need no changes**. The two trend endpoints use `prisma.$queryRaw` with `... AT TIME ZONE 'Asia/Kolkata'` and `::int` casts (so Postgres `bigint` counts don't surface as JS `BigInt`).
- **`backend/package.json`** — removed `mongoose` from runtime deps; added `@prisma/client` + `pg`; `prisma` (+ `mongoose` for the ETL) are **devDependencies**. `postinstall` runs `prisma generate`. Pinned to Prisma **6.x** (Prisma 7 moved connection URLs out of the schema — do not bump without migrating the config).
- **`backend/scripts/migrate-mongo-to-pg.js`** — one-time ETL (dedup + preserve order ids + verification).
- **`backend/prisma/migrations/0_init/`** — the generated schema DDL.

Verified locally: `prisma validate` passes, client generates, `node --check` passes on `server.js` and the ETL. Not verifiable here (no DB): `migrate deploy`, the ETL against real data, and live endpoint tests.

## Semantic changes to accept (from full normalization)

- The **Customers** page (`/api/admin/profiles`), dashboard `customers` counts, and the profile-trends chart now count **distinct customers**, not per-profile leads. Numbers will shift vs. the old view. Orders/Payments pages are unchanged.

## Cutover steps (you run these — need the DB)

1. **Provision managed Postgres** (Supabase) in the **same region as EC2** (ap-south-1 / Mumbai). Get two URLs: pooled (`DATABASE_URL`) and direct (`DIRECT_URL`).
   - **Supabase-on-EC2 gotcha:** use the **Supavisor pooler** hostnames for *both* URLs — `DATABASE_URL` = transaction pooler (port `6543`), `DIRECT_URL` = session pooler (port `5432`). They resolve over **IPv4**; the raw `db.<ref>.supabase.co:5432` endpoint is **IPv6-only** and `prisma migrate deploy` will hang/fail from a default EC2 VPC.
2. **Set env** where `MONGODB_URI` is currently injected (host/pm2 env — it is *not* in `backend/.env`):
   ```
   DATABASE_URL="postgresql://.../db?sslmode=require&pgbouncer=true&connection_limit=5"
   DIRECT_URL="postgresql://.../db?sslmode=require"
   MONGODB_URI="<existing mongo uri>"   # only for the ETL; remove after cutover
   ```
3. **Create the schema:**
   ```bash
   cd backend && npm install
   npx prisma migrate deploy      # applies prisma/migrations/0_init
   ```
4. **Run the ETL + verify** (from a host that can reach both DBs):
   ```bash
   cd backend
   MONGODB_URI=... DATABASE_URL=... DIRECT_URL=... node scripts/migrate-mongo-to-pg.js
   ```
   Check the printed verification block (orders == payments − orphaned, customers == distinct phones, paid counts/revenue match). Investigate any warnings (duplicate `razorpayOrderId`, non-integer amounts, orphans).
5. **Short maintenance window:** `pm2 stop` the backend (freeze Mongo writes) → re-run the ETL (idempotent) to capture the delta → re-verify.
6. **Deploy the new backend:** `git pull` → `cd backend && npm install` → `npx prisma generate` → `pm2 restart`.
7. **Smoke test:** create-order, verify-payment (Razorpay test), re-send a webhook (idempotency), all `/api/admin/*`, dashboard, both trends, one DELETE-by-`_id`. Confirm responses still contain `_id`.
8. Keep Mongo alive for a few days as rollback.

**Rollback:** tag the current mongoose `server.js` (git) and keep `MONGODB_URI` set. If Postgres misbehaves inside the window, `git checkout` the old backend + `pm2 restart` — Mongo is untouched. Keep the window short so few Postgres-only writes are at risk.

## Gotchas baked into the code

- **Phone normalization** (`\D` stripped) is the dedup + manual-order link key — identical rule in the ETL and in `server.js`. Audit distinct phone formats in Mongo if counts look off.
- `amount` is `INTEGER` (whole rupees). The ETL rounds and warns on any non-integer.
- A customer is marked `is_deleted` only if **every** source record (payments + profiles) was deleted.
- Keep pm2 a **single instance** (cluster mode multiplies the Prisma pool → connection exhaustion). Use the pooled `DATABASE_URL` at runtime, `DIRECT_URL` only for `migrate`.
