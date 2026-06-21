/**
 * api.js — Secure API Routes
 *
 * Auth:      POST /api/auth/login   — returns JWT
 *            GET  /api/auth/verify  — verifies JWT
 * Public:    GET  /api/services
 *            POST /api/bookings
 * Protected: GET  /api/bookings         ← admin only (PII protection)
 *            POST/PUT/DELETE /api/services  ← admin only
 *            PUT/DELETE /api/bookings    ← admin only
 */

const express    = require('express');
const router     = express.Router();
const rateLimit  = require('express-rate-limit');
const { body, param } = require('express-validator');

const { adminLogin, verifyToken } = require('../controllers/authController');
const {
  calculateQuote, getBookings, createBooking, updateBooking, deleteBooking,
} = require('../controllers/bookingController');
const {
  getServices, createService, updateService, deleteService,
} = require('../controllers/serviceController');

const adminAuth = require('../middleware/adminAuth');
const validate  = require('../middleware/validate');

// ─── Rate Limiters ────────────────────────────────────────────────────────────

// Strict limiter for auth login attempts (prevents brute force)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Try again after 15 minutes.' },
});

// Booking submission limiter (prevents spam)
const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many booking requests. Please try again in an hour.' },
});

// ─── Validation Rule Sets ─────────────────────────────────────────────────────

const bookingCreateRules = [
  body('name').optional().isString().trim().isLength({ max: 100 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('phone').optional().isString().trim().isLength({ max: 30 }),
  body('serviceType').optional().isString().trim().isLength({ max: 60 }),
  body('totalPrice').optional().isFloat({ min: 0, max: 100000 }),
  body('message').optional().isString().trim().isLength({ max: 1000 }),
];

const bookingUpdateRules = [
  param('id').isString().trim().notEmpty(),
  body('status').optional().isIn(['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled']),
  body('cleaner').optional().isString().trim().isLength({ max: 100 }),
];

const serviceCreateRules = [
  body('title').isString().trim().notEmpty().isLength({ max: 100 }),
  body('price').isFloat({ min: 0, max: 100000 }),
  body('desc').optional().isString().trim().isLength({ max: 500 }),
  body('badge').optional().isString().trim().isLength({ max: 60 }),
  body('iconId').optional().isString().trim().isLength({ max: 30 }),
  body('imageKey').optional().isString().trim().isLength({ max: 5000000 }),
];

const serviceUpdateRules = [
  param('id').isString().trim().notEmpty(),
  body('price').optional().isFloat({ min: 0, max: 100000 }),
  body('title').optional().isString().trim().isLength({ max: 100 }),
  body('desc').optional().isString().trim().isLength({ max: 500 }),
  body('isActive').optional().isBoolean(),
];

const idParamRule = [
  param('id').isString().trim().notEmpty(),
];

const loginRules = [
  body('username').isString().trim().notEmpty().withMessage('Username is required.'),
  body('password').isString().notEmpty().withMessage('Password is required.'),
];

// ─── Auth Routes ──────────────────────────────────────────────────────────────
router.post('/auth/login',  loginLimiter, loginRules, validate, adminLogin);
router.get('/auth/verify',  adminAuth, verifyToken);

// ─── Quote Calculator (Public) ────────────────────────────────────────────────
router.post(
  '/bookings/quote',
  [
    body('squareFootage').isFloat({ min: 1 }),
    body('cleaningType').optional().isIn(['standard', 'deep', 'moveout']),
    body('frequency').optional().isIn(['once', 'weekly', 'biweekly', 'monthly']),
  ],
  validate,
  calculateQuote
);

// ─── Bookings Routes ──────────────────────────────────────────────────────────
// GET all bookings — ADMIN ONLY (contains customer PII)
router.get('/bookings', adminAuth, getBookings);

// POST create booking — public (customers submit from contact form) with rate limit
router.post('/bookings', bookingLimiter, bookingCreateRules, validate, createBooking);

// PUT update booking — admin only
router.put('/bookings/:id', adminAuth, bookingUpdateRules, validate, updateBooking);

// DELETE booking — admin only
router.delete('/bookings/:id', adminAuth, idParamRule, validate, deleteBooking);

// ─── Services Routes ──────────────────────────────────────────────────────────
// GET services — public (with cache header for 60s)
router.get('/services', (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  next();
}, getServices);

// POST create service — admin only
router.post('/services', adminAuth, serviceCreateRules, validate, createService);

// PUT update service — admin only
router.put('/services/:id', adminAuth, serviceUpdateRules, validate, updateService);

// DELETE service — admin only
router.delete('/services/:id', adminAuth, idParamRule, validate, deleteService);

module.exports = router;
