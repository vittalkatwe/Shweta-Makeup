const rateLimit = require('express-rate-limit');

// Applied only to the public checkout write endpoints (create-order,
// verify-payment, save-profile). Deliberately NOT applied to:
//   /api/webhook   — Razorpay retries must never be throttled
//   /api/health    — container healthcheck
//   /api/admin/*   — dashboard fires many requests
const publicWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later' },
});

module.exports = { publicWriteLimiter };
