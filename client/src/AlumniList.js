import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SupportRequestForm from './SupportRequestForm';
import './AlumniList.css';

function AlumniList({ alumni, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [requestingSupport, setRequestingSupport] = useState(null);

  // Group alumni by company
  const groupedByCompany = alumni.reduce((acc, alum) => {
    const company = alum.company || 'Unknown';
    if (!acc[company]) acc[company] = [];
    acc[company].push(alum);
    return acc;
  }, {});

  const handleEditClick = (alum) => {
    setEditingId(alum._id);
    setEditData(alum);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/alumni/${editingId}`, editData);
      toast.success('Alumni updated');
      onUpdate(res.data);
      setEditingId(null);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Update failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/alumni/${id}`);
      toast.success('Alumni deleted');
      onDelete(id);
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="alumni-list">
      {Object.entries(groupedByCompany).map(([company, group]) => (
        <div key={company} className="company-group">
          <h2 className="company-title">{company}</h2>
          {group.map((alum) => (
            <div key={alum._id} className="alumni-card">
              {editingId === alum._id ? (
                <>
                  <input name="name" value={editData.name} onChange={handleChange} />
                  <input name="email" value={editData.email} onChange={handleChange} />
                  <input name="batch" value={editData.batch} onChange={handleChange} />
                  <input name="company" value={editData.company} onChange={handleChange} />
                  <input name="linkedin" value={editData.linkedin} onChange={handleChange} />
                  <textarea name="bio" value={editData.bio} onChange={handleChange} />
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{alum.name}</h3>
                  <p><strong>Email:</strong> {alum.email}</p>
                  <p><strong>Batch:</strong> {alum.batch}</p>
                  {alum.linkedin && (
                    <p>
                      <strong>LinkedIn:</strong>{' '}
                      <a href={alum.linkedin} target="_blank" rel="noreferrer">
                        View Profile
                      </a>
                    </p>
                  )}
                  {alum.bio && <p><strong>Bio:</strong> {alum.bio}</p>}

                  <button onClick={() => handleEditClick(alum)}>Edit</button>
                  <button onClick={() => handleDelete(alum._id)}>Delete</button>
                  <button onClick={() => setRequestingSupport(alum)}>Request Support</button>

                  {requestingSupport?._id === alum._id && (
                    <SupportRequestForm
                      recipient={alum}
                      onClose={() => setRequestingSupport(null)}
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AlumniList;