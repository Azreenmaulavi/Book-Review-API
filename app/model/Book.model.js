const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A book must have a title'],
    trim: true,
    index: true
  },
  author: {
    type: String,
    required: [true, 'A book must have an author'],
    trim: true,
    index: true
  },
  genre: {
    type: String,
    required: [true, 'A book must have a genre'],
    trim: true
  },
  publishedYear: {
    type: Number,
    min: [1000, 'Year must be greater than 1000'],
    max: [new Date().getFullYear(), `Year must be less than ${new Date().getFullYear()}`]
  },
  ratingsAverage: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be above 0'],
    max: [5, 'Rating must be below 5.0'],
    set: val => Math.round(val * 10) / 10 // Round to 1 decimal
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate reviews
bookSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'book',
  localField: '_id'
});

// Add text index for search functionality
bookSchema.index({ title: 'text', author: 'text' });

module.exports = mongoose.model('Book', bookSchema);