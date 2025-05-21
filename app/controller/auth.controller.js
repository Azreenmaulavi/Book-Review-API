const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const User = require('../model/User.model');
const { generateToken } = require('../config/jwt');
const { isValidEmail, isStrongPassword } = require('../utils/validators');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validation checks
    if (!name || !email || !password) {
      throw new ApiError(400, 'All fields are required');
    }

    if (!isValidEmail(email)) {
      throw new ApiError(400, 'Invalid email format');
    }

    if (!isStrongPassword(password)) {
      throw new ApiError(400, 'Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, 'User already exists with this email');
    }

    // Create new user
    const user = await User.create({ name, email, password });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json(
      new ApiResponse(201, { user, token }, 'User registered successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user and get JWT token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      throw new ApiError(400, 'Please provide email and password');
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new ApiError(401, 'Incorrect email or password');
    }

    // 3) Generate token
    const token = generateToken(user._id);

    res.status(200).json(
      new ApiResponse(200, { user, token }, 'Logged in successfully')
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login };