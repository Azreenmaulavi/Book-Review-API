const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createBook,
  getAllBooks,
  getBook,
  searchBooks
} = require('../controller/book.controller');

router.post('/', protect, createBook);
router.get('/', getAllBooks);
router.get('/search', searchBooks);
router.get('/:id', getBook);

module.exports = router;