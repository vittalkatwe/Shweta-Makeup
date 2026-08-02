const express = require('express');
const crypto = require('crypto');

const prisma = require('../db');
const env = require('../config/env');
const razorpay = require('../services/razorpay');
const { sendConfirmationEmail } = require('../services/email');
const { generateFbp, sendMetaCAPIEvent } = require('../services/meta-capi');
const { trackBackendEvent } = require('../services/mixpanel');
const { COURSE_NAME } = require('../config/constants');
const { publicWriteLimiter } = require('../middleware/rate-limit');
const { normalizePhone } = require('../utils/phone');
const { getClientIp } = require('../utils/request');
const { takeOrAll, flatOrder, mapPayment } = require('../utils/mappers');

const router = express.Router();

// ============================================================
// API: Create One-time Razorpay Order
// ============================================================
router.post('/create-order', publicWriteLimiter, async (req, res, next) => {
  try {
    const { name, email, phone, amount, fbc, fbp } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone are required' });
    }

    // Use amount from frontend; fall back to 499 if missing/invalid
    const AMOUNT_INR = (typeof amount === 'number' && amount > 0) ? amount : 499;
    const normPhone = normalizePhone(phone);

    // Ensure the customer exists (dedup by phone). The richer post-payment form
    // (/api/save-profile) is the authoritative identity update, so we only fill
    // missing name/email here and never clobber existing values.
    const customer = await prisma.customer.upsert({
      where: { phone: normPhone },
      create: { phone: normPhone, name: name || null, email: email || null, source: 'website' },
      update: {},
    });

    // Create the local order first so its id can serve as the Razorpay receipt.
    const payment = await prisma.order.create({
      data: {
        customerId: customer.id,
        amount: AMOUNT_INR,
        currency: 'INR',
        status: 'pending',
        source: 'website',
        fbc: fbc || null,
        fbp: fbp || generateFbp(),
        clientIp: getClientIp(req),
        userAgent: req.headers['user-agent'] || null,
      },
    });
    req.log.info({ orderId: payment.id, amount: AMOUNT_INR }, 'Order record created');

    const order = await razorpay.orders.create({
      amount:   AMOUNT_INR * 100,
      currency: 'INR',
      receipt:  payment.id,
      notes: {
        customer_name:  name || null,
        customer_email: email || '',
        customer_phone: phone,
        payment_db_id:  payment.id,
      },
    });

    await prisma.order.update({
      where: { id: payment.id },
      data: { razorpayOrderId: order.id, status: 'created' },
    });
    req.log.info({ razorpayOrderId: order.id }, 'Razorpay order created');

    return res.json({ success: true, orderId: order.id });
  } catch (error) {
    return next(error);
  }
});

// ============================================================
// API: Verify payment signature & mark as paid
// ============================================================
router.post('/verify-payment', publicWriteLimiter, async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, event_id } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing payment details' });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', env.razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      req.log.error({ razorpayOrderId: razorpay_order_id }, 'Invalid payment signature');
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // Mark as paid (update returns the row; throws P2025 if the order is missing)
    let updatedOrder;
    try {
      updatedOrder = await prisma.order.update({
        where: { razorpayOrderId: razorpay_order_id },
        data: { razorpayPaymentId: razorpay_payment_id, status: 'paid' },
        include: { customer: true },
      });
    } catch (err) {
      if (err.code === 'P2025') {
        req.log.warn({ razorpayOrderId: razorpay_order_id }, 'Payment record not found');
        return res.status(404).json({ success: false, message: 'Payment record not found' });
      }
      throw err;
    }

    req.log.info({ razorpayOrderId: razorpay_order_id }, 'Payment verified and marked as paid');

    // Record course purchase info on the order + customer
    await prisma.$transaction([
      prisma.order.update({
        where: { id: updatedOrder.id },
        data: { coursePurchasePrice: updatedOrder.amount, courseName: COURSE_NAME },
      }),
      prisma.customer.update({
        where: { id: updatedOrder.customerId },
        data: { hasPurchasedCourse: true },
      }),
    ]);

    const flat = flatOrder(updatedOrder);

    // Send confirmation email if not already sent
    if (!updatedOrder.emailSent) {
      await sendConfirmationEmail(flat);
    }

    await sendMetaCAPIEvent({
      eventName: 'Purchase',
      eventId: event_id,
      userData: {
        phone: flat.phone,
        email: flat.email,
        name: flat.name || null,
        fbc: flat.fbc,
        fbp: flat.fbp,
      },
      customData: { value: updatedOrder.amount, currency: 'INR', content_name: COURSE_NAME },
      sourceUrl: req.headers.referer || 'https://shwetamakeover.online',
      clientIp: getClientIp(req) || flat.clientIp,
      userAgent: req.headers['user-agent'] || flat.userAgent,
    });

    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
});

// ============================================================
// WEBHOOK: Handle payment events
// ============================================================
router.post('/webhook', async (req, res, next) => {
  try {
    const webhookBody      = req.rawBody ? req.rawBody.toString() : JSON.stringify(req.body);
    const webhookSignature = req.headers['x-razorpay-signature'];

    const expectedSignature = crypto
      .createHmac('sha256', env.razorpayWebhookSecret)
      .update(webhookBody)
      .digest('hex');

    if (webhookSignature !== expectedSignature) {
      req.log.error('Invalid webhook signature');
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    const event   = req.body.event;
    const payload = req.body.payload;

    req.log.info({ event }, 'Webhook event received');

    switch (event) {
      case 'payment.captured': {
        const paymentEntity = payload.payment?.entity || payload.payment;
        if (!paymentEntity) break;

        const orderId          = paymentEntity.order_id;
        const razorpayPaymentId = paymentEntity.id;
        const capturedAmount   = typeof paymentEntity.amount === 'number'
          ? Math.round(paymentEntity.amount / 100)
          : null;

        const existingPayment = await prisma.order.findUnique({ where: { razorpayOrderId: orderId } });
        if (!existingPayment || existingPayment.status === 'paid') break; // idempotency guard

        const capturedPayment = await prisma.order.update({
          where: { id: existingPayment.id },
          data: {
            razorpayPaymentId,
            status: 'paid',
            ...(capturedAmount !== null ? { amount: capturedAmount } : {}),
          },
          include: { customer: true },
        });

        if (capturedPayment) {
          await prisma.$transaction([
            prisma.order.update({
              where: { id: capturedPayment.id },
              data: { coursePurchasePrice: capturedPayment.amount, courseName: COURSE_NAME },
            }),
            prisma.customer.update({
              where: { id: capturedPayment.customerId },
              data: { hasPurchasedCourse: true },
            }),
          ]);

          const flat = flatOrder(capturedPayment);

          if (!capturedPayment.emailSent) {
            await sendConfirmationEmail(flat);
          }

          await sendMetaCAPIEvent({
            eventName: 'Purchase',
            eventId: `purchase_${orderId}`,
            userData: {
              phone: flat.phone,
              email: flat.email,
              name: flat.name || null,
              fbc: flat.fbc,
              fbp: flat.fbp,
            },
            customData: { value: capturedPayment.amount, currency: 'INR', content_name: COURSE_NAME },
            sourceUrl: 'https://shwetamakeover.online',
            clientIp: flat.clientIp,
            userAgent: flat.userAgent,
          });

          trackBackendEvent('payment_success_backend', flat.phone, {
            source: 'webhook.payment_captured',
            amount: capturedPayment.amount,
            currency: 'INR',
            razorpay_order_id: orderId,
            razorpay_payment_id: razorpayPaymentId,
            email: flat.email,
            name: flat.name,
            course_name: COURSE_NAME,
          });
        }

        break;
      }

      case 'order.paid': {
        const orderEntity = payload.order?.entity || payload.order;
        if (!orderEntity) break;

        const orderId = orderEntity.id;

        // Only act if not already marked paid (idempotency guard)
        const existingPayment = await prisma.order.findUnique({ where: { razorpayOrderId: orderId } });
        if (!existingPayment || existingPayment.status === 'paid') break;

        const { count } = await prisma.order.updateMany({
          where: { razorpayOrderId: orderId, status: { not: 'paid' } },
          data: { status: 'paid' },
        });

        if (count > 0) {
          const paidPayment = await prisma.order.findUnique({
            where: { razorpayOrderId: orderId },
            include: { customer: true },
          });

          await prisma.$transaction([
            prisma.order.update({
              where: { id: paidPayment.id },
              data: { coursePurchasePrice: paidPayment.amount, courseName: COURSE_NAME },
            }),
            prisma.customer.update({
              where: { id: paidPayment.customerId },
              data: { hasPurchasedCourse: true },
            }),
          ]);

          const flat = flatOrder(paidPayment);

          if (!paidPayment.emailSent) {
            await sendConfirmationEmail(flat);
          }

          await sendMetaCAPIEvent({
            eventName: 'Purchase',
            eventId: `purchase_${orderId}`,
            userData: {
              phone: flat.phone,
              email: flat.email,
              name: flat.name || null,
              fbc: flat.fbc,
              fbp: flat.fbp,
            },
            customData: { value: paidPayment.amount, currency: 'INR', content_name: COURSE_NAME },
            sourceUrl: 'https://shwetamakeover.online',
            clientIp: flat.clientIp,
            userAgent: flat.userAgent,
          });

          trackBackendEvent('payment_success_backend', flat.phone, {
            source: 'webhook.order_paid',
            amount: paidPayment.amount,
            currency: 'INR',
            razorpay_order_id: orderId,
            email: flat.email,
            name: flat.name,
            course_name: COURSE_NAME,
          });

          req.log.info({ razorpayOrderId: orderId }, 'order.paid handled');
        }

        break;
      }

      case 'payment.failed': {
        const paymentEntity = payload.payment?.entity || payload.payment;
        if (!paymentEntity) break;

        await prisma.order.updateMany({
          where: { razorpayOrderId: paymentEntity.order_id },
          data: {
            status:           'failed',
            errorCode:        paymentEntity.error_code,
            errorDescription: paymentEntity.error_description || 'Payment failed',
          },
        });
        break;
      }
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// ── Misc routes ───────────────────────────────────────────
router.post('/cancel-subscription', async (_req, res) =>
  res.status(410).json({ success: false, message: 'Subscriptions not supported' })
);

router.get('/payments', async (req, res, next) => {
  try {
    const { razorpayOrderId, email, status, search, limit, skip } = req.query;

    if (razorpayOrderId) {
      const order = await prisma.order.findUnique({ where: { razorpayOrderId }, include: { customer: true } });
      if (order) return res.json({ success: true, payment: mapPayment(order) });
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    if (email) {
      const orders = await prisma.order.findMany({
        where: { customer: { is: { email } } },
        include: { customer: true },
        orderBy: { createdAt: 'desc' },
      });
      return res.json({ success: true, payments: orders.map(mapPayment) });
    }

    // Build filter
    const where = { active: true };
    if (status) where.status = status;
    if (search) {
      where.customer = { is: { OR: [
        { name:  { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ] } };
    }

    const _skip = parseInt(skip) || 0;
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: { customer: true },
        orderBy: { createdAt: 'desc' },
        skip: _skip,
        take: takeOrAll(limit),
      }),
      prisma.order.count({ where }),
    ]);

    return res.json({ success: true, payments: orders.map(mapPayment), total });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
