const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  lessonTitle: {
    en: { type: String, required: true },
    bn: { type: String, required: true },
  },
  videoType: {
    type: String,
    enum: ['youtube', 'protected_gdrive', 'r2_stream'],
    default: 'youtube',
  },
  videoSource: {
    type: String,
    required: true,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  durationMinutes: {
    type: Number,
    default: 30,
  },
  pdfAttachment: {
    title: String,
    r2Key: String,
    allowDownload: { type: Boolean, default: false },
  }
});

const chapterSchema = new mongoose.Schema({
  chapterTitle: {
    en: { type: String, required: true },
    bn: { type: String, required: true },
  },
  order: { type: Number, default: 1 },
  lessons: [lessonSchema],
});

const courseSchema = new mongoose.Schema({
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
  category: {
    type: String,
    default: 'academic',
  },
  instructor: {
    name: { type: String, default: 'Dipu Sir' },
    institution: { type: String, default: 'BUET / Dhaka University' },
    avatar: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  thumbnail: {
    type: String,
    default: '/images/courses/routine-banner.jpg',
  },
  routineImage: {
    type: String,
    default: '',
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  enrolledStudentsCount: {
    type: Number,
    default: 0,
  },
  chapters: [chapterSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Course', courseSchema);
