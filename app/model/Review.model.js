const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review cannot be empty'],
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'A review must have a rating']
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book',
    required: [true, 'Review must belong to a book']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Prevent duplicate reviews from same user for same book
reviewSchema.index({ book: 1, user: 1 }, { unique: true });

// Static method to calculate average ratings
reviewSchema.statics.calcAverageRatings = async function(bookId) {
  const stats = await this.aggregate([
    { $match: { book: bookId } },
    { 
      $group: {
        _id: '$book',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await mongoose.model('Book').findByIdAndUpdate(bookId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await mongoose.model('Book').findByIdAndUpdate(bookId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5 // Default average
    });
  }
};

// Update book ratings after saving a review
reviewSchema.post('save', function() {
  this.constructor.calcAverageRatings(this.book);
});

// Update book ratings when a review is updated or deleted
reviewSchema.post(/^findOneAnd/, async function(doc) {
  if (doc) await doc.constructor.calcAverageRatings(doc.book);
});

module.exports = mongoose.model('Review', reviewSchema);