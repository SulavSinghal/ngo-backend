const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ADD: Create new team member with image
router.post('/', upload.single('image'), async (req, res) => {
  const { name, title, bio, linkedin, twitter, email, phone, department } = req.body;
  const image = req.file ? req.file.filename : '';
  const socials = { linkedin, twitter, email };
  const member = new TeamMember({ name, title, bio, socials, image, phone, email, linkedin, department });
  await member.save();
  res.json(member);
});

// EDIT: Update member (with optional new image)
router.put('/:id', upload.single('image'), async (req, res) => {
  const updates = { ...req.body };
  if (req.file) updates.image = req.file.filename;
  updates.socials = {
    linkedin: req.body.linkedin,
    twitter: req.body.twitter,
    email: req.body.email
  };
  const member = await TeamMember.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json(member);
});

router.get('/', async (req, res) => {
  const members = await TeamMember.find();
  res.json(members);
});


// Delete team member
router.delete('/:id', async (req, res) => {
  await TeamMember.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
