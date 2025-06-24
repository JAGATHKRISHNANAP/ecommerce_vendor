

// import React, { useState, useEffect } from 'react';

// const AddProductWithImages = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category_id: '',
//     stock_quantity: 0,
//     storage_capacity: '',
//     sales_user: ''
//   });
  
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('');

//   const API_BASE_URL = 'http://localhost:8000/api/v1';

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   const loadCategories = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/categories`);
//       if (response.ok) {
//         const data = await response.json();
//         setCategories(data);
//       }
//     } catch (error) {
//       console.error('Failed to load categories:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
    
//     // Validate file types and sizes
//     const validFiles = [];
//     const previews = [];
    
//     files.forEach(file => {
//       // Check file type
//       if (!file.type.startsWith('image/')) {
//         showMessage(`${file.name} is not an image file`, 'error');
//         return;
//       }
      
//       // Check file size (5MB limit)
//       if (file.size > 5 * 1024 * 1024) {
//         showMessage(`${file.name} is too large (max 5MB)`, 'error');
//         return;
//       }
      
//       validFiles.push(file);
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         previews.push({
//           file: file,
//           preview: e.target.result,
//           name: file.name,
//           size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
//         });
        
//         if (previews.length === validFiles.length) {
//           setImagePreviews(previews);
//         }
//       };
//       reader.readAsDataURL(file);
//     });
    
//     setSelectedImages(validFiles);
//   };

//   const removeImage = (index) => {
//     const newImages = selectedImages.filter((_, i) => i !== index);
//     const newPreviews = imagePreviews.filter((_, i) => i !== index);
//     setSelectedImages(newImages);
//     setImagePreviews(newPreviews);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!formData.name.trim()) {
//       showMessage('Product name is required', 'error');
//       return;
//     }
//     if (!formData.price || parseFloat(formData.price) <= 0) {
//       showMessage('Valid price is required', 'error');
//       return;
//     }
//     if (!formData.category_id) {
//       showMessage('Please select a category', 'error');
//       return;
//     }
//     if (!formData.sales_user.trim()) {
//       showMessage('Sales user is required', 'error');
//       return;
//     }
//     if (selectedImages.length === 0) {
//       showMessage('Please select at least one image', 'error');
//       return;
//     }

//     setLoading(true);
//     setMessage('');

//     try {
//       // Create FormData for multipart upload
//       const formDataToSend = new FormData();
      
//       // Add text fields
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('description', formData.description || '');
//       formDataToSend.append('price', parseFloat(formData.price));
//       formDataToSend.append('category_id', parseInt(formData.category_id));
//       formDataToSend.append('stock_quantity', parseInt(formData.stock_quantity) || 0);
//       formDataToSend.append('storage_capacity', formData.storage_capacity || '');
//       formDataToSend.append('sales_user', formData.sales_user);
      
//       // Add image files
//       selectedImages.forEach((image, index) => {
//         formDataToSend.append('images', image);
//       });

//       const response = await fetch(`${API_BASE_URL}/products`, {
//         method: 'POST',
//         body: formDataToSend // Don't set Content-Type header, let browser set it
//       });

//       const result = await response.json();

//       if (response.ok) {
//         showMessage(`Product "${formData.name}" created successfully with ${result.upload_summary.total_uploaded} images!`, 'success');
        
//         // Reset form
//         setFormData({
//           name: '',
//           description: '',
//           price: '',
//           category_id: '',
//           stock_quantity: 0,
//           storage_capacity: '',
//           sales_user: ''
//         });
//         setSelectedImages([]);
//         setImagePreviews([]);
        
//         // Reset file input
//         const fileInput = document.getElementById('images');
//         if (fileInput) fileInput.value = '';
        
//         // Show upload summary if there were any failed uploads
//         if (result.upload_summary.total_failed > 0) {
//           console.log('Failed uploads:', result.upload_summary.failed_files);
//         }
        
//       } else {
//         const errorMessage = result.detail || `HTTP ${response.status}`;
//         showMessage(`Failed to create product: ${errorMessage}`, 'error');
//       }

//     } catch (error) {
//       showMessage(`Network error: ${error.message}`, 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showMessage = (text, type) => {
//     setMessage(text);
//     setMessageType(type);
    
//     if (type === 'success') {
//       setTimeout(() => {
//         setMessage('');
//         setMessageType('');
//       }, 5000);
//     }
//   };

//   const styles = {
//     container: {
//       maxWidth: '800px',
//       margin: '30px auto',
//       padding: '30px',
//       border: '1px solid #ddd',
//       borderRadius: '12px',
//       boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
//       backgroundColor: '#fff',
//       fontFamily: 'Arial, sans-serif'
//     },
//     title: {
//       textAlign: 'center',
//       marginBottom: '30px',
//       color: '#333',
//       fontSize: '28px',
//       fontWeight: '600'
//     },
//     form: {
//       display: 'grid',
//       gap: '20px'
//     },
//     formGroup: {
//       display: 'flex',
//       flexDirection: 'column'
//     },
//     label: {
//       marginBottom: '5px',
//       fontWeight: '600',
//       color: '#555',
//       fontSize: '14px'
//     },
//     input: {
//       padding: '12px 15px',
//       border: '2px solid #ddd',
//       borderRadius: '8px',
//       fontSize: '16px',
//       outline: 'none',
//       transition: 'border-color 0.3s ease'
//     },
//     textarea: {
//       padding: '12px 15px',
//       border: '2px solid #ddd',
//       borderRadius: '8px',
//       fontSize: '16px',
//       outline: 'none',
//       resize: 'vertical',
//       minHeight: '80px',
//       fontFamily: 'Arial, sans-serif'
//     },
//     select: {
//       padding: '12px 15px',
//       border: '2px solid #ddd',
//       borderRadius: '8px',
//       fontSize: '16px',
//       outline: 'none',
//       backgroundColor: 'white',
//       cursor: 'pointer'
//     },
//     twoColumn: {
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr',
//       gap: '15px'
//     },
//     threeColumn: {
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr 1fr',
//       gap: '15px'
//     },
//     fileInput: {
//       padding: '12px 15px',
//       border: '2px dashed #ddd',
//       borderRadius: '8px',
//       fontSize: '16px',
//       cursor: 'pointer',
//       backgroundColor: '#f9f9f9',
//       transition: 'border-color 0.3s ease'
//     },
//     imagePreviewContainer: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
//       gap: '15px',
//       marginTop: '15px'
//     },
//     imagePreview: {
//       position: 'relative',
//       border: '2px solid #ddd',
//       borderRadius: '8px',
//       overflow: 'hidden',
//       backgroundColor: '#f9f9f9'
//     },
//     previewImage: {
//       width: '100%',
//       height: '150px',
//       objectFit: 'cover'
//     },
//     imageInfo: {
//       padding: '8px',
//       fontSize: '12px',
//       color: '#666',
//       backgroundColor: '#f1f1f1'
//     },
//     removeButton: {
//       position: 'absolute',
//       top: '5px',
//       right: '5px',
//       background: '#dc3545',
//       color: 'white',
//       border: 'none',
//       borderRadius: '50%',
//       width: '25px',
//       height: '25px',
//       cursor: 'pointer',
//       fontSize: '14px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     button: {
//       padding: '15px 20px',
//       backgroundColor: '#667eea',
//       color: 'white',
//       border: 'none',
//       borderRadius: '8px',
//       fontSize: '16px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       marginTop: '10px',
//       opacity: loading ? 0.7 : 1
//     },
//     message: {
//       padding: '15px',
//       borderRadius: '8px',
//       textAlign: 'center',
//       fontWeight: '500',
//       marginBottom: '20px'
//     },
//     successMessage: {
//       backgroundColor: '#d4edda',
//       color: '#155724',
//       border: '1px solid #c3e6cb'
//     },
//     errorMessage: {
//       backgroundColor: '#f8d7da',
//       color: '#721c24',
//       border: '1px solid #f5c6cb'
//     },
//     imageCounter: {
//       textAlign: 'center',
//       color: '#666',
//       fontSize: '14px',
//       marginTop: '10px'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>📦 Add Product with Images</h2>
      
//       {message && (
//         <div 
//           style={{
//             ...styles.message,
//             ...(messageType === 'success' ? styles.successMessage : styles.errorMessage)
//           }}
//         >
//           {messageType === 'success' ? '✅ ' : '❌ '}{message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} style={styles.form}>
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Product Name *</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             placeholder="Enter product name"
//             style={styles.input}
//             required
//             disabled={loading}
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label style={styles.label}>Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             placeholder="Product description (optional)"
//             style={styles.textarea}
//             disabled={loading}
//           />
//         </div>

//         <div style={styles.threeColumn}>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Price *</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleInputChange}
//               placeholder="0.00"
//               step="0.01"
//               min="0"
//               style={styles.input}
//               required
//               disabled={loading}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>Category *</label>
//             <select
//               name="category_id"
//               value={formData.category_id}
//               onChange={handleInputChange}
//               style={styles.select}
//               required
//               disabled={loading}
//             >
//               <option value="">Select Category</option>
//               {categories.map(category => (
//                 <option key={category.category_id} value={category.category_id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>Stock Quantity</label>
//             <input
//               type="number"
//               name="stock_quantity"
//               value={formData.stock_quantity}
//               onChange={handleInputChange}
//               placeholder="0"
//               min="0"
//               style={styles.input}
//               disabled={loading}
//             />
//           </div>
//         </div>

//         <div style={styles.twoColumn}>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Storage Capacity</label>
//             <input
//               type="text"
//               name="storage_capacity"
//               value={formData.storage_capacity}
//               onChange={handleInputChange}
//               placeholder="e.g., 64GB, 128GB"
//               style={styles.input}
//               disabled={loading}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>Sales User *</label>
//             <input
//               type="text"
//               name="sales_user"
//               value={formData.sales_user}
//               onChange={handleInputChange}
//               placeholder="Enter sales user ID"
//               style={styles.input}
//               required
//               disabled={loading}
//             />
//           </div>
//         </div>

//         <div style={styles.formGroup}>
//           <label style={styles.label}>Product Images * (Max 10 images, 5MB each)</label>
//           <input
//             type="file"
//             id="images"
//             multiple
//             accept="image/*"
//             onChange={handleImageChange}
//             style={styles.fileInput}
//             disabled={loading}
//           />
          
//           {selectedImages.length > 0 && (
//             <div style={styles.imageCounter}>
//               {selectedImages.length} image(s) selected
//             </div>
//           )}
//         </div>

//         {imagePreviews.length > 0 && (
//           <div style={styles.imagePreviewContainer}>
//             {imagePreviews.map((preview, index) => (
//               <div key={index} style={styles.imagePreview}>
//                 <button
//                   type="button"
//                   onClick={() => removeImage(index)}
//                   style={styles.removeButton}
//                   disabled={loading}
//                 >
//                   ×
//                 </button>
//                 <img
//                   src={preview.preview}
//                   alt={preview.name}
//                   style={styles.previewImage}
//                 />
//                 <div style={styles.imageInfo}>
//                   <div>{preview.name}</div>
//                   <div>{preview.size}</div>
//                   {index === 0 && <div style={{color: '#28a745', fontWeight: 'bold'}}>Primary</div>}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         <button 
//           type="submit" 
//           style={styles.button}
//           disabled={loading || selectedImages.length === 0}
//         >
//           {loading ? '⏳ Creating Product...' : '📦 Create Product with Images'}
//         </button>
//       </form>

//       <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', fontSize: '14px', color: '#666'}}>
//         <strong>📁 File Organization:</strong>
//         <ul style={{marginTop: '5px', paddingLeft: '20px'}}>
//           <li>Images will be stored in: <code>uploads/sales_users/[sales_user]/products/product_[id]/</code></li>
//           <li>Supported formats: JPG, JPEG, PNG, GIF, WEBP</li>
//           <li>Images are automatically resized if too large</li>
//           <li>First image becomes the primary product image</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AddProductWithImages;



import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  CircularProgress,
  Box,
  IconButton,
  Avatar,
  Chip
} from '@mui/material';
import { Upload, Delete, PhotoCamera } from '@mui/icons-material';

const AddProductWithImages = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    stock_quantity: '',
    storage_capacity: '',
    sales_user: ''
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const API_BASE_URL = 'http://localhost:8000/api/v1';

  useEffect(() => { loadCategories(); }, []);

  const loadCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`);
      if (res.ok) {
        setCategories(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    const valid = files.filter(f => f.type.startsWith('image/') && f.size <= 5*1024*1024);
    setSelectedImages(valid);
    const previews = valid.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setImagePreviews(previews);
  };

  const removeImage = (idx) => {
    const newSel = [...selectedImages];
    const newPrev = [...imagePreviews];
    newSel.splice(idx, 1);
    newPrev.splice(idx, 1);
    setSelectedImages(newSel);
    setImagePreviews(newPrev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    Object.entries(formData).forEach(([k,v]) => fd.append(k, v));
    selectedImages.forEach(img => fd.append('images', img));
    try {
      const res = await fetch(`${API_BASE_URL}/products`, { method: 'POST', body: fd });
      const result = await res.json();
      if (res.ok) {
        setMessage({ text: `Product saved!`, type: 'success' });
        setFormData({ name: '', description: '', price: '', category_id: '', stock_quantity: '', storage_capacity: '', sales_user: '' });
        setSelectedImages([]);
        setImagePreviews([]);
      } else {
        setMessage({ text: result.detail || 'Error', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally { setLoading(false); }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add New Product
      </Typography>
      {message.text && (
        <Paper sx={{ p:2, mb:3, bgcolor: message.type === 'success' ? 'green.50' : 'red.50' }}>
          <Typography align="center" color={message.type === 'success' ? 'green.800' : 'red.800'}>
            {message.text}
          </Typography>
        </Paper>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p:3 }} elevation={2}>
              <Typography variant="h6" gutterBottom>Basic Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Product Name" name="name" value={formData.name}
                    onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="category_id"
                      name="category_id"
                      value={formData.category_id}
                      label="Category"
                      onChange={handleChange}
                      required
                    >
                      {categories.map(cat => <MenuItem key={cat.category_id} value={cat.category_id}>{cat.name}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Description" name="description" value={formData.description}
                    onChange={handleChange} multiline rows={3} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p:3 }} elevation={2}>
              <Typography variant="h6" gutterBottom>Pricing & Stock</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Price" name="price" type="number"
                    value={formData.price} onChange={handleChange} required InputProps={{ startAdornment: <Typography>₹</Typography> }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Stock Quantity" name="stock_quantity" type="number"
                    value={formData.stock_quantity} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Storage Capacity" name="storage_capacity"
                    value={formData.storage_capacity} onChange={handleChange} placeholder="e.g., 64GB" />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ p:3 }} elevation={2}>
              <Typography variant="h6" gutterBottom>Sales Details</Typography>
              <TextField fullWidth label="Sales User ID" name="sales_user" value={formData.sales_user}
                onChange={handleChange} required />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p:3 }} elevation={2}>
              <Typography variant="h6" gutterBottom>Upload Images</Typography>
              <Button variant="outlined" component="label" startIcon={<Upload />}>
                Choose Images
                <input hidden type="file" multiple accept="image/*" onChange={handleImageChange} />
              </Button>
              <Box sx={{ mt:2, display:'flex', flexWrap:'wrap', gap:1 }}>
                {imagePreviews.map((img, idx) => (
                  <Box key={idx} sx={{ position:'relative' }}>
                    <Avatar variant="rounded" src={img.url} sx={{ width: { xs: 80, sm: 100 }, height: { xs: 80, sm:100 } }} />
                    <IconButton size="small" sx={{ position:'absolute', top:0, right:0 }} onClick={() => removeImage(idx)}>
                      <Delete fontSize="small" />
                    </IconButton>
                    <Chip label={img.name} size="small" sx={{ mt:1, maxWidth: 100 }} />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Box textAlign="center">
              <Button type="submit" variant="contained" size="large" disabled={loading || !formData.name || !formData.price || !formData.category_id || !formData.sales_user || selectedImages.length===0}>
                {loading ? <CircularProgress size={24} /> : 'Create Product'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddProductWithImages;
