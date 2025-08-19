// models/TeamMember.js
const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  department: { type: String },
  bio: { type: String },
  email: String,
  phone: String,
  linkedin: String,
  socials: {
    linkedin: String,
    twitter: String,
    email: String
  },
  image: { type: String }
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
