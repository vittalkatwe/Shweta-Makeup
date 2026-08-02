# syntax=docker/dockerfile:1
# Vite bakes env vars into the bundle at BUILD time — every value below must be
# passed as a build arg (see docker-compose.prod.yml); changing one requires a
# rebuild, not a restart.
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_RAZORPAY_KEY_ID
ARG VITE_CLEVERTAP_ACCOUNT_ID
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID
ARG VITE_FIREBASE_MEASUREMENT_ID
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL \
    REACT_APP_RAZORPAY_KEY_ID=$REACT_APP_RAZORPAY_KEY_ID \
    VITE_CLEVERTAP_ACCOUNT_ID=$VITE_CLEVERTAP_ACCOUNT_ID \
    VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY \
    VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN \
    VITE_FIREBASE_MESSAGING_SENDER_ID=$VITE_FIREBASE_MESSAGING_SENDER_ID \
    VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID \
    VITE_FIREBASE_MEASUREMENT_ID=$VITE_FIREBASE_MEASUREMENT_ID
RUN npm run build

# Serves the static bundle. This image doubles as the production edge:
# docker-compose.prod.yml mounts deploy/nginx/conf.d over /etc/nginx/conf.d
# (TLS config), replacing the baked default below without an image rebuild.
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
