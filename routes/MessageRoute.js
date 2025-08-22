const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const authMiddleware = require('../middlewares/auth'); // We will create this next

// @route   POST /api/messages
// @desc    Submit a new contact message
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  try {
    const newMessage = new Message({ name, email, phone, subject, message });
    await newMessage.save();
    res.status(201).json({ msg: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/messages
// @desc    Get all messages
// @access  Private (Admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;