const express = require('express');
const VolunteerStory = require('../models/VolunteerStory');
const upload = require('../middlewares/upload'); // your multer setup, as above

const router = express.Router();

// CREATE a story
router.post('/', upload, async (req, res) => {
 try {
  const { name, role, quote } = req.body;
  
  // If using Multer for file upload, get file path if a file was uploaded
  const imageUrl = req.file ? req.file.path : undefined;

  // Prepare data object. Add imageUrl only if it exists.
  const storyData = { name, role, quote };
  if (imageUrl) {
    storyData.imageUrl = imageUrl;
  }

  // Create the story with or without imageUrl
  const story = await VolunteerStory.create(storyData);

  res.status(201).json(story);
} catch (error) {
  res.status(500).json({ error: error.message });
}

});

// READ all stories
router.get('/', async (req, res) => {
  const stories = await VolunteerStory.find().sort({ createdAt: -1 });
  res.json(stories);
});

// READ one story
router.get('/:id', async (req, res) => {
  const story = await VolunteerStory.findById(req.params.id);
  if (!story) return res.status(404).json({ msg: 'Not found' });
  res.json(story);
});

// UPDATE a story
router.put('/:id', upload, async (req, res) => {
  try {
    const { name, role, quote } = req.body;
    // If new image uploaded, update path
    const updateFields = { name, role, quote };
    if (req.file) updateFields.imageUrl = req.file.path;

    const updated = await VolunteerStory.findByIdAndUpdate(
      req.params.id, updateFields, { new: true }
    );
    if (!updated) return res.status(404).json({ msg: 'Not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a story
router.delete('/:id', async (req, res) => {
  const removed = await VolunteerStory.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ msg: 'Not found' });
  res.json({ msg: 'Deleted', id: req.params.id });
});

module.exports = router;
