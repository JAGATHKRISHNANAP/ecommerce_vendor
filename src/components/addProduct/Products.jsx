import React, { useState, useEffect } from 'react';
import { api } from '../../services/api/productAPI';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    subcategory_id: '',
    specifications: {},
    base_price: '',
    stock_quantity: 0,
    sku: '',
    group_id: '',
    created_by: 'admin'
  });
  const [viewingProduct, setViewingProduct] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [customSpecs, setCustomSpecs] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await api.get('/products?group_by_variants=false');
      setProducts(data.products || []);
      setError('');
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await api.get('/categories');
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = async (categoryId) => {
    setFormData({ ...formData, category_id: categoryId, subcategory_id: '', specifications: {} });
    setSubcategories([]);
    setSpecifications([]);
    setCustomSpecs([]);

    if (categoryId) {
      try {
        const data = await api.get(`/categories/${categoryId}/subcategories`);
        setSubcategories(data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    }
  };

  const handleSubcategoryChange = async (subcategoryId) => {
    setFormData({ ...formData, subcategory_id: subcategoryId, specifications: {} });
    setSpecifications([]);
    setCustomSpecs([]);

    if (subcategoryId) {
      try {
        const data = await api.get(`/subcategories/${subcategoryId}/specifications`);
        setSpecifications(data);
      } catch (error) {
        console.error('Error fetching specifications:', error);
      }
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file, index) => ({
      id: Date.now() + index,
      file,
      preview: URL.createObjectURL(file),
      isPrimary: images.length === 0 && index === 0
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (id) => {
    setImages(prevImages => {
      const filtered = prevImages.filter(img => img.id !== id);
      if (filtered.length > 0 && !filtered.some(img => img.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
  };

  const setPrimaryImage = (id) => {
    setImages(prevImages =>
      prevImages.map(img => ({ ...img, isPrimary: img.id === id }))
    );
  };

  const handleEdit = async (product) => {
    setEditingId(product.product_id);
    setFormData({
      name: product.name,
      description: product.description || '',
      category_id: product.category_id,
      subcategory_id: product.subcategory_id,
      specifications: product.specifications || {},
      base_price: (product.base_price / 100).toString(),
      stock_quantity: product.stock_quantity,
      sku: product.sku || '',
      group_id: product.group_id || '',
      created_by: product.created_by
    });

    // Populate dropdowns and fetch existing images
    setLoading(true);
    try {
      if (product.category_id) {
        const subData = await api.get(`/categories/${product.category_id}/subcategories`);
        setSubcategories(subData);
      }
      if (product.subcategory_id) {
        const specData = await api.get(`/subcategories/${product.subcategory_id}/specifications`);
        setSpecifications(specData);
      }
      const imgData = await api.get(`/products/${product.product_id}/images`);
      setExistingImages(imgData.images || []);

      // Separate existing specs into template and custom
      const existingProductSpecs = product.specifications || {};
      const templateSpecNames = [];

      // Need correct list effectively, specData fetched above works but is local scope. 
      // We will rely on spec names from backend.
      let currentTemplateSpecs = [];
      if (product.subcategory_id) {
        try {
          const specData = await api.get(`/subcategories/${product.subcategory_id}/specifications`);
          setSpecifications(specData);
          specData.forEach(s => templateSpecNames.push(s.spec_name));
        } catch (e) {
          console.error("Error fetching specs for edit:", e);
        }
      }

      const newCustomSpecs = [];
      Object.entries(existingProductSpecs).forEach(([key, value]) => {
        if (!templateSpecNames.includes(key)) {
          newCustomSpecs.push({ key, value });
        }
      });
      setCustomSpecs(newCustomSpecs);

    } catch (e) {
      console.error("Error preparing edit form:", e);
    } finally {
      setLoading(false);
    }

    setImages([]); // Clear new images upload queue
    setShowForm(true);
  };

  const handleViewDetails = (product) => {
    setViewingProduct(product);
  };

  const closeViewDetails = () => {
    setViewingProduct(null);
  };

  const handleDeleteImage = async (imageId) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      await api.delete(`/products/${editingId}/images/${imageId}`);
      // Refresh images
      const imgData = await api.get(`/products/${editingId}/images`);
      setExistingImages(imgData.images || []);
    } catch (e) {
      console.error("Failed to delete image:", e);
      alert("Failed to delete image");
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) { setError('Product name is required'); return; }
    if (!formData.category_id) { setError('Category is required'); return; }
    if (!formData.subcategory_id) { setError('Subcategory is required'); return; }
    if (!formData.base_price || formData.base_price <= 0) { setError('Valid base price is required'); return; }

    const requiredSpecs = specifications.filter(spec => spec.is_required);
    for (const spec of requiredSpecs) {
      if (!formData.specifications[spec.spec_name]) {
        setError(`${spec.spec_name} is required`);
        return;
      }
    }

    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('description', formData.description || '');
      submitData.append('category_id', formData.category_id.toString());
      submitData.append('subcategory_id', formData.subcategory_id.toString());

      // Merge custom specs into specifications
      const finalSpecs = { ...formData.specifications };
      customSpecs.forEach(spec => {
        if (spec.key && spec.value) {
          finalSpecs[spec.key] = spec.value;
        }
      });
      submitData.append('specifications', JSON.stringify(finalSpecs));

      submitData.append('base_price', (parseInt(formData.base_price) * 100).toString());
      submitData.append('stock_quantity', (parseInt(formData.stock_quantity) || 0).toString());
      submitData.append('sku', formData.sku || '');
      submitData.append('group_id', formData.group_id || '');
      submitData.append('created_by', formData.created_by);
      submitData.append('is_active', 'true');

      // Sort images so primary is first (backend takes the first one as primary for new products)
      const sortedImages = [...images].sort((a, b) => (a.isPrimary ? -1 : b.isPrimary ? 1 : 0));
      // jagath
      sortedImages.forEach((image) => {
        submitData.append('images', image.file);
      });

      const url = editingId
        ? `http://localhost:8000/api/v1/products/${editingId}`
        : 'http://localhost:8000/api/v1/products';

      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        body: submitData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
      }

      setFormData({
        name: '', description: '', category_id: '', subcategory_id: '',
        specifications: {}, base_price: '', stock_quantity: 0, sku: '', group_id: '', created_by: 'admin'
      });
      setImages([]);
      setExistingImages([]);
      setEditingId(null);
      setSubcategories([]);
      setSpecifications([]);
      setCustomSpecs([]);
      setShowForm(false);
      setError('');
      fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
      setError(error.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      name: '', description: '', category_id: '', subcategory_id: '',
      specifications: {}, base_price: '', stock_quantity: 0, sku: '', group_id: '', created_by: 'admin'
    });
    setImages([]);
    setExistingImages([]);
    setEditingId(null);
    setSubcategories([]);
    setSpecifications([]);
    setCustomSpecs([]);
    setError('');
  };

  const handleSpecificationChange = (specName, value) => {
    setFormData({
      ...formData,
      specifications: { ...formData.specifications, [specName]: value }
    });
  };

  const handleCustomSpecChange = (index, field, value) => {
    const newCustomSpecs = [...customSpecs];
    newCustomSpecs[index][field] = value;
    setCustomSpecs(newCustomSpecs);
  };

  const addCustomSpec = () => {
    setCustomSpecs([...customSpecs, { key: '', value: '' }]);
  };

  const removeCustomSpec = (index) => {
    const newCustomSpecs = customSpecs.filter((_, i) => i !== index);
    setCustomSpecs(newCustomSpecs);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Products</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <button onClick={() => setShowForm(true)} disabled={loading} style={{ marginBottom: '20px', padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Add Product</button>

      {showForm && (
        <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Name *:</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '5px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>SKU:</label>
              <input type="text" value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} style={{ width: '100%', padding: '5px' }} />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Group ID (Optional - for grouping variants):</label>
            <input type="text" value={formData.group_id} onChange={(e) => setFormData({ ...formData, group_id: e.target.value })} placeholder="Enter same ID for related products" style={{ width: '100%', padding: '5px' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', padding: '5px', height: '60px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Category *:</label>
              <select value={formData.category_id} onChange={(e) => handleCategoryChange(e.target.value)} style={{ width: '100%', padding: '5px' }}>
                <option value="">Select Category</option>
                {categories.map(cat => <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Subcategory *:</label>
              <select value={formData.subcategory_id} onChange={(e) => handleSubcategoryChange(e.target.value)} disabled={!formData.category_id} style={{ width: '100%', padding: '5px' }}>
                <option value="">Select Subcategory</option>
                {subcategories.map(sub => <option key={sub.subcategory_id} value={sub.subcategory_id}>{sub.name}</option>)}
              </select>
            </div>
          </div>

          {specifications.length > 0 && (
            <div style={{ marginBottom: '15px' }}>
              <h4>Specifications:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {specifications.map(spec => (
                  <div key={spec.template_id}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>{spec.spec_name} {spec.is_required && '*'}</label>
                    {spec.spec_type === 'select' ? (
                      <select value={formData.specifications[spec.spec_name] || ''} onChange={(e) => handleSpecificationChange(spec.spec_name, e.target.value)} style={{ width: '100%', padding: '5px' }}>
                        <option value="">Select {spec.spec_name}</option>
                        {spec.spec_options?.map(option => <option key={option} value={option}>{option}</option>)}
                      </select>
                    ) : (
                      <input type="text" value={formData.specifications[spec.spec_name] || ''} onChange={(e) => handleSpecificationChange(spec.spec_name, e.target.value)} style={{ width: '100%', padding: '5px' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <h4>Additional Specifications:</h4>
            {customSpecs.map((spec, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Name (e.g. Material)"
                  value={spec.key}
                  onChange={(e) => handleCustomSpecChange(index, 'key', e.target.value)}
                  style={{ flex: 1, padding: '5px' }}
                />
                <input
                  type="text"
                  placeholder="Value (e.g. Cotton)"
                  value={spec.value}
                  onChange={(e) => handleCustomSpecChange(index, 'value', e.target.value)}
                  style={{ flex: 1, padding: '5px' }}
                />
                <button onClick={() => removeCustomSpec(index)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px' }}>Remove</button>
              </div>
            ))}
            <button onClick={addCustomSpec} style={{ background: '#17a2b8', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px' }}>+ Add Specification</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Base Price (₹) *:</label>
              <input type="number" value={formData.base_price} onChange={(e) => setFormData({ ...formData, base_price: e.target.value })} style={{ width: '100%', padding: '5px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Stock Quantity:</label>
              <input type="number" value={formData.stock_quantity} onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })} style={{ width: '100%', padding: '5px' }} />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Images:</label>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
              {images.map(image => (
                <div key={image.id} style={{ position: 'relative', border: image.isPrimary ? '2px solid blue' : '1px solid #ccc' }}>
                  <img src={image.preview} alt="preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                  <button onClick={() => removeImage(image.id)} style={{ position: 'absolute', top: 0, right: 0, background: 'red', color: 'white' }}>x</button>
                  {/* Fixed style for readability */}
                  <button onClick={() => setPrimaryImage(image.id)} style={{ position: 'absolute', bottom: 0, left: 0, fontSize: '10px', background: 'rgba(255,255,255,0.8)', border: '1px solid #ccc' }}>Set Primary</button>
                </div>
              ))}
            </div>
          </div>

          {editingId && existingImages.length > 0 && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Existing Images:</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {existingImages.map(img => (
                  <div key={img.image_id} style={{ position: 'relative', border: img.is_primary ? '2px solid blue' : '1px solid #ccc' }}>
                    <img src={img.image_url} alt={img.filename} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                    <button onClick={() => handleDeleteImage(img.image_id)} style={{ position: 'absolute', top: 0, right: 0, background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>x</button>
                    {img.is_primary && <span style={{ position: 'absolute', bottom: 0, left: 0, background: 'blue', color: 'white', fontSize: '10px', padding: '2px' }}>Primary</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={handleSubmit} style={{ marginRight: '10px', padding: '10px 20px', background: '#28a745', color: 'white', border: 'none' }}>{editingId ? 'Update' : 'Create'}</button>
          <button onClick={handleCancel} style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none' }}>Cancel</button>
        </div>
      )}

      {loading && !showForm && <div>Loading products...</div>}

      {!loading && products.length === 0 && <p>No products found.</p>}

      {
        !loading && products.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', border: '1px solid #ddd' }}>
            <thead style={{ background: '#f8f9fa' }}>
              <tr>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Image</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>SKU</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Price</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Stock</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Color/Specs</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.product_id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {product.primary_image_url && <img src={product.primary_image_url} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.sku}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>₹{(product.base_price / 100).toFixed(2)}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.stock_quantity}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {/* Display specs like Color for differentiation */}
                    {product.specifications && Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key}><small><b>{key}:</b> {val}</small></div>
                    ))}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    <button onClick={() => handleEdit(product)} style={{ marginRight: '5px', padding: '5px 10px', background: '#ffc107', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleViewDetails(product)} style={{ padding: '5px 10px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
      {
        viewingProduct && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
              <h3>Product Details</h3>
              <p><b>Name:</b> {viewingProduct.name}</p>
              <p><b>SKU:</b> {viewingProduct.sku}</p>
              <p><b>Price:</b> ₹{(viewingProduct.base_price / 100).toFixed(2)}</p>
              <p><b>Stock:</b> {viewingProduct.stock_quantity}</p>
              <p><b>Category:</b> {categories.find(c => c.category_id === viewingProduct.category_id)?.name}</p>
              <p><b>Description:</b> {viewingProduct.description}</p>
              <div>
                <b>specifications:</b>
                <ul>
                  {viewingProduct.specifications && Object.entries(viewingProduct.specifications).map(([key, val]) => (
                    <li key={key}>{key}: {val}</li>
                  ))}
                </ul>
              </div>
              {viewingProduct.primary_image_url && (
                <div>
                  <img src={viewingProduct.primary_image_url} alt="Primary" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </div>
              )}
              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <button onClick={closeViewDetails} style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>Close</button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default Products;