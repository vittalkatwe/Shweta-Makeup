const nodemailer = require('nodemailer');

const env = require('../config/env');
const logger = require('../config/logger');
const prisma = require('../db');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.emailUser,
    pass: env.emailPass,
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
// Accepts a flat object { id, name, email, phone, amount } (see flatOrder()).
const sendConfirmationEmail = async (p) => {
  // Skip entirely if no email
  if (!p.email) {
    logger.info({ phone: p.phone }, 'No email provided — skipping confirmation email');
    return true;
  }

  try {
    const mailOptions = {
      from: env.emailUser,
      to: p.email,
      subject: 'Welcome to Shweta Celeb Makeover Hairstyle Masterclass! 🎉',
      html: getStyledEmailHTML({
        name:   p.name || null,
        phone:  p.phone,
        email:  p.email,
        amount: p.amount,
      }),
    };

    await transporter.sendMail(mailOptions);
    logger.info({ email: p.email }, 'Confirmation email sent');

    await prisma.order.update({ where: { id: p.id }, data: { emailSent: true } });
    return true;
  } catch (error) {
    logger.error({ err: error }, 'Email error');
    return false;
  }
};

module.exports = { sendConfirmationEmail };
