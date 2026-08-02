# Deployment — Docker on Lightsail

Production topology after the Docker cutover:

```
Internet ──▶ web (nginx container, ports 80/443)
              ├─ serves the built frontend bundle (baked into the image)
              └─ proxies /api/* ──▶ backend (Express container, internal :5001)
                                       └─▶ managed Postgres (Neon/Supabase)
Admin dashboard: Render (Docker runtime, admin/Dockerfile) — separate from Lightsail.
```

- `docker-compose.prod.yml` defines `web` + `backend` + a one-shot `migrate` service.
- TLS certs stay on the host (`/etc/letsencrypt`, read-only mount); the host
  certbot renews them in webroot mode.
- The backend container publishes no ports — it is only reachable through nginx.

## Day-2: releasing a change

```bash
cd ~/shweta-makeup-monorepo
git pull

# schema changed? run migrations first (uses DIRECT_URL from backend/.env)
docker compose -f docker-compose.prod.yml run --rm migrate

# rebuild + restart whatever changed (backend and/or web)
docker compose -f docker-compose.prod.yml up -d --build
```

- Frontend env values (`REACT_APP_*`, `VITE_*` in the root `.env`) are **baked at
  build time** — after editing one: `docker compose -f docker-compose.prod.yml up -d --build web`.
- Backend env (`backend/.env`) is runtime — after editing:
  `docker compose -f docker-compose.prod.yml up -d backend` (restart is enough, no rebuild).
- Admin: push to `main`; Render builds `admin/Dockerfile` (root directory `admin`,
  runtime Docker, build arg `NEXT_PUBLIC_API_URL=https://shwetamakeover.online`).

## One-time cutover runbook (pm2 + host nginx → Docker)

Keep the old stack intact until step 6 verifies — rollback (step 8) depends on it.

### 1. Prep (no downtime)

```bash
# Docker Engine + compose plugin (Ubuntu)
sudo apt-get update && sudo apt-get install -y docker.io docker-compose-v2
sudo usermod -aG docker $USER   # re-login afterwards

cd ~/shweta-makeup-monorepo && git pull
```

Update `backend/.env` on the server — new required vars (the server fails fast
listing anything missing):

```
NODE_ENV=production
LOG_LEVEL=info
CORS_ORIGINS=https://shwetamakeover.online,https://www.shwetamakeover.online,https://<admin>.onrender.com
MIXPANEL_TOKEN=...            # ROTATE — old value was committed in git history
META_PIXEL_ID=...
META_CAPI_ACCESS_TOKEN=...    # ROTATE — old value was committed in git history
META_MARKETING_TOKEN=...      # ROTATE — old value was committed in git history
META_AD_ACCOUNT_ID=...
```

Create the root `.env` from `.env.example` with the production frontend values
(live Razorpay key id, Firebase config, `REACT_APP_BACKEND_URL=https://shwetamakeover.online`).

```bash
sudo mkdir -p /var/www/certbot
```

### 2. Pre-build while the old stack still serves

```bash
docker compose -f docker-compose.prod.yml build
```

The backend container publishes no host port, so it can be smoke-tested next to
the running pm2 process:

```bash
docker compose -f docker-compose.prod.yml up -d backend
docker compose -f docker-compose.prod.yml exec backend wget -qO- http://127.0.0.1:5001/api/health/deep
docker compose -f docker-compose.prod.yml stop backend
```

### 3. Confirm the migration path

```bash
docker compose -f docker-compose.prod.yml run --rm migrate
# expected: "No pending migrations" (schema unchanged since 0_init)
```

### 4. Cutover (off-peak; seconds of downtime — Razorpay retries webhooks)

```bash
pm2 stop all
sudo systemctl stop nginx && sudo systemctl disable nginx
docker compose -f docker-compose.prod.yml up -d
```

### 5. Verify

- `curl -I https://shwetamakeover.online` → 200 + helmet security headers
- `https://shwetamakeover.online/payment` deep link → renders (SPA fallback)
- `curl https://shwetamakeover.online/api/health` and `/api/health/deep` → OK
- a hashed `/assets/*.js` → `Cache-Control: public, immutable`
- one real (test-mode or low-value) payment end-to-end
- Razorpay dashboard → send test webhook → 200
- Admin on Render loads data (its origin must be in `CORS_ORIGINS`)
- `docker compose -f docker-compose.prod.yml logs backend` shows real client IPs

### 6. Switch certbot renewal to webroot mode

```bash
sudo certbot certonly --webroot -w /var/www/certbot -d shwetamakeover.online -d www.shwetamakeover.online --dry-run
```

Once the dry run passes, make renewals reload nginx-in-container — add
`/etc/letsencrypt/renewal-hooks/deploy/reload-web.sh`:

```bash
#!/bin/sh
cd /home/<user>/shweta-makeup-monorepo && docker compose -f docker-compose.prod.yml exec web nginx -s reload
```

`chmod +x` it, then `sudo certbot renew --dry-run`.

### 7. Rotate the leaked tokens

The Mixpanel token and both Meta tokens were committed in `server.js` history.
Rotate them in the Mixpanel / Meta Business dashboards, update `backend/.env`,
then `docker compose -f docker-compose.prod.yml up -d backend`.

### 8. Rollback (if any step fails)

```bash
docker compose -f docker-compose.prod.yml down
sudo systemctl enable nginx && sudo systemctl start nginx
pm2 start all
```

This works only while `frontend/dist` is still committed — which is why dist
removal (Phase E) happens strictly after the cutover has soaked.

### 9. Decommission after a soak period (~1 week)

```bash
pm2 delete all && pm2 unstartup
# keep the nginx package installed for a week as rollback insurance,
# then optionally: sudo apt-get remove nginx
```

### 10. Retire the committed frontend/dist (after the soak, on a dev machine)

The `web` image builds the frontend itself, so the committed `frontend/dist`
becomes dead weight — but it must stay in git until rollback insurance is no
longer needed (see step 8). Once confident:

```bash
git rm -r --cached frontend/dist
echo "frontend/dist/" >> .gitignore
git commit -m "Stop committing frontend/dist (built in Docker now)"
```

Also update README.md/CLAUDE.md to drop the "committed dist" release notes.
