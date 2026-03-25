const express = require('express');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const path = require('path');
const fs = require('fs');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Updated Payment Schema
const paymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  // One-time payment amount (INR)
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },

  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },

  status: {
    type: String,
    enum: ['pending', 'created', 'paid', 'failed'],
    default: 'pending',
  },

  timestamp: { type: Date, default: Date.now },
  errorCode: { type: String },
  errorDescription: { type: String },
  emailSent: { type: Boolean, default: false },
});

const Payment = mongoose.model('Payment', paymentSchema);

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const getStyledEmailHTML = ({
  name,
  email,
  phone,
  amount,
}) => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f6f6f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="600" style="background:#ffffff;border-radius:6px;padding:30px;">
          <tr>
            <td align="center">
              <h1 style="font-size:28px;margin:0;">🎉 Welcome to PaisaAlert!</h1>
              <p style="color:#555;font-size:16px;">Your purchase is confirmed.</p>
              <div style="width:60px;height:3px;background:#ccc;margin:15px auto;"></div>
            </td>
          </tr>

          <tr>
            <td>
              <div style="background:#F0F4FF;border-left:4px solid #4C5FD5;padding:20px;margin:20px 0;border-radius:4px;">
                <h3 style="margin:0 0 10px 0;color:#4C5FD5;">✅ Payment Received: ₹${amount}</h3>
                <p style="margin:0;color:#666;font-size:14px;">Instant access to your bookkeeping sheet</p>
              </div>

              <div style="background:#FFF4E6;border-left:4px solid #FF9800;padding:20px;margin:20px 0;border-radius:4px;">
                <h3 style="margin:0 0 10px 0;color:#FF9800;">🧾 One-time Purchase</h3>
                <p style="margin:0;color:#666;font-size:14px;">No auto-pay / no subscription charges.</p>
              </div>

              <hr style="margin:25px 0;border:none;border-top:1px solid #ddd;" />

              <h3>📋 Your Details</h3>
              <p style="margin:5px 0;">${name}</p>
              <p style="margin:5px 0;">${phone}</p>
              <p style="margin:5px 0;">${email}</p>

              <p style="text-align:center;color:#777;font-size:13px;margin-top:30px;">
                Your Excel file is attached to this email.
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

const sendEmailWithCSV = async (payment) => {
  try {
    const csvFilePath = path.join(
      __dirname,
      'files',
      'paisaalert-business-bookkeeping-tracker-sheet.xlsx'
    );

    if (!fs.existsSync(csvFilePath)) {
      console.error('File not found at path:', csvFilePath);
      return false;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: payment.email,
      subject: 'Welcome to PaisaAlert - Your Purchase Confirmed',
      html: getStyledEmailHTML({
        name: payment.name,
        phone: payment.phone,
        email: payment.email,
        amount: payment.amount,
      }),
      attachments: [
        {
          filename: 'paisaalert-business-bookkeeping-tracker-sheet.xlsx',
          path: csvFilePath,
          contentType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully to:', payment.email);

    // Mark email as sent
    await Payment.findByIdAndUpdate(payment._id, { emailSent: true });

    return true;
  } catch (error) {
    console.error('❌ Email error:', error);
    return false;
  }
};

// ============================================
// MAIN API: Create One-time Razorpay Order
// ============================================
app.post('/api/create-order', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone are required',
      });
    }

    // One-time charge amount
    const AMOUNT_INR = 499;

    const payment = new Payment({
      name,
      email,
      phone,
      amount: AMOUNT_INR,
      currency: 'INR',
      status: 'pending',
    });

    await payment.save();
    console.log('💾 Payment record created (pending):', payment._id);

    const order = await razorpay.orders.create({
      amount: AMOUNT_INR * 100, // INR to paise
      currency: 'INR',
      receipt: payment._id.toString(),
      notes: {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        payment_db_id: payment._id.toString(),
      },
    });

    payment.razorpayOrderId = order.id;
    payment.status = 'created';
    await payment.save();
    console.log('✅ Razorpay order created:', order.id);

    return res.json({
      success: true,
      orderId: order.id,
    });
  } catch (error) {
    console.error('❌ Error creating order:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message,
    });
  }
});

// ============================================
// WEBHOOK: Handle all one-time payment events
// ============================================
app.post('/api/webhook', async (req, res) => {
  try {
    const webhookBody = JSON.stringify(req.body);
    const webhookSignature = req.headers['x-razorpay-signature'];

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(webhookBody)
      .digest('hex');

    if (webhookSignature !== expectedSignature) {
      console.error('❌ Invalid webhook signature');
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    const event = req.body.event;
    const payload = req.body.payload;

    console.log('======================');
    console.log('📥 Webhook event:', event);
    console.log('======================');

    switch (event) {
      case 'payment.captured': {
        const paymentEntity = payload.payment?.entity || payload.payment;
        if (!paymentEntity) break;

        const orderId = paymentEntity.order_id;
        const razorpayPaymentId = paymentEntity.id;
        const capturedAmount = typeof paymentEntity.amount === 'number'
          ? paymentEntity.amount / 100
          : null;

        const capturedPayment = await Payment.findOneAndUpdate(
          { razorpayOrderId: orderId },
          {
            razorpayPaymentId,
            status: 'paid',
            ...(capturedAmount !== null ? { amount: capturedAmount } : null),
          },
          { new: true }
        );

        if (capturedPayment && !capturedPayment.emailSent) {
          console.log('📧 Sending success email to:', capturedPayment.email);
          await sendEmailWithCSV(capturedPayment);
        }

        break;
      }

      case 'payment.failed': {
        const paymentEntity = payload.payment?.entity || payload.payment;
        if (!paymentEntity) break;

        const orderId = paymentEntity.order_id;
        await Payment.findOneAndUpdate(
          { razorpayOrderId: orderId },
          {
            status: 'failed',
            errorCode: paymentEntity.error_code,
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

// Cancel Subscription
app.post('/api/cancel-subscription', async (req, res) => {
  return res.status(410).json({ success: false, message: 'Subscriptions not supported (one-time checkout only)' });
});

// Get Payment Details
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
    console.error('Error fetching payments:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch payments' });
  }
});

// Get Subscription Status
app.get('/api/subscription-status/:subscriptionId', async (req, res) => {
  return res.status(410).json({ success: false, message: 'Subscriptions not supported (one-time checkout only)' });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

