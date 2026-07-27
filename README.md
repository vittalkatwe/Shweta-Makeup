# Shweta Makeup — Monorepo

Course sales site for the "Shweta Celeb Makeover Hairstyle Masterclass". One repo, three apps:

| Folder | App | Deploys to |
|---|---|---|
| `frontend/` | Customer site (React 18 + Vite) — landing page + 3-step Razorpay checkout | AWS Lightsail (nginx serves the **committed** `frontend/dist/`) |
| `admin/` | Admin dashboard (Next.js + TypeScript) — orders, payments, customers, Meta Ads | Render (Root Directory = `admin`) |
| `backend/` | Express API (`server.js`, port 5001) — Razorpay orders/webhook, profiles, emails, Meta CAPI, Mixpanel | AWS Lightsail (pm2) |
| `analytics/` | Python reporting scripts (Meta Ads reports, call-recovery analysis) — generated xlsx/csv are gitignored | not deployed |

## Local development

```bash
# each app installs its own deps
(cd frontend && npm install)
(cd backend  && npm install)
(cd admin    && npm install)

# from the repo root:
npm run dev            # customer site (Vite, http://localhost:5173)
npm run dev:backend    # API with nodemon on :5001
npm run dev:admin      # admin dashboard on :3001
```

## Environment files (never committed)

- `frontend/.env` — `REACT_APP_BACKEND_URL`, `REACT_APP_RAZORPAY_KEY_ID`, `VITE_CLEVERTAP_ACCOUNT_ID`
- `backend/.env` — `MONGODB_URI`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `EMAIL_USER`, `EMAIL_PASS`
- `admin/.env.local` — `NEXT_PUBLIC_API_URL` (production: `https://shwetamakeover.online`)

## Deploying

### Customer site (Lightsail)

The build artifact is committed. To release frontend changes:

```bash
cd frontend && npm run build
git add frontend/dist && git commit && git push
# then on the server: git pull   (nginx root points at frontend/dist)
```

### Backend (Lightsail)

`git pull` on the server, then `pm2 restart <app>`. nginx proxies `/api/*` to port 5001; `backend/.env` lives on the server and is not in git.

### Admin (Render)

Auto-deploys from this repo on push to `main`:
- Root Directory: `admin`
- Build: `npm install && npm run build`
- Start: `npm run start -- -p $PORT`
- Env: `NEXT_PUBLIC_API_URL=https://shwetamakeover.online`
