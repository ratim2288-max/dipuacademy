const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    en: { type: String, required: true },
    bn: { type: String, required: true },
  },
  options: [{
    en: String,
    bn: String,
  }],
  correctIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
  explanation: {
    en: String,
    bn: String,
  },
  subject: {
    type: String,
    default: 'General',
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
  }
});

const examSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  title: {
    en: { type: String, required: true },
    bn: { type: String, required: true },
  },
  description: {
    en: String,
    bn: String,
  },
  classLevel: {
    type: String,
    enum: ['Class-5', 'Class-6', 'Class-7', 'Class-8', 'Class-9', 'Class-10', 'SSC', 'HSC', 'Admission'],
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  courseRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    default: null,
  },
  durationMinutes: {
    type: Number,
    default: 15,
    min: 5,
    max: 180,
  },
  totalMarks: {
    type: Number,
    default: 20,
  },
  negativeMarkingFactor: {
    type: Number,
    default: 0.25, // -0.25 per wrong answer
  },
  passingPercentage: {
    type: Number,
    default: 40,
  },
  questions: [questionSchema],
  isPublished: {
    type: Boolean,
    default: true,
  },
  totalAttempts: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Exam', examSchema);
