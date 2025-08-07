const express = require('express');
const VolunteerApplication = require('../models/VolunteerApplication');

const router = express.Router();

// Submit application
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, areaOfInterest, availability } = req.body;
    const newApplication = new VolunteerApplication({ fullName, email, phone, areaOfInterest, availability });
    await newApplication.save();
    res.status(201).json({ message: 'Application submitted!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all applications (Admin)
router.get('/', async (req, res) => {
  const apps = await VolunteerApplication.find().sort({ submittedAt: -1 });
  res.json(apps);
});

module.exports = router;
