import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AlumniForm = ({ formData, setFormData, isEditing, setIsEditing, onAdd }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      batch: '',
      company: '',
      linkedin: '',
      bio: ''
    });
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/.*$/i;

    if (!formData.name || !formData.email || !formData.batch || !formData.company) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid email format.');
      return;
    }
    if (formData.linkedin && !linkedinRegex.test(formData.linkedin)) {
      toast.error('Invalid LinkedIn URL.');
      return;
    }

    const request = isEditing
      ? axios.put(`/api/alumni/${formData._id}`, formData)
      : axios.post('/api/alumni', formData);

    request
      .then(() => {
        toast.success(isEditing ? 'Alumni updated!' : 'Alumni added!');
        resetForm();
        onAdd();
      })
      .catch(() => toast.error('Error saving alumni'));
  };

  return (
    <form onSubmit={handleSubmit} style={{ ...formStyle }}>
      <h2 style={{ textAlign: 'center' }}>{isEditing ? 'Edit Alumni' : 'Add New Alumni'}</h2>
      {['name', 'email', 'batch', 'company', 'linkedin', 'bio'].map((field) => (
        <div key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label><br />
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required={['name', 'email', 'batch', 'company'].includes(field)}
            style={inputStyle}
          /><br />
        </div>
      ))}
      <button type="submit" style={buttonStyle}>
        {isEditing ? 'Update' : 'Submit'}
      </button>
    </form>
  );
};

const formStyle = {
  background: 'rgba(255, 255, 255, 0.85)',
  borderRadius: '25px',
  padding: '40px',
  margin: '20px auto',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 10px 30px rgba(244, 167, 185, 0.3)',
  border: '1px solid rgba(18, 169, 220, 0.73)',
  color: '#5A374B',
  maxWidth: '400px',
  width: '100%',
  gap: '15px',
  display: 'flex',
  flexDirection: 'column'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '12px',
  border: '1px solid rgba(244, 167, 185, 0.4)',
  background: '#FFF5F8',
  color: '#5A374B'
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '15px',
  border: 'none',
  background: '#F4A7B9',
  color: 'white',
  cursor: 'pointer',
  width: '100%',
  transition: '0.3s',
  fontWeight: '600',
  boxShadow: '0 4px 10px rgba(244,167,185,0.4)'
};

export default AlumniForm;