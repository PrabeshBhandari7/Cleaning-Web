const { getSupabase } = require('../config/db');

// ─── Helper: map Supabase row → API response shape ───────────────────────────
const mapBooking = (row) => ({
  id:           row.id,
  name:         row.name,
  email:        row.email,
  phone:        row.phone,
  serviceType:  row.service_type,
  propertyType: row.property_type,
  size:         row.size,
  frequency:    row.frequency,
  totalPrice:   row.total_price,
  status:       row.status,
  message:      row.message,
  addons:       row.addons || [],
  cleaner:      row.cleaner,
  date:         row.date,
});

// @desc    Calculate instant cleaning quote (no DB needed)
// @route   POST /api/bookings/quote
// @access  Public
exports.calculateQuote = (req, res) => {
  try {
    const { squareFootage, cleaningType, frequency, addons } = req.body;

    if (!squareFootage) {
      return res.status(400).json({ success: false, message: 'Square footage is required.' });
    }

    let baseRate = 0.08;
    if (cleaningType === 'deep') baseRate = 0.12;
    if (cleaningType === 'moveout') baseRate = 0.15;

    let subtotal = squareFootage * baseRate;

    if (addons.windows)    subtotal += 45;
    if (addons.fridge)     subtotal += 30;
    if (addons.oven)       subtotal += 35;
    if (addons.cabinets)   subtotal += 40;
    if (addons.ecoFriendly) subtotal += 15;

    let discount = 1;
    if (frequency === 'weekly')    discount = 0.8;
    if (frequency === 'biweekly')  discount = 0.85;
    if (frequency === 'monthly')   discount = 0.9;

    const totalPrice = Math.round(subtotal * discount);

    res.status(200).json({
      success: true,
      data: { squareFootage, cleaningType, frequency, addons, totalPrice },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
exports.getBookings = async (req, res) => {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({
      success: true,
      count: data.length,
      data: data.map(mapBooking),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
exports.createBooking = async (req, res) => {
  try {
    const supabase = getSupabase();
    const {
      name, email, phone, serviceType, propertyType,
      size, frequency, totalPrice, message, addons,
      squareFootage, cleaningType,
    } = req.body;

    const newId = `CW-${Math.floor(10000 + Math.random() * 90000)}`;

    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        id:            newId,
        name:          name || 'Walk-in Customer',
        email:         email || 'walkin@cleaning.web',
        phone:         phone || '',
        service_type:  serviceType || cleaningType || 'deep',
        property_type: propertyType || '',
        size:          size || (squareFootage ? `${squareFootage} sqft` : 'medium'),
        frequency:     frequency || 'once',
        total_price:   Number(totalPrice) || 120,
        status:        'scheduled',
        message:       message || '',
        addons:        addons || [],
        cleaner:       'Staff Allocated',
        date:          new Date().toISOString().split('T')[0],
      }])
      .select()
      .single();

    if (error) throw error;

    // Send email via Namecheap asynchronously
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,   // sends to yourself
      subject: '🗓️ New Booking Request!',
      html: `
        <h2 style="color: #333;">New Booking Received!</h2>
        <table border="1" cellpadding="8" style="border-collapse: collapse;">
          <tr><td><b>Name</b></td><td>${data.name}</td></tr>
          <tr><td><b>Email</b></td><td>${data.email}</td></tr>
          <tr><td><b>Phone</b></td><td>${data.phone}</td></tr>
          <tr><td><b>Service</b></td><td>${data.service_type}</td></tr>
          <tr><td><b>Total Price</b></td><td>$${data.total_price}</td></tr>
          <tr><td><b>Date</b></td><td>${data.date}</td></tr>
          <tr><td><b>Message</b></td><td>${data.message || 'N/A'}</td></tr>
        </table>
      `
    })
    .then(() => console.log('Booking email sent successfully via Namecheap.'))
    .catch((emailError) => console.error('Failed to send booking email:', emailError));

    res.status(201).json({ success: true, data: mapBooking(data) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a booking (status, cleaner)
// @route   PUT /api/bookings/:id
// @access  Private (Admin)
exports.updateBooking = async (req, res) => {
  try {
    const supabase = getSupabase();
    const { id } = req.params;
    const { status, cleaner } = req.body;

    const updates = {};
    if (status  !== undefined) updates.status  = status;
    if (cleaner !== undefined) updates.cleaner = cleaner;

    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Booking not found.' });
      }
      throw error;
    }

    res.status(200).json({ success: true, data: mapBooking(data) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private (Admin)
exports.deleteBooking = async (req, res) => {
  try {
    const supabase = getSupabase();
    const { id } = req.params;

    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ success: true, message: 'Booking deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
