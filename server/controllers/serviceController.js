const { getSupabase } = require('../config/db');

// ─── Helper: map Supabase row → API response shape ───────────────────────────
const mapService = (row) => ({
  id:       row.id,
  title:    row.title,
  desc:     row.description,
  price:    row.price,
  imageKey: row.image_key,
  badge:    row.badge,
  iconId:   row.icon_id,
  isActive: row.is_active,
});

// @desc    Get all cleaning service types
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res) => {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    res.status(200).json({
      success: true,
      count: data.length,
      data: data.map(mapService),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add a new cleaning service type
// @route   POST /api/services
// @access  Private (Admin)
exports.createService = async (req, res) => {
  try {
    const supabase = getSupabase();
    const { title, desc, price, badge, iconId, imageKey } = req.body;

    if (!title || !price) {
      return res.status(400).json({ success: false, message: 'Please provide title and price.' });
    }

    const newId = 'custom_' + Date.now();

    const { data, error } = await supabase
      .from('services')
      .insert([{
        id:          newId,
        title,
        description: desc || 'Premium custom cleaning service.',
        price:       Number(price) || 0,
        badge:       badge || 'Special service',
        icon_id:     iconId || 'deep',
        image_key:   imageKey || 'deep',
        is_active:   true,
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data: mapService(data) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update an existing cleaning service type
// @route   PUT /api/services/:id
// @access  Private (Admin)
exports.updateService = async (req, res) => {
  try {
    const supabase = getSupabase();
    const { id } = req.params;
    const { title, desc, price, badge, iconId, imageKey, isActive } = req.body;

    // Build only the fields that were sent
    const updates = {};
    if (title     !== undefined) updates.title       = title;
    if (desc      !== undefined) updates.description = desc;
    if (price     !== undefined) updates.price       = Number(price) || 0;
    if (badge     !== undefined) updates.badge       = badge;
    if (iconId    !== undefined) updates.icon_id     = iconId;
    if (imageKey  !== undefined) updates.image_key   = imageKey;
    if (isActive  !== undefined) updates.is_active   = !!isActive;

    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Service not found.' });
      }
      throw error;
    }

    res.status(200).json({ success: true, data: mapService(data) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a cleaning service type
// @route   DELETE /api/services/:id
// @access  Private (Admin)
exports.deleteService = async (req, res) => {
  try {
    const supabase = getSupabase();
    const { id } = req.params;

    // Prevent deleting the last service
    const { count, error: countError } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;
    if (count <= 1) {
      return res.status(400).json({ success: false, message: 'Cannot delete the last remaining service.' });
    }

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ success: true, message: 'Service deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
