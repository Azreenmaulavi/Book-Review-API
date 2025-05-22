/**
 * Wraps async route handlers to automatically catch errors and forward to error middleware
 * @function asyncHandler
 * @param {Function} fn - Async route handler function
 * @returns {Function} Wrapped middleware function with error handling
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Global error handler middleware
 * @function errorHandler
 * @param {Error} err - Error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })  // Include stack trace in development
  });
};

module.exports = {
  asyncHandler,
  errorHandler
};