const express = require('express');
const router = express.Router();
const ContactInfo = require('../models/ContactInfo');
const authMiddleware = require('../middlewares/auth');

// @route   GET /api/contact-info
// @desc    Get the contact information
// @access  Public
router.get('/', async (req, res) => {
  try {
    const info = await ContactInfo.getSingleton();
    res.json(info);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/contact-info
// @desc    Update the contact information
// @access  Private (Admin only)
router.put('/', authMiddleware, async (req, res) => {
    try {
        const updatedInfo = await ContactInfo.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(updatedInfo);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;