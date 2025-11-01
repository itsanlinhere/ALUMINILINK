import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AlumniForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    batch: '',
    company: '',
    linkedin: '',
    bio: ''
  });

  const { name, email, batch, company, linkedin, bio } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!name || !email || !batch || !company) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    if (linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(linkedin)) {
      toast.error('Please enter a valid LinkedIn URL');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/alumni', {
        name, email, batch, company, linkedin, bio
      });
      toast.success('Alumni added successfully');
      setFormData({
        name: '',
        email: '',
        batch: '',
        company: '',
        linkedin: '',
        bio: ''
      });
      onAdd(response.data);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Server error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="alumni-form">
      <input type="text" name="name" value={name} onChange={handleChange} placeholder="Name" />
      <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" />
      <input type="text" name="batch" value={batch} onChange={handleChange} placeholder="Batch" />
      <input type="text" name="company" value={company} onChange={handleChange} placeholder="Company" />
      <input type="text" name="linkedin" value={linkedin} onChange={handleChange} placeholder="LinkedIn URL" />
      <textarea name="bio" value={bio} onChange={handleChange} placeholder="Short Bio" />
      <button type="submit">Add Alumni</button>
    </form>
  );
}

export default AlumniForm;