const express = require('express');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

// ── Meta credentials ───────────────────────────────────────
const META_PIXEL_ID = '1627603605217493';
const META_ACCESS_TOKEN = 'EAASQRFhMkIoBRH5qOFxLERc4EIuDQdWUwuh8rGk4x2sNdqUIZAKlOZA3ZBcEf5Dqp27396dhNqNM1seFvftjWZAgFsCKUjlZBCu1ZBaM3w8LOnfwY4ZCYkg4ZAwbEWIqnFXUjVjkyNkyK6x5gT3Vn6vvEj7ZBYAJtYi5GsqxrqTdwxBJPypNwrre2QAOeXVMEZCrEVpgZDZD';
const META_MARKETING_TOKEN = 'EAAgLzVawCpMBRNbNhfCfzZA4AOYMLVoXjE5QW7E6ZCW4CKI6Tki6SYXRVLHZA722XZB0VFJS65DL5rePCy5naxuHy7OsLEMGznBBOWbVCUaOZC5ysUfLYhQPg6vDIiIVYS2aCqQOU4sLGyC6N2MqWPMQlAzWj4lZAPvSjWbQTDVCrkZB64ZCrKzjnpWnA6mYYYCpgl0u';
const META_AD_ACCOUNT_ID = '2526677564455677';

// ── Meta Ads in-memory cache ────────────────────────────────
const metaAdsCache = new Map();
const META_ADS_CACHE_TTL = 15 * 60 * 1000;
function getMetaAdsCache(key) {
  const entry = metaAdsCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > META_ADS_CACHE_TTL) { metaAdsCache.delete(key); return null; }
  return entry.data;
}
function setMetaAdsCache(key, data) {
  metaAdsCache.set(key, { ts: Date.now(), data });
}

// ── Meta CAPI helpers ──────────────────────────────────────
function sha256(value) {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

async function sendMetaCAPIEvent({ eventName, eventId, userData, customData, sourceUrl, clientIp, userAgent }) {
  const pixelId = META_PIXEL_ID;
  const accessToken = META_ACCESS_TOKEN;

  const payload = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      event_source_url: sourceUrl || 'https://shwetamakeover.online',
      action_source: 'website',
      user_data: {
        ph: userData.phone ? sha256(userData.phone.replace(/\D/g, '')) : undefined,
        em: userData.email ? sha256(userData.email) : undefined,
        fn: userData.name ? sha256(userData.name.split(' ')[0]) : null,
        client_ip_address: clientIp,
        client_user_agent: userAgent,
      },
      custom_data: customData,
    }],
  };

  const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    console.log('Meta CAPI response:', json);
  } catch (err) {
    console.error('Meta CAPI error:', err);
  }
}

const app = express();

app.use(cors());
app.use(express.json({
  verify: (req, res, buf) => { req.rawBody = buf; }
}));

const path = require('path');
const fs = require('fs');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// ── Payment Schema ────────────────────────────────────────
const paymentSchema = new mongoose.Schema({
  name:     { type: String, default: null },
  email:    { type: String, default: null },   // optional
  phone:    { type: String, required: true },
  amount:   { type: Number, required: true },
  currency: { type: String, default: 'INR' },

  razorpayOrderId:   { type: String },
  razorpayPaymentId: { type: String },

  status: {
    type: String,
    enum: ['pending', 'created', 'paid', 'failed'],
    default: 'pending',
  },

  timestamp:        { type: Date, default: Date.now },
  errorCode:        { type: String },
  errorDescription: { type: String },
  emailSent:        { type: Boolean, default: false },
  source:  { type: String, enum: ['website', 'whatsapp'], default: 'website' },
  remark:  { type: String, default: null },
  active:  { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

paymentSchema.index({ timestamp: -1 });
paymentSchema.index({ status: 1, timestamp: -1 });

const Payment = mongoose.model('Payment', paymentSchema);

// ── Profile Schema (post-payment form) ───────────────────
const profileSchema = new mongoose.Schema({
  // Link to payment
  razorpayOrderId: { type: String },
  name:            { type: String, default: null },
  email:           { type: String, default: null },
  phone:           { type: String },

  // Form fields
  whatsappPhone: { type: String },
  gender:        { type: String },
  city:          { type: String },
  state:         { type: String },
  occupation:    { type: String },
  reason:        { type: String },

  // Course purchase tracking
  hasPurchasedCourse:  { type: Boolean, default: false },
  coursePurchasePrice: { type: Number },
  courseName:          { type: String },

  source: { type: String, enum: ['website', 'whatsapp'], default: 'website' },
  isDeleted: { type: Boolean, default: false },

  timestamp: { type: Date, default: Date.now },
});

profileSchema.index({ timestamp: -1 });

const Profile = mongoose.model('Profile', profileSchema);

// ── Razorpay ──────────────────────────────────────────────
const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ── Nodemailer ────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const getStyledEmailHTML = ({ name, email, phone, amount }) => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f6f6f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="600" style="background:#ffffff;border-radius:6px;padding:30px;">
          <tr>
            <td align="center">
              <h1 style="font-size:28px;margin:0;">🎉 Welcome to Shweta Celeb Makeover!</h1>
              <p style="color:#555;font-size:16px;">Your purchase is confirmed.</p>
              <div style="width:60px;height:3px;background:#ccc;margin:15px auto;"></div>
            </td>
          </tr>
          <tr>
            <td>
              <div style="background:#FFF4E6;border-left:4px solid #c8702a;padding:20px;margin:20px 0;border-radius:4px;">
                <h3 style="margin:0 0 10px 0;color:#c8702a;">✅ Payment Received: ₹${amount}</h3>
                <p style="margin:0;color:#666;font-size:14px;">Hairstyle Masterclass — 8th, 9th & 10th April</p>
              </div>
              <div style="background:#FFF4E6;border-left:4px solid #FF9800;padding:20px;margin:20px 0;border-radius:4px;">
                <h3 style="margin:0 0 10px 0;color:#FF9800;">🧾 One-time Purchase</h3>
                <p style="margin:0;color:#666;font-size:14px;">No auto-pay / no subscription charges.</p>
              </div>
              <hr style="margin:25px 0;border:none;border-top:1px solid #ddd;" />
              <h3>📋 Your Details</h3>
              <p style="margin:5px 0;">${name}</p>
              <p style="margin:5px 0;">${phone}</p>
              ${email ? `<p style="margin:5px 0;">${email}</p>` : ''}
              <p style="text-align:center;color:#777;font-size:13px;margin-top:30px;">
                See you on April 8th at 12 PM! 🌟
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ── Send email (only if email is present) ─────────────────
const sendConfirmationEmail = async (payment) => {
  // Skip entirely if no email
  if (!payment.email) {
    console.log('ℹ️ No email provided — skipping confirmation email for:', payment.phone);
    return true;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: payment.email,
      subject: 'Welcome to Shweta Celeb Makeover Hairstyle Masterclass! 🎉',
      html: getStyledEmailHTML({
        name:   payment.name || null,
        phone:  payment.phone,
        email:  payment.email,
        amount: payment.amount,
      }),
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent to:', payment.email);

    await Payment.findByIdAndUpdate(payment._id, { emailSent: true });
    return true;
  } catch (error) {
    console.error('❌ Email error:', error);
    return false;
  }
};

// ============================================================
// API: Create One-time Razorpay Order
// ============================================================
app.post('/api/create-order', async (req, res) => {
  try {
    const { name, email, phone, amount } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone are required' });
    }

    // Use amount from frontend; fall back to 499 if missing/invalid
    const AMOUNT_INR = (typeof amount === 'number' && amount > 0) ? amount : 499;

    const payment = new Payment({
      name: name || null,
      email: email || null,   // store null if not provided
      phone,
      amount: AMOUNT_INR,
      currency: 'INR',
      status: 'pending',
    });

    await payment.save();
    console.log('💾 Payment record created:', payment._id, '| Amount:', AMOUNT_INR);

    const order = await razorpay.orders.create({
      amount:   AMOUNT_INR * 100,
      currency: 'INR',
      receipt:  payment._id.toString(),
      notes: {
        customer_name:  name || null,
        customer_email: email || '',
        customer_phone: phone,
        payment_db_id:  payment._id.toString(),
      },
    });

    payment.razorpayOrderId = order.id;
    payment.status = 'created';
    await payment.save();
    console.log('✅ Razorpay order created:', order.id);

    // Create early profile at payment initiation
    await Profile.create({
      razorpayOrderId: order.id,
      name: name || null,
      email: email || null,
      phone,
      hasPurchasedCourse: false,
    });
    console.log('💾 Profile created for:', phone);

    return res.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('❌ Error creating order:', error);
    return res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
  }
});

// ============================================================
// API: Save post-payment profile form
// ============================================================
app.post('/api/save-profile', async (req, res) => {
  try {
    const { name, email, phone, razorpayOrderId, whatsappPhone, gender, city, state, occupation, reason } = req.body;

    const query = razorpayOrderId
      ? { razorpayOrderId }
      : { phone };

    await Profile.findOneAndUpdate(
      query,
      {
        $set: {
          whatsappPhone: whatsappPhone || phone,
          gender,
          city,
          state,
          occupation,
          reason,
          name: name || null,
          email: email || null,
        },
      },
      { new: true, upsert: true }
    );
    console.log('💾 Profile updated for:', phone);

    return res.json({ success: true });
  } catch (error) {
    console.error('❌ Error saving profile:', error);
    return res.status(500).json({ success: false, message: 'Failed to save profile' });
  }
});

// ============================================================
// API: Verify payment signature & mark as paid
// Add this route to server.js alongside the other app.post routes
// ============================================================
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, event_id } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing payment details' });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.error('❌ Invalid payment signature for order:', razorpay_order_id);
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // Mark as paid
    const updatedPayment = await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        status: 'paid',
      },
      { new: true }
    );

    if (!updatedPayment) {
      console.warn('⚠️ Payment record not found for order:', razorpay_order_id);
      return res.status(404).json({ success: false, message: 'Payment record not found' });
    }

    console.log('✅ Payment verified and marked as paid:', razorpay_order_id);

    // Update profile with course purchase info
    await Profile.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        $set: {
          hasPurchasedCourse: true,
          coursePurchasePrice: updatedPayment.amount,
          courseName: '3-Day Hairstyle Masterclass',
        },
      }
    );

    // Send confirmation email if not already sent
    if (!updatedPayment.emailSent) {
      await sendConfirmationEmail(updatedPayment);
    }

    await sendMetaCAPIEvent({
      eventName: 'Purchase',
      eventId: event_id,
      userData: { phone: updatedPayment.phone, email: updatedPayment.email, name: updatedPayment.name || null },
      customData: { value: updatedPayment.amount, currency: 'INR', content_name: '3-Day Hairstyle Masterclass' },
      sourceUrl: req.headers.referer,
      clientIp: req.ip || req.headers['x-forwarded-for'],
      userAgent: req.headers['user-agent'],
    });

    return res.json({ success: true });
  } catch (error) {
    console.error('❌ Verify payment error:', error);
    return res.status(500).json({ success: false, message: 'Verification failed', error: error.message });
  }
});

// ============================================================
// WEBHOOK: Handle payment events
// ============================================================
app.post('/api/webhook', async (req, res) => {
  try {
    const webhookBody      = req.rawBody ? req.rawBody.toString() : JSON.stringify(req.body);
    const webhookSignature = req.headers['x-razorpay-signature'];

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(webhookBody)
      .digest('hex');

    if (webhookSignature !== expectedSignature) {
      console.error('❌ Invalid webhook signature');
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    const event   = req.body.event;
    const payload = req.body.payload;

    console.log('======================');
    console.log('📥 Webhook event:', event);
    console.log('======================');

    switch (event) {
      case 'payment.captured': {
        const paymentEntity = payload.payment?.entity || payload.payment;
        if (!paymentEntity) break;

        const orderId          = paymentEntity.order_id;
        const razorpayPaymentId = paymentEntity.id;
        const capturedAmount   = typeof paymentEntity.amount === 'number'
          ? paymentEntity.amount / 100
          : null;

        const existingPayment = await Payment.findOne({ razorpayOrderId: orderId });
        if (!existingPayment || existingPayment.status === 'paid') break; // ← add this


        const capturedPayment = await Payment.findOneAndUpdate(
          { razorpayOrderId: orderId },
          {
            razorpayPaymentId,
            status: 'paid',
            ...(capturedAmount !== null ? { amount: capturedAmount } : {}),
          },
          { new: true }
        );

        if (capturedPayment) {
          await Profile.findOneAndUpdate(
            { razorpayOrderId: orderId },
            {
              $set: {
                hasPurchasedCourse: true,
                coursePurchasePrice: capturedPayment.amount,
                courseName: '3-Day Hairstyle Masterclass',
              },
            }
          );

          if (!capturedPayment.emailSent) {
            await sendConfirmationEmail(capturedPayment);
          }
          
          await sendMetaCAPIEvent({
            eventName: 'Purchase',
            eventId: `purchase_${orderId}`,
            userData: { phone: capturedPayment.phone, email: capturedPayment.email, name: capturedPayment.name || null },
            customData: { value: capturedPayment.amount, currency: 'INR', content_name: '3-Day Hairstyle Masterclass' },
            sourceUrl: 'https://shwetamakeover.online',
            clientIp: req.ip || req.headers['x-forwarded-for'],
            userAgent: req.headers['user-agent'],
          });
        }

        break;
      }

      case 'order.paid': {
        const orderEntity = payload.order?.entity || payload.order;
        if (!orderEntity) break;
    
        const orderId = orderEntity.id;
    
        // Only act if not already marked paid (idempotency guard)
        const existingPayment = await Payment.findOne({ razorpayOrderId: orderId });
        if (!existingPayment || existingPayment.status === 'paid') break;
    
        const paidPayment = await Payment.findOneAndUpdate(
          { razorpayOrderId: orderId, status: { $ne: 'paid' } },
          { status: 'paid' },
          { new: true }
        );
    
        if (paidPayment) {
          await Profile.findOneAndUpdate(
            { razorpayOrderId: orderId },
            {
              $set: {
                hasPurchasedCourse: true,
                coursePurchasePrice: paidPayment.amount,
                courseName: '3-Day Hairstyle Masterclass',
              },
            }
          );
    
          if (!paidPayment.emailSent) {
            await sendConfirmationEmail(paidPayment);
          }

          await sendMetaCAPIEvent({
            eventName: 'Purchase',
            eventId: `purchase_${orderId}`,
            userData: { phone: paidPayment.phone, email: paidPayment.email, name: paidPayment.name || null },
            customData: { value: paidPayment.amount, currency: 'INR', content_name: '3-Day Hairstyle Masterclass' },
            sourceUrl: 'https://shwetamakeover.online',
            clientIp: req.ip || req.headers['x-forwarded-for'],
            userAgent: req.headers['user-agent'],
          });
    
          console.log('✅ order.paid handled for:', orderId);
        }
    
        break;
      }
    

      case 'payment.failed': {
        const paymentEntity = payload.payment?.entity || payload.payment;
        if (!paymentEntity) break;

        await Payment.findOneAndUpdate(
          { razorpayOrderId: paymentEntity.order_id },
          {
            status:           'failed',
            errorCode:        paymentEntity.error_code,
            errorDescription: paymentEntity.error_description || 'Payment failed',
          }
        );
        break;
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    res.status(500).json({ success: false });
  }
});

// ── Misc routes ───────────────────────────────────────────
app.post('/api/cancel-subscription', async (_req, res) =>
  res.status(410).json({ success: false, message: 'Subscriptions not supported' })
);

app.get('/api/payments', async (req, res) => {
  try {
    const { razorpayOrderId, email, status, search, limit, skip } = req.query;

    if (razorpayOrderId) {
      const payment = await Payment.findOne({ razorpayOrderId });
      if (payment) return res.json({ success: true, payment });
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    if (email) {
      const payments = await Payment.find({ email }).sort({ timestamp: -1 });
      return res.json({ success: true, payments });
    }

    // Build filter
    const filter = { active: { $ne: false } };
    if (status) filter.status = status;
    if (search) {
      const re = new RegExp(search, 'i');
      filter.$or = [{ name: re }, { phone: re }, { email: re }];
    }

    const _limit = parseInt(limit) || 0;
    const _skip  = parseInt(skip)  || 0;
    const [payments, total] = await Promise.all([
      Payment.find(filter).sort({ timestamp: -1 }).skip(_skip).limit(_limit),
      Payment.countDocuments(filter),
    ]);

    return res.json({ success: true, payments, total });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch payments' });
  }
});

app.get('/api/profiles', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const skip  = parseInt(req.query.skip)  || 0;
    const profiles = await Profile.find().sort({ timestamp: -1 }).skip(skip).limit(limit);
    const total    = await Profile.countDocuments();
    return res.json({ success: true, profiles, total });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch profiles' });
  }
});


// ============================================================
// ADMIN: Create manual order (WhatsApp / walk-in)
// POST /api/admin/orders
// ============================================================
app.post('/api/admin/orders', async (req, res) => {
  try {
    const { name, phone, amount, source, whatsappPhone, remark, timestamp, email, gender, city, state, occupation } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({ success: false, message: 'Phone and amount are required' });
    }

    const payment = new Payment({
      name: name || null,
      email: email || null,
      phone,
      amount,
      currency: 'INR',
      status: 'paid',
      source: source || 'whatsapp',
      remark: remark || null,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    });

    await payment.save();

    // Also create a profile record
    await Profile.create({
      razorpayOrderId: null,
      name: name || null,
      email: email || null,
      phone,
      whatsappPhone: whatsappPhone || phone,
      gender: gender || undefined,
      city: city || undefined,
      state: state || undefined,
      occupation: occupation || undefined,
      source: source || 'whatsapp',
      hasPurchasedCourse: true,
      coursePurchasePrice: amount,
      courseName: '3-Day Hairstyle Masterclass',
      timestamp: payment.timestamp,
    });

    return res.json({ success: true, payment });
  } catch (error) {
    console.error('❌ Admin create order error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================================
// ADMIN: Update remark / source on a payment
// PATCH /api/admin/payments/:id
// ============================================================
app.patch('/api/admin/payments/:id', async (req, res) => {
  try {
    const { remark, source, name, phone, amount, active } = req.body;

    const updateFields = {};
    if (remark   !== undefined) updateFields.remark = remark;
    if (source   !== undefined) updateFields.source = source;
    if (name     !== undefined) updateFields.name   = name;
    if (phone    !== undefined) updateFields.phone  = phone;
    if (amount   !== undefined) updateFields.amount = amount;
    if (active   !== undefined) updateFields.active = active;

    const updated = await Payment.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    return res.json({ success: true, payment: updated });
  } catch (error) {
    console.error('❌ Admin update error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================================
// ADMIN: Delete a payment (and its profile)
// DELETE /api/admin/payments/:id
// ============================================================
app.delete('/api/admin/payments/:id', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { $set: { isDeleted: true } },
      { new: true }
    );
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    // Soft-delete linked profile — match by orderId OR phone (for manual orders)
    if (payment.razorpayOrderId) {
      await Profile.findOneAndUpdate(
        { razorpayOrderId: payment.razorpayOrderId },
        { $set: { isDeleted: true } }
      );
    } else if (payment.phone) {
      await Profile.findOneAndUpdate(
        { phone: payment.phone, razorpayOrderId: null },
        { $set: { isDeleted: true } }
      );
    }

    return res.json({ success: true });
  } catch (error) {
    console.error('❌ Admin delete error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================================
// ADMIN: Soft-delete a profile
// DELETE /api/admin/profiles/:id
// ============================================================
app.delete('/api/admin/profiles/:id', async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { $set: { isDeleted: true } },
      { new: true }
    );
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    return res.json({ success: true });
  } catch (error) {
    console.error('❌ Admin delete profile error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});


// ============================================================
// ADMIN API Endpoints
// ============================================================

// Paid orders list (Payment + Profile join)
app.get('/api/admin/orders', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
    const skip = (page - 1) * limit;

    const matchStage = { status: 'paid', active: { $ne: false }, isDeleted: { $ne: true } };

    if (req.query.source) matchStage.source = req.query.source;

    if (req.query.dateFrom || req.query.dateTo) {
      matchStage.timestamp = {};
      if (req.query.dateFrom) matchStage.timestamp.$gte = new Date(req.query.dateFrom);
      if (req.query.dateTo) {
        const to = new Date(req.query.dateTo);
        to.setHours(23, 59, 59, 999);
        matchStage.timestamp.$lte = to;
      }
    }

    if (req.query.search) {
      const s = req.query.search.trim();
      matchStage.$or = [
        { email: { $regex: s, $options: 'i' } },
        { phone: { $regex: s, $options: 'i' } },
        { name: { $regex: s, $options: 'i' } },
      ];
    }

    if (req.query.amount) matchStage.amount = parseInt(req.query.amount, 10);

    const postMatchStage = {};
    if (req.query.gender) postMatchStage['gender'] = req.query.gender;
    if (req.query.state) postMatchStage['state'] = { $regex: `^${req.query.state}$`, $options: 'i' };

    const pipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: 'profiles',
          localField: 'razorpayOrderId',
          foreignField: 'razorpayOrderId',
          as: 'profile',
        },
      },
      { $unwind: { path: '$profile', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ['$name', '$profile.name'] },
          phone: 1,
          email: 1,
          amount: 1,
          razorpayOrderId: 1,
          razorpayPaymentId: 1,
          timestamp: 1,
          source: 1,
          emailSent: 1,
          whatsappPhone: '$profile.whatsappPhone',
          gender: '$profile.gender',
          city: '$profile.city',
          state: '$profile.state',
          occupation: '$profile.occupation',
          reason: '$profile.reason',
        },
      },
      ...(Object.keys(postMatchStage).length > 0 ? [{ $match: postMatchStage }] : []),
      { $sort: { timestamp: -1 } },
    ];

    const [allOrders, countResult, revenueResult] = await Promise.all([
      Payment.aggregate([...pipeline, { $skip: skip }, { $limit: limit }]),
      Payment.aggregate([...pipeline, { $count: 'total' }]),
      Payment.aggregate([...pipeline, { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }]),
    ]);

    const total = countResult[0]?.total || 0;
    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    res.json({
      success: true,
      orders: allOrders,
      total,
      totalRevenue,
      avgOrderValue: total > 0 ? totalRevenue / total : 0,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Admin orders error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});

// Dashboard KPIs
app.get('/api/admin/dashboard', async (_req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [todayPayments, allTimePayments, todayProfiles, allTimeProfiles] = await Promise.all([
      Payment.aggregate([
        { $match: { status: 'paid', isDeleted: { $ne: true }, timestamp: { $gte: todayStart } } },
        { $group: { _id: null, revenue: { $sum: '$amount' }, count: { $sum: 1 } } },
      ]),
      Payment.aggregate([
        { $match: { status: 'paid', isDeleted: { $ne: true } } },
        { $group: { _id: null, revenue: { $sum: '$amount' }, count: { $sum: 1 } } },
      ]),
      Profile.countDocuments({ isDeleted: { $ne: true }, timestamp: { $gte: todayStart } }),
      Profile.countDocuments({ isDeleted: { $ne: true } }),
    ]);

    res.json({
      success: true,
      today: {
        customers: todayProfiles,
        revenue: todayPayments[0]?.revenue || 0,
        orders: todayPayments[0]?.count || 0,
      },
      allTime: {
        customers: allTimeProfiles,
        revenue: allTimePayments[0]?.revenue || 0,
        orders: allTimePayments[0]?.count || 0,
      },
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats' });
  }
});

// Paginated payments list
app.get('/api/admin/payments', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
    const skip = (page - 1) * limit;

    const filter = { isDeleted: { $ne: true } };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.source) filter.source = req.query.source;
    if (req.query.dateFrom || req.query.dateTo) {
      filter.timestamp = {};
      if (req.query.dateFrom) filter.timestamp.$gte = new Date(req.query.dateFrom);
      if (req.query.dateTo) {
        const to = new Date(req.query.dateTo);
        to.setHours(23, 59, 59, 999);
        filter.timestamp.$lte = to;
      }
    }
    const nameSearch = req.query.search ? req.query.search.trim() : null;
    if (nameSearch) {
      const s = nameSearch;
      filter.$or = [
        { email: { $regex: s, $options: 'i' } },
        { phone: { $regex: s, $options: 'i' } },
        { razorpayOrderId: { $regex: s, $options: 'i' } },
        { razorpayPaymentId: { $regex: s, $options: 'i' } },
      ];
    }

    const pipeline = [
      { $match: filter },
      {
        $lookup: {
          from: 'profiles',
          localField: 'razorpayOrderId',
          foreignField: 'razorpayOrderId',
          as: 'profile',
        },
      },
      { $unwind: { path: '$profile', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ['$name', '$profile.name'] },
          phone: 1,
          email: 1,
          amount: 1,
          status: 1,
          razorpayOrderId: 1,
          razorpayPaymentId: 1,
          emailSent: 1,
          errorDescription: 1,
          errorCode: 1,
          timestamp: 1,
          source: 1,
          remark: 1,
          active: 1,
        },
      },
      ...(nameSearch ? [{ $match: { $or: [
        { name: { $regex: nameSearch, $options: 'i' } },
        { email: { $regex: nameSearch, $options: 'i' } },
        { phone: { $regex: nameSearch, $options: 'i' } },
        { razorpayOrderId: { $regex: nameSearch, $options: 'i' } },
        { razorpayPaymentId: { $regex: nameSearch, $options: 'i' } },
      ]}}] : []),
      { $sort: { timestamp: -1 } },
    ];

    const [payments, countResult] = await Promise.all([
      Payment.aggregate([...pipeline, { $skip: skip }, { $limit: limit }]),
      Payment.aggregate([...pipeline, { $count: 'total' }]),
    ]);
    const total = countResult[0]?.total || 0;

    res.json({ success: true, payments, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('Admin payments error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch payments' });
  }
});

// Paginated profiles list
app.get('/api/admin/profiles', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
    const skip = (page - 1) * limit;

    const filter = { isDeleted: { $ne: true } };
    if (req.query.gender) filter.gender = req.query.gender;
    if (req.query.source) filter.source = req.query.source;
    if (req.query.city) filter.city = { $regex: `^${req.query.city}$`, $options: 'i' };
    if (req.query.state) filter.state = { $regex: `^${req.query.state}$`, $options: 'i' };
    if (req.query.occupation) filter.occupation = req.query.occupation;
    if (req.query.hasPurchasedCourse !== undefined) {
      filter.hasPurchasedCourse = req.query.hasPurchasedCourse === 'true';
    }
    if (req.query.dateFrom || req.query.dateTo) {
      filter.timestamp = {};
      if (req.query.dateFrom) filter.timestamp.$gte = new Date(req.query.dateFrom);
      if (req.query.dateTo) {
        const to = new Date(req.query.dateTo);
        to.setHours(23, 59, 59, 999);
        filter.timestamp.$lte = to;
      }
    }
    if (req.query.search) {
      const s = req.query.search.trim();
      filter.$or = [
        { email: { $regex: s, $options: 'i' } },
        { phone: { $regex: s, $options: 'i' } },
        { name: { $regex: s, $options: 'i' } },
      ];
    }

    const [profiles, total] = await Promise.all([
      Profile.find(filter).sort({ timestamp: -1 }).skip(skip).limit(limit).lean(),
      Profile.countDocuments(filter),
    ]);

    res.json({ success: true, profiles, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('Admin profiles error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch profiles' });
  }
});

// Payment trends (daily revenue + order count + failed count)
app.get('/api/admin/payments/trends', async (req, res) => {
  try {
    const days = Math.min(365, Math.max(1, parseInt(req.query.days) || 30));
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const trends = await Payment.aggregate([
      { $match: { isDeleted: { $ne: true }, timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
            status: '$status',
          },
          count: { $sum: 1 },
          revenue: { $sum: { $cond: [{ $eq: ['$status', 'paid'] }, '$amount', 0] } },
        },
      },
      { $sort: { '_id.date': 1 } },
    ]);

    // Reshape into { date, revenue, orders, failed }
    const byDate = {};
    for (const t of trends) {
      const d = t._id.date;
      if (!byDate[d]) byDate[d] = { date: d, revenue: 0, orders: 0, failed: 0 };
      if (t._id.status === 'paid') {
        byDate[d].revenue = t.revenue;
        byDate[d].orders = t.count;
      } else if (t._id.status === 'failed') {
        byDate[d].failed = t.count;
      }
    }

    // Fill missing days
    const result = [];
    const current = new Date(startDate);
    const now = new Date();
    while (current <= now) {
      const key = current.toISOString().slice(0, 10);
      result.push(byDate[key] || { date: key, revenue: 0, orders: 0, failed: 0 });
      current.setDate(current.getDate() + 1);
    }

    res.json({ success: true, trends: result });
  } catch (error) {
    console.error('Admin payment trends error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch payment trends' });
  }
});

// Profile trends (daily registration count)
app.get('/api/admin/profiles/trends', async (req, res) => {
  try {
    const days = Math.min(365, Math.max(1, parseInt(req.query.days) || 30));
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const trends = await Profile.aggregate([
      { $match: { isDeleted: { $ne: true }, timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const byDate = {};
    for (const t of trends) byDate[t._id] = t.count;

    const result = [];
    const current = new Date(startDate);
    const now = new Date();
    while (current <= now) {
      const key = current.toISOString().slice(0, 10);
      result.push({ date: key, count: byDate[key] || 0 });
      current.setDate(current.getDate() + 1);
    }

    res.json({ success: true, trends: result });
  } catch (error) {
    console.error('Admin profile trends error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch profile trends' });
  }
});

// Profile facets (distinct values for filter dropdowns)
app.get('/api/admin/profiles/facets', async (_req, res) => {
  try {
    const notDeleted = { isDeleted: { $ne: true } };
    const [genders, cities, states, occupations] = await Promise.all([
      Profile.distinct('gender', notDeleted).then(v => v.filter(Boolean).sort()),
      Profile.distinct('city', notDeleted).then(v => v.filter(Boolean).sort()),
      Profile.distinct('state', notDeleted).then(v => v.filter(Boolean).sort()),
      Profile.distinct('occupation', notDeleted).then(v => v.filter(Boolean).sort()),
    ]);

    res.json({ success: true, genders, cities, states, occupations });
  } catch (error) {
    console.error('Admin facets error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch facets' });
  }
});

// ── Meta Ads: campaign summary ─────────────────────────────
app.get('/api/admin/meta-ads/summary', async (req, res) => {
  try {
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;
    let sinceStr, untilStr;
    if (dateFrom && dateTo) {
      sinceStr = dateFrom;
      untilStr = dateTo;
    } else {
      const days = Math.min(90, Math.max(1, parseInt(req.query.days) || 30));
      const since = new Date();
      since.setDate(since.getDate() - days);
      sinceStr = since.toISOString().slice(0, 10);
      untilStr = new Date().toISOString().slice(0, 10);
    }
    const cacheKey = `summary_${sinceStr}_${untilStr}`;
    const cached = getMetaAdsCache(cacheKey);
    if (cached) return res.json(cached);

    const params = new URLSearchParams({
      fields: 'campaign_name,campaign_id,spend,impressions,clicks,reach,cpm,cpc,ctr,frequency,inline_link_clicks,actions',
      level: 'campaign',
      time_range: JSON.stringify({ since: sinceStr, until: untilStr }),
      access_token: META_MARKETING_TOKEN,
    });

    const url = `https://graph.facebook.com/v19.0/act_${META_AD_ACCOUNT_ID}/insights?${params}`;
    const metaRes = await fetch(url);
    const metaJson = await metaRes.json();

    if (metaJson.error) {
      console.error('Meta Ads API error:', metaJson.error);
      return res.status(502).json({ success: false, message: metaJson.error.message });
    }

    const campaigns = (metaJson.data || []).map(c => {
      const purchaseAction = (c.actions || []).find(a => a.action_type === 'purchase');
      const spend = parseFloat(c.spend || 0);
      const purchases = purchaseAction ? parseInt(purchaseAction.value || 0) : 0;
      return {
        campaignId: c.campaign_id,
        campaignName: c.campaign_name,
        spend,
        impressions: parseInt(c.impressions || 0),
        clicks: parseInt(c.clicks || 0),
        reach: parseInt(c.reach || 0),
        cpm: parseFloat(c.cpm || 0),
        cpc: parseFloat(c.cpc || 0),
        ctr: parseFloat(c.ctr || 0),
        frequency: parseFloat(c.frequency || 0),
        linkClicks: parseInt(c.inline_link_clicks || 0),
        purchases,
        costPerPurchase: purchases > 0 ? spend / purchases : 0,
      };
    });

    const totalSpend = campaigns.reduce((s, c) => s + c.spend, 0);
    const result = { success: true, totalSpend, campaigns };
    setMetaAdsCache(cacheKey, result);
    res.json(result);
  } catch (error) {
    console.error('Meta Ads summary error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch Meta Ads data' });
  }
});

// ── Meta Ads: daily spend ──────────────────────────────────
app.get('/api/admin/meta-ads/daily', async (req, res) => {
  try {
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;
    let sinceStr, untilStr;
    if (dateFrom && dateTo) {
      sinceStr = dateFrom;
      untilStr = dateTo;
    } else {
      const days = Math.min(90, Math.max(1, parseInt(req.query.days) || 30));
      const since = new Date();
      since.setDate(since.getDate() - days);
      sinceStr = since.toISOString().slice(0, 10);
      untilStr = new Date().toISOString().slice(0, 10);
    }
    const cacheKey = `daily_${sinceStr}_${untilStr}`;
    const cached = getMetaAdsCache(cacheKey);
    if (cached) return res.json(cached);

    const params = new URLSearchParams({
      fields: 'spend,date_start',
      time_increment: '1',
      time_range: JSON.stringify({ since: sinceStr, until: untilStr }),
      access_token: META_MARKETING_TOKEN,
    });

    const url = `https://graph.facebook.com/v19.0/act_${META_AD_ACCOUNT_ID}/insights?${params}`;
    const metaRes = await fetch(url);
    const metaJson = await metaRes.json();

    if (metaJson.error) {
      console.error('Meta Ads API error:', metaJson.error);
      return res.status(502).json({ success: false, message: metaJson.error.message });
    }

    const daily = (metaJson.data || []).map(d => ({
      date: d.date_start,
      spend: parseFloat(d.spend || 0),
    }));

    const result = { success: true, daily };
    setMetaAdsCache(cacheKey, result);
    res.json(result);
  } catch (error) {
    console.error('Meta Ads daily error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch Meta Ads daily data' });
  }
});

// ── Meta Ads: adsets for a campaign ───────────────────────
app.get('/api/admin/meta-ads/campaign/:campaignId/adsets', async (req, res) => {
  try {
    const { campaignId } = req.params;
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;
    let sinceStr, untilStr;
    if (dateFrom && dateTo) {
      sinceStr = dateFrom;
      untilStr = dateTo;
    } else {
      const days = Math.min(90, Math.max(1, parseInt(req.query.days) || 30));
      const since = new Date();
      since.setDate(since.getDate() - days);
      sinceStr = since.toISOString().slice(0, 10);
      untilStr = new Date().toISOString().slice(0, 10);
    }
    const cacheKey = `adsets_${campaignId}_${sinceStr}_${untilStr}`;
    const cached = getMetaAdsCache(cacheKey);
    if (cached) return res.json(cached);

    const params = new URLSearchParams({
      fields: 'adset_id,adset_name,campaign_id,spend,impressions,clicks,reach,cpm,cpc,ctr,frequency,inline_link_clicks,actions',
      level: 'adset',
      filtering: JSON.stringify([{ field: 'campaign.id', operator: 'EQUAL', value: campaignId }]),
      time_range: JSON.stringify({ since: sinceStr, until: untilStr }),
      access_token: META_MARKETING_TOKEN,
    });

    const url = `https://graph.facebook.com/v19.0/act_${META_AD_ACCOUNT_ID}/insights?${params}`;
    const metaRes = await fetch(url);
    const metaJson = await metaRes.json();

    if (metaJson.error) {
      console.error('Meta Ads API error:', metaJson.error);
      return res.status(502).json({ success: false, message: metaJson.error.message });
    }

    const adsets = (metaJson.data || []).map(a => {
      const purchaseAction = (a.actions || []).find(x => x.action_type === 'purchase');
      const spend = parseFloat(a.spend || 0);
      const purchases = purchaseAction ? parseInt(purchaseAction.value || 0) : 0;
      return {
        adsetId: a.adset_id,
        adsetName: a.adset_name,
        campaignId: a.campaign_id,
        spend,
        impressions: parseInt(a.impressions || 0),
        clicks: parseInt(a.clicks || 0),
        reach: parseInt(a.reach || 0),
        cpm: parseFloat(a.cpm || 0),
        cpc: parseFloat(a.cpc || 0),
        ctr: parseFloat(a.ctr || 0),
        frequency: parseFloat(a.frequency || 0),
        linkClicks: parseInt(a.inline_link_clicks || 0),
        purchases,
        costPerPurchase: purchases > 0 ? spend / purchases : 0,
      };
    });

    const totalSpend = adsets.reduce((s, a) => s + a.spend, 0);
    const result = { success: true, totalSpend, adsets };
    setMetaAdsCache(cacheKey, result);
    res.json(result);
  } catch (error) {
    console.error('Meta Ads adsets error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch adsets data' });
  }
});

// ── Meta Ads: ads for an adset (with creatives) ────────────
app.get('/api/admin/meta-ads/adset/:adsetId/ads', async (req, res) => {
  try {
    const { adsetId } = req.params;
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;
    let sinceStr, untilStr;
    if (dateFrom && dateTo) {
      sinceStr = dateFrom;
      untilStr = dateTo;
    } else {
      const days = Math.min(90, Math.max(1, parseInt(req.query.days) || 30));
      const since = new Date();
      since.setDate(since.getDate() - days);
      sinceStr = since.toISOString().slice(0, 10);
      untilStr = new Date().toISOString().slice(0, 10);
    }
    const cacheKey = `ads_${adsetId}_${sinceStr}_${untilStr}`;
    const cached = getMetaAdsCache(cacheKey);
    if (cached) return res.json(cached);

    // Fetch insights
    const insightsParams = new URLSearchParams({
      fields: 'ad_id,ad_name,adset_id,spend,impressions,clicks,reach,cpm,cpc,ctr,frequency,inline_link_clicks,actions',
      level: 'ad',
      filtering: JSON.stringify([{ field: 'adset.id', operator: 'EQUAL', value: adsetId }]),
      time_range: JSON.stringify({ since: sinceStr, until: untilStr }),
      access_token: META_MARKETING_TOKEN,
    });
    const insightsUrl = `https://graph.facebook.com/v19.0/act_${META_AD_ACCOUNT_ID}/insights?${insightsParams}`;
    const insightsRes = await fetch(insightsUrl);
    const insightsJson = await insightsRes.json();

    if (insightsJson.error) {
      console.error('Meta Ads API error:', insightsJson.error);
      return res.status(502).json({ success: false, message: insightsJson.error.message });
    }

    // Fetch creative info
    const creativeParams = new URLSearchParams({
      fields: 'id,name,creative{thumbnail_url,title,body}',
      filtering: JSON.stringify([{ field: 'adset.id', operator: 'EQUAL', value: adsetId }]),
      access_token: META_MARKETING_TOKEN,
    });
    const creativeUrl = `https://graph.facebook.com/v19.0/act_${META_AD_ACCOUNT_ID}/ads?${creativeParams}`;
    const creativeRes = await fetch(creativeUrl);
    const creativeJson = await creativeRes.json();

    // Build creative map by ad id
    const creativeMap = {};
    for (const ad of (creativeJson.data || [])) {
      creativeMap[ad.id] = ad.creative || {};
    }

    const ads = (insightsJson.data || []).map(a => {
      const purchaseAction = (a.actions || []).find(x => x.action_type === 'purchase');
      const spend = parseFloat(a.spend || 0);
      const purchases = purchaseAction ? parseInt(purchaseAction.value || 0) : 0;
      const creative = creativeMap[a.ad_id] || {};
      return {
        adId: a.ad_id,
        adName: a.ad_name,
        adsetId: a.adset_id,
        spend,
        impressions: parseInt(a.impressions || 0),
        clicks: parseInt(a.clicks || 0),
        reach: parseInt(a.reach || 0),
        cpm: parseFloat(a.cpm || 0),
        cpc: parseFloat(a.cpc || 0),
        ctr: parseFloat(a.ctr || 0),
        frequency: parseFloat(a.frequency || 0),
        linkClicks: parseInt(a.inline_link_clicks || 0),
        purchases,
        costPerPurchase: purchases > 0 ? spend / purchases : 0,
        thumbnailUrl: creative.thumbnail_url || null,
        title: creative.title || null,
        body: creative.body || null,
      };
    });

    const totalSpend = ads.reduce((s, a) => s + a.spend, 0);
    const result = { success: true, totalSpend, ads };
    setMetaAdsCache(cacheKey, result);
    res.json(result);
  } catch (error) {
    console.error('Meta Ads ads error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch ads data' });
  }
});

// ============================================================
// ADMIN: Sync source field from Payments → Profiles
// POST /api/admin/sync-source
// ============================================================
app.post('/api/admin/sync-source', async (req, res) => {
  try {
    const paidPayments = await Payment.find(
      { status: 'paid' },
      { razorpayOrderId: 1, source: 1 }
    ).lean();

    if (!paidPayments.length) {
      return res.json({ updated: 0, skipped: 0, total: 0 });
    }

    const ops = paidPayments
      .filter(p => p.razorpayOrderId)
      .map(p => ({
        updateOne: {
          filter: { razorpayOrderId: p.razorpayOrderId },
          update: { $set: { source: p.source || 'website' } },
        },
      }));

    const result = await Profile.bulkWrite(ops, { ordered: false });
    const updated = result.modifiedCount + result.upsertedCount;
    const skipped = ops.length - updated;

    res.json({ updated, skipped, total: paidPayments.length });
  } catch (err) {
    console.error('sync-source error', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/health', (_req, res) => res.json({ status: 'OK', message: 'Server is running' }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));