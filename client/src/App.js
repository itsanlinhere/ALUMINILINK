import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlumniForm from './AlumniForm';
import AlumniList from './AlumniList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [alumni, setAlumni] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    batch: '',
    company: '',
    linkedin: '',
    bio: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchAlumni = () => {
    axios.get('/api/alumni')
      .then(res => setAlumni(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  return (
    <div style={{ padding: '40px', background: '#FDF6F9', minHeight: '100vh' }}>
      <ToastContainer position="top-center" autoClose={3000} />
      <AlumniForm
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onAdd={fetchAlumni}
      />
      <AlumniList
        alumni={alumni}
        setFormData={setFormData}
        setIsEditing={setIsEditing}
        onDelete={fetchAlumni}
      />
    </div>
  );
};

export default App;