// server.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

// Rate limit
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { error: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.' }
});
app.use('/api/', limiter);

// Simple email validation
function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Configure transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, website, recaptchaToken } = req.body || {};

    // honeypot check
    if (website) return res.status(400).json({ error: 'Bad request' });

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Vui lòng điền tên, email và nội dung.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Email không hợp lệ.' });
    }
    if (message.length > 5000) {
      return res.status(400).json({ error: 'Nội dung quá dài.' });
    }

    // Optional: verify reCAPTCHA server-side if you configure RECAPTCHA_SECRET
    if (recaptchaToken && process.env.RECAPTCHA_SECRET) {
      try {
        const fetch = global.fetch || require('node-fetch');
        const params = new URLSearchParams();
        params.append('secret', process.env.RECAPTCHA_SECRET);
        params.append('response', recaptchaToken);
        params.append('remoteip', req.ip);
        const r = await fetch('https://www.google.com/recaptcha/api/siteverify', { method: 'POST', body: params });
        const j = await r.json();
        if (!j.success || (j.score !== undefined && j.score < 0.4)) {
          return res.status(400).json({ error: 'Không vượt qua kiểm tra chống spam.' });
        }
      } catch (err) {
        console.warn('reCAPTCHA verify error', err);
      }
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.TO_EMAIL, // set your receiving email in .env
      subject: `Liên hệ từ website: ${name}`,
      text: `Tên: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Tên:</strong> ${escapeHtml(name)}</p>
             <p><strong>Email:</strong> ${escapeHtml(email)}</p>
             <p><strong>Nội dung:</strong></p>
             <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: 'Gửi thành công. Cảm ơn bạn!' });
  } catch (err) {
    console.error('Error sending contact email:', err);
    return res.status(500).json({ error: 'Có lỗi khi gửi email. Vui lòng thử lại sau.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});