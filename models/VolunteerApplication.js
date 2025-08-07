const mongoose = require('mongoose');

const VolunteerApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true },
  phone:    { type: String, required: true },
  areaOfInterest: { type: String, required: true },
  availability: [{ type: String, enum: ['Weekdays', 'Weekends', 'Remote'] }],
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VolunteerApplication', VolunteerApplicationSchema);
