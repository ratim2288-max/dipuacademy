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
  institution: {
    type: String,
    default: 'General Student',
  },
  classLevel: {
    type: String,
    enum: ['Class-5', 'Class-6', 'Class-7', 'Class-8', 'Class-9', 'Class-10', 'SSC', 'HSC', 'Admission', 'All'],
    default: 'HSC',
  },
  guardianPhone: {
    type: String,
    default: null,
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
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
