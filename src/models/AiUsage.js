const mongoose = require('mongoose');

const aiUsageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
    index: true,
    default: () => new Date().toISOString().slice(0, 10),
  },
  promptCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  dailyLimit: {
    type: Number,
    default: 10, // 10 queries/day for free users, 35 for enrolled users
  },
  lastPromptAt: {
    type: Date,
    default: Date.now,
  }
});

aiUsageSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('AiUsage', aiUsageSchema);
