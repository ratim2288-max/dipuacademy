const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^01[3-9]\d{8}$/, 'Please enter a valid 11-digit Bangladeshi phone number'],
  },
  name: {
    type: String,
    default: 'Learner',
    trim: true,
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin', 'super_admin'],
    default: 'student',
  },
  password: {
    type: String,
    default: null,
  },
  institution: {
    type: String,
    default: 'শিক্ষা প্রতিষ্ঠান',
  },
  classLevel: {
    type: String,
    default: 'HSC',
  },
  group: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: '/images/dipu-logo.png',
  },
  isOnboarded: {
    type: Boolean,
    default: false,
  },
  guardianPhone: {
    type: String,
    default: null,
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.Mixed,
    ref: 'Course',
  }],
  enrolledCourseSlugs: [{
    type: String,
    index: true,
  }],
  activeSessionToken: {
    type: String,
    default: null,
  },
  streakDays: {
    type: Number,
    default: 1,
  },
  lastActiveDate: {
    type: Date,
    default: Date.now,
  },
  eduCoins: {
    type: Number,
    default: 50,
  },
  aiQueriesUsedToday: {
    type: Number,
    default: 0,
  },
  lastAiQueryDate: {
    type: String,
    default: () => new Date().toISOString().slice(0, 10),
  },
  preferredLanguage: {
    type: String,
    enum: ['bn', 'en'],
    default: 'bn',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('User', userSchema);
