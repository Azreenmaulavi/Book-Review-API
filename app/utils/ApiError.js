/**
 * Custom API Error class extending Node's Error class
 * @class ApiError
 * @extends Error
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {boolean} [isOperational=true] - Indicates if error is operational (vs programming error)
 * @param {string} [stack=''] - Error stack trace
 */

class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;