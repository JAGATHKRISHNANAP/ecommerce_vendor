// Categories.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api/productAPI';

const Categories = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await api.get('/categories');
      setCategories(data);
      setError('');
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setError('Category name is required');
      return;
    }
    
    setLoading(true);
    try {
      await api.post('/categories', formData);
      setFormData({ name: '', description: '' });
      setShowForm(false);
      setError('');
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
      setError('Failed to create category');
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
      <h2>Categories</h2>
      
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
        Add Category
      </button>
      
      {showForm && (
        <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', backgroundColor: '#f9f9f9' }}>
          <h3>Add New Category</h3>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Name *:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '5px' }}
              placeholder="Enter category name"
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ width: '100%', padding: '5px', height: '60px' }}
              placeholder="Enter category description"
            />
          </div>
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            style={{ marginRight: '10px' }}
          >
            {loading ? 'Creating...' : 'Create Category'}
          </button>
          <button onClick={handleCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      )}

      {loading && !showForm && <div>Loading categories...</div>}

      <div>
        {categories.length === 0 && !loading ? (
          <p>No categories found. Create your first category!</p>
        ) : (
          categories.map(category => (
            <div 
              key={category.category_id} 
              style={{ 
                border: '1px solid #ddd', 
                margin: '10px 0', 
                padding: '15px',
                backgroundColor: '#fff'
              }}
            >
              <h3 style={{ margin: '0 0 10px 0' }}>{category.name}</h3>
              <p style={{ margin: '0 0 10px 0', color: '#666' }}>
                {category.description || 'No description'}
              </p>
              <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#999' }}>
                Status: {category.is_active ? 'Active' : 'Inactive'}
              </p>
              <button 
                onClick={() => onSelectCategory(category)}
                style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px' }}
              >
                Manage Subcategories →
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;