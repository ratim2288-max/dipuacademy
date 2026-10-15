const rateLimit = require('express-rate-limit');

// 1. Sliding-window 1-hour 5-send OTP rate limiter per mobile number
const otpRequestLog = new Map(); // phone -> array of timestamps

const normalizePhone = (str) => {
  if (!str) return '';
  const bnToEn = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' };
  return String(str).replace(/[০-৯]/g, d => bnToEn[d]).trim();
};

const otpSendRateLimiter = (req, res, next) => {
  const rawPhone = req.body.phone || req.body.studentPhone;
  const phone = normalizePhone(rawPhone);

  if (!phone) {
    return res.status(400).json({ success: false, message: 'মোবাইল নম্বর আবশ্যক।' });
  }

  const now = Date.now();
  const ONE_HOUR = 60 * 60 * 1000;
  const MAX_LIMIT = 5;

  const timestamps = otpRequestLog.get(phone) || [];
  const validTimestamps = timestamps.filter(ts => now - ts < ONE_HOUR);

  if (validTimestamps.length >= MAX_LIMIT) {
    const oldestTimestamp = validTimestamps[0];
    const minutesRemaining = Math.ceil((ONE_HOUR - (now - oldestTimestamp)) / 60000);

    return res.status(429).json({
      success: false,
      rateLimited: true,
      message: `আপনি ১ ঘণ্টায় সর্বোচ্চ ৫টি ওটিপি রিকোয়েস্ট পাঠাতে পারবেন। অনুগ্রহ করে ${minutesRemaining} মিনিট পর আবার চেষ্টা করুন।`,
      remainingCooldownMinutes: minutesRemaining,
    });
  }

  validTimestamps.push(now);
  otpRequestLog.set(phone, validTimestamps);
  req.remainingQuotaThisHour = MAX_LIMIT - validTimestamps.length;
  next();
};

// 2. Global DDoS & API Spam Defense (Express Rate Limit)
const globalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'অতিরিক্ত রিকোয়েস্ট শনাক্ত হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।',
    retryAfterMinutes: 15
  }
});

// 3. Brute Force Protection on Auth Endpoints
const authBruteForceLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30, // 30 attempts per hour per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'অতিরিক্ত চেষ্টা করা হয়েছে। অনুগ্রহ করে ১ ঘণ্টা পর আবার চেষ্টা করুন।'
  }
});

// 4. Cloudflare Turnstile Bot Protection Middleware
const verifyTurnstile = async (req, res, next) => {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  // If Turnstile is not configured or in development without key, allow request to proceed
  if (!secretKey) {
    return next();
  }

  const token = req.body.turnstileToken || req.body['cf-turnstile-response'] || req.headers['cf-turnstile-response'];
  if (!token) {
    return res.status(400).json({
      success: false,
      botDetected: true,
      message: 'বট সিকিউরিটি ভেরিফিকেশন সম্পন্ন হয়নি। ক্যাপচা যাচাই করুন।'
    });
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: req.ip
      })
    });
    const outcome = await response.json();
    if (!outcome.success) {
      return res.status(403).json({
        success: false,
        botDetected: true,
        message: 'বট প্রটেকশন যাচাই ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
      });
    }
    next();
  } catch (err) {
    console.error('[Cloudflare Turnstile Verification Error]', err.message);
    // In case of Cloudflare network issue, allow request through with warning
    next();
  }
};

module.exports = {
  otpSendRateLimiter,
  globalApiLimiter,
  authBruteForceLimiter,
  verifyTurnstile,
  normalizePhone
};
