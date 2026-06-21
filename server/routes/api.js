/**
 * api.js — Secure API Routes
 *
 * Public routes:   GET  /api/services, GET /api/bookings, POST /api/bookings
 * Protected routes: POST/PUT/DELETE on services and PUT/DELETE on bookings
 *   → require Authorization: Bearer <ADMIN_SECRET_TOKEN>
 */

const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const {
  calculateQuote,
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');

const {
  getServices,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');

const adminAuth = require('../middleware/adminAuth');
const validate = require('../middleware/validate');

// ─── Validation Rule Sets ─────────────────────────────────────────────────────

const bookingCreateRules = [
  body('name')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Name must be a string up to 100 characters.'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address.'),
  body('phone')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 30 })
    .withMessage('Phone must be a string up to 30 characters.'),
  body('serviceType')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 60 })
    .withMessage('Service type must be a string up to 60 characters.'),
  body('totalPrice')
    .optional()
    .isFloat({ min: 0, max: 100000 })
    .withMessage('Total price must be a positive number.'),
  body('message')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message must be under 1000 characters.'),
];

const bookingUpdateRules = [
  param('id').isString().trim().notEmpty().withMessage('Booking ID is required.'),
  body('status')
    .optional()
    .isIn(['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled'])
    .withMessage('Invalid status value.'),
  body('cleaner')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Cleaner name must be under 100 characters.'),
];

const serviceCreateRules = [
  body('title')
    .isString()
    .trim()
    .notEmpty()
    .isLength({ max: 100 })
    .withMessage('Title is required and must be under 100 characters.'),
  body('price')
    .isFloat({ min: 0, max: 100000 })
    .withMessage('Price must be a non-negative number.'),
  body('desc')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be under 500 characters.'),
  body('badge')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 60 })
    .withMessage('Badge must be under 60 characters.'),
  body('iconId')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 30 }),
  body('imageKey')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 5000000 }) // allow base64 images (max ~5MB)
    .withMessage('Image key is too large.'),
];

const serviceUpdateRules = [
  param('id').isString().trim().notEmpty().withMessage('Service ID is required.'),
  body('price')
    .optional()
    .isFloat({ min: 0, max: 100000 })
    .withMessage('Price must be a non-negative number.'),
  body('title')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 }),
  body('desc')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 }),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value.'),
];

const idParamRule = [
  param('id').isString().trim().notEmpty().withMessage('ID parameter is required.'),
];

// ─── Quote Calculator (Public) ────────────────────────────────────────────────
router.post(
  '/bookings/quote',
  [
    body('squareFootage').isFloat({ min: 1 }).withMessage('Square footage must be a positive number.'),
    body('cleaningType').optional().isIn(['standard', 'deep', 'moveout']).withMessage('Invalid cleaning type.'),
    body('frequency').optional().isIn(['once', 'weekly', 'biweekly', 'monthly']).withMessage('Invalid frequency.'),
  ],
  validate,
  calculateQuote
);

// ─── Bookings Routes ──────────────────────────────────────────────────────────
// GET all bookings — public (admin will authenticate on the frontend)
router.get('/bookings', getBookings);

// POST create booking — public (customers submit bookings from the contact form)
router.post('/bookings', bookingCreateRules, validate, createBooking);

// PUT update booking — admin only
router.put('/bookings/:id', adminAuth, bookingUpdateRules, validate, updateBooking);

// DELETE booking — admin only
router.delete('/bookings/:id', adminAuth, idParamRule, validate, deleteBooking);

// ─── Services Routes ──────────────────────────────────────────────────────────
// GET services — public
router.get('/services', getServices);

// POST create service — admin only
router.post('/services', adminAuth, serviceCreateRules, validate, createService);

// PUT update service — admin only
router.put('/services/:id', adminAuth, serviceUpdateRules, validate, updateService);

// DELETE service — admin only
router.delete('/services/:id', adminAuth, idParamRule, validate, deleteService);

module.exports = router;
