const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const OTP = require('../models/OTP');
const { otpSendRateLimiter } = require('../middleware/rateLimiter');
const { verifyAuth } = require('../middleware/auth');
const { sendSMS, formatOtpMessage } = require('../services/smsService');

const mongoose = require('mongoose');

const IN_MEMORY_OTPS = new Map();
const IN_MEMORY_USERS = new Map([
  [
    '01712345678',
    {
      _id: 'demo-student-id',
      phone: '01712345678',
      name: 'তানভীর হাসান (শিক্ষার্থী)',
      role: 'student',
      institution: 'ঢাকা কলেজ',
      classLevel: 'HSC',
      streakDays: 7,
      eduCoins: 250,
      enrolledCourses: ['course-user-c10-biz', 'course-user-hsc28'],
      activeSessionToken: null,
      save: async function() { return this; }
    }
  ],
  [
    'demo-student-id',
    {
      _id: 'demo-student-id',
      phone: '01712345678',
      name: 'তানভীর হাসান (শিক্ষার্থী)',
      role: 'student',
      institution: 'ঢাকা কলেজ',
      classLevel: 'HSC',
      streakDays: 7,
      eduCoins: 250,
      enrolledCourses: ['course-user-c10-biz', 'course-user-hsc28'],
      activeSessionToken: null,
      save: async function() { return this; }
    }
  ],
  [
    '01912345678',
    {
      _id: 'demo-admin-id',
      phone: '01912345678',
      name: 'দীপু আহমেদ (অ্যাডমিন)',
      role: 'admin',
      institution: 'BUET',
      classLevel: 'All',
      streakDays: 30,
      eduCoins: 1000,
      enrolledCourses: [],
      activeSessionToken: null,
      save: async function() { return this; }
    }
  ],
  [
    'demo-admin-id',
    {
      _id: 'demo-admin-id',
      phone: '01912345678',
      name: 'দীপু আহমেদ (অ্যাডমিন)',
      role: 'admin',
      institution: 'BUET',
      classLevel: 'All',
      streakDays: 30,
      eduCoins: 1000,
      enrolledCourses: [],
      activeSessionToken: null,
      save: async function() { return this; }
    }
  ]
]);

// POST /api/auth/send-otp
router.post('/send-otp', otpSendRateLimiter, async (req, res) => {
  try {
    const { phone } = req.body;
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Bangladeshi phone number. Must be 11 digits starting with 013-019.',
      });
    }

    // Generate 6-digit OTP code (Deterministic fallback in development: '123456' if simulated)
    const rawOtp = process.env.NODE_ENV === 'development' ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(rawOtp, salt);

    // Remove any previous OTPs for this phone
    if (mongoose.connection.readyState === 1) {
      try {
        await OTP.deleteMany({ phone });
        await OTP.create({
          phone,
          otpHash,
          attempts: 0,
          expireAt: new Date(Date.now() + 180 * 1000), // 3 min TTL
        });
      } catch (dbErr) {
        IN_MEMORY_OTPS.set(phone, { otpHash, rawOtp, attempts: 0, expireAt: Date.now() + 180000 });
      }
    } else {
      IN_MEMORY_OTPS.set(phone, { otpHash, rawOtp, attempts: 0, expireAt: Date.now() + 180000 });
    }

    // Send SMS via BulkSMSBD gateway
    const smsMessage = formatOtpMessage(rawOtp);
    const smsResult = await sendSMS(phone, smsMessage);
    console.log(`[SMS Gateway] Dispatched OTP ${rawOtp} to ${phone} | SMS: ${smsResult.success ? '✅' : '❌'}`);

    return res.status(200).json({
      success: true,
      message: 'OTP sent to your mobile number. Valid for 3 minutes.',
      phone,
      remainingQuotaThisHour: req.remainingQuotaThisHour,
      expiresInSeconds: 180,
      devOtpHint: process.env.NODE_ENV === 'development' ? rawOtp : undefined,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to send OTP.', error: error.message });
  }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp, name } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: 'Phone and OTP are required.' });
    }

    let isValid = false;

    // Verify against DB or dev fallback
    if (process.env.NODE_ENV === 'development' && otp === '123456') {
      isValid = true;
    } else if (mongoose.connection.readyState === 1) {
      const otpRecord = await OTP.findOne({ phone }).sort({ createdAt: -1 });
      if (!otpRecord) {
        return res.status(400).json({ success: false, message: 'OTP expired or not found. Please request a new one.' });
      }

      if (otpRecord.attempts >= 3) {
        await OTP.deleteOne({ _id: otpRecord._id });
        return res.status(403).json({ success: false, message: 'Too many failed attempts. This OTP is invalidated.' });
      }

      const match = await bcrypt.compare(otp, otpRecord.otpHash);
      if (!match) {
        otpRecord.attempts += 1;
        await otpRecord.save();
        return res.status(400).json({ success: false, message: `Incorrect OTP. ${3 - otpRecord.attempts} attempts remaining.` });
      }

      isValid = true;
      await OTP.deleteOne({ _id: otpRecord._id });
    } else {
      const memOtp = IN_MEMORY_OTPS.get(phone);
      if (!memOtp || Date.now() > memOtp.expireAt) {
        return res.status(400).json({ success: false, message: 'OTP expired or not found. Please request a new one.' });
      }
      if (memOtp.attempts >= 3) {
        IN_MEMORY_OTPS.delete(phone);
        return res.status(403).json({ success: false, message: 'Too many failed attempts. This OTP is invalidated.' });
      }
      const match = (otp === memOtp.rawOtp) || await bcrypt.compare(otp, memOtp.otpHash);
      if (!match) {
        memOtp.attempts += 1;
        return res.status(400).json({ success: false, message: `Incorrect OTP. ${3 - memOtp.attempts} attempts remaining.` });
      }
      isValid = true;
      IN_MEMORY_OTPS.delete(phone);
    }

    if (isValid) {
      // Find or create user
      let user = null;
      const newSessionToken = uuidv4();
      let isNewUser = false;

      if (mongoose.connection.readyState === 1) {
        user = await User.findOne({ phone });
        if (!user) {
          user = await User.create({
            phone,
            name: name || 'New Student',
            role: 'student',
            activeSessionToken: newSessionToken,
            streakDays: 1,
            eduCoins: 50,
          });
          isNewUser = true;
        } else {
          // Update streak on login
          const today = new Date().toISOString().slice(0, 10);
          const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate).toISOString().slice(0, 10) : null;
          const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

          if (lastActive !== today) {
            if (lastActive === yesterday) {
              user.streakDays += 1;
              if (user.streakDays % 7 === 0) user.eduCoins += 25;
              else user.eduCoins += 5;
            } else if (lastActive && lastActive !== today) {
              user.streakDays = 1;
              user.eduCoins += 5;
            }
          }

          user.activeSessionToken = newSessionToken;
          user.lastActiveDate = new Date();
          await user.save();
        }
      } else {
        user = IN_MEMORY_USERS.get(phone);
        if (!user) {
          const newId = `user_${Date.now()}`;
          user = {
            _id: newId,
            phone,
            name: name || 'নতুন শিক্ষার্থী',
            role: phone === '01912345678' ? 'admin' : 'student',
            institution: 'ঢাকা কলেজ',
            classLevel: 'HSC',
            streakDays: 1,
            eduCoins: 50,
            enrolledCourses: ['course-user-c10-biz', 'course-user-hsc28'],
            activeSessionToken: newSessionToken,
            lastActiveDate: new Date(),
            preferredLanguage: 'bn',
            save: async function() { return this; }
          };
          IN_MEMORY_USERS.set(phone, user);
          IN_MEMORY_USERS.set(newId, user);
          isNewUser = true;
        } else {
          user.activeSessionToken = newSessionToken;
          user.lastActiveDate = new Date();
        }
      }

      const secret = process.env.JWT_SECRET || 'dipu_edu_default_jwt_secret_dev';
      const token = jwt.sign(
        { id: user._id, phone: user.phone, role: user.role, sessionToken: newSessionToken },
        secret,
        { expiresIn: '30d' }
      );

      // Set httpOnly cookie (NFR-02)
      res.cookie('session_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      return res.status(200).json({
        success: true,
        message: 'Login successful.',
        isNewUser,
        needsClassSelection: isNewUser || !user.classLevel || user.classLevel === 'HSC',
        sessionToken: token,
        user: {
          id: user._id,
          name: user.name,
          phone: user.phone,
          role: user.role,
          classLevel: user.classLevel,
          streakDays: user.streakDays,
          eduCoins: user.eduCoins,
          enrolledCourses: user.enrolledCourses,
          preferredLanguage: user.preferredLanguage,
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'OTP verification failed.', error: error.message });
  }
});

// POST /api/auth/set-class — Set user's class level (after login/signup)
router.post('/set-class', verifyAuth, async (req, res) => {
  try {
    const { classLevel } = req.body;
    const validLevels = ['Class-5', 'Class-6', 'Class-7', 'Class-8', 'Class-9', 'Class-10', 'SSC', 'HSC', 'Admission'];

    if (!classLevel || !validLevels.includes(classLevel)) {
      return res.status(400).json({
        success: false,
        message: 'Valid class level is required.',
        validLevels,
      });
    }

    req.user.classLevel = classLevel;
    await req.user.save().catch(() => {});

    return res.status(200).json({
      success: true,
      message: `Class level set to ${classLevel}.`,
      user: {
        id: req.user._id,
        name: req.user.name,
        phone: req.user.phone,
        classLevel: req.user.classLevel,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to set class level.', error: error.message });
  }
});

// POST /api/auth/set-language — Toggle preferred language (EN/BN)
router.post('/set-language', verifyAuth, async (req, res) => {
  try {
    const { language } = req.body;
    if (!language || !['bn', 'en'].includes(language)) {
      return res.status(400).json({ success: false, message: 'Language must be "bn" or "en".' });
    }

    req.user.preferredLanguage = language;
    await req.user.save().catch(() => {});

    return res.status(200).json({
      success: true,
      message: `Language set to ${language === 'bn' ? 'বাংলা' : 'English'}.`,
      preferredLanguage: language,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to set language.', error: error.message });
  }
});

// GET /api/auth/me
router.get('/me', verifyAuth, (req, res) => {
  return res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      phone: req.user.phone,
      role: req.user.role,
      classLevel: req.user.classLevel,
      streakDays: req.user.streakDays,
      eduCoins: req.user.eduCoins,
      preferredLanguage: req.user.preferredLanguage,
      enrolledCourses: req.user.enrolledCourses,
    }
  });
});

router.IN_MEMORY_USERS = IN_MEMORY_USERS;
module.exports = router;


