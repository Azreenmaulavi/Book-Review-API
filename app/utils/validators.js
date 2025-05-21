// validators.js
// Utility validation functions for input checks

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (pwd) => {
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(pwd);
};

const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

module.exports = {
  isValidEmail,
  isStrongPassword,
  isValidObjectId
};
