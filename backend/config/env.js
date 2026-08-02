// Central env loading + validation. Required by server.js before anything else;
// fails fast (with the full list of missing names) instead of crashing later
// mid-request with an undefined secret.
require('dotenv').config();

const REQUIRED = [
  'DATABASE_URL',
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
  'RAZORPAY_WEBHOOK_SECRET',
  'EMAIL_USER',
  'EMAIL_PASS',
  'MIXPANEL_TOKEN',
  'META_PIXEL_ID',
  'META_CAPI_ACCESS_TOKEN',
  'META_MARKETING_TOKEN',
  'META_AD_ACCOUNT_ID',
];

const missing = REQUIRED.filter((name) => !process.env[name]);
if (missing.length) {
  // eslint-disable-next-line no-console
  console.error(`Missing required environment variables:\n  - ${missing.join('\n  - ')}`);
  process.exit(1);
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5001,
  logLevel: process.env.LOG_LEVEL || 'info',
  // Browser origins allowed by CORS (comma-separated). Requests without an
  // Origin header (webhooks, curl, server-to-server) always pass.
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:3001')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),

  databaseUrl: process.env.DATABASE_URL,
  razorpayKeyId: process.env.RAZORPAY_KEY_ID,
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET,
  razorpayWebhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  mixpanelToken: process.env.MIXPANEL_TOKEN,
  metaPixelId: process.env.META_PIXEL_ID,
  metaCapiAccessToken: process.env.META_CAPI_ACCESS_TOKEN,
  metaMarketingToken: process.env.META_MARKETING_TOKEN,
  metaAdAccountId: process.env.META_AD_ACCOUNT_ID,
};
