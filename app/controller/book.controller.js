const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Book = require('../model/Book.model');
const Review = require('../model/Review.model');
const { asyncHandler } = require('../utils/asyncHandler');

/**
 * @desc    Add a new book
 * @route   POST /api/books
 * @access  Private
 */
const createBook = asyncHandler(async (req, res, next) => {
  const { title, author, genre, publishedYear } = req.body;

  const book = await Book.create({
    title,
    author,
    genre,
    publishedYear,
    user: req.user._id
  });

  res.status(201).json(
    new ApiResponse(201, book, 'Book created successfully')
  );
});

/**
 * @desc    Get all books with pagination and filtering
 * @route   GET /api/books
 * @access  Public
 */
const getAllBooks = asyncHandler(async (req, res, next) => {
  // Filtering
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'limit', 'sort'];
  excludedFields.forEach(el => delete queryObj[el]);

  // Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  let query = Book.find(JSON.parse(queryStr));

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  const books = await query;

  res.status(200).json(
    new ApiResponse(200, books, 'Books retrieved successfully')
  );
});

/**
 * @desc    Get book details by ID with reviews and average rating
 * @route   GET /api/books/:id
 * @access  Public
 */
const getBook = asyncHandler(async (req, res, next) => {
  // 1) Get book with reviews (using virtual populate)
  const book = await Book.findById(req.params.id)
    .populate({
      path: 'reviews',
      options: {
        // Pagination for reviews
        limit: parseInt(req.query.reviewsLimit) || 5,
        skip: parseInt(req.query.reviewsSkip) || 0,
        sort: { createdAt: -1 } // Newest first
      },
      select: 'review rating user createdAt' // Only include these fields
    });

  if (!book) {
    throw new ApiError(404, 'Book not found');
  }

  // 2) Create response object with additional stats
  const bookWithStats = {
    ...book.toObject(),
    // These would already be included from the model
    // ratingsAverage: book.ratingsAverage,
    // ratingsQuantity: book.ratingsQuantity
  };

  res.status(200).json(
    new ApiResponse(200, bookWithStats, 'Book retrieved successfully')
  );
});

/**
 * @desc    Search books by title or author
 * @route   GET /api/books/search
 * @access  Public
 */
const searchBooks = asyncHandler(async (req, res, next) => {
  const { query } = req.query;
  if (!query) {
    throw new ApiError(400, 'Please provide a search query');
  }

  const books = await Book.find({
    $text: { $search: query }
  }).limit(10);

  res.status(200).json(
    new ApiResponse(200, books, 'Search results retrieved successfully')
  );
});

module.exports = {
  createBook,
  getAllBooks,
  getBook,
  searchBooks
};