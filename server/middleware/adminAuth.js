/**
 * adminAuth.js
 * JWT-based admin authentication middleware.
 *
 * The frontend calls POST /api/auth/login with username + password.
 * The server validates against ADMIN_USERNAME / ADMIN_PASSWORD env vars,
 * signs a short-lived JWT, and returns it.
 *
 * All subsequent admin requests must include:
 *   Authorization: Bearer <jwt_token>
 *
 * The JWT secret is NEVER sent to the frontend.
 */

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const adminAuth = (req, res, next) => {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is missing from environment variables.');
    return res.status(500).json({ success: false, message: 'Server configuration error.' });
  }

  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Admin token required.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
    }
    return res.status(403).json({ success: false, message: 'Forbidden. Invalid admin token.' });
  }
};

module.exports = adminAuth;
