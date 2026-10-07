const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    default: 'percentage',
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0,
  },
  maxDiscountBDT: {
    type: Number,
    default: 500,  // Cap for percentage discounts
  },
  applicableCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  applicableClassLevels: [{
    type: String,
    enum: ['Class-5', 'Class-6', 'Class-7', 'Class-8', 'Class-9', 'Class-10', 'SSC', 'HSC', 'Admission'],
  }],
  maxUses: {
    type: Number,
    default: 100,
  },
  usedCount: {
    type: Number,
    default: 0,
  },
  perUserLimit: {
    type: Number,
    default: 1,
  },
  usedBy: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    usedAt: { type: Date, default: Date.now },
  }],
  validFrom: {
    type: Date,
    default: Date.now,
  },
  validUntil: {
    type: Date,
    required: true,
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

module.exports = mongoose.model('Coupon', couponSchema);
