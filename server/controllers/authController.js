/**
 * authController.js
 * Handles admin login and returns a short-lived JWT.
 * Credentials are validated securely against the database using bcrypt.
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getSupabase } = require('../config/db');

const JWT_SECRET     = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';

// @desc    Admin login — returns signed JWT on success
// @route   POST /api/auth/login
// @access  Public
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  if (!JWT_SECRET) {
    console.error('JWT_SECRET missing from environment variables.');
    return res.status(500).json({ success: false, message: 'Server configuration error.' });
  }

  try {
    const supabase = getSupabase();
    
    // Fetch the admin record from the database
    const { data: adminUser, error } = await supabase
      .from('admins')
      .select('password')
      .eq('username', username)
      .single();

    if (error || !adminUser) {
      // Always wait a fixed delay to prevent username enumeration
      return setTimeout(() => {
        res.status(401).json({ success: false, message: 'Invalid credentials.' });
      }, 400);
    }

    // Compare the provided password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, adminUser.password);

    if (!isMatch) {
      return setTimeout(() => {
        res.status(401).json({ success: false, message: 'Invalid credentials.' });
      }, 400);
    }

    const token = jwt.sign(
      { role: 'admin', username: username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      token,
      expiresIn: JWT_EXPIRES_IN,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// @desc    Verify current JWT is valid
// @route   GET /api/auth/verify
// @access  Private (Admin)
exports.verifyToken = (req, res) => {
  res.status(200).json({ success: true, message: 'Token is valid.', admin: req.admin });
};

// @desc    Change admin password
// @route   PUT /api/auth/password
// @access  Private (Admin)
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const username = req.admin.username; // Extracted from JWT by adminAuth middleware

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Current and new password are required.' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long.' });
  }

  try {
    const supabase = getSupabase();

    // Fetch the current admin record to verify current password
    const { data: adminUser, error } = await supabase
      .from('admins')
      .select('password')
      .eq('username', username)
      .single();

    if (error || !adminUser) {
      return res.status(404).json({ success: false, message: 'Admin user not found.' });
    }

    // Validate current password
    const isMatch = await bcrypt.compare(currentPassword, adminUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect current password.' });
    }

    // Hash the new password securely
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the database record
    const { error: updateError } = await supabase
      .from('admins')
      .update({ password: hashedNewPassword })
      .eq('username', username);

    if (updateError) {
      throw updateError;
    }

    res.status(200).json({ success: true, message: 'Password changed successfully. Please log in again.' });
  } catch (err) {
    console.error('Failed to change password:', err);
    res.status(500).json({ success: false, message: 'Failed to save new password to database.' });
  }
};
