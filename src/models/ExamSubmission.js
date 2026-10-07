const mongoose = require('mongoose');

const examSubmissionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  answers: [{
    questionIndex: Number,
    selectedOption: Number, // -1 = skipped, 0-3 = selected
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
    type: Number,
    default: 0,
  },
  score: {
    type: Number, // final score after negative marking
    required: true,
  },
  percentage: {
    type: Number,
    default: 0,
  },
  timeTakenSeconds: {
    type: Number,
    required: true,
  },
  tabSwitchCount: {
    type: Number,
    default: 0,
  },
  flaggedForCheating: {
    type: Boolean,
    default: false,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

examSubmissionSchema.index({ examId: 1, score: -1, timeTakenSeconds: 1 });
examSubmissionSchema.index({ userId: 1, examId: 1 });

module.exports = mongoose.model('ExamSubmission', examSubmissionSchema);
