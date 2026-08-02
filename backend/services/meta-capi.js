const crypto = require('crypto');

const env = require('../config/env');
const logger = require('../config/logger');

// ── Meta CAPI helpers ──────────────────────────────────────
function sha256(value) {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

// Canonical Meta browser-id token, used as a fallback when the client didn't send one.
function generateFbp() {
  return `fb.1.${Date.now()}.${Math.floor(Math.random() * 1e10)}`;
}

async function sendMetaCAPIEvent({ eventName, eventId, userData, customData, sourceUrl, clientIp, userAgent }) {
  const pixelId = env.metaPixelId;
  const accessToken = env.metaCapiAccessToken;

  const payload = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      event_source_url: sourceUrl || 'https://shwetamakeover.online',
      action_source: 'website',
      user_data: {
        ph: userData.phone ? sha256(userData.phone.replace(/\D/g, '')) : undefined,
        em: userData.email ? sha256(userData.email) : undefined,
        fn: userData.name ? sha256(userData.name.split(' ')[0]) : undefined,
        external_id: userData.phone ? sha256(userData.phone.replace(/\D/g, '')) : undefined,
        fbc: userData.fbc || undefined,
        fbp: userData.fbp || undefined,
        client_ip_address: clientIp || undefined,
        client_user_agent: userAgent || undefined,
      },
      custom_data: customData,
    }],
  };

  const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    logger.info({ response: json }, 'Meta CAPI response');
  } catch (err) {
    logger.error({ err }, 'Meta CAPI error');
  }
}

module.exports = { generateFbp, sendMetaCAPIEvent };
