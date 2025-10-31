const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [ /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email' ]
  },
  batch: {
    type: String,
    required: [true, 'Batch is required']
  },
  company: {
    type: String,
    required: [true, 'Company is required']
  },
  linkedin: {
    type: String,
    match: [ /^https?:\/\/(www\.)?linkedin\.com\/.*$/, 'Please enter a valid LinkedIn URL' ]
  },
  bio: {
    type: String
  }
});

module.exports = mongoose.model('Alumni', alumniSchema);