const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const upload = require('../middlewares/upload'); // Multer middleware
const multer = require('multer');
// Create activity - accepts multipart/form-data with optional image
router.post('/', upload, async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;
    const activityData = {
      ...req.body,
      imageUrl,
      date: req.body.date ? new Date(req.body.date) : undefined,
    };
    const activity = new Activity(activityData);
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all activities, optional filter by category
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category && req.query.category !== 'All') {
      filter.category = req.query.category;
    }
    const activities = await Activity.find(filter).sort({ date: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get unique categories for filtering dropdown
router.get('/categories', async (req, res) => {
  try {
    const categories = await Activity.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get activity by ID
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update activity - optional new image upload
router.put('/:id', upload, async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }
    if (req.body.date) {
      updateData.date = new Date(req.body.date);
    }
    const activity = await Activity.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    res.json(activity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete activity
router.delete('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
