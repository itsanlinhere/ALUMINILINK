const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');

// Create new alumni
router.post('/', async (req, res) => {
  try {
    const newAlumni = new Alumni(req.body);
    await newAlumni.save();
    res.status(201).json(newAlumni);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all alumni
router.get('/', async (req, res) => {
  try {
    const alumniList = await Alumni.find();
    res.json(alumniList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;