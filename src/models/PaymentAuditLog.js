const mongoose = require('mongoose');

const paymentAuditLogSchema = new mongoose.Schema({
  trxID: {
    type: String,
    required: true,
    index: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'User',
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
    index: true,
  },
  courseSlug: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentGateway: {
    type: String,
    enum: ['bkash', 'nagad', 'rocket', 'manual', 'card', 'unknown'],
    default: 'bkash',
  },
  status: {
    type: String,
    enum: ['SUCCESS', 'FAILED', 'DUPLICATE', 'REJECTED_INVALID_SIGNATURE', 'GATEWAY_DECLINED'],
    required: true,
    index: true,
  },
  ipAddress: {
    type: String,
    default: '',
  },
  userAgent: {
    type: String,
    default: '',
  },
  gatewayResponse: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  failureReason: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  }
});

module.exports = mongoose.model('PaymentAuditLog', paymentAuditLogSchema);
