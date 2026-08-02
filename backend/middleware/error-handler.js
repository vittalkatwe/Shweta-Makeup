const logger = require('../config/logger');

function notFoundHandler(_req, res) {
  res.status(404).json({ success: false, message: 'Not found' });
}

// Central error handler: logs the full error, but never leaks internals to the
// client. Only errors explicitly marked `expose` (body-parser 400/413, our CORS
// rejection) keep their status + message — anything else (Prisma, Razorpay SDK,
// upstream APIs) collapses to a generic 500.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  (req.log || logger).error({ err }, 'request failed');
  if (err.expose && (err.status || err.statusCode)) {
    return res.status(err.status || err.statusCode).json({ success: false, message: err.message });
  }
  res.status(500).json({ success: false, message: 'Internal server error' });
}

module.exports = { notFoundHandler, errorHandler };
