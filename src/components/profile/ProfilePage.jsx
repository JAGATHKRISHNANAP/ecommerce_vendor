// src/components/profile/ProfilePage.jsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  Paper,
  IconButton,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CameraAlt as CameraIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone_number || '',
    address: user?.personal_address || '',
    business_name: user?.business_name || '',
    business_type: user?.business_type || '',
    tax_id: user?.tax_id || '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Function to construct the image URL
  const getImageUrl = () => {
    if (previewImage) return previewImage;
    if (!user?.vendor_photo_path) return null;

    const API_BASE_URL = 'http://localhost:8000/api';

    try {
      if (user.vendor_photo_path.startsWith('http')) {
        return user.vendor_photo_path;
      } else if (user.vendor_photo_path.startsWith('/')) {
        return `${API_BASE_URL}${user.vendor_photo_path}`;
      } else {
        return `${API_BASE_URL}/${user.vendor_photo_path}`;
      }
    } catch (error) {
      console.error('Error constructing image URL:', error);
      return null;
    }
  };

  const imageUrl = getImageUrl();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to update the user profile
      console.log('Saving profile data:', formData);
      console.log('Image file:', imageFile);

      // Example API call structure:
      // const formDataToSend = new FormData();
      // Object.keys(formData).forEach(key => {
      //   formDataToSend.append(key, formData[key]);
      // });
      // if (imageFile) {
      //   formDataToSend.append('vendor_photo', imageFile);
      // }
      // await updateProfile(formDataToSend);

      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone_number || '',
      address: user?.personal_address || '',
      business_name: user?.business_name || '',
      business_type: user?.business_type || '',
      tax_id: user?.tax_id || '',
    });
    setPreviewImage(null);
    setImageFile(null);
    setIsEditing(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Profile
        </Typography>
        {!isEditing ? (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(true)}
            sx={{ bgcolor: '#232f3e' }}
          >
            Edit Profile
          </Button>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{ bgcolor: '#28a745' }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Profile Picture Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar
                  src={imageUrl}
                  alt={user?.name}
                  sx={{
                    width: 150,
                    height: 150,
                    mx: 'auto',
                    fontSize: '3rem'
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
                {isEditing && (
                  <IconButton
                    component="label"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                  >
                    <CameraIcon />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </IconButton>
                )}
              </Box>

              <Typography variant="h5" gutterBottom>
                {user?.name || 'User Name'}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user?.business_name || 'Business Name'}
              </Typography>

              <Typography variant="body2" sx={{ color: 'gold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                ⭐ 4.5 Vendor Rating
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Details Section */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "standard"}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "standard"}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "standard"}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "standard"}
                    multiline
                    rows={2}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                Business Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Business Name"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "standard"}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Business Type"
                    name="business_type"
                    value={formData.business_type}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "standard"}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Tax ID"
                    name="tax_id"
                    value={formData.tax_id}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "standard"}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Account Statistics */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Statistics
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f5f5f5' }}>
                    <Typography variant="h4" color="primary">
                      {user?.total_products || '0'}
                    </Typography>
                    <Typography variant="body2">
                      Total Products
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f5f5f5' }}>
                    <Typography variant="h4" color="success.main">
                      {user?.total_orders || '0'}
                    </Typography>
                    <Typography variant="body2">
                      Total Orders
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f5f5f5' }}>
                    <Typography variant="h4" sx={{ color: 'gold' }}>
                      4.5
                    </Typography>
                    <Typography variant="body2">
                      Rating
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f5f5f5' }}>
                    <Typography variant="h4" color="info.main">
                      {user?.reviews_count || '0'}
                    </Typography>
                    <Typography variant="body2">
                      Reviews
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;