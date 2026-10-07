const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: ['earn', 'spend', 'bonus', 'refund'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  balanceAfter: {
    type: Number,
    default: 0,
  },
  reason: {
    type: String,
    required: true,
  },
  metadata: {
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    paymentTxnId: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

transactionSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
