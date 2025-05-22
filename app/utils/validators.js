/**
 * Validates email format
 * @function isValidEmail
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Checks password strength (min 8 chars with uppercase, lowercase, number, and special char)
 * @function isStrongPassword
 * @param {string} pwd - Password to validate
 * @returns {boolean} True if password meets strength requirements
 */
const isStrongPassword = (pwd) => {
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(pwd);
};

/**
 * Validates MongoDB ObjectId format
 * @function isValidObjectId
 * @param {string} id - ID to validate
 * @returns {boolean} True if ID matches MongoDB ObjectId format
 */
const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

module.exports = {
  isValidEmail,
  isStrongPassword,
  isValidObjectId
};