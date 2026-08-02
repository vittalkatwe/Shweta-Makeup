const pino = require('pino');

const env = require('./env');

// pino-pretty is a devDependency — only wired up outside production, so the
// prod image (npm ci --omit=dev) never needs it.
module.exports = pino({
  level: env.logLevel,
  ...(env.nodeEnv === 'development'
    ? { transport: { target: 'pino-pretty', options: { translateTime: 'SYS:HH:MM:ss' } } }
    : {}),
});
