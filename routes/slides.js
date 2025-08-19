const express = require('express');
const Slide = require('../models/Slides');
const router = express.Router();
const auth  = require('../middlewares/auth');
const upload = require('../middlewares/upload');
// GET all slides (optionally filter by active)
router.get('/', async (req, res) => {
  try {
    const slides = await Slide.find().sort({ order: 1 });
    res.json(slides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single slide by ID
router.get('/:id', async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    if (!slide) return res.status(404).json({ error: 'Slide not found' });
    res.json(slide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE a new slide (supports multipart with image)
router.post('/', auth, upload, async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.file) {
      payload.image = `/uploads/${req.file.filename}`;
    }
    const slide = new Slide(payload);
    await slide.save();
    res.status(201).json(slide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE an existing slide by ID (supports multipart with image)
router.put('/:id', auth, upload, async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file) {
      update.image = `/uploads/${req.file.filename}`;
    }
    const slide = await Slide.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!slide) return res.status(404).json({ error: 'Slide not found' });
    res.json(slide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a slide by ID
router.delete('/:id',auth, async (req, res) => {
  try {
    const slide = await Slide.findByIdAndDelete(req.params.id);
    if (!slide) return res.status(404).json({ error: 'Slide not found' });
    res.json({ message: 'Slide deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
