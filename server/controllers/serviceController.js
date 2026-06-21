const { mockDatabase, saveServicesToFile } = require('../config/db');

// @desc    Get all active cleaning service types
// @route   GET /api/services
// @access  Public
exports.getServices = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: mockDatabase.services.length,
      data: mockDatabase.services,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add a new cleaning service type
// @route   POST /api/services
// @access  Private (Admin only simulation)
exports.createService = (req, res) => {
  try {
    const { title, desc, price, badge, iconId, imageKey } = req.body;

    if (!title || !price) {
      return res.status(400).json({ success: false, message: 'Please provide title and price.' });
    }

    const created = {
      id: 'custom_' + Date.now(),
      title,
      desc: desc || 'Premium custom cleaning service.',
      price: Number(price) || 0,
      badge: badge || 'Special service',
      iconId: iconId || 'deep',
      imageKey: imageKey || 'deep',
      isActive: true,
    };

    mockDatabase.services.push(created);
    saveServicesToFile();

    res.status(201).json({ success: true, data: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update an existing cleaning service type
// @route   PUT /api/services/:id
// @access  Private (Admin only simulation)
exports.updateService = (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, price, badge, iconId, imageKey } = req.body;

    const serviceIndex = mockDatabase.services.findIndex((s) => s.id === id);

    if (serviceIndex === -1) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    if (price !== undefined) {
      mockDatabase.services[serviceIndex].price = Number(price) || 0;
    }
    if (title !== undefined) {
      mockDatabase.services[serviceIndex].title = title;
    }
    if (desc !== undefined) {
      mockDatabase.services[serviceIndex].desc = desc;
    }
    if (badge !== undefined) {
      mockDatabase.services[serviceIndex].badge = badge;
    }
    if (iconId !== undefined) {
      mockDatabase.services[serviceIndex].iconId = iconId;
    }
    if (imageKey !== undefined) {
      mockDatabase.services[serviceIndex].imageKey = imageKey;
    }
    if (req.body.isActive !== undefined) {
      mockDatabase.services[serviceIndex].isActive = !!req.body.isActive;
    }

    saveServicesToFile();

    res.status(200).json({ success: true, data: mockDatabase.services[serviceIndex] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a cleaning service type
// @route   DELETE /api/services/:id
// @access  Private (Admin only simulation)
exports.deleteService = (req, res) => {
  try {
    const { id } = req.params;

    const serviceIndex = mockDatabase.services.findIndex((s) => s.id === id);

    if (serviceIndex === -1) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    if (mockDatabase.services.length <= 1) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete the last remaining service.',
      });
    }

    mockDatabase.services.splice(serviceIndex, 1);
    saveServicesToFile();

    res.status(200).json({ success: true, message: 'Service deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

