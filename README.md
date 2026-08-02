# Shweta Makeup — Monorepo

Course sales site for the "Shweta Celeb Makeover Hairstyle Masterclass". One repo, three apps:

| Folder | App | Deploys to |
|---|---|---|
| `frontend/` | Customer site (React 18 + Vite) — landing page + 3-step Razorpay checkout | AWS Lightsail — `web` Docker container (nginx edge, ports 80/443) |
| `admin/` | Admin dashboard (Next.js + TypeScript) — orders, payments, customers, Meta Ads | Render (Docker runtime, `admin/Dockerfile`) |
| `backend/` | Express API (port 5001) — Razorpay orders/webhook, profiles, emails, Meta CAPI, Mixpanel | AWS Lightsail — `backend` Docker container (internal only) |
| `analytics/` | Python reporting scripts (Meta Ads reports, call-recovery analysis) — generated xlsx/csv are gitignored | not deployed |

Database: managed PostgreSQL (Neon/Supabase) via Prisma — no DB container in production.

> **Cutover status:** the Docker production stack is defined in
> `docker-compose.prod.yml` but the Lightsail server may still be on the legacy
> pm2 + host-nginx + committed-`frontend/dist` setup. The one-time migration is
> scripted in [docs/deployment.md](docs/deployment.md). Until it runs, the
> legacy release flow (build → commit `dist` → push → `git pull`) still applies.

## Local development

```bash
# each app installs its own deps
(cd frontend && npm install)
(cd backend  && npm install)
(cd admin    && npm install)

# from the repo root:
npm run dev:db         # local Postgres 16 in Docker (first time: cd backend && npm run prisma:migrate:dev)
npm run dev            # customer site (Vite, http://localhost:5173)
npm run dev:backend    # API with nodemon on :5001
npm run dev:admin      # admin dashboard on :3001
```

Frontend and backend must both run for the checkout flow to work locally.
Apps run natively for fast HMR; only Postgres runs in Docker locally. The full
container stack can be exercised with `docker-compose.prod.yml` before deploys.

## Environment files (never committed — see the .env.example in each folder)

- `.env` (repo root) — compose: dev Postgres credentials + production frontend **build args**
- `frontend/.env` — `REACT_APP_BACKEND_URL`, `REACT_APP_RAZORPAY_KEY_ID`, `VITE_CLEVERTAP_ACCOUNT_ID`, `VITE_FIREBASE_*`
- `backend/.env` — `DATABASE_URL` (pooled) + `DIRECT_URL` (for `prisma migrate`), Razorpay keys + webhook secret, Gmail creds, `MIXPANEL_TOKEN`, `META_PIXEL_ID`, `META_CAPI_ACCESS_TOKEN`, `META_MARKETING_TOKEN`, `META_AD_ACCOUNT_ID`, `CORS_ORIGINS`. The server fails fast at boot listing any missing vars.
- `admin/.env.local` — `NEXT_PUBLIC_API_URL` (production: `https://shwetamakeover.online`)

**Build-time vs runtime:** all `REACT_APP_*` / `VITE_*` / `NEXT_PUBLIC_*` values
are baked into the JS bundles at build time. Changing one means rebuilding the
image, not restarting the container.

## Deploying

### Customer site + backend (Lightsail, Docker)

```bash
# on the server
cd ~/shweta-makeup-monorepo && git pull
docker compose -f docker-compose.prod.yml run --rm migrate   # only if schema changed
docker compose -f docker-compose.prod.yml up -d --build
```

The `web` container is the edge: nginx serves the frontend bundle (built inside
the image) and proxies `/api/*` to the `backend` container. TLS certs come from
the host's `/etc/letsencrypt`; renewal stays on host certbot (webroot mode).
Full runbook, one-time cutover steps and rollback: [docs/deployment.md](docs/deployment.md).

### Admin (Render)

Auto-deploys from this repo on push to `main`:
- Root Directory: `admin`, Runtime: **Docker** (`admin/Dockerfile`)
- Env: `NEXT_PUBLIC_API_URL=https://shwetamakeover.online` (picked up as a build arg)
