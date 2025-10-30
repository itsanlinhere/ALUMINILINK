const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  batch: String,
  company: String,
  linkedin: String,
  bio: String,
});

module.exports = mongoose.model('Alumni', alumniSchema);