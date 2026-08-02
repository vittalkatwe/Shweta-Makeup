const Mixpanel = require('mixpanel');

const env = require('../config/env');
const logger = require('../config/logger');

const mixpanel = Mixpanel.init(env.mixpanelToken);

function trackBackendEvent(eventName, distinctId, properties = {}) {
  if (!distinctId) return;
  try {
    mixpanel.track(eventName, { distinct_id: distinctId, ...properties });
  } catch (e) {
    logger.error({ err: e }, 'mixpanel track failed');
  }
}

module.exports = { trackBackendEvent };
