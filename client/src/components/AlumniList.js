import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AlumniList = ({ alumni, setFormData, setIsEditing, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlumni = alumni.filter((person) => {
    const term = searchTerm.toLowerCase();
    return (
      person.name.toLowerCase().includes(term) ||
      person.batch.toLowerCase().includes(term) ||
      person.company.toLowerCase().includes(term)
    );
  });

  const handleEdit = (person) => {
    setFormData(person);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/alumni/${id}`)
      .then(() => {
        toast.success('Alumni deleted');
        onDelete();
      })
      .catch(() => toast.error('Error deleting alumni'));
  };

  return (
    <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto' }}>
      <h2 style={{ color: '#5A374B', textAlign: 'center', marginBottom: '20px' }}>Alumni Directory</h2>

      <input
        type="text"
        placeholder="Search by name, batch, or company"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={inputStyle}
      />

      {filteredAlumni.length === 0 ? (
        <p style={{ color: '#7A5E6B', textAlign: 'center' }}>No matching alumni found.</p>
      ) : (
        filteredAlumni.map((person) => (
          <div key={person._id} style={cardStyle}>
            <h3>{person.name}</h3>
            <p><strong>Batch:</strong> {person.batch}</p>
            <p><strong>Company:</strong> {person.company}</p>
            <p><strong>Bio:</strong> {person.bio}</p>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              LinkedIn
            </a>
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
              <button onClick={() => handleEdit(person)} style={editBtn}>Edit</button>
              <button onClick={() => handleDelete(person._id)} style={deleteBtn}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '20px',
  borderRadius: '12px',
  border: '1px solid rgba(244, 167, 185, 0.4)',
  background: '#FFF5F8',
  color: '#5A374B'
};


const cardStyle = {
  background: 'rgba(255, 255, 255, 0.85)',
  borderRadius: '25px',
  padding: '30px',
  margin: '20px 0',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 10px 30px rgba(244, 167, 185, 0.3)',
  border: '1px solid rgba(18, 169, 220, 0.73)',
  color: '#5A374B'
};

const linkStyle = {
  color: '#F4A7B9',
  textDecoration: 'none',
  fontWeight: 'bold'
};

const editBtn = {
  padding: '8px 16px',
  borderRadius: '10px',
  border: 'none',
  background: '#12A9DC',
  color: 'white',
  cursor: 'pointer',
  fontWeight: '500'
};

const deleteBtn = {
  padding: '8px 16px',
  borderRadius: '10px',
  border: 'none',
  background: '#F25C5C',
  color: 'white',
  cursor: 'pointer',
  fontWeight: '500'
};
export default AlumniList;