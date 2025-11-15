
const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // Used to sign and verify tokens
const asyncHandler = require('express-async-handler'); // Simple way to handle async errors

// --- Helper function to generate JWT token ---
const generateToken = (id) => {
    // Sign the JWT with the user's ID and the secret from the .env file
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // 1. Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400); // Bad request
        throw new Error('User already exists');
    }

    // 2. Create the user (pre-save middleware handles password hashing)
    const user = await User.create({
        username,
        email,
        password,
    });

    if (user) {
        // 3. Send success response with token
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id), // Generate token
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate a user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1. Check for user by email, selecting the password field explicitly
    const user = await User.findOne({ email }).select('+password'); 

    // 2. Check if user exists AND if the password matches the hashed password
    if (user && (await user.matchPassword(password))) {
        // 3. Send success response with token
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id), // Generate token
        });
    } else {
        res.status(401); // Unauthorized
        throw new Error('Invalid credentials');
    }
});

module.exports = {
    registerUser,
    loginUser,
};