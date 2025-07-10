// Specifications.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api/productAPI';

const Specifications = ({ subcategory, onBack }) => {
  const [specifications, setSpecifications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    spec_name: '',
    spec_type: 'select',
    spec_options: [],
    is_required: false,
    affects_price: false,
    display_order: 0
  });
  const [optionInput, setOptionInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (subcategory) {
      fetchSpecifications();
    }
  }, [subcategory]);

  const fetchSpecifications = async () => {
    setLoading(true);
    try {
      const data = await api.get(`/subcategories/${subcategory.subcategory_id}/specifications`);
      setSpecifications(data);
      setError('');
    } catch (error) {
      console.error('Error fetching specifications:', error);
      setError('Failed to fetch specifications');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.spec_name.trim()) {
      setError('Specification name is required');
      return;
    }
    
    if (formData.spec_type === 'select' && formData.spec_options.length === 0) {
      setError('At least one option is required for select type');
      return;
    }
    
    setLoading(true);
    try {
      await api.post(`/subcategories/${subcategory.subcategory_id}/specifications`, formData);
      setFormData({
        spec_name: '',
        spec_type: 'select',
        spec_options: [],
        is_required: false,
        affects_price: false,
        display_order: 0
      });
      setOptionInput('');
      setShowForm(false);
      setError('');
      fetchSpecifications();
    } catch (error) {
      console.error('Error creating specification:', error);
      setError('Failed to create specification');
    } finally {
      setLoading(false);
    }
  };

  const addOption = () => {
    if (optionInput.trim() && !formData.spec_options.includes(optionInput.trim())) {
      setFormData({
        ...formData,
        spec_options: [...formData.spec_options, optionInput.trim()]
      });
      setOptionInput('');
    }
  };

  const removeOption = (index) => {
    setFormData({
      ...formData,
      spec_options: formData.spec_options.filter((_, i) => i !== index)
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      spec_name: '',
      spec_type: 'select',
      spec_options: [],
      is_required: false,
      affects_price: false,
      display_order: 0
    });
    setOptionInput('');
    setError('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <button 
        onClick={onBack}
        style={{ marginBottom: '20px', backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '5px 10px' }}
      >
        ← Back to Subcategories
      </button>
      
      <h2>{subcategory.name} - Specifications</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>{subcategory.description}</p>
      
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
        Add Specification
      </button>
      
      {showForm && (
        <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', backgroundColor: '#f9f9f9' }}>
          <h3>Add New Specification</h3>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Name *:</label>
            <input
              type="text"
              value={formData.spec_name}
              onChange={(e) => setFormData({ ...formData, spec_name: e.target.value })}
              style={{ width: '100%', padding: '5px' }}
              placeholder="Enter specification name"
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Type:</label>
            <select
              value={formData.spec_type}
              onChange={(e) => setFormData({ ...formData, spec_type: e.target.value, spec_options: [] })}
              style={{ width: '100%', padding: '5px' }}
            >
              <option value="select">Select (Dropdown)</option>
              <option value="text">Text Input</option>
              <option value="number">Number Input</option>
              <option value="boolean">Boolean (Yes/No)</option>
            </select>
          </div>
          
          {formData.spec_type === 'select' && (
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Options:</label>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <input
                  type="text"
                  value={optionInput}
                  onChange={(e) => setOptionInput(e.target.value)}
                  placeholder="Enter option"
                  style={{ flex: 1, padding: '5px', marginRight: '5px' }}
                  onKeyPress={(e) => e.key === 'Enter' && addOption()}
                />
                <button onClick={addOption} type="button">Add</button>
              </div>
              <div>
                {formData.spec_options.map((option, index) => (
                  <span 
                    key={index} 
                    style={{ 
                      display: 'inline-block',
                      margin: '2px', 
                      padding: '3px 8px', 
                      backgroundColor: '#e9ecef',
                      border: '1px solid #ccc',
                      borderRadius: '3px'
                    }}
                  >
                    {option}
                    <button 
                      onClick={() => removeOption(index)}
                      style={{ marginLeft: '5px', border: 'none', background: 'none', color: 'red' }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={formData.is_required}
                onChange={(e) => setFormData({ ...formData, is_required: e.target.checked })}
                style={{ marginRight: '5px' }}
              />
              Required field
            </label>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={formData.affects_price}
                onChange={(e) => setFormData({ ...formData, affects_price: e.target.checked })}
                style={{ marginRight: '5px' }}
              />
              Affects pricing
            </label>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Display Order:</label>
            <input
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              style={{ width: '100px', padding: '5px' }}
              min="0"
            />
          </div>
          
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            style={{ marginRight: '10px' }}
          >
            {loading ? 'Creating...' : 'Create Specification'}
          </button>
          <button onClick={handleCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      )}

      {loading && !showForm && <div>Loading specifications...</div>}

      {specifications.length === 0 && !loading ? (
        <p>No specifications found. Create your first specification!</p>
      ) : (
        <table style={{ width: '100%', border: '1px solid #ccc', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Type</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Options</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Required</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Affects Price</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Order</th>
            </tr>
          </thead>
          <tbody>
            {specifications.map(spec => (
              <tr key={spec.template_id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{spec.spec_name}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{spec.spec_type}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {spec.spec_options ? spec.spec_options.join(', ') : '-'}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {spec.is_required ? 'Yes' : 'No'}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {spec.affects_price ? 'Yes' : 'No'}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{spec.display_order}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Specifications;