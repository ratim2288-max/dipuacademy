const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'User',
    required: true,
    index: true,
  },
  userPhone: {
    type: String,
    index: true,
    trim: true,
  },
  courseId: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'Course',
    required: true,
    index: true,
  },
  courseSlug: {
    type: String,
    index: true,
    trim: true,
  },
  courseTitle: {
    type: String,
    default: 'কোর্স',
  },
  classLevel: {
    type: String,
    default: 'HSC',
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  paymentMethod: {
    type: String,
    enum: ['bkash', 'nagad', 'rocket', 'manual', 'free_coupon', 'dev_grant', 'card', 'cash'],
    default: 'bkash',
  },
  trxID: {
    type: String,
    required: true,
    index: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed',
    index: true,
  },
  accessibleLessons: {
    type: [String],
    default: ['*'], // '*' means full course access
  },
  completedLessons: {
    type: [String],
    default: [],
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  validUntil: {
    type: Date,
    default: null, // null means lifetime access
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  }
});

enrollmentSchema.index({ userId: 1, courseId: 1 });
enrollmentSchema.index({ userPhone: 1, courseSlug: 1 });
enrollmentSchema.index({ userPhone: 1, status: 1 });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
