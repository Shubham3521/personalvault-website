const nodemailer = require('nodemailer');

const REQUIRED_ENV = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM', 'ADMIN_EMAIL'];
const hasConfig = REQUIRED_ENV.every(k => !!process.env[k]);

let transporter = null;
if (hasConfig) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // verify connection (non-blocking) — log result
  transporter.verify().then(() => {
    console.log('Email transporter verified');
  }).catch((err) => {
    console.warn('Email transporter verification failed:', err.message || err);
  });
} else {
  console.warn('SMTP config missing — emails will be skipped. Set SMTP_* and ADMIN_EMAIL in env.');
}

function plainFromHtml(html) {
  // very simple fallback — strip tags roughly
  return html.replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim();
}

async function sendMail({ to, subject, html, text }) {
  if (!transporter) {
    console.warn('Skipping sending email because transporter is not configured. Subject:', subject);
    return;
  }

  const mail = {
    from: process.env.SMTP_FROM,
    to,
    subject,
    text: text || plainFromHtml(html || ''),
    html,
  };

  try {
    // fire-and-forget style: don't throw up to caller; callers should await if they want
    const info = await transporter.sendMail(mail);
    console.log('Email sent:', info.messageId, 'to', to);
  } catch (err) {
    console.error('Error sending email to', to, err);
  }
}

// Templates
function orderConfirmationTemplate({ shortId, amountINR, name, email, shippingLink }) {
  const linkUrl = shippingLink || `https://personalvault.in/shipping.html?token=${shortId}`;
  const html = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#0D1B2A; padding:20px;">
    <div style="max-width:600px;margin:0 auto;border:1px solid #eaeaea;border-radius:8px;overflow:hidden">
      <div style="background:#E65100;color:#fff;padding:16px;text-align:center;font-weight:600">PersonalVault</div>
      <div style="padding:20px">
        <h2 style="color:#0D1B2A;margin-top:0">Your PersonalVault is reserved! 🎉</h2>
        <p>Thanks <strong>${name || email}</strong> — we received your payment.</p>
        <p><strong>Order ID:</strong> ${shortId}<br><strong>Amount:</strong> ₹${amountINR}</p>
        <p>One last step — please verify your email and add your shipping address so we can deliver your PersonalVault. Expected delivery is around <strong>June 2026</strong>.</p>
        <div style="text-align:center;margin:24px 0">
          <a href="${linkUrl}" style="background:#E65100;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;display:inline-block;font-weight:600;font-size:16px">Complete Your Order →</a>
        </div>
        <p style="font-size:13px;color:#777">Or copy this link: ${linkUrl}</p>
        <p style="margin-top:12px;color:#555">Questions? Reply to <a href="mailto:${process.env.SMTP_USER}" style="color:#00BFA5">${process.env.SMTP_USER}</a></p>
      </div>
      <div style="background:#f6f8fb;padding:12px;text-align:center;color:#777;font-size:13px">© PersonalVault</div>
    </div>
  </div>
  `;
  const text = `Your PersonalVault is reserved!\nOrder ID: ${shortId}\nAmount: ₹${amountINR}\nName/Email: ${name || email}\n\nComplete your order: ${linkUrl}\n\nQuestions: ${process.env.SMTP_USER}`;
  return { subject: 'Your PersonalVault is reserved! 🎉', html, text };
}

function waitlistWelcomeTemplate({ name, email }) {
  const html = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#0D1B2A;padding:20px">
    <div style="max-width:600px;margin:0 auto;border:1px solid #eaeaea;border-radius:8px;overflow:hidden">
      <div style="background:#E65100;color:#fff;padding:16px;text-align:center;font-weight:600">PersonalVault</div>
      <div style="padding:20px">
        <h2 style="margin-top:0">You're on the list! — PersonalVault</h2>
        <p>Hi ${name || 'friend'},</p>
        <p>We've added <strong>${email}</strong> to our waitlist. We'll notify you when PersonalVault ships — waitlist members get early access.</p>
        <p style="margin-top:12px;color:#555">Questions? Reply to <a href="mailto:${process.env.SMTP_USER}" style="color:#00BFA5">${process.env.SMTP_USER}</a></p>
      </div>
      <div style="background:#f6f8fb;padding:12px;text-align:center;color:#777;font-size:13px">© PersonalVault</div>
    </div>
  </div>
  `;
  const text = `You're on the list!\nEmail: ${email}\nWe'll let you know when we launch.`;
  return { subject: "You're on the list! — PersonalVault", html, text };
}

function adminNewOrderTemplate({ shortId, name, email, phone, amountINR, paymentId }) {
  const text = `New Order\nOrder ID: ${shortId}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAmount: ₹${amountINR}\nPayment ID: ${paymentId}`;
  const subject = `💰 New Order: ${shortId}`;
  return { subject, text, html: `<pre style="font-family:monospace;color:#0D1B2A">${text}</pre>` };
}

function adminNewWaitlistTemplate({ email, name, timestamp }) {
  const text = `New Waitlist Signup\nEmail: ${email}\nName: ${name || '-'}\nAt: ${timestamp}`;
  const subject = `📋 New Waitlist: ${email}`;
  return { subject, text, html: `<pre style="font-family:monospace;color:#0D1B2A">${text}</pre>` };
}

module.exports = {
  sendMail,
  templates: {
    orderConfirmationTemplate,
    waitlistWelcomeTemplate,
    adminNewOrderTemplate,
    adminNewWaitlistTemplate,
  }
};
