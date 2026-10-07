const mongoose = require('mongoose');

const examResultSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  answers: [{
    questionIndex: Number,
    selectedOption: Number,       // -1 = skipped
    isCorrect: Boolean,
    timeTakenSeconds: Number,
  }],
  totalCorrect: {
    type: Number,
    default: 0,
  },
  totalWrong: {
    type: Number,
    default: 0,
  },
  totalSkipped: {
    type: Number,
    default: 0,
  },
  rawScore: {
    type: Number,  // correct * 1
    default: 0,
  },
  finalScore: {
    type: Number,  // rawScore - (wrong * negativeMarkingFactor)
    default: 0,
  },
  percentage: {
    type: Number,
    default: 0,
  },
  timeTakenSeconds: {
    type: Number,
    default: 0,
  },
  tabSwitchCount: {
    type: Number,   // Anti-cheat: how many times user switched tabs
    default: 0,
  },
  flaggedForCheating: {
    type: Boolean,
    default: false,
  },
  eduCoinsEarned: {
    type: Number,
    default: 0,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

// Compound index for leaderboard queries
examResultSchema.index({ examId: 1, finalScore: -1, timeTakenSeconds: 1 });
examResultSchema.index({ userId: 1, examId: 1 });

module.exports = mongoose.model('ExamResult', examResultSchema);
