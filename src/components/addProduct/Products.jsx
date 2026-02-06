// Products.jsx with Product Details View
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../services/api/productAPI';

const Products = ({ viewMode = 'list' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [showForm, setShowForm] = useState(viewMode === 'add');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
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

  const resetForm = () => {
    setFormData({
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
    setImages([]);
    setSubcategories([]);
    setSpecifications([]);
    setError('');
    setExistingImages([]);
    setEditingProduct(null);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    setShowForm(viewMode === 'add');
    if (viewMode === 'list') {
      setEditingProduct(null);
      resetForm();
    }
  }, [viewMode]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Fetch 1000 products and disable grouping to show all variants
      const data = await api.get('/products?per_page=1000&group_products=false');
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

  const fetchProductDetails = async (productId) => {
    try {
      setLoading(true);

      // Fetch product details
      const productData = await api.get(`/products/${productId}`);
      setSelectedProduct(productData);

      // Fetch product images
      try {
        const imagesResult = await api.get(`/products/${productId}/images`);
        setProductImages(imagesResult.images || []);
      } catch (imgError) {
        console.error('Error fetching product images:', imgError);
        setProductImages([]);
      }

      setShowDetails(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setError('Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    fetchProductDetails(product.product_id);
  };

  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedProduct(null);
    setProductImages([]);
  };

  const handleCategoryChange = async (categoryId) => {
    setFormData({ ...formData, category_id: categoryId, subcategory_id: '', specifications: {} });
    setSubcategories([]);
    setSpecifications([]);

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

  const removeImage = (id, e) => {
    if (e) e.preventDefault();
    setImages(prevImages => {
      const filtered = prevImages.filter(img => img.id !== id);
      // If we removed the primary image, make the first remaining image primary
      if (filtered.length > 0 && !filtered.some(img => img.isPrimary)) {
        // Create a new object for the first image to avoid mutating the existing one
        const firstImage = { ...filtered[0], isPrimary: true };
        filtered[0] = firstImage;
      }
      return filtered;
    });
  };

  const setPrimaryImage = (id, e) => {
    if (e) e.preventDefault();
    setImages(prevImages =>
      prevImages.map(img => ({ ...img, isPrimary: img.id === id }))
    );
  };

  const handleEditProduct = async (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      category_id: product.category_id,
      subcategory_id: product.subcategory_id,
      specifications: product.specifications || {},
      base_price: (product.base_price / 100).toFixed(2), // Convert cents into rupees
      stock_quantity: product.stock_quantity,
      sku: product.sku || '',
      group_id: product.group_id || '',
      created_by: product.created_by,
      is_active: product.is_active ? 'true' : 'false'
    });

    // Load subcategories for this category
    if (product.category_id) {
      try {
        const data = await api.get(`/categories/${product.category_id}/subcategories`);
        setSubcategories(data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    }

    // Fetch all images for this product
    try {
      const imageData = await api.get(`/products/${product.product_id}/images`);
      setExistingImages(imageData.images || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      setExistingImages([]);
    }

    setImages([]); // Clear new images
    setShowForm(true);
    setError('');
  };

  const deleteExistingImage = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      await api.delete(`/products/${editingProduct.product_id}/images/${imageId}`);
      setExistingImages(prev => prev.filter(img => img.image_id !== imageId));
    } catch (error) {
      console.error('Failed to delete image:', error);
      setError('Failed to delete image');
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name.trim()) {
      setError('Product name is required');
      return;
    }
    if (!formData.category_id) {
      setError('Category is required');
      return;
    }
    if (!formData.subcategory_id) {
      setError('Subcategory is required');
      return;
    }
    if (!formData.base_price || formData.base_price <= 0) {
      setError('Valid base price is required');
      return;
    }

    // Check required specifications
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
      submitData.append('specifications', JSON.stringify(formData.specifications));
      submitData.append('base_price', (parseInt(formData.base_price) * 100).toString());
      submitData.append('stock_quantity', (parseInt(formData.stock_quantity) || 0).toString());
      submitData.append('sku', formData.sku || '');
      submitData.append('group_id', formData.group_id || '');
      submitData.append('created_by', formData.created_by);
      submitData.append('is_active', 'true');

      // Sort images so primary comes first (backend takes the first image as primary)
      const sortedImages = [...images].sort((a, b) => {
        if (a.isPrimary) return -1;
        if (b.isPrimary) return 1;
        return 0;
      });

      sortedImages.forEach((image) => {
        submitData.append('images', image.file);
      });

      let result;

      if (editingProduct) {
        // UPDATE EXISTING PRODUCT
        result = await api.put(`/products/${editingProduct.product_id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log('Product updated successfully');
      } else {
        // CREATE NEW PRODUCT
        result = await api.post('/products', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      console.log('Product saved successfully:', result);

      navigate('/vendor/products');
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      setError(error.detail || error.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/vendor/products');
  };

  const handleSpecificationChange = (specName, value) => {
    setFormData({
      ...formData,
      specifications: { ...formData.specifications, [specName]: value }
    });
  };

  // Product Details Component
  const ProductDetails = () => {
    if (!selectedProduct) return null;

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={handleBackToList}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '20px'
            }}
          >
            ← Back to Products
          </button>
          <h2 style={{ display: 'inline', marginLeft: '10px' }}>{selectedProduct.name}</h2>
        </div>

        {error && (
          <div style={{
            color: 'red',
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: '#ffebee',
            border: '1px solid #f44336',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* Product Images */}
          <div>
            <h3>Product Images</h3>
            {productImages.length > 0 ? (
              <div>
                {/* Primary Image */}
                {productImages.find(img => img.is_primary) && (
                  <div style={{ marginBottom: '20px' }}>
                    <img
                      src={productImages.find(img => img.is_primary).image_url}
                      alt={selectedProduct.name}
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        height: '300px',
                        objectFit: 'cover',
                        border: '1px solid #ddd',
                        borderRadius: '8px'
                      }}
                    />
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>Primary Image</p>
                  </div>
                )}

                {/* All Images Gallery */}
                <div>
                  <h4>All Images ({productImages.length})</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
                    {productImages.map((image, index) => (
                      <div key={image.image_id} style={{ position: 'relative' }}>
                        <img
                          src={image.image_url}
                          alt={`${selectedProduct.name} - Image ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100px',
                            objectFit: 'cover',
                            border: image.is_primary ? '3px solid #2196f3' : '1px solid #ddd',
                            borderRadius: '4px'
                          }}
                        />
                        {image.is_primary && (
                          <div style={{
                            position: 'absolute',
                            bottom: '2px',
                            left: '2px',
                            backgroundColor: '#2196f3',
                            color: 'white',
                            fontSize: '10px',
                            padding: '2px 4px',
                            borderRadius: '2px'
                          }}>
                            PRIMARY
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                padding: '40px',
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}>
                <p style={{ color: '#666' }}>No images available for this product</p>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div>
            <h3>Product Information</h3>
            <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
              <div style={{ marginBottom: '15px' }}>
                <strong>Name:</strong> {selectedProduct.name}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong>SKU:</strong> {selectedProduct.sku || 'Not specified'}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong>Description:</strong>
                <p style={{ marginTop: '5px', color: '#666' }}>
                  {selectedProduct.description || 'No description available'}
                </p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong>Category:</strong> {selectedProduct.category?.name || 'Unknown'}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong>Subcategory:</strong> {selectedProduct.subcategory?.name || 'Unknown'}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong>Base Price:</strong> ₹{(selectedProduct.base_price / 100).toFixed(2)}
              </div>

              {selectedProduct.calculated_price && selectedProduct.calculated_price !== selectedProduct.base_price && (
                <div style={{ marginBottom: '15px' }}>
                  <strong>Final Price:</strong> ₹{(selectedProduct.calculated_price / 100).toFixed(2)}
                </div>
              )}

              <div style={{ marginBottom: '15px' }}>
                <strong>Stock Quantity:</strong>
                <span style={{
                  marginLeft: '10px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: selectedProduct.stock_quantity > 0 ? '#e8f5e8' : '#ffebee',
                  color: selectedProduct.stock_quantity > 0 ? '#2e7d32' : '#c62828',
                  fontSize: '12px'
                }}>
                  {selectedProduct.stock_quantity} units
                </span>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong>Status:</strong>
                <span style={{
                  marginLeft: '10px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: selectedProduct.is_active ? '#e8f5e8' : '#ffebee',
                  color: selectedProduct.is_active ? '#2e7d32' : '#c62828',
                  fontSize: '12px'
                }}>
                  {selectedProduct.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong>Created By:</strong> {selectedProduct.created_by}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong>Created At:</strong> {new Date(selectedProduct.created_at).toLocaleString()}
              </div>
            </div>

            {/* Specifications */}
            {selectedProduct.specifications && Object.keys(selectedProduct.specifications).length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <h3>Specifications</h3>
                <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '8px' }}>
                  {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: '10px' }}>
                      <strong>{key}:</strong> {value.toString()}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Show product details if a product is selected
  if (showDetails) {
    return <ProductDetails />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Products</h2>

      {error && (
        <div style={{
          color: 'red',
          marginBottom: '10px',
          padding: '10px',
          backgroundColor: '#ffebee',
          border: '1px solid #f44336',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

      {!showForm && (
        <button
          onClick={() => navigate('/vendor/add-product')}
          disabled={loading}
          style={{
            marginBottom: '20px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Product
        </button>
      )}

      {showForm && (
        <div style={{
          border: '1px solid #ccc',
          padding: '20px',
          margin: '10px 0',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px'
        }}>
          <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name *:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>SKU:</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                placeholder="Enter SKU (optional)"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Group ID:</label>
              <input
                type="text"
                value={formData.group_id}
                onChange={(e) => setFormData({ ...formData, group_id: e.target.value })}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                placeholder="Enter Group ID (for variants)"
              />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ width: '100%', padding: '8px', height: '80px', border: '1px solid #ddd', borderRadius: '4px' }}
              placeholder="Enter product description"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category *:</label>
              <select
                value={formData.category_id}
                onChange={(e) => handleCategoryChange(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Subcategory *:</label>
              <select
                value={formData.subcategory_id}
                onChange={(e) => handleSubcategoryChange(e.target.value)}
                disabled={!formData.category_id}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: !formData.category_id ? '#f5f5f5' : 'white'
                }}
              >
                <option value="">Select Subcategory</option>
                {subcategories.map(sub => (
                  <option key={sub.subcategory_id} value={sub.subcategory_id}>{sub.name}</option>
                ))}
              </select>
            </div>
          </div>

          {
            specifications.length > 0 && (
              <div style={{
                marginBottom: '15px',
                padding: '15px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}>
                <h4 style={{ marginTop: 0, marginBottom: '15px' }}>Specifications:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                  {specifications.map(spec => (
                    <div key={spec.template_id}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        {spec.spec_name} {spec.is_required && <span style={{ color: 'red' }}>*</span>}:
                      </label>
                      {spec.spec_type === 'select' ? (
                        <select
                          value={formData.specifications[spec.spec_name] || ''}
                          onChange={(e) => handleSpecificationChange(spec.spec_name, e.target.value)}
                          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                        >
                          <option value="">Select {spec.spec_name}</option>
                          {spec.spec_options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : spec.spec_type === 'number' ? (
                        <input
                          type="number"
                          value={formData.specifications[spec.spec_name] || ''}
                          onChange={(e) => handleSpecificationChange(spec.spec_name, e.target.value)}
                          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                          placeholder={`Enter ${spec.spec_name}`}
                        />
                      ) : spec.spec_type === 'boolean' ? (
                        <select
                          value={formData.specifications[spec.spec_name] || ''}
                          onChange={(e) => handleSpecificationChange(spec.spec_name, e.target.value === 'true')}
                          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                        >
                          <option value="">Select</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={formData.specifications[spec.spec_name] || ''}
                          onChange={(e) => handleSpecificationChange(spec.spec_name, e.target.value)}
                          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                          placeholder={`Enter ${spec.spec_name}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          }

          {/* Custom Specifications Section */}
          <div style={{
            marginBottom: '15px',
            padding: '15px',
            backgroundColor: '#f6f8fb',
            borderRadius: '4px',
            border: '1px solid #e1e4e8'
          }}>
            <h4 style={{ marginTop: 0, marginBottom: '10px' }}>Additional Specifications (Brand, Color, Size, etc.):</h4>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                id="newSpecName"
                placeholder="Name (e.g. Brand)"
                style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
              <input
                type="text"
                id="newSpecValue"
                placeholder="Value (e.g. Nike)"
                style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
              <button
                type="button"
                onClick={() => {
                  const nameInput = document.getElementById('newSpecName');
                  const valueInput = document.getElementById('newSpecValue');
                  const name = nameInput.value?.trim();
                  const value = valueInput.value?.trim();

                  if (name && value) {
                    handleSpecificationChange(name, value);
                    nameInput.value = '';
                    valueInput.value = '';
                  }
                }}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '8px 15px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontWeight: 'bold'
                }}
              >
                Add
              </button>
            </div>

            {/* List of currently added specifications */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {Object.entries(formData.specifications).map(([key, value]) => {
                // Check if this key is from a template (if template specs exist)
                const isTemplateSpec = specifications.some(s => s.spec_name === key);

                // Show delete button ONLY for non-template specs
                if (isTemplateSpec) return null;

                return (
                  <div key={key} style={{
                    background: 'white',
                    padding: '5px 10px',
                    borderRadius: '20px',
                    border: '1px solid #cce5ff',
                    color: '#004085',
                    backgroundColor: '#cce5ff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px'
                  }}>
                    <strong>{key}:</strong> {String(value)}
                    <button
                      type="button"
                      onClick={() => {
                        const newSpecs = { ...formData.specifications };
                        delete newSpecs[key];
                        setFormData({ ...formData, specifications: newSpecs });
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#004085',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        padding: '0 2px',
                        fontSize: '16px',
                        lineHeight: 1
                      }}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
              {Object.keys(formData.specifications).length === 0 && specifications.length === 0 && (
                <span style={{ color: '#666', fontStyle: 'italic', fontSize: '14px' }}>No specifications added yet.</span>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Base Price (₹) *:</label>
              <input
                type="number"
                value={formData.base_price}
                onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                placeholder="Enter price in rupees"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Stock Quantity:</label>
              <input
                type="number"
                value={formData.stock_quantity}
                onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                placeholder="Enter stock quantity"
                min="0"
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Product Images:</label>

            {/* Existing Images (Edit Mode) */}
            {existingImages.length > 0 && (
              <div style={{ marginBottom: '15px' }}>
                <p style={{ marginBottom: '5px', fontSize: '14px', fontWeight: '600' }}>Existing Images:</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {existingImages.map(img => (
                    <div key={img.image_id} style={{ position: 'relative' }}>
                      <img
                        src={img.image_url}
                        alt="Existing"
                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }}
                      />
                      <button
                        type="button"
                        onClick={() => deleteExistingImage(img.image_id)}
                        style={{
                          position: 'absolute', top: -5, right: -5,
                          background: 'red', color: 'white', border: 'none',
                          borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer',
                          fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              style={{
                marginBottom: '15px',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                width: '100%'
              }}
            />
            {images.length > 0 && (
              <div>
                <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Selected Images ({images.length}):</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
                  {images.map(image => (
                    <div key={image.id} style={{
                      position: 'relative',
                      border: image.isPrimary ? '3px solid #2196f3' : '1px solid #ddd',
                      backgroundColor: '#fff',
                      padding: '5px',
                      borderRadius: '4px'
                    }}>
                      <img
                        src={image.preview}
                        alt="Preview"
                        style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <button
                        type="button"
                        onClick={(e) => removeImage(image.id, e)}
                        style={{
                          position: 'absolute',
                          top: '2px',
                          right: '2px',
                          background: '#f44336',
                          color: 'white',
                          border: 'none',
                          width: '20px',
                          height: '20px',
                          fontSize: '12px',
                          borderRadius: '50%',
                          cursor: 'pointer'
                        }}
                      >
                        ×
                      </button>
                      <button
                        type="button"
                        onClick={(e) => setPrimaryImage(image.id, e)}
                        style={{
                          position: 'absolute',
                          bottom: '2px',
                          left: '2px',
                          fontSize: '10px',
                          background: image.isPrimary ? '#2196f3' : '#757575',
                          color: 'white',
                          border: 'none',
                          padding: '2px 4px',
                          borderRadius: '2px',
                          cursor: 'pointer'
                        }}
                      >
                        {image.isPrimary ? 'PRIMARY' : 'SET PRIMARY'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px solid #ddd', paddingTop: '15px' }}>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                marginRight: '10px',
                backgroundColor: loading ? '#ccc' : '#4caf50',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              style={{
                backgroundColor: '#757575',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div >
      )}

      {loading && !showForm && <div style={{ textAlign: 'center', padding: '20px' }}>Loading products...</div>}

      {!showForm && (
        products.length === 0 && !loading ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            backgroundColor: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '8px'
          }}>
            <p style={{ fontSize: '18px', color: '#666' }}>No products found. Create your first product!</p>
          </div>
        ) : (
          <div style={{ marginTop: '20px' }}>
            <h3>Products ({products.length})</h3>
            <table style={{
              width: '100%',
              border: '1px solid #ccc',
              borderCollapse: 'collapse',
              backgroundColor: '#fff',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'left' }}>Image</th>
                  <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'left' }}>Name</th>
                  <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'left' }}>SKU</th>
                  <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'left' }}>Price</th>
                  <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'left' }}>Stock</th>
                  <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'left' }}>Category</th>
                  <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'left' }}>Status</th>
                  <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.product_id}>
                    <td style={{ border: '1px solid #ccc', padding: '12px' }}>
                      {product.primary_image_url ? (
                        <img
                          src={product.primary_image_url}
                          alt={product.name}
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      {!product.primary_image_url && (
                        <div style={{
                          width: '50px',
                          height: '50px',
                          backgroundColor: '#f0f0f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          fontSize: '12px',
                          color: '#666'
                        }}>
                          No Image
                        </div>
                      )}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '12px' }}>
                      <div style={{ fontWeight: 'bold' }}>{product.name}</div>
                      {product.description && (
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                          {product.description.length > 50 ? product.description.substring(0, 50) + '...' : product.description}
                        </div>
                      )}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '12px' }}>{product.sku || '-'}</td>
                    <td style={{ border: '1px solid #ccc', padding: '12px' }}>
                      <div style={{ fontWeight: 'bold' }}>₹{(product.base_price / 100).toFixed(2)}</div>
                      {product.calculated_price && product.calculated_price !== product.base_price && (
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          Final: ₹{(product.calculated_price / 100).toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '12px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: product.stock_quantity > 0 ? '#e8f5e8' : '#ffebee',
                        color: product.stock_quantity > 0 ? '#2e7d32' : '#c62828',
                        fontSize: '12px'
                      }}>
                        {product.stock_quantity} units
                      </span>
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '12px' }}>
                      <div>{product.category?.name || '-'}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {product.subcategory?.name || '-'}
                      </div>
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '12px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: product.is_active ? '#e8f5e8' : '#ffebee',
                        color: product.is_active ? '#2e7d32' : '#c62828',
                        fontSize: '12px'
                      }}>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '12px' }}>
                      <button
                        onClick={() => handleEditProduct(product)}
                        style={{
                          backgroundColor: '#ff9800',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          marginRight: '8px'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleProductClick(product)}
                        style={{
                          backgroundColor: '#2196f3',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div >
  );
};

export default Products;