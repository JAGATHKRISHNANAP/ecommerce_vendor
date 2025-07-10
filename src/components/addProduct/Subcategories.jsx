// Subcategories.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api/productAPI';

const Subcategories = ({ category, onBack, onSelectSubcategory }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (category) {
      fetchSubcategories();
    }
  }, [category]);

  const fetchSubcategories = async () => {
    setLoading(true);
    try {
      const data = await api.get(`/categories/${category.category_id}/subcategories`);
      setSubcategories(data);
      setError('');
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setError('Failed to fetch subcategories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setError('Subcategory name is required');
      return;
    }
    
    setLoading(true);
    try {
      await api.post(`/categories/${category.category_id}/subcategories`, formData);
      setFormData({ name: '', description: '' });
      setShowForm(false);
      setError('');
      fetchSubcategories();
    } catch (error) {
      console.error('Error creating subcategory:', error);
      setError('Failed to create subcategory');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ name: '', description: '' });
    setError('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <button 
        onClick={onBack}
        style={{ marginBottom: '20px', backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '5px 10px' }}
      >
        ← Back to Categories
      </button>
      
      <h2>{category.name} - Subcategories</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>{category.description}</p>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}
      
      <button 
        onClick={() => setShowForm(true)} 
        disabled={loading}
        style={{ marginBottom: '20px' }}
      >
        Add Subcategory
      </button>
      
      {showForm && (
        <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', backgroundColor: '#f9f9f9' }}>
          <h3>Add New Subcategory</h3>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Name *:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '5px' }}
              placeholder="Enter subcategory name"
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ width: '100%', padding: '5px', height: '60px' }}
              placeholder="Enter subcategory description"
            />
          </div>
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            style={{ marginRight: '10px' }}
          >
            {loading ? 'Creating...' : 'Create Subcategory'}
          </button>
          <button onClick={handleCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      )}

      {loading && !showForm && <div>Loading subcategories...</div>}

      <div>
        {subcategories.length === 0 && !loading ? (
          <p>No subcategories found. Create your first subcategory!</p>
        ) : (
          subcategories.map(subcategory => (
            <div 
              key={subcategory.subcategory_id} 
              style={{ 
                border: '1px solid #ddd', 
                margin: '10px 0', 
                padding: '15px',
                backgroundColor: '#fff'
              }}
            >
              <h3 style={{ margin: '0 0 10px 0' }}>{subcategory.name}</h3>
              <p style={{ margin: '0 0 10px 0', color: '#666' }}>
                {subcategory.description || 'No description'}
              </p>
              <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#999' }}>
                Status: {subcategory.is_active ? 'Active' : 'Inactive'}
              </p>
              <button 
                onClick={() => onSelectSubcategory(subcategory)}
                style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px' }}
              >
                Manage Specifications →
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Subcategories;