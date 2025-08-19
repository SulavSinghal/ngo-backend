const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const authMiddleware = require('../middlewares/auth');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const admin = new Admin({ email, password });
    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login route example
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Sign JWT with a properly set JWT_SECRET from .env
    const token = jwt.sign({ id: admin._id.toString() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
    res.status(200).json({
      token,
      user: { id: admin._id.toString(), email: admin.email }
    });
  } catch (error) {
    console.error('JWT Sign Error:', error);
    res.status(500).json({ message: "Server error" });
  }
});

// Optional verify endpoint for the admin panel
router.get('/verify-admin', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('email _id');
    if (!admin) return res.status(401).json({ valid: false });
    return res.json({ valid: true, user: { id: admin._id.toString(), email: admin.email } });
  } catch (error) {
    return res.status(500).json({ valid: false });
  }
});


router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
