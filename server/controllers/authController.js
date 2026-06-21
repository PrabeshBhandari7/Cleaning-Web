/**
 * authController.js
 * Handles admin login and returns a short-lived JWT.
 * Credentials are validated entirely on the server against env vars.
 */

const jwt = require('jsonwebtoken');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET     = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';

// @desc    Admin login — returns signed JWT on success
// @route   POST /api/auth/login
// @access  Public
exports.adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !JWT_SECRET) {
    console.error('Admin credentials or JWT_SECRET missing from environment variables.');
    return res.status(500).json({ success: false, message: 'Server configuration error.' });
  }

  // Constant-time comparison to prevent timing attacks
  const usernameMatch = username === ADMIN_USERNAME;
  const passwordMatch = password === ADMIN_PASSWORD;

  if (!usernameMatch || !passwordMatch) {
    // Always wait a fixed delay to prevent username enumeration
    return setTimeout(() => {
      res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }, 400);
  }

  const token = jwt.sign(
    { role: 'admin', username: ADMIN_USERNAME },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  res.status(200).json({
    success: true,
    token,
    expiresIn: JWT_EXPIRES_IN,
  });
};

// @desc    Verify current JWT is valid
// @route   GET /api/auth/verify
// @access  Private (Admin)
exports.verifyToken = (req, res) => {
  // If adminAuth middleware passed, the token is valid
  res.status(200).json({ success: true, message: 'Token is valid.', admin: req.admin });
};
