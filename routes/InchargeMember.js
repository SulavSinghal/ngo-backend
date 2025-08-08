const express = require('express');
const router = express.Router();
const ExecutiveMember = require('../models/InchargeMember');
const multer = require('multer');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Create (add new member)
router.post('/', upload.single('image'), async (req, res) => {
  const { name, title, bio, linkedin, twitter, email } = req.body;
  const socials = { linkedin, twitter, email };
  const image = req.file ? req.file.filename : '';
  const member = new ExecutiveMember({ name, title, bio, socials, image });
  await member.save();
  res.status(201).json(member);
});

// Read all
router.get('/', async (req, res) => {
  const members = await ExecutiveMember.find();
  res.json(members);
});

// Update member (with optional image)
router.put('/:id', upload.single('image'), async (req, res) => {
  const updates = { ...req.body };
  updates.socials = {
    linkedin: req.body.linkedin,
    twitter: req.body.twitter,
    email: req.body.email
  };
  if (req.file) updates.image = req.file.filename;
  const member = await ExecutiveMember.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json(member);
});

// Delete member
router.delete('/:id', async (req, res) => {
  await ExecutiveMember.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
