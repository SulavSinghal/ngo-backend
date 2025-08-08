// models/TeamMember.js
const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String },
  socials: {
    linkedin: String,
    twitter: String,
    email: String
  },
  image: { type: String }
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
