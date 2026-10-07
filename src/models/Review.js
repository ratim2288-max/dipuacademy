const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop',
  },
  badge: {
    type: String,
    required: true,
    trim: true,
  },
  quote: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    default: 5.0,
    min: 1,
    max: 5,
  },
  isFeatured: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
