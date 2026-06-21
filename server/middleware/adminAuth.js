/**
 * adminAuth.js
 * Simple token-based admin authentication middleware.
 *
 * The admin token is read from the ADMIN_SECRET_TOKEN environment variable.
 * The frontend must send it in the Authorization header:
 *   Authorization: Bearer <token>
 *
 * This protects all write operations (POST/PUT/DELETE) on admin routes.
 */

const ADMIN_TOKEN = process.env.ADMIN_SECRET_TOKEN || 'change-me-in-env';

const adminAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Admin token required.',
    });
  }

  const token = authHeader.split(' ')[1];

  if (token !== ADMIN_TOKEN) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden. Invalid admin token.',
    });
  }

  next();
};

module.exports = adminAuth;
