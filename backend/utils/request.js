// Resolve the real client IP behind reverse proxies (nginx in front of Node).
// nginx must be configured to forward X-Forwarded-For (see deploy/nginx/).
function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  return (
    (xff && xff.split(',')[0].trim()) ||
    req.headers['cf-connecting-ip'] ||
    req.headers['x-real-ip'] ||
    req.ip ||
    null
  );
}

module.exports = { getClientIp };
