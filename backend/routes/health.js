const express = require('express');

const prisma = require('../db');

const router = express.Router();

// Shallow — used by the container HEALTHCHECK; must not flap on transient DB
// blips (a restart loop would take the whole API down instead of just reads).
router.get('/health', (_req, res) => res.json({ status: 'OK', message: 'Server is running' }));

// Deep — verifies DB connectivity; for readiness checks and diagnostics.
router.get('/health/deep', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'OK', db: 'connected' });
  } catch (err) {
    res.status(503).json({ status: 'ERROR', db: 'unreachable' });
  }
});

module.exports = router;
