
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { completeRegistration, logout } from '../../redux/slices/authSlices';
import { validateEmail, validateIFSC } from '../../utils/validation';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Avatar,
  Alert,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  PhotoCamera,
  Logout,
  PersonOutline,
  Business,
  AccountBalance
} from '@mui/icons-material';

const statesWithDistricts = {
  TamilNadu: ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
  Kerala: ['Kochi', 'Thiruvananthapuram', 'Kozhikode'],
  Karnataka: ['Bengaluru', 'Mysuru', 'Mangalore']
};

const businessTypes = [
  { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'private_limited', label: 'Private Limited Company' },
  { value: 'public_limited', label: 'Public Limited Company' },
  { value: 'llp', label: 'Limited Liability Partnership (LLP)' },
  { value: 'one_person_company', label: 'One Person Company (OPC)' },
  { value: 'trust', label: 'Trust' },
  { value: 'society', label: 'Society' },
  { value: 'cooperative', label: 'Cooperative' },
  { value: 'other', label: 'Other' }
];

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
    <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 40, height: 40 }}>
      <Icon fontSize="small" />
    </Avatar>
    <Box>
      <Typography variant="h6" fontWeight="600" color="text.primary" sx={{ lineHeight: 1.2 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  </Box>
);

const NameRegistration = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { isLoading, error, phoneNumber } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    vendor_photo: null,
    full_name: '',
    phone_number: phoneNumber || '',
    email: '',
    aadhar_number: '',
    address_line1: '',
    address_line2: '',
    district: '',
    state: '',
    pincode: '',
    business_name: '',
    business_type: '',
    gst_number: '',
    business_address: '',
    account_holder_name: '',
    account_number: '',
    ifsc_code: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    const {
      full_name, email, aadhar_number, business_name, business_address,
      account_holder_name, account_number, ifsc_code,
      address_line1, district, state, pincode, gst_number
    } = formData;

    if (!full_name.trim()) errors.full_name = 'Full name is required';
    if (email && !validateEmail(email).isValid) errors.email = 'Invalid email format';
    if (!/^\d{12}$/.test(aadhar_number)) errors.aadhar_number = 'Aadhar number must be 12 digits';
    if (!business_name.trim()) errors.business_name = 'Business name is required';
    if (!business_address.trim()) errors.business_address = 'Business address is required';
    if (!account_holder_name.trim()) errors.account_holder_name = 'Account holder name is required';
    if (!account_number.trim()) errors.account_number = 'Account number is required';
    if (!validateIFSC(ifsc_code).isValid) errors.ifsc_code = 'Invalid IFSC code';

    // Address validation
    if (!address_line1.trim()) errors.address_line1 = 'Address line 1 is required';
    if (!district) errors.district = 'District is required';
    if (!state) errors.state = 'State is required';
    if (!/^\d{6}$/.test(pincode)) errors.pincode = 'Pincode must be 6 digits';

    if (gst_number && !/^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1})$/.test(gst_number)) {
      errors.gst_number = 'Invalid GST number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...formData,
      phoneNumber: formData.phone_number,
      name: formData.full_name.trim()
    };

    dispatch(completeRegistration(payload));
  };

  // Cancel handlers
  const handleCancelClick = () => setCancelDialogOpen(true);
  const handleCancelClose = () => setCancelDialogOpen(false);
  const handleCancelConfirm = () => {
    setCancelDialogOpen(false);
    dispatch(logout());
  };


  return (
    <Box sx={{ minHeight: '100vh', py: { xs: 2, md: 4 }, bgcolor: '#f0f2f5' }}>
      <Container maxWidth="md">

        {/* Header Section */}
        <Box sx={{ mb: 4, position: 'relative', textAlign: 'center' }}>
          <Button
            color="inherit"
            size="small"
            startIcon={<Logout />}
            onClick={handleCancelClick}
            sx={{ position: 'absolute', right: 0, top: 0, display: { xs: 'none', md: 'flex' } }}
          >
            Cancel
          </Button>

          <Typography variant="h4" component="h1" fontWeight="800" color="primary.main" gutterBottom>
            Setup Your Shop
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
            Enter your details to register as a vendor. Please ensure all information is accurate to avoid verification delays.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>

            {/* Section 1: Personal Information */}
            <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: 'none' }}>
              <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                <SectionHeader
                  icon={PersonOutline}
                  title="Personal Information"
                  subtitle="Your identity and contact details"
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="icon-button-file"
                    type="file"
                    name="vendor_photo"
                    onChange={handleChange}
                  />
                  <label htmlFor="icon-button-file">
                    <Box sx={{ position: 'relative', cursor: 'pointer', '&:hover .MuiAvatar-root': { opacity: 0.8 } }}>
                      <Avatar
                        src={photoPreview}
                        sx={{
                          width: 110,
                          height: 110,
                          border: '4px solid white',
                          boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                          bgcolor: 'background.paper',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {!photoPreview && <PhotoCamera color="action" sx={{ fontSize: 40 }} />}
                      </Avatar>
                      <Box sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRadius: '50%',
                        p: 0.8,
                        border: '3px solid white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}>
                        <PhotoCamera sx={{ fontSize: 18 }} />
                      </Box>
                    </Box>
                  </label>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, fontWeight: 500 }}>
                    Upload Profile Photo
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      error={!!formErrors.full_name}
                      helperText={formErrors.full_name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      disabled
                      variant="outlined"
                      sx={{ bgcolor: 'action.hover' }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!formErrors.email}
                      helperText={formErrors.email}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Aadhar Number"
                      name="aadhar_number"
                      value={formData.aadhar_number}
                      onChange={handleChange}
                      error={!!formErrors.aadhar_number}
                      helperText={formErrors.aadhar_number}
                    />
                  </Grid>

                  {/* Address */}
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ mt: 1, mb: 1, p: 1.5, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: 0.5 }}>ADDRESS DETAILS</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Address Line 1"
                      name="address_line1"
                      value={formData.address_line1}
                      onChange={handleChange}
                      error={!!formErrors.address_line1}
                      helperText={formErrors.address_line1}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Address Line 2 (Optional)"
                      name="address_line2"
                      value={formData.address_line2}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth error={!!formErrors.state}>
                      <InputLabel>State</InputLabel>
                      <Select
                        name="state"
                        value={formData.state}
                        label="State"
                        onChange={handleChange}
                      >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {Object.keys(statesWithDistricts).map(state => (
                          <MenuItem key={state} value={state}>{state}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth error={!!formErrors.district} disabled={!formData.state}>
                      <InputLabel>District</InputLabel>
                      <Select
                        name="district"
                        value={formData.district}
                        label="District"
                        onChange={handleChange}
                      >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {formData.state && statesWithDistricts[formData.state].map(dist => (
                          <MenuItem key={dist} value={dist}>{dist}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      error={!!formErrors.pincode}
                      helperText={formErrors.pincode}
                      inputProps={{ maxLength: 6 }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Section 2: Business Details */}
            <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: 'none' }}>
              <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                <SectionHeader
                  icon={Business}
                  title="Business Details"
                  subtitle="About your company and compliance"
                />
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Business Name"
                      name="business_name"
                      value={formData.business_name}
                      onChange={handleChange}
                      error={!!formErrors.business_name}
                      helperText={formErrors.business_name}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Business Type</InputLabel>
                      <Select
                        name="business_type"
                        value={formData.business_type}
                        label="Business Type"
                        onChange={handleChange}
                      >
                        {businessTypes.map((type) => (
                          <MenuItem key={type.value} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="GST Number (Optional)"
                      name="gst_number"
                      value={formData.gst_number}
                      onChange={handleChange}
                      error={!!formErrors.gst_number}
                      helperText={formErrors.gst_number}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Business Address"
                      name="business_address"
                      value={formData.business_address}
                      onChange={handleChange}
                      error={!!formErrors.business_address}
                      helperText={formErrors.business_address}
                      multiline
                      rows={2}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Section 3: Bank Details */}
            <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: 'none' }}>
              <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                <SectionHeader
                  icon={AccountBalance}
                  title="Banking Information"
                  subtitle="For payouts and settlements"
                />
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Account Holder Name"
                      name="account_holder_name"
                      value={formData.account_holder_name}
                      onChange={handleChange}
                      error={!!formErrors.account_holder_name}
                      helperText={formErrors.account_holder_name}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Account Number"
                      name="account_number"
                      value={formData.account_number}
                      onChange={handleChange}
                      error={!!formErrors.account_number}
                      helperText={formErrors.account_number}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="IFSC Code"
                      name="ifsc_code"
                      value={formData.ifsc_code}
                      onChange={handleChange}
                      error={!!formErrors.ifsc_code}
                      helperText={formErrors.ifsc_code}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {error && (
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                {typeof error === 'string'
                  ? error
                  : (error?.message || error?.detail || JSON.stringify(error))}
              </Alert>
            )}

            <Box sx={{ mt: 2, pb: 4 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isLoading}
                sx={{
                  height: 56,
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  borderRadius: 2,
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #5a6fd6 30%, #684191 90%)',
                    boxShadow: '0 6px 16px rgba(102, 126, 234, 0.6)'
                  }
                }}
              >
                {isLoading ? <CircularProgress size={26} color="inherit" /> : 'Complete Registration'}
              </Button>
              {isMobile && (
                <Button fullWidth onClick={handleCancelClick} color="inherit" sx={{ mt: 2 }}>
                  Cancel
                </Button>
              )}
            </Box>

          </Stack>
        </form>
      </Container>

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={handleCancelClose}
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle fontWeight="bold">Cancel Registration?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel? All the information you entered will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCancelClose} variant="outlined" color="inherit" sx={{ borderRadius: 2 }}>
            Keep Editing
          </Button>
          <Button
            onClick={handleCancelConfirm}
            color="error"
            variant="contained"
            sx={{ borderRadius: 2 }}
            autoFocus
          >
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NameRegistration;