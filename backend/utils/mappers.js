// Translate a Mongo-style `.limit(n)` (where 0 == "no limit") into a Prisma
// `take` (where 0 would return zero rows). Returns undefined for "no limit".
function takeOrAll(limit) {
  const n = parseInt(limit, 10);
  return n > 0 ? n : undefined;
}

// Flatten an order (with its customer included) into the payment-like shape
// used by the email / Meta CAPI / Mixpanel helpers.
function flatOrder(order) {
  const c = order.customer || {};
  return {
    _id: order.id,
    id: order.id,
    name: c.name ?? null,
    email: c.email ?? null,
    phone: c.phone,
    amount: order.amount,
    emailSent: order.emailSent,
    fbc: order.fbc,
    fbp: order.fbp,
    clientIp: order.clientIp,
    userAgent: order.userAgent,
  };
}

// ── Response mappers ──────────────────────────────────────
// Preserve the exact JSON contract the admin app consumes (admin/src/lib/types.ts),
// including the legacy `_id` key aliased from the Postgres primary key.

// GET /api/admin/orders (mirrors the old aggregation $project)
function mapOrder(order) {
  const c = order.customer || {};
  return {
    _id: order.id,
    name: c.name ?? null,
    phone: c.phone,
    email: c.email ?? null,
    amount: order.amount,
    razorpayOrderId: order.razorpayOrderId,
    razorpayPaymentId: order.razorpayPaymentId,
    timestamp: order.createdAt,
    source: order.source,
    emailSent: order.emailSent,
    whatsappPhone: c.whatsappPhone ?? undefined,
    gender: c.gender ?? undefined,
    city: c.city ?? undefined,
    state: c.state ?? undefined,
    occupation: c.occupation ?? undefined,
    reason: c.reason ?? undefined,
  };
}

// GET /api/admin/payments + GET /api/payments (mirrors the old aggregation $project)
function mapPayment(order) {
  const c = order.customer || {};
  return {
    _id: order.id,
    name: c.name ?? null,
    phone: c.phone,
    email: c.email ?? null,
    amount: order.amount,
    currency: order.currency,
    status: order.status,
    razorpayOrderId: order.razorpayOrderId,
    razorpayPaymentId: order.razorpayPaymentId,
    emailSent: order.emailSent,
    errorDescription: order.errorDescription,
    errorCode: order.errorCode,
    timestamp: order.createdAt,
    source: order.source,
    remark: order.remark,
    active: order.active,
    fbc: order.fbc,
    fbp: order.fbp,
    clientIp: order.clientIp,
    userAgent: order.userAgent,
  };
}

// GET /api/admin/profiles + GET /api/profiles (mirrors the old Profile shape)
function mapProfile(customer) {
  return {
    _id: customer.id,
    razorpayOrderId: null,
    name: customer.name ?? null,
    email: customer.email ?? null,
    phone: customer.phone,
    whatsappPhone: customer.whatsappPhone ?? undefined,
    gender: customer.gender ?? undefined,
    city: customer.city ?? undefined,
    state: customer.state ?? undefined,
    occupation: customer.occupation ?? undefined,
    reason: customer.reason ?? undefined,
    hasPurchasedCourse: customer.hasPurchasedCourse,
    source: customer.source ?? undefined,
    isDeleted: customer.isDeleted,
    timestamp: customer.createdAt,
  };
}

module.exports = { takeOrAll, flatOrder, mapOrder, mapPayment, mapProfile };
