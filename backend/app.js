const crypto = require('crypto');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const pinoHttp = require('pino-http');

const env = require('./config/env');
const logger = require('./config/logger');
const { notFoundHandler, errorHandler } = require('./middleware/error-handler');
const routes = require('./routes');

const app = express();
// Exactly one reverse-proxy hop (nginx) in front of the app. `true` would let
// clients spoof req.ip via X-Forwarded-For and defeat the rate limiter.
app.set('trust proxy', 1);

app.use(helmet());

app.use(pinoHttp({
  logger,
  genReqId: (req, res) => {
    const id = req.headers['x-request-id'] || crypto.randomUUID();
    res.setHeader('X-Request-Id', id);
    return id;
  },
  autoLogging: { ignore: (req) => req.url === '/api/health' },
}));

app.use(cors({
  origin(origin, cb) {
    // Requests with no Origin header (webhooks, curl, server-to-server) pass.
    if (!origin || env.corsOrigins.includes(origin)) return cb(null, true);
    const err = new Error('Origin not allowed');
    err.status = 403;
    err.expose = true;
    return cb(err);
  },
}));

app.use(express.json({
  limit: '200kb',
  // Keep the raw request body — /api/webhook verifies the Razorpay HMAC
  // signature against the exact bytes received.
  verify: (req, res, buf) => { req.rawBody = buf; },
}));

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
