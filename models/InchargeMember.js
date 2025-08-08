const mongoose = require('mongoose');

const executiveMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String },
  socials: {
    linkedin: String,
    twitter: String,
    email: String
  },
  image: { type: String } // image filename
});

module.exports = mongoose.model('ExecutiveMember', executiveMemberSchema);
