// routes/aboutUs.js
const express = require('express');
const AboutUs = require('../models/AboutUs.js'); // Changed from import

const router = express.Router();

// Middleware placeholder for admin authentication
const isAdmin = (req, res, next) => {
  // In a real app, you'd verify a JWT here
  console.log("Admin check passed (placeholder)");
  next();
};

// GET: Fetch the About Us content
router.get('/', async (req, res) => {
  try {
    const content = await AboutUs.getSingleton();
    if (!content) {
      // Create initial content if it doesn't exist
      const initialContent = new AboutUs({
        heading: 'About Us',
        description: 'Mwnam Social Welfare and Entertainment Foundation is a non-profit organization dedicated to uplifting communities through impactful social work, awareness campaigns, and engaging entertainment-driven education.',
        stats: [
          { value: '5,000+', title: 'People Impacte' },
          { value: '120+', title: 'Events Organized' },
          { value: '250+', title: 'Active Volunteers' },
        ],
      });
      await initialContent.save();
      return res.json(initialContent);
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT: Update the About Us content (Admin only)
router.put('/', isAdmin, async (req, res) => {
  try {
    const updatedContent = await AboutUs.findOneAndUpdate({}, req.body, {
      new: true, // Return the updated document
      upsert: true, // Create it if it doesn't exist
    });
    res.json(updatedContent);
  } catch (err) {
    res.status(400).json({ message: 'Error updating content' });
  }
});

module.exports = router; // Changed from export default