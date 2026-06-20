const { mockDatabase, saveBookingsToFile } = require('../config/db');

// @desc    Calculate instant cleaning quote
// @route   POST /api/bookings/quote
// @access  Public
exports.calculateQuote = (req, res) => {
  try {
    const { squareFootage, cleaningType, frequency, addons } = req.body;

    if (!squareFootage) {
      return res.status(400).json({ success: false, message: 'Square footage is required.' });
    }

    let baseRate = 0.08; // $0.08 per sqft for standard
    if (cleaningType === 'deep') baseRate = 0.12;
    if (cleaningType === 'moveout') baseRate = 0.15;

    let subtotal = squareFootage * baseRate;

    // Addon flat rates
    if (addons.windows) subtotal += 45;
    if (addons.fridge) subtotal += 30;
    if (addons.oven) subtotal += 35;
    if (addons.cabinets) subtotal += 40;
    if (addons.ecoFriendly) subtotal += 15;

    // Frequency discounts
    let discount = 1;
    if (frequency === 'weekly') discount = 0.8;
    if (frequency === 'biweekly') discount = 0.85;
    if (frequency === 'monthly') discount = 0.9;

    const totalPrice = Math.round(subtotal * discount);

    res.status(200).json({
      success: true,
      data: {
        squareFootage,
        cleaningType,
        frequency,
        addons,
        totalPrice,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
exports.getBookings = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: mockDatabase.bookings.length,
      data: mockDatabase.bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
exports.createBooking = (req, res) => {
  try {
    const { name, email, serviceType, size, frequency, totalPrice, squareFootage, cleaningType, addons } = req.body;

    const newBooking = {
      id: `CW-${Math.floor(10000 + Math.random() * 90000)}`,
      name: name || 'Walk-in Customer',
      email: email || 'walkin@cleaning.web',
      serviceType: serviceType || cleaningType || 'deep',
      size: size || (squareFootage ? `${squareFootage} sqft` : 'medium'),
      frequency: frequency || 'once',
      totalPrice: Number(totalPrice) || 120,
      status: 'scheduled',
      date: new Date().toISOString().split('T')[0],
      cleaner: 'Sarah Jenkins (⭐️ 4.95)',
    };

    mockDatabase.bookings.push(newBooking);
    saveBookingsToFile();

    res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
