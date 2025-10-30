const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/aluminilink', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Mongoose Schema
const alumniSchema = new mongoose.Schema({
  name: String,
  email: String,
  batch: String,
  company: String,
  linkedin: String,
  bio: String
});

const Alumni = mongoose.model('Alumni', alumniSchema);

// Routes
app.get('/api/alumni', async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.json(alumni);
  } catch (err) {
    console.error('Error fetching alumni:', err);
    res.status(500).json({ error: 'Failed to fetch alumni' });
  }
});

app.post('/api/alumni', async (req, res) => {
  try {
    const newAlumni = new Alumni(req.body);
    await newAlumni.save();
    res.status(201).json(newAlumni);
  } catch (err) {
    console.error('Error saving alumni:', err);
    res.status(500).json({ error: 'Failed to save alumni' });
  }
});

// Server Start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});