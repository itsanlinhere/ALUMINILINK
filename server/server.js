require('dotenv').config(); // Load .env variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect('mongodb://localhost:27017/aluminilink', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// ✅ Alumni Schema
const alumniSchema = new mongoose.Schema({
  name: String,
  email: String,
  batch: String,
  company: String,
  linkedin: String,
  bio: String
});

const Alumni = mongoose.model('Alumni', alumniSchema);

// ✅ CRUD Routes

app.get('/api/alumni', async (req, res) => {
  const alumni = await Alumni.find();
  res.json(alumni);
});

app.post('/api/alumni', async (req, res) => {
  try {
    const newAlum = new Alumni(req.body);
    await newAlum.save();
    res.status(201).json(newAlum);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add alumni' });
  }
});

app.put('/api/alumni/:id', async (req, res) => {
  try {
    const updated = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update alumni' });
  }
});

app.delete('/api/alumni/:id', async (req, res) => {
  try {
    await Alumni.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete alumni' });
  }
});

// ✅ Support Request Email Route
app.post('/api/support-request', async (req, res) => {
  const { to, name, senderEmail, interest, type, message, linkedin } = req.body;

  console.log('Sending email to:', to);
  console.log('Using user:', process.env.EMAIL_USER);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // ✅ SSL port
    secure: true, // ✅ Use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    replyTo: senderEmail,
    subject: `Support Request: ${type}`,
    text: `Hi ${name},

Someone is requesting ${type} support.

Area of Interest: ${interest}
Message: ${message || 'No message provided'}

You can reply directly to: ${senderEmail}

LinkedIn Profile: ${linkedin || 'Not available'}

Thanks,
AlumniLink`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).send({ error: 'Email failed to send' });
  }
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});