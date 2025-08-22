const mongoose = require('mongoose');

const ContactInfoSchema = new mongoose.Schema({
  location: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  workingHours: {
    mondayFriday: { type: String, required: true },
    saturday: { type: String, required: true },
    sunday: { type: String, required: true },
  },
  socialLinks: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    youtube: { type: String },
  },
});

// Create a single, identifiable document for easier updates
ContactInfoSchema.statics.getSingleton = function() {
  return this.findOneAndUpdate({}, {}, { upsert: true, new: true, setDefaultsOnInsert: true });
};


module.exports = mongoose.model('ContactInfo', ContactInfoSchema);