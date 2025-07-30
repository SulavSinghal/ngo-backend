const express = require('express');
const Slide = require('../models/Slides');
const router = express.Router();

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

// CREATE a new slide
router.post('/', async (req, res) => {
  try {
    const slide = new Slide(req.body);
    await slide.save();
    res.status(201).json(slide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE an existing slide by ID
router.put('/:id', async (req, res) => {
  try {
    const slide = await Slide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!slide) return res.status(404).json({ error: 'Slide not found' });
    res.json(slide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a slide by ID
router.delete('/:id', async (req, res) => {
  try {
    const slide = await Slide.findByIdAndDelete(req.params.id);
    if (!slide) return res.status(404).json({ error: 'Slide not found' });
    res.json({ message: 'Slide deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
