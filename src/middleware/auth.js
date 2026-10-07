const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyAuth = async (req, res, next) => {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.session_token) {
      token = req.cookies.session_token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in with OTP.',
      });
    }

    const secret = process.env.JWT_SECRET || 'dipu_edu_default_jwt_secret_dev';
    const decoded = jwt.verify(token, secret);

    const mongoose = require('mongoose');
    let user = null;

    if (mongoose.connection.readyState === 1) {
      try {
        user = await User.findById(decoded.id);
      } catch (err) {
        user = null;
      }
    }

    if (!user) {
      try {
        const authRoutes = require('../routes/authRoutes');
        if (authRoutes.IN_MEMORY_USERS) {
          user = authRoutes.IN_MEMORY_USERS.get(decoded.id) || authRoutes.IN_MEMORY_USERS.get(decoded.phone);
        }
      } catch (err) {
        user = null;
      }
    }

    if (!user) {
      user = {
        _id: decoded.id || 'demo-student-id',
        phone: decoded.phone || '01712345678',
        name: 'শিক্ষার্থী (Dipu Student)',
        role: decoded.role || 'student',
        classLevel: 'HSC',
        streakDays: 7,
        eduCoins: 250,
        enrolledCourses: ['course-user-c10-biz', 'course-user-hsc28'],
        preferredLanguage: 'bn',
        activeSessionToken: decoded.sessionToken,
        save: async function() { return this; }
      };
    }

    // Tier 2: Single-Device Concurrency Control
    if (user.activeSessionToken && decoded.sessionToken && decoded.sessionToken !== user.activeSessionToken) {
      return res.status(401).json({
        success: false,
        concurrencyViolation: true,
        message: 'Your account has been logged in from another device. Please log in again.',
      });
    }

    req.user = user;
    req.sessionToken = decoded.sessionToken;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session. Please log in again.',
      error: error.message,
    });
  }
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You do not have permission to access this resource.',
      });
    }
    next();
  };
};

module.exports = { verifyAuth, requireRole };
