# syntax=docker/dockerfile:1
FROM node:22-alpine AS base
# Prisma's query engine needs OpenSSL on alpine
RUN apk add --no-cache openssl
WORKDIR /app

# Full deps + generated Prisma client. Also the image used by the one-shot
# `migrate` compose service (prisma CLI is a devDependency, present here).
# --ignore-scripts: the package.json postinstall runs `prisma generate`, which
# would fail in the prod-deps stage where the CLI is absent — so generation is
# always an explicit step instead.
FROM base AS deps
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY prisma ./prisma
RUN npx prisma generate

FROM base AS prod-deps
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

FROM base AS runner
ENV NODE_ENV=production
# dumb-init forwards signals to node so SIGTERM reaches the graceful-shutdown
# handler in server.js (PID 1 in a container ignores default signal handlers).
RUN apk add --no-cache dumb-init
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=deps /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=deps /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY . .
USER node
EXPOSE 5001
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
  CMD wget -qO- http://127.0.0.1:5001/api/health || exit 1
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
