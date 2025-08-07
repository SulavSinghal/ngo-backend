const mongoose = require('mongoose');

const VolunteerStorySchema = new mongoose.Schema({
  name: { type: String, required: true },           // e.g., 'Aarti D.'
  role: { type: String, required: true },           // e.g., 'Volunteer since 2022'
  quote: { type: String, required: true },          // Their story/quote
  imageUrl: { type: String},       // Path to uploaded image
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VolunteerStory', VolunteerStorySchema);
