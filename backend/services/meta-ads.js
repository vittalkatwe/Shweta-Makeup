const env = require('../config/env');

// ── Meta credentials (Marketing API) ───────────────────────
const META_MARKETING_TOKEN = env.metaMarketingToken;
const META_AD_ACCOUNT_ID = env.metaAdAccountId;

// ── Meta Ads in-memory cache ────────────────────────────────
const metaAdsCache = new Map();
const META_ADS_CACHE_TTL = 15 * 60 * 1000;
function getMetaAdsCache(key) {
  const entry = metaAdsCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > META_ADS_CACHE_TTL) { metaAdsCache.delete(key); return null; }
  return entry.data;
}
function setMetaAdsCache(key, data) {
  metaAdsCache.set(key, { ts: Date.now(), data });
}

const EXCLUDED_META_CAMPAIGN_IDS = new Set(['120241058493460767', '120241203934230767']);

module.exports = {
  META_MARKETING_TOKEN,
  META_AD_ACCOUNT_ID,
  getMetaAdsCache,
  setMetaAdsCache,
  EXCLUDED_META_CAMPAIGN_IDS,
};
