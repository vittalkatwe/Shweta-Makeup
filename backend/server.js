const express = require('express');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

// ── Meta CAPI helpers ──────────────────────────────────────
function sha256(value) {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

async function sendMetaCAPIEvent({ eventName, eventId, userData, customData, sourceUrl, clientIp, userAgent }) {
  const pixelId = '1627603605217493';
  const accessToken = 'EAASQRFhMkIoBRH5qOFxLERc4EIuDQdWUwuh8rGk4x2sNdqUIZAKlOZA3ZBcEf5Dqp27396dhNqNM1seFvftjWZAgFsCKUjlZBCu1ZBaM3w8LOnfwY4ZCYkg4ZAwbEWIqnFXUjVjkyNkyK6x5gT3Vn6vvEj7ZBYAJtYi5GsqxrqTdwxBJPypNwrre2QAOeXVMEZCrEVpgZDZD';

  const payload = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      event_source_url: sourceUrl || 'https://shwetaceleb.com',
      action_source: 'website',
      user_data: {
        ph: userData.phone ? sha256(userData.phone.replace(/\D/g, '')) : undefined,
        em: userData.email ? sha256(userData.email) : undefined,
        fn: userData.name ? sha256(userData.name.split(' ')[0]) : undefined,
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
  name:     { type: String, required: true },
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
});

const Payment = mongoose.model('Payment', paymentSchema);

// ── Profile Schema (post-payment form) ───────────────────
const profileSchema = new mongoose.Schema({
  // Link to payment
  razorpayOrderId: { type: String },
  name:            { type: String },
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

  timestamp: { type: Date, default: Date.now },
});

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
        name:   payment.name,
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

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone are required' });
    }

    // Use amount from frontend; fall back to 499 if missing/invalid
    const AMOUNT_INR = (typeof amount === 'number' && amount > 0) ? amount : 499;

    const payment = new Payment({
      name,
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
        customer_name:  name,
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
      name,
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
          name: name || undefined,
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
      userData: { phone: updatedPayment.phone, email: updatedPayment.email, name: updatedPayment.name },
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
    const { razorpayOrderId, email } = req.query;
    if (razorpayOrderId) {
      const payment = await Payment.findOne({ razorpayOrderId });
      if (payment) return res.json({ success: true, payment });
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    if (email) {
      const payments = await Payment.find({ email }).sort({ timestamp: -1 }).limit(50);
      return res.json({ success: true, payments });
    }
    const payments = await Payment.find().sort({ timestamp: -1 }).limit(50);
    return res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch payments' });
  }
});

app.get('/api/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ timestamp: -1 }).limit(100);
    return res.json({ success: true, profiles });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch profiles' });
  }
});

app.get('/api/health', (_req, res) => res.json({ status: 'OK', message: 'Server is running' }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));