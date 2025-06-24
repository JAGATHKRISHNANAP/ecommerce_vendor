// // src/components/auth/NameRegistration.jsx
// import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { User, ArrowRight, CheckCircle } from 'lucide-react'
// import { completeRegistration } from '../../redux/slices/authSlices'
// import { validateName } from '../../utils/validation'
// import ErrorMessage from '../ui/ErrorMessage'
// import LoadingSpinner from '../ui/LoadingSpinner'

// const NameRegistration = () => {
//   const dispatch = useDispatch()
//   const { isLoading, error, phoneNumber } = useSelector(state => state.auth)
//   const [name, setName] = useState('')
//   const [nameError, setNameError] = useState('')
//   const [isFocused, setIsFocused] = useState(false)

//   const handleNameChange = (e) => {
//     const value = e.target.value
//     setName(value)
    
//     // Clear error when user starts typing
//     if (nameError) {
//       setNameError('')
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     // Validate name
//     const validation = validateName(name, 'Name')
//     if (!validation.isValid) {
//       setNameError(validation.error)
//       return
//     }
    
//     // Submit registration
//     dispatch(completeRegistration({ 
//       phoneNumber,
//       name: name.trim()
//     }))
//   }
//   return (
//     <div style={{
//       fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//       color: '#333'
//     }}>
//       {/* Header Section */}
//       <div style={{
//         textAlign: 'center',
//         marginBottom: '32px'
//       }}>
//         <div style={{
//           width: '64px',
//           height: '64px',
//           background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
//           borderRadius: '50%',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           margin: '0 auto 20px',
//           boxShadow: '0 4px 14px rgba(76, 175, 80, 0.3)'
//         }}>
//           <User style={{ width: '32px', height: '32px', color: 'white' }} />
//         </div>
        
//         <h2 style={{
//           fontSize: '24px',
//           fontWeight: '500',
//           color: '#333',
//           margin: '0 0 8px 0'
//         }}>
//           Welcome! Let's get to know you
//         </h2>
        
//         <p style={{
//           fontSize: '14px',
//           color: '#666',
//           margin: '0 0 8px 0',
//           lineHeight: '1.5'
//         }}>
//           Please enter your name to complete registration
//         </p>
        
//         <p style={{
//           fontSize: '13px',
//           color: '#999',
//           margin: '0',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           gap: '8px'
//         }}>
//           <CheckCircle style={{ width: '16px', height: '16px', color: '#4caf50' }} />
//           Phone verified: {phoneNumber}
//         </p>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '24px' }}>
//           {/* Name Input */}
//           <div style={{ position: 'relative' }}>
//             <input
//               type="text"
//               value={name}
//               onChange={handleNameChange}
//               onFocus={() => setIsFocused(true)}
//               onBlur={() => setIsFocused(false)}
//               placeholder="Enter your full name"
//               disabled={isLoading}
//               autoFocus
//               style={{
//                 width: '100%',
//                 height: '56px',
//                 padding: '0 16px 0 48px',
//                 border: `2px solid ${nameError ? '#f44336' : (isFocused ? '#4caf50' : '#e0e0e0')}`,
//                 borderRadius: '12px',
//                 background: 'white',
//                 fontSize: '16px',
//                 fontFamily: 'inherit',
//                 outline: 'none',
//                 transition: 'all 0.2s ease',
//                 boxSizing: 'border-box'
//               }}
//             />
//             {/* User Icon */}
//             <User style={{
//               position: 'absolute',
//               left: '16px',
//               top: '50%',
//               transform: 'translateY(-50%)',
//               width: '20px',
//               height: '20px',
//               color: isFocused ? '#4caf50' : '#666'
//             }} />
//           </div>
          
//           {/* Name Error Message */}
//           {nameError && (
//             <div style={{
//               color: '#f44336',
//               fontSize: '12px',
//               marginTop: '8px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '4px'
//             }}>
//               <span style={{ fontSize: '16px' }}>⚠️</span>
//               {nameError}
//             </div>
//           )}
          
//           {/* Help Text */}
//           <p style={{
//             fontSize: '12px',
//             color: '#999',
//             marginTop: '8px',
//             textAlign: 'center'
//           }}>
//             This is how we'll address you in our communications
//           </p>
//         </div>
        
//         {/* API Error Message */}
//         {error && (
//           <div style={{ marginBottom: '24px' }}>
//             <ErrorMessage message={error} />
//           </div>
//         )}
        
//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isLoading || !name.trim()}
//           style={{
//             width: '100%',
//             height: '56px',
//             background: isLoading || !name.trim() 
//               ? 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)' 
//               : 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
//             color: isLoading || !name.trim() ? '#999' : 'white',
//             border: 'none',
//             borderRadius: '12px',
//             fontSize: '16px',
//             fontWeight: '600',
//             fontFamily: 'inherit',
//             cursor: isLoading || !name.trim() ? 'not-allowed' : 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '12px',
//             transition: 'all 0.2s ease',
//             boxShadow: isLoading || !name.trim() 
//               ? 'none' 
//               : '0 4px 12px rgba(76, 175, 80, 0.3)',
//             outline: 'none'
//           }}
//           onMouseOver={(e) => {
//             if (!isLoading && name.trim()) {
//               e.target.style.transform = 'translateY(-2px)'
//               e.target.style.boxShadow = '0 6px 16px rgba(76, 175, 80, 0.4)'
//             }
//           }}
//           onMouseOut={(e) => {
//             e.target.style.transform = 'translateY(0)'
//             e.target.style.boxShadow = isLoading || !name.trim() 
//               ? 'none' 
//               : '0 4px 12px rgba(76, 175, 80, 0.3)'
//           }}
//         >
//           {isLoading ? (
//             <>
//               <LoadingSpinner size="small" color="white" />
//               <span>Creating your account...</span>
//             </>
//           ) : (
//             <>
//               <span>Complete Registration</span>
//               <ArrowRight style={{ width: '20px', height: '20px' }} />
//             </>
//           )}
//         </button>
//       </form>
      
//       {/* Privacy Note */}
//       <div style={{
//         textAlign: 'center',
//         marginTop: '32px',
//         padding: '16px',
//         background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
//         borderRadius: '12px',
//         border: '1px solid #c8e6c9'
//       }}>
//         <p style={{
//           fontSize: '12px',
//           color: '#388e3c',
//           margin: '0',
//           lineHeight: '1.5'
//         }}>
//           🔒 Your information is secure and will only be used to personalize your experience
//         </p>
//       </div>
//     </div>
//   )
// }

// export default NameRegistration


// src/components/auth/NameRegistration.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { completeRegistration } from '../../redux/slices/authSlices';
import { validateName } from '../../utils/validation';
import ErrorMessage from '../ui/ErrorMessage';
import LoadingSpinner from '../ui/LoadingSpinner';

const NameRegistration = () => {
  const dispatch = useDispatch();
  const { isLoading, error, phoneNumber } = useSelector(state => state.auth);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (nameError) setNameError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateName(name, 'Name');
    if (!validation.isValid) {
      setNameError(validation.error);
      return;
    }

    dispatch(completeRegistration({
      phoneNumber,
      name: name.trim(),
    }));
  };

  return (
    <div>
      <h2>Welcome! Let's get to know you</h2>
      <p>Please enter your name to complete registration</p>
      <p>Phone verified: {phoneNumber}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter your full name"
            disabled={isLoading}
            autoFocus
          />
          {nameError && <div>{nameError}</div>}
        </div>

        {error && <ErrorMessage message={error} />}

        <button type="submit" disabled={isLoading || !name.trim()}>
          {isLoading ? (
            <>
              <LoadingSpinner size="small" color="white" />
              <span>Creating your account...</span>
            </>
          ) : (
            <>
              <span>Complete Registration</span>
            </>
          )}
        </button>
      </form>

      <p>Your information is secure and will only be used to personalize your experience</p>
    </div>
  );
};

export default NameRegistration;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Container,
//   Typography,
//   Paper,
//   Stepper,
//   Step,
//   StepLabel,
//   Button,
//   Grid,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormControlLabel,
//   Checkbox,
//   Alert,
//   Avatar,
//   IconButton,
//   Stack,
//   Divider,
//   Chip,
//   Card,
//   CardContent,
//   FormHelperText,
//   CircularProgress,
//   Fade,
//   InputAdornment
// } from '@mui/material';
// import {
//   PhotoCamera,
//   Business,
//   Person,
//   LocationOn,
//   AccountBalance,
//   VerifiedUser,
//   Upload,
//   Phone,
//   Email,
//   CreditCard,
//   Store,
//   ArrowBack,
//   ArrowForward,
//   CheckCircle,
//   Info
// } from '@mui/icons-material';

// const steps = [
//   { label: 'Personal Information', icon: <Person /> },
//   { label: 'Business Details', icon: <Business /> },
//   { label: 'Address & Contact', icon: <LocationOn /> },
//   { label: 'Bank & Documents', icon: <AccountBalance /> },
//   { label: 'Review & Submit', icon: <VerifiedUser /> }
// ];

// const businessTypes = [
//   { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
//   { value: 'partnership', label: 'Partnership' },
//   { value: 'private_limited', label: 'Private Limited Company' },
//   { value: 'public_limited', label: 'Public Limited Company' },
//   { value: 'llp', label: 'Limited Liability Partnership (LLP)' },
//   { value: 'one_person_company', label: 'One Person Company (OPC)' },
//   { value: 'trust', label: 'Trust' },
//   { value: 'society', label: 'Society' },
//   { value: 'cooperative', label: 'Cooperative' },
//   { value: 'other', label: 'Other' }
// ];

// const indianStates = [
//   'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
//   'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
//   'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
//   'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
//   'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
//   'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
//   'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
// ];

// const VendorRegistrationPage = () => {
//   const navigate = useNavigate();
//   const [activeStep, setActiveStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [photoPreview, setPhotoPreview] = useState(null);

//   // Form data state
//   const [formData, setFormData] = useState({
//     // Personal Information
//     owner_name: '',
//     phone_number: '',
//     email: '',
//     aadhar_number: '',
//     vendor_photo: null,
    
//     // Business Details
//     business_name: '',
//     business_type: '',
//     business_description: '',
//     gst_number: '',
//     pan_number: '',
//     years_in_business: '',
//     annual_turnover: '',
//     number_of_employees: '',
//     website_url: '',
    
//     // Address & Contact
//     address_line_1: '',
//     address_line_2: '',
//     city: '',
//     state: '',
//     postal_code: '',
//     country: 'India',
    
//     // Bank Details
//     bank_name: '',
//     account_number: '',
//     ifsc_code: '',
//     account_holder_name: '',
    
//     // Documents & Legal
//     business_license_number: '',
//     tax_registration_number: '',
    
//     // Terms
//     terms_accepted: false
//   });

//   const handleInputChange = (field) => (event) => {
//     const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
//     setFormData(prev => ({ ...prev, [field]: value }));
    
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   const handlePhotoChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) { // 5MB limit
//         setErrors(prev => ({ ...prev, vendor_photo: 'File size should be less than 5MB' }));
//         return;
//       }
      
//       if (!file.type.startsWith('image/')) {
//         setErrors(prev => ({ ...prev, vendor_photo: 'Please select a valid image file' }));
//         return;
//       }
      
//       setFormData(prev => ({ ...prev, vendor_photo: file }));
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhotoPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
      
//       // Clear error
//       setErrors(prev => ({ ...prev, vendor_photo: '' }));
//     }
//   };

//   const validateStep = (step) => {
//     const newErrors = {};
    
//     switch (step) {
//       case 0: // Personal Information
//         if (!formData.owner_name) newErrors.owner_name = 'Name is required';
//         if (!formData.phone_number) newErrors.phone_number = 'Phone number is required';
//         else if (!/^[6-9]\d{9}$/.test(formData.phone_number)) newErrors.phone_number = 'Invalid phone number';
//         if (!formData.email) newErrors.email = 'Email is required';
//         else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
//         if (!formData.aadhar_number) newErrors.aadhar_number = 'Aadhar number is required';
//         else if (!/^\d{12}$/.test(formData.aadhar_number)) newErrors.aadhar_number = 'Aadhar number must be 12 digits';
//         break;
        
//       case 1: // Business Details
//         if (!formData.business_name) newErrors.business_name = 'Business name is required';
//         if (!formData.business_type) newErrors.business_type = 'Business type is required';
//         if (formData.gst_number && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gst_number)) {
//           newErrors.gst_number = 'Invalid GST number format';
//         }
//         if (formData.pan_number && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan_number)) {
//           newErrors.pan_number = 'Invalid PAN number format';
//         }
//         break;
        
//       case 2: // Address & Contact
//         if (!formData.address_line_1) newErrors.address_line_1 = 'Address is required';
//         if (!formData.city) newErrors.city = 'City is required';
//         if (!formData.state) newErrors.state = 'State is required';
//         if (!formData.postal_code) newErrors.postal_code = 'Postal code is required';
//         else if (!/^\d{6}$/.test(formData.postal_code)) newErrors.postal_code = 'Invalid postal code';
//         break;
        
//       case 3: // Bank & Documents
//         if (!formData.bank_name) newErrors.bank_name = 'Bank name is required';
//         if (!formData.account_number) newErrors.account_number = 'Account number is required';
//         if (!formData.ifsc_code) newErrors.ifsc_code = 'IFSC code is required';
//         else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc_code)) newErrors.ifsc_code = 'Invalid IFSC code format';
//         if (!formData.account_holder_name) newErrors.account_holder_name = 'Account holder name is required';
//         break;
        
//       case 4: // Review & Submit
//         if (!formData.terms_accepted) newErrors.terms_accepted = 'You must accept the terms and conditions';
//         break;
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (validateStep(activeStep)) {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSubmit = async () => {
//     if (!validateStep(activeStep)) return;
    
//     setLoading(true);
//     try {
//       // Create FormData for file upload
//       const submitData = new FormData();
      
//       // Append all form fields
//       Object.keys(formData).forEach(key => {
//         if (key === 'vendor_photo' && formData[key]) {
//           submitData.append(key, formData[key]);
//         } else if (key !== 'vendor_photo') {
//           submitData.append(key, formData[key]);
//         }
//       });
      
//       // Here you would make the API call
//       // const response = await api.post('/api/v1/vendors/register', submitData);
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // Show success message and redirect
//       navigate('/dashboard', { 
//         state: { 
//           message: 'Registration submitted successfully! We will review your application and get back to you within 2-3 business days.',
//           businessName: formData.business_name
//         } 
//       });
      
//     } catch (error) {
//       console.error('Registration error:', error);
//       setErrors({ submit: 'Registration failed. Please try again.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderPersonalInfo = () => (
//     <Grid container spacing={3}>
//       <Grid item xs={12} md={6}>
//         <Box sx={{ textAlign: 'center', mb: 3 }}>
//           <input
//             accept="image/*"
//             style={{ display: 'none' }}
//             id="photo-upload"
//             type="file"
//             onChange={handlePhotoChange}
//           />
//           <label htmlFor="photo-upload">
//             <Avatar
//               src={photoPreview}
//               sx={{ 
//                 width: 120, 
//                 height: 120, 
//                 mx: 'auto', 
//                 mb: 2,
//                 bgcolor: '#F3F4F6',
//                 cursor: 'pointer',
//                 '&:hover': { bgcolor: '#E5E7EB' }
//               }}
//             >
//               {!photoPreview && <PhotoCamera sx={{ fontSize: 40, color: '#6B7280' }} />}
//             </Avatar>
//           </label>
//           <Typography variant="body2" color="textSecondary">
//             Click to upload photo (Max 5MB)
//           </Typography>
//           {errors.vendor_photo && (
//             <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
//               {errors.vendor_photo}
//             </Typography>
//           )}
//         </Box>
//       </Grid>
      
//       <Grid item xs={12} md={6}>
//         <Stack spacing={3}>
//           <TextField
//             fullWidth
//             label="Full Name"
//             value={formData.owner_name}
//             onChange={handleInputChange('owner_name')}
//             error={!!errors.owner_name}
//             helperText={errors.owner_name}
//             InputProps={{
//               startAdornment: <InputAdornment position="start"><Person /></InputAdornment>
//             }}
//           />
          
//           <TextField
//             fullWidth
//             label="Phone Number"
//             value={formData.phone_number}
//             onChange={handleInputChange('phone_number')}
//             error={!!errors.phone_number}
//             helperText={errors.phone_number}
//             InputProps={{
//               startAdornment: <InputAdornment position="start"><Phone /></InputAdornment>
//             }}
//           />
//         </Stack>
//       </Grid>
      
//       <Grid item xs={12} md={6}>
//         <TextField
//           fullWidth
//           label="Email Address"
//           type="email"
//           value={formData.email}
//           onChange={handleInputChange('email')}
//           error={!!errors.email}
//           helperText={errors.email}
//           InputProps={{
//             startAdornment: <InputAdornment position="start"><Email /></InputAdornment>
//           }}
//         />
//       </Grid>
      
//       <Grid item xs={12} md={6}>
//         <TextField
//           fullWidth
//           label="Aadhar Number"
//           value={formData.aadhar_number}
//           onChange={handleInputChange('aadhar_number')}
//           error={!!errors.aadhar_number}
//           helperText={errors.aadhar_number}
//           inputProps={{ maxLength: 12 }}
//           InputProps={{
//             startAdornment: <InputAdornment position="start"><CreditCard /></InputAdornment>
//           }}
//         />
//       </Grid>
//     </Grid>
//   );

//   const renderBusinessDetails = () => (
//     <Grid container spacing={3}>
//       <Grid item xs={12} md={6}>
//         <TextField
//           fullWidth
//           label="Business Name"
//           value={formData.business_name}
//           onChange={handleInputChange('business_name')}
//           error={!!errors.business_name}
//           helperText={errors.business_name}
//           InputProps={{
//             startAdornment: <InputAdornment position="start"><Store /></InputAdornment>
//           }}
//         />
//       </Grid>
      
//       <Grid item xs={12} md={6}>
//         <FormControl fullWidth error={!!errors.business_type}>
//           <InputLabel>Business Type</InputLabel>
//           <Select
//             value={formData.business_type}
//             onChange={handleInputChange('business_type')}
//             label="Business Type"
//           >
//             {businessTypes.map((type) => (
//               <MenuItem key={type.value} value={type.value}>
//                 {type.label}
//               </MenuItem>
//             ))}
//           </Select>
//           {errors.business_type && <FormHelperText>{errors.business_type}</FormHelperText>}
//         </FormControl>
//       </Grid>
      
//       <Grid item xs={12}>
//         <TextField
//           fullWidth
//           label="Business Description"
//           multiline
//           rows={3}
//           value={formData.business_description}
//           onChange={handleInputChange('business_description')}
//           helperText="Describe your business and the products/services you offer"
//         />
//       </Grid>
      
//       <Grid item xs={12} md={6}>
//         <TextField
//           fullWidth
//           label="GST Number (Optional)"
//           value={formData.gst_number}
//           onChange={handleInputChange('gst_number')}
//           error={!!errors.gst_number}
//           helperText={errors.gst_number || "Format: 22AAAAA0000A1Z5"}
//           placeholder="22AAAAA0000A1Z5"
//         />
//       </Grid>
      
//       <Grid item xs={12} md={6}>
//         <TextField
//           fullWidth
//           label="PAN Number (Optional)"
//           value={formData.pan_number}
//           onChange={handleInputChange('pan_number')}
//           error={!!errors.pan_number}
//           helperText={errors.pan_number || "Format: ABCDE1234F"}
//           placeholder="ABCDE1234F"
//         />
//       </Grid>
      
//       <Grid item xs={12} md={4}>
//         <TextField
//           fullWidth
//           label="Years in Business"
//           type="number"
//           value={formData.years_in_business}
//           onChange={handleInputChange('years_in_business')}
//           InputProps={{ inputProps: { min: 0, max: 100 } }}
//         />
//       </Grid>
      
//       <Grid item xs={12} md={4}>
//         <TextField
//           fullWidth
//           label="Annual Turnover (₹)"
//           type="number"
//           value={formData.annual_turnover}
//           onChange={handleInputChange('annual_turnover')}
//           InputProps={{ inputProps: { min: 0 } }}
//         />
//       </Grid>
      
//       <Grid item xs={12} md={4}>
//         <TextField
//           fullWidth
//           label="Number of Employees"
//           type="number"
//           value={formData.number_of_employees}
//           onChange={handleInputChange('number_of_employees')}
//           InputProps={{ inputProps: { min: 1 } }}
//         />
//       </Grid>
      
//       <Grid item xs={12}>
//         <TextField
//           fullWidth
//           label="Website URL (Optional)"
//           value={formData.website_url}
//           onChange={handleInputChange('website_url')}
//           placeholder="https://www.example.com"
//         />
//       </Grid>
//     </Grid>
//   );

//   const renderAddressContact = () => (
//     <Grid container spacing={3}>
//       <Grid item xs={12}>
//         <TextField
//           fullWidth
//           label="Address Line 1"
//           value={formData.address_line_1}
//           onChange={handleInputChange('address_line_1')}
//           error={!!errors.address_line_1}
//           helperText={errors.address_line_1}
//         />
//       </Grid>
      
//       <Grid item xs={12}>
//         <TextField
//           fullWidth
//           label="Address Line 2 (Optional)"
//           value={formData.address_line_2}
//           onChange={handleInputChange('address_line_2')}
//         />
//       </Grid>
      
//       <Grid item xs={12} md={6}>
//         <TextField
//           fullWidth
//           label="City"
//           value={formData.city}
//           onChange={handleInputChange('city')}
//           error={!!errors.city}
//           helperText={errors.city}
//         />
//       </Grid>
      
//       <Grid item xs={12} md={6}>
//         <FormControl fullWidth error={!!errors.state}>
//           <InputLabel>State</InputLabel>
//           <Select
//             value={formData.state}
//             onChange={handleInputChange('state')}
//             label="State"
//           >
//             {indianStates.map((state) => (
//               <MenuItem key={state} value={state}>
//                 {state}
//               </MenuItem>
//             ))}
//           </Select>
//           {errors.state && <FormHelperText>{errors.state}</FormHelperText>}
//         </FormControl>
//       </Grid>
      
//       <Grid item xs={12} md={6}>
//         <TextField
//           fullWidth
//           label="Postal Code"
//           value={formData.postal_code}
//           onChange={handleInputChange('postal_code')}
//           error={!!errors.postal_code}
//           helperText={errors.postal_code}
//           inputProps={{ maxLength: 6 }}
//         />
//       </Grid>
      
//       <Grid item xs={12} md={6}>
//         <TextField
//           fullWidth
//           label="Country"
//           value={formData.country}
//           onChange={handleInputChange('country')}
//           disabled
//         />
//       </Grid>
//     </Grid>
//   );

//   const renderBankDocuments = () => (
//     <Grid container spacing={3}>
//       <Grid item xs={12}>
//         <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <AccountBalance />
//           Bank Account Details
//         </Typography>
//       </Grid>
      
//       <Grid item xs={12} md={6}>
//         <TextField
//           fullWidth
//           label="Bank Name"
//           value={formData.bank_name}
//           onChange={handleInputChange('bank_name')}
//           error={!!errors.bank_name}
//           helperText={errors.bank_name}
//         />
//       </Grid>
      
//       <Grid item xs={12} md={6}>
//         <TextField
//           fullWidth
//           label="Account Number"
//           value={formData.account_number}
//           onChange={handleInputChange('account_number')}
//           error={!!errors.account_number}
//           helperText={errors.account_number}
//         />
//       </Grid>
      
//       <Grid item xs={12} md={6}>
//         <TextField
//           fullWidth
//           label="IFSC Code"
//           value={formData.ifsc_code}
//           onChange={handleInputChange('ifsc_code')}
//           error={!!errors.ifsc_code}
//           helperText={errors.ifsc_code || "Format: ABCD0123456"}
//           placeholder="ABCD0123456"
//         />
//       </Grid>
      
//       <Grid item xs={12} md={6}>
//         <TextField
//           fullWidth
//           label="Account Holder Name"
//           value={formData.account_holder_name}
//           onChange={handleInputChange('account_holder_name')}
//           error={!!errors.account_holder_name}
//           helperText={errors.account_holder_name}
//         />
//       </Grid>
      
//       <Grid item xs={12}>
//         <Divider sx={{ my: 2 }} />
//         <Typography variant="h6" gutterBottom>
//           Additional Documents (Optional)
//         </Typography>
//       </Grid>
      
//       <Grid item xs={12} md={6}>
//         <TextField
//           fullWidth
//           label="Business License Number"
//           value={formData.business_license_number}
//           onChange={handleInputChange('business_license_number')}
//         />
//       </Grid>
      
//       <Grid item xs={12} md={6}>
//         <TextField
//           fullWidth
//           label="Tax Registration Number"
//           value={formData.tax_registration_number}
//           onChange={handleInputChange('tax_registration_number')}
//         />
//       </Grid>
//     </Grid>
//   );

//   const renderReviewSubmit = () => (
//     <Box>
//       <Alert severity="info" sx={{ mb: 3 }}>
//         <Typography variant="body2">
//           Please review all the information below before submitting your application. 
//           You can go back to any previous step to make changes.
//         </Typography>
//       </Alert>
      
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Card elevation={0} sx={{ border: '1px solid #E5E7EB' }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Person />
//                 Personal Information
//               </Typography>
//               <Stack spacing={1}>
//                 <Typography variant="body2"><strong>Name:</strong> {formData.owner_name}</Typography>
//                 <Typography variant="body2"><strong>Phone:</strong> {formData.phone_number}</Typography>
//                 <Typography variant="body2"><strong>Email:</strong> {formData.email}</Typography>
//                 <Typography variant="body2"><strong>Aadhar:</strong> {formData.aadhar_number}</Typography>
//               </Stack>
//             </CardContent>
//           </Card>
//         </Grid>
        
//         <Grid item xs={12} md={6}>
//           <Card elevation={0} sx={{ border: '1px solid #E5E7EB' }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Business />
//                 Business Details
//               </Typography>
//               <Stack spacing={1}>
//                 <Typography variant="body2"><strong>Business Name:</strong> {formData.business_name}</Typography>
//                 <Typography variant="body2"><strong>Type:</strong> {businessTypes.find(t => t.value === formData.business_type)?.label}</Typography>
//                 {formData.gst_number && <Typography variant="body2"><strong>GST:</strong> {formData.gst_number}</Typography>}
//                 {formData.pan_number && <Typography variant="body2"><strong>PAN:</strong> {formData.pan_number}</Typography>}
//               </Stack>
//             </CardContent>
//           </Card>
//         </Grid>
        
//         <Grid item xs={12} md={6}>
//           <Card elevation={0} sx={{ border: '1px solid #E5E7EB' }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <LocationOn />
//                 Address
//               </Typography>
//               <Stack spacing={1}>
//                 <Typography variant="body2"><strong>Address:</strong> {formData.address_line_1}</Typography>
//                 {formData.address_line_2 && <Typography variant="body2">{formData.address_line_2}</Typography>}
//                 <Typography variant="body2"><strong>City:</strong> {formData.city}, {formData.state}</Typography>
//                 <Typography variant="body2"><strong>Postal Code:</strong> {formData.postal_code}</Typography>
//               </Stack>
//             </CardContent>
//           </Card>
//         </Grid>
        
//         <Grid item xs={12} md={6}>
//           <Card elevation={0} sx={{ border: '1px solid #E5E7EB' }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <AccountBalance />
//                 Bank Details
//               </Typography>
//               <Stack spacing={1}>
//                 <Typography variant="body2"><strong>Bank:</strong> {formData.bank_name}</Typography>
//                 <Typography variant="body2"><strong>Account:</strong> {formData.account_number}</Typography>
//                 <Typography variant="body2"><strong>IFSC:</strong> {formData.ifsc_code}</Typography>
//                 <Typography variant="body2"><strong>Holder:</strong> {formData.account_holder_name}</Typography>
//               </Stack>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
      
//       <Box sx={{ mt: 4 }}>
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={formData.terms_accepted}
//               onChange={handleInputChange('terms_accepted')}
//               color="primary"
//             />
//           }
//           label={
//             <Typography variant="body2">
//               I agree to the <strong>Terms and Conditions</strong> and <strong>Privacy Policy</strong>. 
//               I confirm that all the information provided is accurate and complete.
//             </Typography>
//           }
//         />
//         {errors.terms_accepted && (
//           <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
//             {errors.terms_accepted}
//           </Typography>
//         )}
//       </Box>
      
//       {errors.submit && (
//         <Alert severity="error" sx={{ mt: 2 }}>
//           {errors.submit}
//         </Alert>
//       )}
//     </Box>
//   );

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: '#F8FAFC', py: 4 }}>
//       <Container maxWidth="lg">
//         {/* Header */}
//         <Fade in timeout={600}>
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: 3,
//               border: '1px solid #E5E7EB',
//               mb: 4,
//               overflow: 'hidden',
//               background: 'linear-gradient(135deg, #232f3e 0%, #808791 100%)',
//               color: 'white'
//             }}
//           >
//             <Box sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
//               <Store sx={{ fontSize: { xs: 48, md: 64 }, mb: 2 }} />
//               <Typography 
//                 variant="h3" 
//                 gutterBottom 
//                 sx={{ 
//                   fontWeight: 800,
//                   fontSize: { xs: '2rem', md: '2.5rem' }
//                 }}
//               >
//                 Become a Vendor
//               </Typography>
//               <Typography 
//                 variant="h6" 
//                 sx={{ 
//                   opacity: 0.9,
//                   fontSize: { xs: '1rem', md: '1.25rem' },
//                   fontWeight: 400,
//                   maxWidth: 600,
//                   mx: 'auto'
//                 }}
//               >
//                 Join our marketplace and reach thousands of customers. 
//                 Complete the registration process to start selling your products.
//               </Typography>
//             </Box>
//           </Paper>
//         </Fade>

//         {/* Progress Stepper */}
//         <Fade in timeout={600} style={{ transitionDelay: '200ms' }}>
//           <Paper 
//             elevation={0}
//             sx={{ 
//               mb: 4,
//               borderRadius: 2,
//               border: '1px solid #E5E7EB',
//               overflow: 'hidden'
//             }}
//           >
//             <Stepper 
//               activeStep={activeStep} 
//               sx={{ 
//                 p: { xs: 2, md: 3 },
//                 '& .MuiStepConnector-line': {
//                   borderColor: '#E5E7EB'
//                 }
//               }}
//             >
//               {steps.map((step, index) => (
//                 <Step key={step.label}>
//                   <StepLabel
//                     StepIconComponent={() => (
//                       <Box
//                         sx={{
//                           width: { xs: 32, md: 40 },
//                           height: { xs: 32, md: 40 },
//                           borderRadius: '50%',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           bgcolor: index <= activeStep ? '#232f3e' : '#E5E7EB',
//                           color: index <= activeStep ? 'white' : '#9CA3AF',
//                           fontSize: { xs: '1rem', md: '1.2rem' },
//                           transition: 'all 0.3s ease'
//                         }}
//                       >
//                         {index < activeStep ? <CheckCircle /> : step.icon}
//                       </Box>
//                     )}
//                     sx={{
//                       '& .MuiStepLabel-label': {
//                         fontWeight: 600,
//                         fontSize: { xs: '0.8rem', md: '1rem' },
//                         color: index <= activeStep ? '#111827' : '#6B7280',
//                         mt: { xs: 1, md: 1.5 }
//                       }
//                     }}
//                   >
//                     {step.label}
//                   </StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//           </Paper>
//         </Fade>

//         {/* Form Content */}
//         <Fade in timeout={600} style={{ transitionDelay: '400ms' }}>
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: 2,
//               border: '1px solid #E5E7EB',
//               mb: 4
//             }}
//           >
//             <Box sx={{ p: { xs: 3, md: 6 } }}>
//               {activeStep === 0 && (
//                 <Box>
//                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
//                     Personal Information
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
//                     Please provide your personal details as they appear on your government ID.
//                   </Typography>
//                   {renderPersonalInfo()}
//                 </Box>
//               )}

//               {activeStep === 1 && (
//                 <Box>
//                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
//                     Business Details
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
//                     Tell us about your business and what you plan to sell on our platform.
//                   </Typography>
//                   {renderBusinessDetails()}
//                 </Box>
//               )}

//               {activeStep === 2 && (
//                 <Box>
//                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
//                     Address & Contact Information
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
//                     Provide your business address and contact details for communication and delivery purposes.
//                   </Typography>
//                   {renderAddressContact()}
//                 </Box>
//               )}

//               {activeStep === 3 && (
//                 <Box>
//                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
//                     Bank Account & Documents
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
//                     Provide your bank account details for payment processing and any additional business documents.
//                   </Typography>
//                   {renderBankDocuments()}
//                 </Box>
//               )}

//               {activeStep === 4 && (
//                 <Box>
//                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
//                     Review & Submit
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
//                     Please review all information before submitting your vendor registration application.
//                   </Typography>
//                   {renderReviewSubmit()}
//                 </Box>
//               )}
//             </Box>
//           </Paper>
//         </Fade>

//         {/* Navigation Buttons */}
//         <Fade in timeout={600} style={{ transitionDelay: '600ms' }}>
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: 2,
//               border: '1px solid #E5E7EB',
//               p: { xs: 3, md: 4 }
//             }}
//           >
//             <Stack 
//               direction="row" 
//               justifyContent="space-between" 
//               alignItems="center"
//               spacing={2}
//             >
//               <Button
//                 onClick={handleBack}
//                 disabled={activeStep === 0}
//                 startIcon={<ArrowBack />}
//                 sx={{
//                   borderRadius: 2,
//                   textTransform: 'none',
//                   px: 4,
//                   py: 1.5,
//                   color: '#6B7280',
//                   borderColor: '#E5E7EB',
//                   '&:hover': {
//                     borderColor: '#9CA3AF',
//                     backgroundColor: '#F9FAFB'
//                   },
//                   '&:disabled': {
//                     color: '#D1D5DB'
//                   }
//                 }}
//                 variant="outlined"
//               >
//                 Back
//               </Button>
              
//               {activeStep < steps.length - 1 ? (
//                 <Button
//                   variant="contained"
//                   onClick={handleNext}
//                   endIcon={<ArrowForward />}
//                   sx={{
//                     borderRadius: 2,
//                     textTransform: 'none',
//                     px: 4,
//                     py: 1.5,
//                     fontSize: '1rem',
//                     fontWeight: 600,
//                     backgroundColor: '#232f3e',
//                     '&:hover': {
//                       backgroundColor: '#1E3A8A',
//                       transform: 'translateY(-1px)'
//                     },
//                     transition: 'all 0.3s ease'
//                   }}
//                 >
//                   Continue
//                 </Button>
//               ) : (
//                 <Button
//                   variant="contained"
//                   onClick={handleSubmit}
//                   disabled={loading}
//                   startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
//                   sx={{
//                     borderRadius: 2,
//                     textTransform: 'none',
//                     px: 6,
//                     py: 1.5,
//                     fontSize: '1.1rem',
//                     fontWeight: 700,
//                     backgroundColor: '#16A34A',
//                     boxShadow: '0 4px 14px rgba(22, 163, 74, 0.25)',
//                     '&:hover': {
//                       backgroundColor: '#15803D',
//                       transform: 'translateY(-1px)',
//                       boxShadow: '0 6px 20px rgba(22, 163, 74, 0.35)'
//                     },
//                     '&:disabled': {
//                       backgroundColor: '#9CA3AF'
//                     },
//                     transition: 'all 0.3s ease'
//                   }}
//                 >
//                   {loading ? 'Submitting...' : 'Submit Application'}
//                 </Button>
//               )}
//             </Stack>
//           </Paper>
//         </Fade>

//         {/* Help Section */}
//         <Fade in timeout={600} style={{ transitionDelay: '800ms' }}>
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: 2,
//               border: '1px solid #E5E7EB',
//               mt: 4,
//               p: { xs: 3, md: 4 }
//             }}
//           >
//             <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Info />
//               Need Help?
//             </Typography>
//             <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
//               If you have any questions about the registration process or need assistance, please contact our vendor support team.
//             </Typography>
            
//             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
//               <Chip
//                 icon={<Email />}
//                 label="vendor-support@example.com"
//                 variant="outlined"
//                 sx={{ 
//                   borderRadius: 2,
//                   py: 1,
//                   fontSize: '0.9rem',
//                   '&:hover': { backgroundColor: '#F3F4F6' }
//                 }}
//               />
//               <Chip
//                 icon={<Phone />}
//                 label="+1 (555) 123-4567"
//                 variant="outlined"
//                 sx={{ 
//                   borderRadius: 2,
//                   py: 1,
//                   fontSize: '0.9rem',
//                   '&:hover': { backgroundColor: '#F3F4F6' }
//                 }}
//               />
//             </Stack>
//           </Paper>
//         </Fade>
//       </Container>
//     </Box>
//   );
// };

// export default VendorRegistrationPage;