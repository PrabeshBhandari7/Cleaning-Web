const express = require('express');
const router = express.Router();
const { calculateQuote, getBookings, createBooking } = require('../controllers/bookingController');
const { getServices, createService, updateService, deleteService } = require('../controllers/serviceController');

// Booking Quote Router
router.post('/bookings/quote', calculateQuote);

// Bookings management routes
router.route('/bookings').get(getBookings).post(createBooking);

// Service types management routes for Admin
router.route('/services').get(getServices).post(createService);
router.route('/services/:id').put(updateService).delete(deleteService);

module.exports = router;
