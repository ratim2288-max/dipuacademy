// In-memory / Redis sliding-window 1-hour 5-send OTP rate limiter
const otpRequestLog = new Map(); // phone -> array of timestamps

const otpSendRateLimiter = (req, res, next) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ success: false, message: 'Phone number is required.' });
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
      message: `You have reached the maximum OTP request limit (5 requests per hour). Please try again after ${minutesRemaining} minutes.`,
      remainingCooldownMinutes: minutesRemaining,
    });
  }

  validTimestamps.push(now);
  otpRequestLog.set(phone, validTimestamps);
  req.remainingQuotaThisHour = MAX_LIMIT - validTimestamps.length;
  next();
};

module.exports = { otpSendRateLimiter };
