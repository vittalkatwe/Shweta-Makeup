const express = require('express');

const prisma = require('../db');
const { COURSE_NAME } = require('../config/constants');
const { normalizePhone, pruneEmpty } = require('../utils/phone');
const { mapOrder, mapPayment, mapProfile } = require('../utils/mappers');

const router = express.Router();

// ============================================================
// ADMIN: Create manual order (WhatsApp / walk-in)
// POST /api/admin/orders
// ============================================================
router.post('/orders', async (req, res, next) => {
  try {
    const { name, phone, amount, source, whatsappPhone, remark, timestamp, email, gender, city, state, occupation, skipProfile } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({ success: false, message: 'Phone and amount are required' });
    }

    const normPhone = normalizePhone(phone);
    const amt = Math.round(Number(amount));
    const ts = timestamp ? new Date(timestamp) : new Date();

    // Upsert the customer (dedup by phone) + create the paid order atomically.
    const payment = await prisma.$transaction(async (tx) => {
      const customer = await tx.customer.upsert({
        where: { phone: normPhone },
        create: {
          phone: normPhone,
          name: name || null,
          email: email || null,
          whatsappPhone: whatsappPhone || normPhone,
          gender: gender || null,
          city: city || null,
          state: state || null,
          occupation: occupation || null,
          source: source || 'whatsapp',
          hasPurchasedCourse: !skipProfile,
          createdAt: ts,
        },
        // skipProfile means a profile/customer already exists — don't overwrite it.
        update: skipProfile
          ? {}
          : pruneEmpty({
              name,
              email,
              whatsappPhone: whatsappPhone || normPhone,
              gender,
              city,
              state,
              occupation,
              source: source || 'whatsapp',
              hasPurchasedCourse: true,
            }),
      });

      return tx.order.create({
        data: {
          customerId: customer.id,
          amount: amt,
          currency: 'INR',
          status: 'paid',
          source: source || 'whatsapp',
          remark: remark || null,
          createdAt: ts,
          courseName: skipProfile ? null : COURSE_NAME,
          coursePurchasePrice: skipProfile ? null : amt,
        },
        include: { customer: true },
      });
    });

    return res.json({ success: true, payment: mapPayment(payment) });
  } catch (error) {
    return next(error);
  }
});

// ============================================================
// ADMIN: Update remark / source on a payment
// PATCH /api/admin/payments/:id
// ============================================================
router.patch('/payments/:id', async (req, res, next) => {
  try {
    const { remark, source, name, phone, amount, active } = req.body;
    const orderId = req.params.id;

    const existing = await prisma.order.findUnique({ where: { id: orderId } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    // remark/source/amount/active live on the order; name/phone live on the customer.
    const orderData = {};
    if (remark !== undefined) orderData.remark = remark;
    if (source !== undefined) orderData.source = source;
    if (amount !== undefined) orderData.amount = Math.round(Number(amount));
    if (active !== undefined) orderData.active = active;

    const customerData = {};
    if (name  !== undefined) customerData.name  = name;
    if (phone !== undefined) customerData.phone = normalizePhone(phone);

    const ops = [prisma.order.update({ where: { id: orderId }, data: orderData })];
    if (Object.keys(customerData).length) {
      ops.push(prisma.customer.update({ where: { id: existing.customerId }, data: customerData }));
    }
    await prisma.$transaction(ops);

    const updated = await prisma.order.findUnique({ where: { id: orderId }, include: { customer: true } });
    return res.json({ success: true, payment: mapPayment(updated) });
  } catch (error) {
    return next(error);
  }
});

// ============================================================
// ADMIN: Delete a payment (and its profile)
// DELETE /api/admin/payments/:id
// ============================================================
router.delete('/payments/:id', async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    await prisma.order.update({ where: { id: orderId }, data: { isDeleted: true } });

    // Cascade soft-delete to the customer only if they have no other active order.
    const otherActive = await prisma.order.count({
      where: { customerId: order.customerId, isDeleted: false, id: { not: orderId } },
    });
    if (otherActive === 0) {
      await prisma.customer.update({ where: { id: order.customerId }, data: { isDeleted: true } });
    }

    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
});

// ============================================================
// ADMIN: Soft-delete a profile
// DELETE /api/admin/profiles/:id
// ============================================================
router.delete('/profiles/:id', async (req, res, next) => {
  try {
    // Resolve by the customer's own id OR a legacy Mongo Profile _id it absorbed.
    const id = req.params.id;
    const { count } = await prisma.customer.updateMany({
      where: { OR: [{ id }, { legacyProfileIds: { has: id } }] },
      data: { isDeleted: true },
    });
    if (count === 0) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
});

// Paid orders list (Payment + Profile join)
router.get('/orders', async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
    const skip = (page - 1) * limit;

    const where = { status: 'paid', active: true, isDeleted: false };

    if (req.query.source) where.source = req.query.source;

    if (req.query.dateFrom || req.query.dateTo) {
      where.createdAt = {};
      if (req.query.dateFrom) where.createdAt.gte = new Date(req.query.dateFrom + 'T00:00:00+05:30');
      if (req.query.dateTo) where.createdAt.lte = new Date(req.query.dateTo + 'T23:59:59.999+05:30');
    }

    if (req.query.amount) where.amount = parseInt(req.query.amount, 10);

    // search + gender/state are all customer-level filters (were the $lookup + postMatch)
    const customerWhere = {};
    if (req.query.search) {
      const s = req.query.search.trim();
      customerWhere.OR = [
        { email: { contains: s, mode: 'insensitive' } },
        { phone: { contains: s, mode: 'insensitive' } },
        { name:  { contains: s, mode: 'insensitive' } },
      ];
    }
    if (req.query.gender) customerWhere.gender = req.query.gender;
    if (req.query.state) customerWhere.state = { equals: req.query.state, mode: 'insensitive' };
    if (Object.keys(customerWhere).length) where.customer = { is: customerWhere };

    const [rows, total, revenue] = await Promise.all([
      prisma.order.findMany({ where, include: { customer: true }, orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.order.count({ where }),
      prisma.order.aggregate({ where, _sum: { amount: true } }),
    ]);

    const totalRevenue = revenue._sum.amount || 0;

    res.json({
      success: true,
      orders: rows.map(mapOrder),
      total,
      totalRevenue,
      avgOrderValue: total > 0 ? totalRevenue / total : 0,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
});

// Dashboard KPIs
router.get('/dashboard', async (_req, res, next) => {
  try {
    const IST_OFFSET = 330 * 60 * 1000;
    const nowIST = new Date(Date.now() + IST_OFFSET);
    nowIST.setUTCHours(0, 0, 0, 0); // midnight IST
    const todayStart = new Date(nowIST.getTime() - IST_OFFSET); // back to UTC

    const [todayPayments, allTimePayments, todayCustomers, allTimeCustomers] = await Promise.all([
      prisma.order.aggregate({
        where: { status: 'paid', isDeleted: false, createdAt: { gte: todayStart } },
        _sum: { amount: true },
        _count: true,
      }),
      prisma.order.aggregate({
        where: { status: 'paid', isDeleted: false },
        _sum: { amount: true },
        _count: true,
      }),
      prisma.customer.count({ where: { isDeleted: false, createdAt: { gte: todayStart } } }),
      prisma.customer.count({ where: { isDeleted: false } }),
    ]);

    res.json({
      success: true,
      today: {
        customers: todayCustomers,
        revenue: todayPayments._sum.amount || 0,
        orders: todayPayments._count || 0,
      },
      allTime: {
        customers: allTimeCustomers,
        revenue: allTimePayments._sum.amount || 0,
        orders: allTimePayments._count || 0,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Paginated payments list
router.get('/payments', async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
    const skip = (page - 1) * limit;

    const where = { isDeleted: false };
    if (req.query.status) where.status = req.query.status;
    if (req.query.source) where.source = req.query.source;
    if (req.query.dateFrom || req.query.dateTo) {
      where.createdAt = {};
      if (req.query.dateFrom) where.createdAt.gte = new Date(req.query.dateFrom + 'T00:00:00+05:30');
      if (req.query.dateTo) where.createdAt.lte = new Date(req.query.dateTo + 'T23:59:59.999+05:30');
    }
    const s = req.query.search ? req.query.search.trim() : null;
    if (s) {
      where.OR = [
        { razorpayOrderId:   { contains: s, mode: 'insensitive' } },
        { razorpayPaymentId: { contains: s, mode: 'insensitive' } },
        { customer: { is: { OR: [
          { name:  { contains: s, mode: 'insensitive' } },
          { email: { contains: s, mode: 'insensitive' } },
          { phone: { contains: s, mode: 'insensitive' } },
        ] } } },
      ];
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({ where, include: { customer: true }, orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.order.count({ where }),
    ]);

    res.json({ success: true, payments: orders.map(mapPayment), total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
});

// Paginated profiles list
router.get('/profiles', async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
    const skip = (page - 1) * limit;

    const where = { isDeleted: false };
    if (req.query.gender) where.gender = req.query.gender;
    if (req.query.source) where.source = req.query.source;
    if (req.query.city) where.city = { equals: req.query.city, mode: 'insensitive' };
    if (req.query.state) where.state = { equals: req.query.state, mode: 'insensitive' };
    if (req.query.occupation) where.occupation = req.query.occupation;
    if (req.query.hasPurchasedCourse !== undefined) {
      where.hasPurchasedCourse = req.query.hasPurchasedCourse === 'true';
    }
    if (req.query.dateFrom || req.query.dateTo) {
      where.createdAt = {};
      if (req.query.dateFrom) where.createdAt.gte = new Date(req.query.dateFrom + 'T00:00:00+05:30');
      if (req.query.dateTo) where.createdAt.lte = new Date(req.query.dateTo + 'T23:59:59.999+05:30');
    }
    if (req.query.search) {
      const s = req.query.search.trim();
      where.OR = [
        { email: { contains: s, mode: 'insensitive' } },
        { phone: { contains: s, mode: 'insensitive' } },
        { name:  { contains: s, mode: 'insensitive' } },
      ];
    }

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.customer.count({ where }),
    ]);

    res.json({ success: true, profiles: customers.map(mapProfile), total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
});

// Payment trends (daily revenue + order count + failed count)
router.get('/payments/trends', async (req, res, next) => {
  try {
    const days = Math.min(365, Math.max(1, parseInt(req.query.days) || 30));
    const IST_OFFSET = 330 * 60 * 1000; // UTC+5:30 in ms
    // Compute IST midnight 'days' days ago, then convert back to UTC for the DB query
    const nowIST = new Date(Date.now() + IST_OFFSET);
    const startIST = new Date(nowIST);
    startIST.setUTCDate(startIST.getUTCDate() - days);
    startIST.setUTCHours(0, 0, 0, 0);
    const startDate = new Date(startIST.getTime() - IST_OFFSET);

    // Bucket by IST calendar day + status. Casts to ::int keep Postgres bigint
    // counts/sums from surfacing as JS BigInt (which JSON.stringify can't handle).
    const trends = await prisma.$queryRaw`
      SELECT to_char(created_at AT TIME ZONE 'Asia/Kolkata', 'YYYY-MM-DD') AS date,
             status::text AS status,
             COUNT(*)::int AS count,
             COALESCE(SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END), 0)::int AS revenue
      FROM orders
      WHERE is_deleted = false AND created_at >= ${startDate}
      GROUP BY date, status
      ORDER BY date ASC
    `;

    // Reshape into { date, revenue, orders, failed }
    const byDate = {};
    for (const t of trends) {
      const d = t.date;
      if (!byDate[d]) byDate[d] = { date: d, revenue: 0, orders: 0, failed: 0 };
      if (t.status === 'paid') {
        byDate[d].revenue = t.revenue;
        byDate[d].orders = t.count;
      } else if (t.status === 'failed') {
        byDate[d].failed = t.count;
      }
    }

    // Fill missing days (iterate in IST date space)
    const result = [];
    const current = new Date(startDate);
    const now = new Date();
    while (current <= now) {
      const key = new Date(current.getTime() + IST_OFFSET).toISOString().slice(0, 10);
      result.push(byDate[key] || { date: key, revenue: 0, orders: 0, failed: 0 });
      current.setDate(current.getDate() + 1);
    }

    res.json({ success: true, trends: result });
  } catch (error) {
    next(error);
  }
});

// Profile trends (daily registration count)
router.get('/profiles/trends', async (req, res, next) => {
  try {
    const days = Math.min(365, Math.max(1, parseInt(req.query.days) || 30));
    const IST_OFFSET = 330 * 60 * 1000; // UTC+5:30 in ms
    const nowIST = new Date(Date.now() + IST_OFFSET);
    const startIST = new Date(nowIST);
    startIST.setUTCDate(startIST.getUTCDate() - days);
    startIST.setUTCHours(0, 0, 0, 0);
    const startDate = new Date(startIST.getTime() - IST_OFFSET);

    // Distinct customers registered per IST calendar day.
    const trends = await prisma.$queryRaw`
      SELECT to_char(created_at AT TIME ZONE 'Asia/Kolkata', 'YYYY-MM-DD') AS date,
             COUNT(*)::int AS count
      FROM customers
      WHERE is_deleted = false AND created_at >= ${startDate}
      GROUP BY date
      ORDER BY date ASC
    `;

    const byDate = {};
    for (const t of trends) byDate[t.date] = t.count;

    const result = [];
    const current = new Date(startDate);
    const now = new Date();
    while (current <= now) {
      const key = new Date(current.getTime() + IST_OFFSET).toISOString().slice(0, 10);
      result.push({ date: key, count: byDate[key] || 0 });
      current.setDate(current.getDate() + 1);
    }

    res.json({ success: true, trends: result });
  } catch (error) {
    next(error);
  }
});

// Profile facets (distinct values for filter dropdowns)
router.get('/profiles/facets', async (_req, res, next) => {
  try {
    const rows = await prisma.customer.findMany({
      where: { isDeleted: false },
      select: { gender: true, city: true, state: true, occupation: true },
    });
    const uniqSorted = (key) => [...new Set(rows.map(r => r[key]).filter(Boolean))].sort();

    res.json({
      success: true,
      genders: uniqSorted('gender'),
      cities: uniqSorted('city'),
      states: uniqSorted('state'),
      occupations: uniqSorted('occupation'),
    });
  } catch (error) {
    next(error);
  }
});

// ============================================================
// ADMIN: Sync source field from Payments → Profiles
// POST /api/admin/sync-source
// ============================================================
router.post('/sync-source', async (req, res, next) => {
  try {
    // Rebuild the denormalized customers.source from each customer's most recent
    // paid order (replaces the old Payment.source -> Profile.source bulkWrite).
    const updated = await prisma.$executeRaw`
      UPDATE customers c
      SET source = sub.source
      FROM (
        SELECT DISTINCT ON (customer_id) customer_id, source
        FROM orders
        WHERE status = 'paid'
        ORDER BY customer_id, created_at DESC
      ) sub
      WHERE sub.customer_id = c.id
        AND c.source IS DISTINCT FROM sub.source
    `;

    res.json({ updated, skipped: 0, total: updated });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
