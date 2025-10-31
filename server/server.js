const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Alumni = require('./models/Alumni'); // Make sure this path is correct

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Get all alumni
app.get('/api/alumni', async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.json(alumni);
  } catch (err) {
    console.error('Error fetching alumni:', err.message);
    res.status(500).json({ error: 'Failed to fetch alumni' });
  }
});

// Create new alumni
app.post('/api/alumni', async (req, res) => {
  try {
    const newAlumni = new Alumni(req.body);
    await newAlumni.save();
    res.status(201).json(newAlumni);
  } catch (err) {
    console.error('Validation error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Update alumni
app.put('/api/alumni/:id', async (req, res) => {
  try {
    const updated = await Alumni.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json(updated);
  } catch (err) {
    console.error('Validation error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Delete alumni
app.delete('/api/alumni/:id', async (req, res) => {
  try {
    await Alumni.findByIdAndDelete(req.params.id);
    res.json({ message: 'Alumni deleted' });
  } catch (err) {
    console.error('Error deleting alumni:', err.message);
    res.status(500).json({ error: 'Failed to delete alumni' });
  }
});

// Connect to MongoDB and start server
mongoose.connect('mongodb://localhost:27017/aluminilink')
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
  })
  .catch(err => console.error('MongoDB connection error:', err));