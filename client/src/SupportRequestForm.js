import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './SupportRequestForm.css';

function SupportRequestForm({ recipient, onClose }) {
  const [formData, setFormData] = useState({
    senderEmail: '',
    interest: '',
    type: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/support-request', {
        to: recipient.email,
        name: recipient.name,
        linkedin: recipient.linkedin,
        senderEmail: formData.senderEmail,
        interest: formData.interest,
        type: formData.type,
        message: formData.message
      });
      toast.success('Support request sent successfully!');
      onClose();
    } catch (err) {
      toast.error('Failed to send support request');
    }
  };

  return (
    <div className="support-form">
      <h3>Request Support from {recipient.name}</h3>
      <form onSubmit={handleSubmit}>
        <label>Your Email</label>
        <input
          type="email"
          name="senderEmail"
          value={formData.senderEmail}
          onChange={handleChange}
          required
        />

        <label>Area of Interest</label>
        <input
          type="text"
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          required
        />

        <label>Type of Support</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Mentorship">Mentorship</option>
          <option value="Networking">Networking</option>
          <option value="Guidance">Guidance</option>
        </select>

        <label>Message (optional)</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
        />

        <div className="form-buttons">
          <button type="submit">Send Request</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default SupportRequestForm;