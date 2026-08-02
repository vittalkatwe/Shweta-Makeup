// config/env loads dotenv and validates required vars (exits early if any are
// missing) — it must be the first require so DATABASE_URL is set before the
// Prisma client is instantiated inside ./db.
const env = require('./config/env');
const logger = require('./config/logger');
const prisma = require('./db');
const app = require('./app');

prisma.$connect()
  .then(() => logger.info('PostgreSQL connected'))
  .catch((err) => logger.error({ err }, 'PostgreSQL connection error'));

const server = app.listen(env.port, () => logger.info(`Server running on port ${env.port}`));

// Graceful shutdown — lets in-flight requests finish and closes the Prisma
// pool. Required for clean `docker stop` / rolling restarts.
function shutdown(signal) {
  logger.info(`${signal} received, shutting down`);
  const forceExit = setTimeout(() => {
    logger.error('Could not close connections in time, forcing exit');
    process.exit(1);
  }, 10_000);
  forceExit.unref();
  server.close(() => {
    prisma.$disconnect().finally(() => {
      logger.info('Shutdown complete');
      process.exit(0);
    });
  });
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
