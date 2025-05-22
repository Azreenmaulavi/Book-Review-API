/**
 * Standardized API response format
 * @class ApiResponse
 * @param {number} statusCode - HTTP status code
 * @param {Object} data - Response payload
 * @param {string} [message='Success'] - Human-readable message
 */

class ApiResponse {
  constructor(statusCode, data, message = 'Success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

module.exports = ApiResponse;