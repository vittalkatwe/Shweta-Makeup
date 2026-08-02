# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

Single monorepo — this is the only repo; there is no separate production copy to sync.

- `frontend/` — customer site (React 18 + Vite). In production it is built inside `frontend/Dockerfile` and served by the nginx `web` container (the edge on Lightsail). `frontend/dist/` is still committed only as legacy-rollback insurance until the Docker cutover soaks (see `docs/deployment.md` step 10).
- `admin/` — admin dashboard (Next.js + TypeScript, App Router, `output: 'standalone'`). Deploys to Render with Docker runtime (`admin/Dockerfile`, root directory `admin`).
- `backend/` — Express API on port 5001, split into modules (see below). Runs as the `backend` container on Lightsail; publishes no host port — nginx proxies `/api/*` to it over the compose network.
- `deploy/nginx/conf.d/` — production TLS nginx config, mounted over the `web` container's baked default.
- `analytics/` — Python reporting scripts (run from repo root). Generated xlsx/csv outputs are gitignored.
- `docs/deployment.md` — production topology, day-2 release commands, one-time pm2→Docker cutover runbook + rollback.

## Commands

```bash
# per-app installs
(cd frontend && npm install)
(cd backend && npm install)
(cd admin && npm install)

# from repo root
npm run dev:db         # local Postgres 16 container (docker-compose.yml)
npm run dev            # frontend Vite dev server (:5173)
npm run dev:backend    # backend nodemon on port 5001
npm run dev:admin      # admin Next.js on port 3001
npm run build          # build frontend into frontend/dist

# production stack (see docs/deployment.md)
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml run --rm migrate
```

Frontend and backend must both run for the checkout flow to work locally. Apps run natively in dev (fast HMR); only Postgres is containerized locally.

## Releasing

- **Frontend + backend (Lightsail)**: push, then on the server `git pull` → `run --rm migrate` (if schema changed) → `docker compose -f docker-compose.prod.yml up -d --build`.
- **Admin**: push to `main`; Render builds `admin/Dockerfile` (build arg `NEXT_PUBLIC_API_URL`).
- **Env caveat**: `REACT_APP_*` / `VITE_*` / `NEXT_PUBLIC_*` are baked at build time — changing one requires an image rebuild, not a restart. Backend env (`backend/.env`) is runtime — restart is enough.
- Until the one-time cutover in `docs/deployment.md` has run on the server, the legacy flow (committed `frontend/dist` + pm2 + host nginx) still applies there.

## Architecture

Course sales landing page with a 3-step payment flow for "Shweta Celeb Makeover Hairstyle Masterclass".

**Frontend** (React 18 + Vite): React Router 7 (`BrowserRouter` + `<Routes>`). Routes: `/` (landing), `/payment` (PaymentPage → PostPaymentForm → OrderConfirm), `/contact`, `/privacy`, `/terms`, `/refund`.

**Backend** (Express on port 5001) — modular layout:

- `server.js` — entry: env validation → boot → graceful shutdown (SIGTERM/SIGINT → `server.close()` → `prisma.$disconnect()`)
- `app.js` — express assembly: `trust proxy: 1`, helmet, pino-http (request ids), CORS allowlist, `express.json` (200kb limit + rawBody capture), routes, 404 + central error handler
- `config/` — `env.js` (loads dotenv, validates required vars, fails fast listing missing names), `logger.js` (pino; pretty in dev, JSON in prod), `constants.js`
- `middleware/` — `error-handler.js` (only `expose` errors keep status/message; everything else → generic 500), `rate-limit.js` (30/15min on create-order, verify-payment, save-profile ONLY — never on webhook/health/admin)
- `routes/` — `payments.js` (create-order, verify-payment, webhook, payments list), `profile.js`, `admin.js` (12 admin endpoints incl. trends/facets/sync-source), `meta-ads.js` (mounted at `/admin/meta-ads`), `health.js` (`/api/health` shallow for the container HEALTHCHECK; `/api/health/deep` does `SELECT 1`)
- `services/` — `razorpay.js`, `email.js`, `meta-capi.js`, `meta-ads.js` (Marketing API + 15-min in-memory cache), `mixpanel.js`
- `utils/` — `mappers.js` (`_id`/`timestamp` aliasing — the admin JSON contract), `phone.js`, `request.js`

PostgreSQL via Prisma (**pinned to 6.x — do not bump to 7**); schema in `backend/prisma/schema.prisma` (normalized `Customer` + `Order`; customer deduped by normalized phone). Shared Prisma client in `backend/db.js` (path is load-bearing — `backend/scripts/` requires it).

**Admin** (Next.js): dashboard, orders, payments, customers, Meta Ads pages; talks to the backend via `NEXT_PUBLIC_API_URL`.

**Pricing**: Firebase Remote Config (`course_price`, `original_price`, `pricing_variant`, `course_dates`), not hardcoded. `PriceProvider` context gates rendering until values are fetched. Firebase project: "shweta-makeover".

**Analytics**: CleverTap (`frontend/src/hooks/clevertap.js`), Meta Pixel + server CAPI (`frontend/src/hooks/meta.js`, backend), Microsoft Clarity, Mixpanel (client + server).

## Environment Variables

Each folder has a `.env.example`. Backend validates at boot and exits listing anything missing.

- `.env` (root): compose — dev Postgres creds + production frontend build args
- `frontend/.env`: `REACT_APP_BACKEND_URL`, `REACT_APP_RAZORPAY_KEY_ID`, `VITE_CLEVERTAP_ACCOUNT_ID`, `VITE_FIREBASE_*`
- `backend/.env`: `DATABASE_URL` (pooled) + `DIRECT_URL` (direct, for `prisma migrate`), `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, `MIXPANEL_TOKEN`, `META_PIXEL_ID`, `META_CAPI_ACCESS_TOKEN`, `META_MARKETING_TOKEN`, `META_AD_ACCOUNT_ID`; optional `PORT`, `NODE_ENV`, `LOG_LEVEL`, `CORS_ORIGINS`
- `admin/.env.local`: `NEXT_PUBLIC_API_URL`

Vite config exposes both `VITE_` and `REACT_APP_` prefixed env vars.

## Key Patterns

- Payment state flows through React state, not URL params, across the 3-step checkout
- `PriceProvider` context wraps the app; components consume pricing via `usePrice()` hook
- **Customer/order model**: `/api/create-order` upserts a `Customer` (deduped by normalized phone) and creates a pending `Order`; `/api/save-profile` upserts the customer's demographics after payment. Name/email/phone live on the customer, not the order.
- **rawBody invariant**: `express.json`'s `verify` hook in `app.js` captures `req.rawBody`; `/api/webhook` verifies the Razorpay HMAC against those exact bytes. Any body-parsing change must preserve this.
- **Webhook idempotency**: payment webhook checks `status !== 'paid'` before re-processing (a Prisma `updateMany` with a `status: { not: 'paid' }` guard)
- **WhatsApp orders**: manual admin entries via `POST /api/admin/orders` with `source:'whatsapp'`
- **API `_id` compatibility**: Postgres rows use `id`/`created_at`, but `utils/mappers.js` emits `_id`/`timestamp` so `admin/src/lib/types.ts` and the admin UI need no changes
- **IST date handling**: trends bucket by `created_at AT TIME ZONE 'Asia/Kolkata'` in raw SQL (`prisma.$queryRaw`), with `::int` casts so Postgres `bigint` counts don't surface as JS `BigInt`
- **Error responses**: route handlers `next(error)` into the central handler — never leak `error.message` on 5xx. Intentional 4xx responses stay inline in the routes.
