# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Frontend dev server (Vite HMR)
npm run dev

# Backend dev server (nodemon auto-reload on port 5001)
npm run dev:backend

# Build frontend for production
npm run build

# Preview production build
npm run preview
```

Both servers need to run simultaneously for full functionality.

## Architecture

This is a course sales landing page with a 3-step payment flow for "Shweta Celeb Makeover Hairstyle Masterclass".

**Frontend** (React 18 + Vite): Single-page app where `?payment=1` URL param switches from the landing page to the payment flow. The payment flow is three sequential pages: PaymentPage → PostPaymentForm → OrderConfirm.

**Backend** (Express on port 5001): REST API at `/api/*` handling Razorpay order creation, payment verification, profile storage, and email confirmations. Uses MongoDB (Mongoose) for persistence.

**Pricing**: Controlled via Firebase Remote Config (`course_price`, `original_price`, `pricing_variant`), not hardcoded. Firebase project: "shweta-makeover".

**Analytics**: CleverTap SDK initialized in `index.html` via CDN script; `src/hooks/clevertap.js` provides a proxy module for event tracking. Key events: Page View, Payment Initiated, Payment Success, Order Confirmed.

## Environment Variables

Frontend `.env`: `REACT_APP_BACKEND_URL`, `REACT_APP_RAZORPAY_KEY_ID`, `VITE_CLEVERTAP_ACCOUNT_ID`

Backend `backend/.env`: `MONGODB_URI`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `EMAIL_USER`, `EMAIL_PASS`

Vite config exposes both `VITE_` and `REACT_APP_` prefixed env vars.

## Key Patterns

- No client-side router — routing is done via URL search params in `App.jsx`
- Payment state flows through React state, not URL params, across the 3-step checkout
- Backend serves the built frontend from `/dist` in production via `express.static`
- MongoDB models (Payment, Profile) are defined inline in `backend/server.js`
