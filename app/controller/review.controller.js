const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Review = require('../model/Review.model');
const Book = require('../model/Book.model');
const { asyncHandler } = require('../utils/asyncHandler');

/**
 * @desc    Add a review for a book
 * @route   POST /api/books/:id/reviews
 * @access  Private
 */
const createReview = asyncHandler(async (req, res, next) => {
  const { review, rating } = req.body;
  const bookId = req.params.id;

  // Check if book exists
  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(404, 'Book not found');
  }

  // Check if user already reviewed this book
  const existingReview = await Review.findOne({
    book: bookId,
    user: req.user._id
  });

  if (existingReview) {
    throw new ApiError(400, 'You have already reviewed this book');
  }

  const newReview = await Review.create({
    review,
    rating,
    book: bookId,
    user: req.user._id
  });

  res.status(201).json(
    new ApiResponse(201, newReview, 'Review added successfully')
  );
});

/**
 * @desc    Update a review
 * @route   PUT /api/reviews/:id
 * @access  Private
 */
const updateReview = asyncHandler(async (req, res, next) => {
  const { review, rating } = req.body;
  const reviewId = req.params.id;

  const updatedReview = await Review.findOneAndUpdate(
    { _id: reviewId, user: req.user._id },
    { review, rating },
    { new: true, runValidators: true }
  );

  if (!updatedReview) {
    throw new ApiError(404, 'Review not found or you are not authorized to update it');
  }

  res.status(200).json(
    new ApiResponse(200, updatedReview, 'Review updated successfully')
  );
});

/**
 * @desc    Delete a review
 * @route   DELETE /api/reviews/:id
 * @access  Private
 */
const deleteReview = asyncHandler(async (req, res, next) => {
  const reviewId = req.params.id;

  const review = await Review.findOneAndDelete({
    _id: reviewId,
    user: req.user._id
  });

  if (!review) {
    throw new ApiError(404, 'Review not found or you are not authorized to delete it');
  }

  res.status(204).json(
    new ApiResponse(204, null, 'Review deleted successfully')
  );
});

module.exports = {
  createReview,
  updateReview,
  deleteReview
};