const express = require('express');

const prisma = require('../db');
const { publicWriteLimiter } = require('../middleware/rate-limit');
const { normalizePhone, pruneEmpty } = require('../utils/phone');
const { takeOrAll, mapProfile } = require('../utils/mappers');

const router = express.Router();

// ============================================================
// API: Save post-payment profile form
// ============================================================
router.post('/save-profile', publicWriteLimiter, async (req, res, next) => {
  try {
    const { name, email, phone, age, razorpayOrderId, whatsappPhone, gender, city, state, occupation, reason } = req.body;

    const normPhone = normalizePhone(phone);

    // Resolve which customer to update: if we have the razorpay order, use its
    // customer; otherwise fall back to matching by normalized phone.
    let targetPhone = normPhone;
    if (razorpayOrderId) {
      const order = await prisma.order.findUnique({
        where: { razorpayOrderId },
        include: { customer: true },
      });
      if (order) targetPhone = order.customer.phone;
    }

    const fields = {
      age: age ? parseInt(age, 10) : null,
      whatsappPhone: whatsappPhone || normPhone,
      gender,
      city,
      state,
      occupation,
      reason,
      name: name || null,
      email: email || null,
    };

    await prisma.customer.upsert({
      where: { phone: targetPhone },
      create: { phone: targetPhone, ...pruneEmpty(fields) },
      update: pruneEmpty(fields),
    });
    req.log.info({ phone: normPhone }, 'Profile updated');

    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
});

router.get('/profiles', async (req, res, next) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const [customers, total] = await Promise.all([
      prisma.customer.findMany({ orderBy: { createdAt: 'desc' }, skip, take: takeOrAll(req.query.limit) }),
      prisma.customer.count(),
    ]);
    return res.json({ success: true, profiles: customers.map(mapProfile), total });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
