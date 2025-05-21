const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./app/utils/logger');

const app = express();
app.use(express.json());

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev', { stream: logger.stream }));


// Routes
app.use('/api/auth', require('./app/routes/auth.routes'));
app.use('/api/books', require('./app/routes/book.routes'));
app.use('/api/reviews', require('./app/routes/review.routes'));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use(require('./app/utils/asyncHandler').errorHandler);

module.exports = app;