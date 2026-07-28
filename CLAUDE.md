# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

Single monorepo — this is the only repo; there is no separate production copy to sync.

- `frontend/` — customer site (React 18 + Vite). Deploys to AWS Lightsail; nginx serves the **committed** `frontend/dist/` directly (Express does NOT serve the frontend).
- `admin/` — admin dashboard (Next.js + TypeScript, App Router). Deploys to Render with Root Directory `admin`.
- `backend/` — Express API, `server.js` on port 5001. Deploys to Lightsail under pm2; nginx proxies `/api/*` to it.
- `analytics/` — Python reporting scripts (run from repo root). Generated xlsx/csv outputs are gitignored.

## Commands

```bash
# per-app installs
(cd frontend && npm install)
(cd backend && npm install)
(cd admin && npm install)

# from repo root
npm run dev            # frontend Vite dev server
npm run dev:backend    # backend nodemon on port 5001
npm run dev:admin      # admin Next.js on port 3001
npm run build          # build frontend into frontend/dist
```

Frontend and backend must both run for the checkout flow to work locally.

## Releasing

- **Frontend**: build locally, commit `frontend/dist`, push; the Lightsail server just `git pull`s (nginx root = `frontend/dist`).
- **Backend**: push, `git pull` on the server, `pm2 restart`.
- **Admin**: push to `main`; Render auto-builds from `admin/`.

## Architecture

Course sales landing page with a 3-step payment flow for "Shweta Celeb Makeover Hairstyle Masterclass".

**Frontend** (React 18 + Vite): React Router 7 (`BrowserRouter` + `<Routes>`). Routes: `/` (landing), `/payment` (PaymentPage → PostPaymentForm → OrderConfirm), `/contact`, `/privacy`, `/terms`, `/refund`.

**Backend** (Express on port 5001): REST API at `/api/*` — Razorpay order creation/verification/webhook, profile storage, email confirmations, admin endpoints (`/api/admin/*`), Meta Conversions API, Mixpanel server events. MongoDB via Mongoose; models (Payment, Profile) defined inline in `backend/server.js`. `app.set('trust proxy', true)` — real client IPs come through nginx.

**Admin** (Next.js): dashboard, orders, payments, customers, Meta Ads pages; talks to the backend via `NEXT_PUBLIC_API_URL`.

**Pricing**: Firebase Remote Config (`course_price`, `original_price`, `pricing_variant`, `course_dates`), not hardcoded. `PriceProvider` context gates rendering until values are fetched. Firebase project: "shweta-makeover".

**Analytics**: CleverTap (`frontend/src/hooks/clevertap.js`), Meta Pixel + server CAPI (`frontend/src/hooks/meta.js`, backend), Microsoft Clarity, Mixpanel (client + server).

## Environment Variables

- `frontend/.env`: `REACT_APP_BACKEND_URL`, `REACT_APP_RAZORPAY_KEY_ID`, `VITE_CLEVERTAP_ACCOUNT_ID`
- `backend/.env`: `MONGODB_URI`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `EMAIL_USER`, `EMAIL_PASS`
- `admin/.env.local`: `NEXT_PUBLIC_API_URL`

Vite config exposes both `VITE_` and `REACT_APP_` prefixed env vars.

## Key Patterns

- Payment state flows through React state, not URL params, across the 3-step checkout
- `PriceProvider` context wraps the app; components consume pricing via `usePrice()` hook
- **Profile creation**: Profile is created twice — empty record on `/api/create-order` (phone/email), then demographics via `/api/save-profile` after payment
- **Webhook idempotency**: payment webhook checks `status !== 'paid'` before re-processing
- **WhatsApp orders**: manual admin entries via `POST /api/admin/orders` with `source:'whatsapp'`
