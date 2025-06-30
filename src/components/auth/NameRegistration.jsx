// // // src/components/auth/NameRegistration.jsx
// // import React, { useState } from 'react'
// // import { useSelector, useDispatch } from 'react-redux'
// // import { User, ArrowRight, CheckCircle } from 'lucide-react'
// // import { completeRegistration } from '../../redux/slices/authSlices'
// // import { validateName } from '../../utils/validation'
// // import ErrorMessage from '../ui/ErrorMessage'
// // import LoadingSpinner from '../ui/LoadingSpinner'

// // const NameRegistration = () => {
// //   const dispatch = useDispatch()
// //   const { isLoading, error, phoneNumber } = useSelector(state => state.auth)
// //   const [name, setName] = useState('')
// //   const [nameError, setNameError] = useState('')
// //   const [isFocused, setIsFocused] = useState(false)

// //   const handleNameChange = (e) => {
// //     const value = e.target.value
// //     setName(value)
    
// //     // Clear error when user starts typing
// //     if (nameError) {
// //       setNameError('')
// //     }
// //   }

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
    
// //     // Validate name
// //     const validation = validateName(name, 'Name')
// //     if (!validation.isValid) {
// //       setNameError(validation.error)
// //       return
// //     }
    
// //     // Submit registration
// //     dispatch(completeRegistration({ 
// //       phoneNumber,
// //       name: name.trim()
// //     }))
// //   }
// //   return (
// //     <div style={{
// //       fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
// //       color: '#333'
// //     }}>
// //       {/* Header Section */}
// //       <div style={{
// //         textAlign: 'center',
// //         marginBottom: '32px'
// //       }}>
// //         <div style={{
// //           width: '64px',
// //           height: '64px',
// //           background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
// //           borderRadius: '50%',
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           margin: '0 auto 20px',
// //           boxShadow: '0 4px 14px rgba(76, 175, 80, 0.3)'
// //         }}>
// //           <User style={{ width: '32px', height: '32px', color: 'white' }} />
// //         </div>
        
// //         <h2 style={{
// //           fontSize: '24px',
// //           fontWeight: '500',
// //           color: '#333',
// //           margin: '0 0 8px 0'
// //         }}>
// //           Welcome! Let's get to know you
// //         </h2>
        
// //         <p style={{
// //           fontSize: '14px',
// //           color: '#666',
// //           margin: '0 0 8px 0',
// //           lineHeight: '1.5'
// //         }}>
// //           Please enter your name to complete registration
// //         </p>
        
// //         <p style={{
// //           fontSize: '13px',
// //           color: '#999',
// //           margin: '0',
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           gap: '8px'
// //         }}>
// //           <CheckCircle style={{ width: '16px', height: '16px', color: '#4caf50' }} />
// //           Phone verified: {phoneNumber}
// //         </p>
// //       </div>

// //       {/* Form */}
// //       <form onSubmit={handleSubmit}>
// //         <div style={{ marginBottom: '24px' }}>
// //           {/* Name Input */}
// //           <div style={{ position: 'relative' }}>
// //             <input
// //               type="text"
// //               value={name}
// //               onChange={handleNameChange}
// //               onFocus={() => setIsFocused(true)}
// //               onBlur={() => setIsFocused(false)}
// //               placeholder="Enter your full name"
// //               disabled={isLoading}
// //               autoFocus
// //               style={{
// //                 width: '100%',
// //                 height: '56px',
// //                 padding: '0 16px 0 48px',
// //                 border: `2px solid ${nameError ? '#f44336' : (isFocused ? '#4caf50' : '#e0e0e0')}`,
// //                 borderRadius: '12px',
// //                 background: 'white',
// //                 fontSize: '16px',
// //                 fontFamily: 'inherit',
// //                 outline: 'none',
// //                 transition: 'all 0.2s ease',
// //                 boxSizing: 'border-box'
// //               }}
// //             />
// //             {/* User Icon */}
// //             <User style={{
// //               position: 'absolute',
// //               left: '16px',
// //               top: '50%',
// //               transform: 'translateY(-50%)',
// //               width: '20px',
// //               height: '20px',
// //               color: isFocused ? '#4caf50' : '#666'
// //             }} />
// //           </div>
          
// //           {/* Name Error Message */}
// //           {nameError && (
// //             <div style={{
// //               color: '#f44336',
// //               fontSize: '12px',
// //               marginTop: '8px',
// //               display: 'flex',
// //               alignItems: 'center',
// //               gap: '4px'
// //             }}>
// //               <span style={{ fontSize: '16px' }}>⚠️</span>
// //               {nameError}
// //             </div>
// //           )}
          
// //           {/* Help Text */}
// //           <p style={{
// //             fontSize: '12px',
// //             color: '#999',
// //             marginTop: '8px',
// //             textAlign: 'center'
// //           }}>
// //             This is how we'll address you in our communications
// //           </p>
// //         </div>
        
// //         {/* API Error Message */}
// //         {error && (
// //           <div style={{ marginBottom: '24px' }}>
// //             <ErrorMessage message={error} />
// //           </div>
// //         )}
        
// //         {/* Submit Button */}
// //         <button
// //           type="submit"
// //           disabled={isLoading || !name.trim()}
// //           style={{
// //             width: '100%',
// //             height: '56px',
// //             background: isLoading || !name.trim() 
// //               ? 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)' 
// //               : 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
// //             color: isLoading || !name.trim() ? '#999' : 'white',
// //             border: 'none',
// //             borderRadius: '12px',
// //             fontSize: '16px',
// //             fontWeight: '600',
// //             fontFamily: 'inherit',
// //             cursor: isLoading || !name.trim() ? 'not-allowed' : 'pointer',
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             gap: '12px',
// //             transition: 'all 0.2s ease',
// //             boxShadow: isLoading || !name.trim() 
// //               ? 'none' 
// //               : '0 4px 12px rgba(76, 175, 80, 0.3)',
// //             outline: 'none'
// //           }}
// //           onMouseOver={(e) => {
// //             if (!isLoading && name.trim()) {
// //               e.target.style.transform = 'translateY(-2px)'
// //               e.target.style.boxShadow = '0 6px 16px rgba(76, 175, 80, 0.4)'
// //             }
// //           }}
// //           onMouseOut={(e) => {
// //             e.target.style.transform = 'translateY(0)'
// //             e.target.style.boxShadow = isLoading || !name.trim() 
// //               ? 'none' 
// //               : '0 4px 12px rgba(76, 175, 80, 0.3)'
// //           }}
// //         >
// //           {isLoading ? (
// //             <>
// //               <LoadingSpinner size="small" color="white" />
// //               <span>Creating your account...</span>
// //             </>
// //           ) : (
// //             <>
// //               <span>Complete Registration</span>
// //               <ArrowRight style={{ width: '20px', height: '20px' }} />
// //             </>
// //           )}
// //         </button>
// //       </form>
      
// //       {/* Privacy Note */}
// //       <div style={{
// //         textAlign: 'center',
// //         marginTop: '32px',
// //         padding: '16px',
// //         background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
// //         borderRadius: '12px',
// //         border: '1px solid #c8e6c9'
// //       }}>
// //         <p style={{
// //           fontSize: '12px',
// //           color: '#388e3c',
// //           margin: '0',
// //           lineHeight: '1.5'
// //         }}>
// //           🔒 Your information is secure and will only be used to personalize your experience
// //         </p>
// //       </div>
// //     </div>
// //   )
// // }

// // export default NameRegistration


// // // src/components/auth/NameRegistration.jsx
// // import React, { useState } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { completeRegistration } from '../../redux/slices/authSlices';
// // import { validateName } from '../../utils/validation';
// // import ErrorMessage from '../ui/ErrorMessage';
// // import LoadingSpinner from '../ui/LoadingSpinner';

// // const NameRegistration = () => {
// //   const dispatch = useDispatch();
// //   const { isLoading, error, phoneNumber } = useSelector(state => state.auth);
// //   const [name, setName] = useState('');
// //   const 
// //   const [nameError, setNameError] = useState('');
// //   const [isFocused, setIsFocused] = useState(false);

// //   const handleNameChange = (e) => {
// //     const value = e.target.value;
// //     setName(value);
// //     if (nameError) setNameError('');
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const validation = validateName(name, 'Name');
// //     if (!validation.isValid) {
// //       setNameError(validation.error);
// //       return;
// //     }

// //     dispatch(completeRegistration({
// //       phoneNumber,
// //       name: name.trim(),
// //     }));
// //   };

// //   return (
// //     <div>
// //       <h2>Welcome! Let's get to know you</h2>
// //       <p>Please enter your name to complete registration</p>
// //       <p>Phone verified: {phoneNumber}</p>

// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <input
// //             type="text"
// //             value={name}
// //             onChange={handleNameChange}
// //             onFocus={() => setIsFocused(true)}
// //             onBlur={() => setIsFocused(false)}
// //             placeholder="Enter your full name"
// //             disabled={isLoading}
// //             autoFocus
// //           />
// //           {nameError && <div>{nameError}</div>}
// //         </div>

// //         {error && <ErrorMessage message={error} />}

// //         <button type="submit" disabled={isLoading || !name.trim()}>
// //           {isLoading ? (
// //             <>
// //               <LoadingSpinner size="small" color="white" />
// //               <span>Creating your account...</span>
// //             </>
// //           ) : (
// //             <>
// //               <span>Complete Registration</span>
// //             </>
// //           )}
// //         </button>
// //       </form>

// //       <p>Your information is secure and will only be used to personalize your experience</p>
// //     </div>
// //   );
// // };

// // export default NameRegistration;

// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { completeRegistration } from '../../redux/slices/authSlices';
// import { validateName, validateEmail, validateAadhar, validateIFSC } from '../../utils/validation';
// import ErrorMessage from '../ui/ErrorMessage';
// import LoadingSpinner from '../ui/LoadingSpinner';

// const NameRegistration = () => {
//   const dispatch = useDispatch();
//   const { isLoading, error, phoneNumber } = useSelector(state => state.auth);

//   const [formData, setFormData] = useState({
//     vendor_photo: null,
//     full_name: '',
//     phone_number: phoneNumber || '',
//     email: '',
//     aadhar_number: '',
//     personal_address: '',
//     business_name: '',
//     business_type: '',
//     gst_number: '',
//     business_address: '',
//     account_holder_name: '',
//     account_number: '',
//     ifsc_code: ''
//   });

//   const [formErrors, setFormErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: files ? files[0] : value
//     }));
//     setFormErrors(prev => ({ ...prev, [name]: '' }));
//   };

//   const validateForm = () => {
//     const errors = {};
//     const { full_name, email, aadhar_number, business_name, business_address, account_holder_name, account_number, ifsc_code, gst_number } = formData;

//     if (!full_name.trim()) errors.full_name = 'Full name is required';
//     // if (!/^\d{10}$/.test(phone_number)) errors.phone_number = 'Phone number must be 10 digits';
//     if (email && !validateEmail(email).isValid) errors.email = 'Invalid email format';
//     if (!/^\d{12}$/.test(aadhar_number)) errors.aadhar_number = 'Aadhar number must be 12 digits';
//     if (!business_name.trim()) errors.business_name = 'Business name is required';
//     if (!business_address.trim()) errors.business_address = 'Business address is required';
//     if (!account_holder_name.trim()) errors.account_holder_name = 'Account holder name is required';
//     if (!account_number.trim()) errors.account_number = 'Account number is required';
//     if (!validateIFSC(ifsc_code).isValid) errors.ifsc_code = 'Invalid IFSC code';
//     if (!formData.personal_address.trim()) {
//   errors.personal_address = 'Personal address is required';
// }

//     if (gst_number && !/^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1})$/.test(gst_number)) {
//       errors.gst_number = 'Invalid GST number';
//     }
    

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const payload = {
//       ...formData,
//       phoneNumber: formData.phone_number,
//       name: formData.full_name.trim()
//     };

//     dispatch(completeRegistration(payload));
//   };

//   return (
//     <div>
//       <h2>Vendor Registration</h2>
//       <form onSubmit={handleSubmit}>

//         <fieldset>
//           <legend>🧍 Personal Information</legend>
//           <div>
//             <label>Profile Photo</label>
//             <input type="file" name="vendor_photo" accept="image/*" onChange={handleChange} />
//           </div>
//           <div>
//             <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} />
//             {formErrors.full_name && <div>{formErrors.full_name}</div>}
//           </div>
//           <div>
//             <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} />
//             {formErrors.phone_number && <div>{formErrors.phone_number}</div>}
//           </div>
//           <div>
//             <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//             {formErrors.email && <div>{formErrors.email}</div>}
//           </div>
//           <div>
//             <input type="text" name="aadhar_number" placeholder="Aadhar Number" value={formData.aadhar_number} onChange={handleChange} />
//             {formErrors.aadhar_number && <div>{formErrors.aadhar_number}</div>}
//           </div>
//           <div>
//   <input
//     type="text"
//     name="personal_address"
//     placeholder="Personal Address"
//     value={formData.personal_address}
//     onChange={handleChange}
//   />
//   {formErrors.personal_address && <div>{formErrors.personal_address}</div>}
// </div>

//         </fieldset>

//         <fieldset>
//           <legend>🏢 Business Details</legend>
//           <div>
//             <input type="text" name="business_name" placeholder="Business Name" value={formData.business_name} onChange={handleChange} />
//             {formErrors.business_name && <div>{formErrors.business_name}</div>}
//           </div>
//           <div>
//             <input type="text" name="business_type" placeholder="Business Type" value={formData.business_type} onChange={handleChange} />
//           </div>
//           <div>
//             <input type="text" name="gst_number" placeholder="GST Number (optional)" value={formData.gst_number} onChange={handleChange} />
//             {formErrors.gst_number && <div>{formErrors.gst_number}</div>}
//           </div>
//           <div>
//             <input type="text" name="business_address" placeholder="Business Address" value={formData.business_address} onChange={handleChange} />
//             {formErrors.business_address && <div>{formErrors.business_address}</div>}
//           </div>
//         </fieldset>

//         <fieldset>
//           <legend>🏦 Bank Details</legend>
//           <div>
//             <input type="text" name="account_holder_name" placeholder="Account Holder Name" value={formData.account_holder_name} onChange={handleChange} />
//             {formErrors.account_holder_name && <div>{formErrors.account_holder_name}</div>}
//           </div>
//           <div>
//             <input type="text" name="account_number" placeholder="Account Number" value={formData.account_number} onChange={handleChange} />
//             {formErrors.account_number && <div>{formErrors.account_number}</div>}
//           </div>
//           <div>
//             <input type="text" name="ifsc_code" placeholder="IFSC Code" value={formData.ifsc_code} onChange={handleChange} />
//             {formErrors.ifsc_code && <div>{formErrors.ifsc_code}</div>}
//           </div>
//         </fieldset>

//         {error && <ErrorMessage message={error} />}
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? (
//             <>
//               <LoadingSpinner size="small" color="white" />
//               <span>Submitting...</span>
//             </>
//           ) : (
//             <span>Register Vendor</span>
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default NameRegistration;





// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   Box,
// //   Container,
// //   Typography,
// //   Paper,
// //   Stepper,
// //   Step,
// //   StepLabel,
// //   Button,
// //   Grid,
// //   TextField,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   FormControlLabel,
// //   Checkbox,
// //   Alert,
// //   Avatar,
// //   IconButton,
// //   Stack,
// //   Divider,
// //   Chip,
// //   Card,
// //   CardContent,
// //   FormHelperText,
// //   CircularProgress,
// //   Fade,
// //   InputAdornment
// // } from '@mui/material';
// // import {
// //   PhotoCamera,
// //   Business,
// //   Person,
// //   LocationOn,
// //   AccountBalance,
// //   VerifiedUser,
// //   Upload,
// //   Phone,
// //   Email,
// //   CreditCard,
// //   Store,
// //   ArrowBack,
// //   ArrowForward,
// //   CheckCircle,
// //   Info
// // } from '@mui/icons-material';

// // const steps = [
// //   { label: 'Personal Information', icon: <Person /> },
// //   { label: 'Business Details', icon: <Business /> },
// //   { label: 'Address & Contact', icon: <LocationOn /> },
// //   { label: 'Bank & Documents', icon: <AccountBalance /> },
// //   { label: 'Review & Submit', icon: <VerifiedUser /> }
// // ];

// // const businessTypes = [
// //   { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
// //   { value: 'partnership', label: 'Partnership' },
// //   { value: 'private_limited', label: 'Private Limited Company' },
// //   { value: 'public_limited', label: 'Public Limited Company' },
// //   { value: 'llp', label: 'Limited Liability Partnership (LLP)' },
// //   { value: 'one_person_company', label: 'One Person Company (OPC)' },
// //   { value: 'trust', label: 'Trust' },
// //   { value: 'society', label: 'Society' },
// //   { value: 'cooperative', label: 'Cooperative' },
// //   { value: 'other', label: 'Other' }
// // ];

// // const indianStates = [
// //   'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
// //   'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
// //   'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
// //   'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
// //   'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
// //   'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
// //   'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
// // ];

// // const VendorRegistrationPage = () => {
// //   const navigate = useNavigate();
// //   const [activeStep, setActiveStep] = useState(0);
// //   const [loading, setLoading] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [photoPreview, setPhotoPreview] = useState(null);

// //   // Form data state
// //   const [formData, setFormData] = useState({
// //     // Personal Information
// //     owner_name: '',
// //     phone_number: '',
// //     email: '',
// //     aadhar_number: '',
// //     vendor_photo: null,
    
// //     // Business Details
// //     business_name: '',
// //     business_type: '',
// //     business_description: '',
// //     gst_number: '',
// //     pan_number: '',
// //     years_in_business: '',
// //     annual_turnover: '',
// //     number_of_employees: '',
// //     website_url: '',
    
// //     // Address & Contact
// //     address_line_1: '',
// //     address_line_2: '',
// //     city: '',
// //     state: '',
// //     postal_code: '',
// //     country: 'India',
    
// //     // Bank Details
// //     bank_name: '',
// //     account_number: '',
// //     ifsc_code: '',
// //     account_holder_name: '',
    
// //     // Documents & Legal
// //     business_license_number: '',
// //     tax_registration_number: '',
    
// //     // Terms
// //     terms_accepted: false
// //   });

// //   const handleInputChange = (field) => (event) => {
// //     const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
// //     setFormData(prev => ({ ...prev, [field]: value }));
    
// //     // Clear error when user starts typing
// //     if (errors[field]) {
// //       setErrors(prev => ({ ...prev, [field]: '' }));
// //     }
// //   };

// //   const handlePhotoChange = (event) => {
// //     const file = event.target.files[0];
// //     if (file) {
// //       if (file.size > 5 * 1024 * 1024) { // 5MB limit
// //         setErrors(prev => ({ ...prev, vendor_photo: 'File size should be less than 5MB' }));
// //         return;
// //       }
      
// //       if (!file.type.startsWith('image/')) {
// //         setErrors(prev => ({ ...prev, vendor_photo: 'Please select a valid image file' }));
// //         return;
// //       }
      
// //       setFormData(prev => ({ ...prev, vendor_photo: file }));
      
// //       // Create preview
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setPhotoPreview(reader.result);
// //       };
// //       reader.readAsDataURL(file);
      
// //       // Clear error
// //       setErrors(prev => ({ ...prev, vendor_photo: '' }));
// //     }
// //   };

// //   const validateStep = (step) => {
// //     const newErrors = {};
    
// //     switch (step) {
// //       case 0: // Personal Information
// //         if (!formData.owner_name) newErrors.owner_name = 'Name is required';
// //         if (!formData.phone_number) newErrors.phone_number = 'Phone number is required';
// //         else if (!/^[6-9]\d{9}$/.test(formData.phone_number)) newErrors.phone_number = 'Invalid phone number';
// //         if (!formData.email) newErrors.email = 'Email is required';
// //         else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
// //         if (!formData.aadhar_number) newErrors.aadhar_number = 'Aadhar number is required';
// //         else if (!/^\d{12}$/.test(formData.aadhar_number)) newErrors.aadhar_number = 'Aadhar number must be 12 digits';
// //         break;
        
// //       case 1: // Business Details
// //         if (!formData.business_name) newErrors.business_name = 'Business name is required';
// //         if (!formData.business_type) newErrors.business_type = 'Business type is required';
// //         if (formData.gst_number && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gst_number)) {
// //           newErrors.gst_number = 'Invalid GST number format';
// //         }
// //         if (formData.pan_number && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan_number)) {
// //           newErrors.pan_number = 'Invalid PAN number format';
// //         }
// //         break;
        
// //       case 2: // Address & Contact
// //         if (!formData.address_line_1) newErrors.address_line_1 = 'Address is required';
// //         if (!formData.city) newErrors.city = 'City is required';
// //         if (!formData.state) newErrors.state = 'State is required';
// //         if (!formData.postal_code) newErrors.postal_code = 'Postal code is required';
// //         else if (!/^\d{6}$/.test(formData.postal_code)) newErrors.postal_code = 'Invalid postal code';
// //         break;
        
// //       case 3: // Bank & Documents
// //         if (!formData.bank_name) newErrors.bank_name = 'Bank name is required';
// //         if (!formData.account_number) newErrors.account_number = 'Account number is required';
// //         if (!formData.ifsc_code) newErrors.ifsc_code = 'IFSC code is required';
// //         else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc_code)) newErrors.ifsc_code = 'Invalid IFSC code format';
// //         if (!formData.account_holder_name) newErrors.account_holder_name = 'Account holder name is required';
// //         break;
        
// //       case 4: // Review & Submit
// //         if (!formData.terms_accepted) newErrors.terms_accepted = 'You must accept the terms and conditions';
// //         break;
// //     }
    
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleNext = () => {
// //     if (validateStep(activeStep)) {
// //       setActiveStep((prevActiveStep) => prevActiveStep + 1);
// //     }
// //   };

// //   const handleBack = () => {
// //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
// //   };

// //   const handleSubmit = async () => {
// //     if (!validateStep(activeStep)) return;
    
// //     setLoading(true);
// //     try {
// //       // Create FormData for file upload
// //       const submitData = new FormData();
      
// //       // Append all form fields
// //       Object.keys(formData).forEach(key => {
// //         if (key === 'vendor_photo' && formData[key]) {
// //           submitData.append(key, formData[key]);
// //         } else if (key !== 'vendor_photo') {
// //           submitData.append(key, formData[key]);
// //         }
// //       });
      
// //       // Here you would make the API call
// //       // const response = await api.post('/api/v1/vendors/register', submitData);
      
// //       // Simulate API call
// //       await new Promise(resolve => setTimeout(resolve, 2000));
      
// //       // Show success message and redirect
// //       navigate('/dashboard', { 
// //         state: { 
// //           message: 'Registration submitted successfully! We will review your application and get back to you within 2-3 business days.',
// //           businessName: formData.business_name
// //         } 
// //       });
      
// //     } catch (error) {
// //       console.error('Registration error:', error);
// //       setErrors({ submit: 'Registration failed. Please try again.' });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const renderPersonalInfo = () => (
// //     <Grid container spacing={3}>
// //       <Grid item xs={12} md={6}>
// //         <Box sx={{ textAlign: 'center', mb: 3 }}>
// //           <input
// //             accept="image/*"
// //             style={{ display: 'none' }}
// //             id="photo-upload"
// //             type="file"
// //             onChange={handlePhotoChange}
// //           />
// //           <label htmlFor="photo-upload">
// //             <Avatar
// //               src={photoPreview}
// //               sx={{ 
// //                 width: 120, 
// //                 height: 120, 
// //                 mx: 'auto', 
// //                 mb: 2,
// //                 bgcolor: '#F3F4F6',
// //                 cursor: 'pointer',
// //                 '&:hover': { bgcolor: '#E5E7EB' }
// //               }}
// //             >
// //               {!photoPreview && <PhotoCamera sx={{ fontSize: 40, color: '#6B7280' }} />}
// //             </Avatar>
// //           </label>
// //           <Typography variant="body2" color="textSecondary">
// //             Click to upload photo (Max 5MB)
// //           </Typography>
// //           {errors.vendor_photo && (
// //             <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
// //               {errors.vendor_photo}
// //             </Typography>
// //           )}
// //         </Box>
// //       </Grid>
      
// //       <Grid item xs={12} md={6}>
// //         <Stack spacing={3}>
// //           <TextField
// //             fullWidth
// //             label="Full Name"
// //             value={formData.owner_name}
// //             onChange={handleInputChange('owner_name')}
// //             error={!!errors.owner_name}
// //             helperText={errors.owner_name}
// //             InputProps={{
// //               startAdornment: <InputAdornment position="start"><Person /></InputAdornment>
// //             }}
// //           />
          
// //           <TextField
// //             fullWidth
// //             label="Phone Number"
// //             value={formData.phone_number}
// //             onChange={handleInputChange('phone_number')}
// //             error={!!errors.phone_number}
// //             helperText={errors.phone_number}
// //             InputProps={{
// //               startAdornment: <InputAdornment position="start"><Phone /></InputAdornment>
// //             }}
// //           />
// //         </Stack>
// //       </Grid>
      
// //       <Grid item xs={12} md={6}>
// //         <TextField
// //           fullWidth
// //           label="Email Address"
// //           type="email"
// //           value={formData.email}
// //           onChange={handleInputChange('email')}
// //           error={!!errors.email}
// //           helperText={errors.email}
// //           InputProps={{
// //             startAdornment: <InputAdornment position="start"><Email /></InputAdornment>
// //           }}
// //         />
// //       </Grid>
      
// //       <Grid item xs={12} md={6}>
// //         <TextField
// //           fullWidth
// //           label="Aadhar Number"
// //           value={formData.aadhar_number}
// //           onChange={handleInputChange('aadhar_number')}
// //           error={!!errors.aadhar_number}
// //           helperText={errors.aadhar_number}
// //           inputProps={{ maxLength: 12 }}
// //           InputProps={{
// //             startAdornment: <InputAdornment position="start"><CreditCard /></InputAdornment>
// //           }}
// //         />
// //       </Grid>
// //     </Grid>
// //   );

// //   const renderBusinessDetails = () => (
// //     <Grid container spacing={3}>
// //       <Grid item xs={12} md={6}>
// //         <TextField
// //           fullWidth
// //           label="Business Name"
// //           value={formData.business_name}
// //           onChange={handleInputChange('business_name')}
// //           error={!!errors.business_name}
// //           helperText={errors.business_name}
// //           InputProps={{
// //             startAdornment: <InputAdornment position="start"><Store /></InputAdornment>
// //           }}
// //         />
// //       </Grid>
      
// //       <Grid item xs={12} md={6}>
// //         <FormControl fullWidth error={!!errors.business_type}>
// //           <InputLabel>Business Type</InputLabel>
// //           <Select
// //             value={formData.business_type}
// //             onChange={handleInputChange('business_type')}
// //             label="Business Type"
// //           >
// //             {businessTypes.map((type) => (
// //               <MenuItem key={type.value} value={type.value}>
// //                 {type.label}
// //               </MenuItem>
// //             ))}
// //           </Select>
// //           {errors.business_type && <FormHelperText>{errors.business_type}</FormHelperText>}
// //         </FormControl>
// //       </Grid>
      
// //       <Grid item xs={12}>
// //         <TextField
// //           fullWidth
// //           label="Business Description"
// //           multiline
// //           rows={3}
// //           value={formData.business_description}
// //           onChange={handleInputChange('business_description')}
// //           helperText="Describe your business and the products/services you offer"
// //         />
// //       </Grid>
      
// //       <Grid item xs={12} md={6}>
// //         <TextField
// //           fullWidth
// //           label="GST Number (Optional)"
// //           value={formData.gst_number}
// //           onChange={handleInputChange('gst_number')}
// //           error={!!errors.gst_number}
// //           helperText={errors.gst_number || "Format: 22AAAAA0000A1Z5"}
// //           placeholder="22AAAAA0000A1Z5"
// //         />
// //       </Grid>
      
// //       <Grid item xs={12} md={6}>
// //         <TextField
// //           fullWidth
// //           label="PAN Number (Optional)"
// //           value={formData.pan_number}
// //           onChange={handleInputChange('pan_number')}
// //           error={!!errors.pan_number}
// //           helperText={errors.pan_number || "Format: ABCDE1234F"}
// //           placeholder="ABCDE1234F"
// //         />
// //       </Grid>
      
// //       <Grid item xs={12} md={4}>
// //         <TextField
// //           fullWidth
// //           label="Years in Business"
// //           type="number"
// //           value={formData.years_in_business}
// //           onChange={handleInputChange('years_in_business')}
// //           InputProps={{ inputProps: { min: 0, max: 100 } }}
// //         />
// //       </Grid>
      
// //       <Grid item xs={12} md={4}>
// //         <TextField
// //           fullWidth
// //           label="Annual Turnover (₹)"
// //           type="number"
// //           value={formData.annual_turnover}
// //           onChange={handleInputChange('annual_turnover')}
// //           InputProps={{ inputProps: { min: 0 } }}
// //         />
// //       </Grid>
      
// //       <Grid item xs={12} md={4}>
// //         <TextField
// //           fullWidth
// //           label="Number of Employees"
// //           type="number"
// //           value={formData.number_of_employees}
// //           onChange={handleInputChange('number_of_employees')}
// //           InputProps={{ inputProps: { min: 1 } }}
// //         />
// //       </Grid>
      
// //       <Grid item xs={12}>
// //         <TextField
// //           fullWidth
// //           label="Website URL (Optional)"
// //           value={formData.website_url}
// //           onChange={handleInputChange('website_url')}
// //           placeholder="https://www.example.com"
// //         />
// //       </Grid>
// //     </Grid>
// //   );

// //   const renderAddressContact = () => (
// //     <Grid container spacing={3}>
// //       <Grid item xs={12}>
// //         <TextField
// //           fullWidth
// //           label="Address Line 1"
// //           value={formData.address_line_1}
// //           onChange={handleInputChange('address_line_1')}
// //           error={!!errors.address_line_1}
// //           helperText={errors.address_line_1}
// //         />
// //       </Grid>
      
// //       <Grid item xs={12}>
// //         <TextField
// //           fullWidth
// //           label="Address Line 2 (Optional)"
// //           value={formData.address_line_2}
// //           onChange={handleInputChange('address_line_2')}
// //         />
// //       </Grid>
      
// //       <Grid item xs={12} md={6}>
// //         <TextField
// //           fullWidth
// //           label="City"
// //           value={formData.city}
// //           onChange={handleInputChange('city')}
// //           error={!!errors.city}
// //           helperText={errors.city}
// //         />
// //       </Grid>
      
// //       <Grid item xs={12} md={6}>
// //         <FormControl fullWidth error={!!errors.state}>
// //           <InputLabel>State</InputLabel>
// //           <Select
// //             value={formData.state}
// //             onChange={handleInputChange('state')}
// //             label="State"
// //           >
// //             {indianStates.map((state) => (
// //               <MenuItem key={state} value={state}>
// //                 {state}
// //               </MenuItem>
// //             ))}
// //           </Select>
// //           {errors.state && <FormHelperText>{errors.state}</FormHelperText>}
// //         </FormControl>
// //       </Grid>
      
// //       <Grid item xs={12} md={6}>
// //         <TextField
// //           fullWidth
// //           label="Postal Code"
// //           value={formData.postal_code}
// //           onChange={handleInputChange('postal_code')}
// //           error={!!errors.postal_code}
// //           helperText={errors.postal_code}
// //           inputProps={{ maxLength: 6 }}
// //         />
// //       </Grid>
      
// //       <Grid item xs={12} md={6}>
// //         <TextField
// //           fullWidth
// //           label="Country"
// //           value={formData.country}
// //           onChange={handleInputChange('country')}
// //           disabled
// //         />
// //       </Grid>
// //     </Grid>
// //   );

// //   const renderBankDocuments = () => (
// //     <Grid container spacing={3}>
// //       <Grid item xs={12}>
// //         <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //           <AccountBalance />
// //           Bank Account Details
// //         </Typography>
// //       </Grid>
      
// //       <Grid item xs={12} md={6}>
// //         <TextField
// //           fullWidth
// //           label="Bank Name"
// //           value={formData.bank_name}
// //           onChange={handleInputChange('bank_name')}
// //           error={!!errors.bank_name}
// //           helperText={errors.bank_name}
// //         />
// //       </Grid>
      
// //       <Grid item xs={12} md={6}>
// //         <TextField
// //           fullWidth
// //           label="Account Number"
// //           value={formData.account_number}
// //           onChange={handleInputChange('account_number')}
// //           error={!!errors.account_number}
// //           helperText={errors.account_number}
// //         />
// //       </Grid>
      
// //       <Grid item xs={12} md={6}>
// //         <TextField
// //           fullWidth
// //           label="IFSC Code"
// //           value={formData.ifsc_code}
// //           onChange={handleInputChange('ifsc_code')}
// //           error={!!errors.ifsc_code}
// //           helperText={errors.ifsc_code || "Format: ABCD0123456"}
// //           placeholder="ABCD0123456"
// //         />
// //       </Grid>
      
// //       <Grid item xs={12} md={6}>
// //         <TextField
// //           fullWidth
// //           label="Account Holder Name"
// //           value={formData.account_holder_name}
// //           onChange={handleInputChange('account_holder_name')}
// //           error={!!errors.account_holder_name}
// //           helperText={errors.account_holder_name}
// //         />
// //       </Grid>
      
// //       <Grid item xs={12}>
// //         <Divider sx={{ my: 2 }} />
// //         <Typography variant="h6" gutterBottom>
// //           Additional Documents (Optional)
// //         </Typography>
// //       </Grid>
      
// //       <Grid item xs={12} md={6}>
// //         <TextField
// //           fullWidth
// //           label="Business License Number"
// //           value={formData.business_license_number}
// //           onChange={handleInputChange('business_license_number')}
// //         />
// //       </Grid>
      
// //       <Grid item xs={12} md={6}>
// //         <TextField
// //           fullWidth
// //           label="Tax Registration Number"
// //           value={formData.tax_registration_number}
// //           onChange={handleInputChange('tax_registration_number')}
// //         />
// //       </Grid>
// //     </Grid>
// //   );

// //   const renderReviewSubmit = () => (
// //     <Box>
// //       <Alert severity="info" sx={{ mb: 3 }}>
// //         <Typography variant="body2">
// //           Please review all the information below before submitting your application. 
// //           You can go back to any previous step to make changes.
// //         </Typography>
// //       </Alert>
      
// //       <Grid container spacing={3}>
// //         <Grid item xs={12} md={6}>
// //           <Card elevation={0} sx={{ border: '1px solid #E5E7EB' }}>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                 <Person />
// //                 Personal Information
// //               </Typography>
// //               <Stack spacing={1}>
// //                 <Typography variant="body2"><strong>Name:</strong> {formData.owner_name}</Typography>
// //                 <Typography variant="body2"><strong>Phone:</strong> {formData.phone_number}</Typography>
// //                 <Typography variant="body2"><strong>Email:</strong> {formData.email}</Typography>
// //                 <Typography variant="body2"><strong>Aadhar:</strong> {formData.aadhar_number}</Typography>
// //               </Stack>
// //             </CardContent>
// //           </Card>
// //         </Grid>
        
// //         <Grid item xs={12} md={6}>
// //           <Card elevation={0} sx={{ border: '1px solid #E5E7EB' }}>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                 <Business />
// //                 Business Details
// //               </Typography>
// //               <Stack spacing={1}>
// //                 <Typography variant="body2"><strong>Business Name:</strong> {formData.business_name}</Typography>
// //                 <Typography variant="body2"><strong>Type:</strong> {businessTypes.find(t => t.value === formData.business_type)?.label}</Typography>
// //                 {formData.gst_number && <Typography variant="body2"><strong>GST:</strong> {formData.gst_number}</Typography>}
// //                 {formData.pan_number && <Typography variant="body2"><strong>PAN:</strong> {formData.pan_number}</Typography>}
// //               </Stack>
// //             </CardContent>
// //           </Card>
// //         </Grid>
        
// //         <Grid item xs={12} md={6}>
// //           <Card elevation={0} sx={{ border: '1px solid #E5E7EB' }}>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                 <LocationOn />
// //                 Address
// //               </Typography>
// //               <Stack spacing={1}>
// //                 <Typography variant="body2"><strong>Address:</strong> {formData.address_line_1}</Typography>
// //                 {formData.address_line_2 && <Typography variant="body2">{formData.address_line_2}</Typography>}
// //                 <Typography variant="body2"><strong>City:</strong> {formData.city}, {formData.state}</Typography>
// //                 <Typography variant="body2"><strong>Postal Code:</strong> {formData.postal_code}</Typography>
// //               </Stack>
// //             </CardContent>
// //           </Card>
// //         </Grid>
        
// //         <Grid item xs={12} md={6}>
// //           <Card elevation={0} sx={{ border: '1px solid #E5E7EB' }}>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                 <AccountBalance />
// //                 Bank Details
// //               </Typography>
// //               <Stack spacing={1}>
// //                 <Typography variant="body2"><strong>Bank:</strong> {formData.bank_name}</Typography>
// //                 <Typography variant="body2"><strong>Account:</strong> {formData.account_number}</Typography>
// //                 <Typography variant="body2"><strong>IFSC:</strong> {formData.ifsc_code}</Typography>
// //                 <Typography variant="body2"><strong>Holder:</strong> {formData.account_holder_name}</Typography>
// //               </Stack>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //       </Grid>
      
// //       <Box sx={{ mt: 4 }}>
// //         <FormControlLabel
// //           control={
// //             <Checkbox
// //               checked={formData.terms_accepted}
// //               onChange={handleInputChange('terms_accepted')}
// //               color="primary"
// //             />
// //           }
// //           label={
// //             <Typography variant="body2">
// //               I agree to the <strong>Terms and Conditions</strong> and <strong>Privacy Policy</strong>. 
// //               I confirm that all the information provided is accurate and complete.
// //             </Typography>
// //           }
// //         />
// //         {errors.terms_accepted && (
// //           <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
// //             {errors.terms_accepted}
// //           </Typography>
// //         )}
// //       </Box>
      
// //       {errors.submit && (
// //         <Alert severity="error" sx={{ mt: 2 }}>
// //           {errors.submit}
// //         </Alert>
// //       )}
// //     </Box>
// //   );

// //   return (
// //     <Box sx={{ minHeight: '100vh', bgcolor: '#F8FAFC', py: 4 }}>
// //       <Container maxWidth="lg">
// //         {/* Header */}
// //         <Fade in timeout={600}>
// //           <Paper
// //             elevation={0}
// //             sx={{
// //               borderRadius: 3,
// //               border: '1px solid #E5E7EB',
// //               mb: 4,
// //               overflow: 'hidden',
// //               background: 'linear-gradient(135deg, #232f3e 0%, #808791 100%)',
// //               color: 'white'
// //             }}
// //           >
// //             <Box sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
// //               <Store sx={{ fontSize: { xs: 48, md: 64 }, mb: 2 }} />
// //               <Typography 
// //                 variant="h3" 
// //                 gutterBottom 
// //                 sx={{ 
// //                   fontWeight: 800,
// //                   fontSize: { xs: '2rem', md: '2.5rem' }
// //                 }}
// //               >
// //                 Become a Vendor
// //               </Typography>
// //               <Typography 
// //                 variant="h6" 
// //                 sx={{ 
// //                   opacity: 0.9,
// //                   fontSize: { xs: '1rem', md: '1.25rem' },
// //                   fontWeight: 400,
// //                   maxWidth: 600,
// //                   mx: 'auto'
// //                 }}
// //               >
// //                 Join our marketplace and reach thousands of customers. 
// //                 Complete the registration process to start selling your products.
// //               </Typography>
// //             </Box>
// //           </Paper>
// //         </Fade>

// //         {/* Progress Stepper */}
// //         <Fade in timeout={600} style={{ transitionDelay: '200ms' }}>
// //           <Paper 
// //             elevation={0}
// //             sx={{ 
// //               mb: 4,
// //               borderRadius: 2,
// //               border: '1px solid #E5E7EB',
// //               overflow: 'hidden'
// //             }}
// //           >
// //             <Stepper 
// //               activeStep={activeStep} 
// //               sx={{ 
// //                 p: { xs: 2, md: 3 },
// //                 '& .MuiStepConnector-line': {
// //                   borderColor: '#E5E7EB'
// //                 }
// //               }}
// //             >
// //               {steps.map((step, index) => (
// //                 <Step key={step.label}>
// //                   <StepLabel
// //                     StepIconComponent={() => (
// //                       <Box
// //                         sx={{
// //                           width: { xs: 32, md: 40 },
// //                           height: { xs: 32, md: 40 },
// //                           borderRadius: '50%',
// //                           display: 'flex',
// //                           alignItems: 'center',
// //                           justifyContent: 'center',
// //                           bgcolor: index <= activeStep ? '#232f3e' : '#E5E7EB',
// //                           color: index <= activeStep ? 'white' : '#9CA3AF',
// //                           fontSize: { xs: '1rem', md: '1.2rem' },
// //                           transition: 'all 0.3s ease'
// //                         }}
// //                       >
// //                         {index < activeStep ? <CheckCircle /> : step.icon}
// //                       </Box>
// //                     )}
// //                     sx={{
// //                       '& .MuiStepLabel-label': {
// //                         fontWeight: 600,
// //                         fontSize: { xs: '0.8rem', md: '1rem' },
// //                         color: index <= activeStep ? '#111827' : '#6B7280',
// //                         mt: { xs: 1, md: 1.5 }
// //                       }
// //                     }}
// //                   >
// //                     {step.label}
// //                   </StepLabel>
// //                 </Step>
// //               ))}
// //             </Stepper>
// //           </Paper>
// //         </Fade>

// //         {/* Form Content */}
// //         <Fade in timeout={600} style={{ transitionDelay: '400ms' }}>
// //           <Paper
// //             elevation={0}
// //             sx={{
// //               borderRadius: 2,
// //               border: '1px solid #E5E7EB',
// //               mb: 4
// //             }}
// //           >
// //             <Box sx={{ p: { xs: 3, md: 6 } }}>
// //               {activeStep === 0 && (
// //                 <Box>
// //                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
// //                     Personal Information
// //                   </Typography>
// //                   <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
// //                     Please provide your personal details as they appear on your government ID.
// //                   </Typography>
// //                   {renderPersonalInfo()}
// //                 </Box>
// //               )}

// //               {activeStep === 1 && (
// //                 <Box>
// //                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
// //                     Business Details
// //                   </Typography>
// //                   <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
// //                     Tell us about your business and what you plan to sell on our platform.
// //                   </Typography>
// //                   {renderBusinessDetails()}
// //                 </Box>
// //               )}

// //               {activeStep === 2 && (
// //                 <Box>
// //                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
// //                     Address & Contact Information
// //                   </Typography>
// //                   <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
// //                     Provide your business address and contact details for communication and delivery purposes.
// //                   </Typography>
// //                   {renderAddressContact()}
// //                 </Box>
// //               )}

// //               {activeStep === 3 && (
// //                 <Box>
// //                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
// //                     Bank Account & Documents
// //                   </Typography>
// //                   <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
// //                     Provide your bank account details for payment processing and any additional business documents.
// //                   </Typography>
// //                   {renderBankDocuments()}
// //                 </Box>
// //               )}

// //               {activeStep === 4 && (
// //                 <Box>
// //                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
// //                     Review & Submit
// //                   </Typography>
// //                   <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
// //                     Please review all information before submitting your vendor registration application.
// //                   </Typography>
// //                   {renderReviewSubmit()}
// //                 </Box>
// //               )}
// //             </Box>
// //           </Paper>
// //         </Fade>

// //         {/* Navigation Buttons */}
// //         <Fade in timeout={600} style={{ transitionDelay: '600ms' }}>
// //           <Paper
// //             elevation={0}
// //             sx={{
// //               borderRadius: 2,
// //               border: '1px solid #E5E7EB',
// //               p: { xs: 3, md: 4 }
// //             }}
// //           >
// //             <Stack 
// //               direction="row" 
// //               justifyContent="space-between" 
// //               alignItems="center"
// //               spacing={2}
// //             >
// //               <Button
// //                 onClick={handleBack}
// //                 disabled={activeStep === 0}
// //                 startIcon={<ArrowBack />}
// //                 sx={{
// //                   borderRadius: 2,
// //                   textTransform: 'none',
// //                   px: 4,
// //                   py: 1.5,
// //                   color: '#6B7280',
// //                   borderColor: '#E5E7EB',
// //                   '&:hover': {
// //                     borderColor: '#9CA3AF',
// //                     backgroundColor: '#F9FAFB'
// //                   },
// //                   '&:disabled': {
// //                     color: '#D1D5DB'
// //                   }
// //                 }}
// //                 variant="outlined"
// //               >
// //                 Back
// //               </Button>
              
// //               {activeStep < steps.length - 1 ? (
// //                 <Button
// //                   variant="contained"
// //                   onClick={handleNext}
// //                   endIcon={<ArrowForward />}
// //                   sx={{
// //                     borderRadius: 2,
// //                     textTransform: 'none',
// //                     px: 4,
// //                     py: 1.5,
// //                     fontSize: '1rem',
// //                     fontWeight: 600,
// //                     backgroundColor: '#232f3e',
// //                     '&:hover': {
// //                       backgroundColor: '#1E3A8A',
// //                       transform: 'translateY(-1px)'
// //                     },
// //                     transition: 'all 0.3s ease'
// //                   }}
// //                 >
// //                   Continue
// //                 </Button>
// //               ) : (
// //                 <Button
// //                   variant="contained"
// //                   onClick={handleSubmit}
// //                   disabled={loading}
// //                   startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
// //                   sx={{
// //                     borderRadius: 2,
// //                     textTransform: 'none',
// //                     px: 6,
// //                     py: 1.5,
// //                     fontSize: '1.1rem',
// //                     fontWeight: 700,
// //                     backgroundColor: '#16A34A',
// //                     boxShadow: '0 4px 14px rgba(22, 163, 74, 0.25)',
// //                     '&:hover': {
// //                       backgroundColor: '#15803D',
// //                       transform: 'translateY(-1px)',
// //                       boxShadow: '0 6px 20px rgba(22, 163, 74, 0.35)'
// //                     },
// //                     '&:disabled': {
// //                       backgroundColor: '#9CA3AF'
// //                     },
// //                     transition: 'all 0.3s ease'
// //                   }}
// //                 >
// //                   {loading ? 'Submitting...' : 'Submit Application'}
// //                 </Button>
// //               )}
// //             </Stack>
// //           </Paper>
// //         </Fade>

// //         {/* Help Section */}
// //         <Fade in timeout={600} style={{ transitionDelay: '800ms' }}>
// //           <Paper
// //             elevation={0}
// //             sx={{
// //               borderRadius: 2,
// //               border: '1px solid #E5E7EB',
// //               mt: 4,
// //               p: { xs: 3, md: 4 }
// //             }}
// //           >
// //             <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
// //               <Info />
// //               Need Help?
// //             </Typography>
// //             <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
// //               If you have any questions about the registration process or need assistance, please contact our vendor support team.
// //             </Typography>
            
// //             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
// //               <Chip
// //                 icon={<Email />}
// //                 label="vendor-support@example.com"
// //                 variant="outlined"
// //                 sx={{ 
// //                   borderRadius: 2,
// //                   py: 1,
// //                   fontSize: '0.9rem',
// //                   '&:hover': { backgroundColor: '#F3F4F6' }
// //                 }}
// //               />
// //               <Chip
// //                 icon={<Phone />}
// //                 label="+1 (555) 123-4567"
// //                 variant="outlined"
// //                 sx={{ 
// //                   borderRadius: 2,
// //                   py: 1,
// //                   fontSize: '0.9rem',
// //                   '&:hover': { backgroundColor: '#F3F4F6' }
// //                 }}
// //               />
// //             </Stack>
// //           </Paper>
// //         </Fade>
// //       </Container>
// //     </Box>
// //   );
// // };

// // export default VendorRegistrationPage;
















// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { completeRegistration } from '../../redux/slices/authSlices';
// import { validateEmail, validateIFSC } from '../../utils/validation';
// import ErrorMessage from '../ui/ErrorMessage';
// import LoadingSpinner from '../ui/LoadingSpinner';

// const statesWithDistricts = {
//   TamilNadu: ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
//   Kerala: ['Kochi', 'Thiruvananthapuram', 'Kozhikode'],
//   Karnataka: ['Bengaluru', 'Mysuru', 'Mangalore']
// };

// const NameRegistration = () => {
//   const dispatch = useDispatch();
//   const { isLoading, error, phoneNumber } = useSelector(state => state.auth);

//   const [formData, setFormData] = useState({
//     vendor_photo: null,
//     full_name: '',
//     phone_number: phoneNumber || '',
//     email: '',
//     aadhar_number: '',
//     address_line1: '',
//     address_line2: '',
//     district: '',
//     state: '',
//     pincode: '',
//     business_name: '',
//     business_type: '',
//     gst_number: '',
//     business_address: '',
//     account_holder_name: '',
//     account_number: '',
//     ifsc_code: ''
//   });

//   const [formErrors, setFormErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: files ? files[0] : value
//     }));
//     setFormErrors(prev => ({ ...prev, [name]: '' }));
//   };

//   const validateForm = () => {
//     const errors = {};
//     const {
//       full_name, email, aadhar_number, business_name, business_address,
//       account_holder_name, account_number, ifsc_code,
//       address_line1, district, state, pincode, gst_number
//     } = formData;

//     if (!full_name.trim()) errors.full_name = 'Full name is required';
//     if (email && !validateEmail(email).isValid) errors.email = 'Invalid email format';
//     if (!/^\d{12}$/.test(aadhar_number)) errors.aadhar_number = 'Aadhar number must be 12 digits';
//     if (!business_name.trim()) errors.business_name = 'Business name is required';
//     if (!business_address.trim()) errors.business_address = 'Business address is required';
//     if (!account_holder_name.trim()) errors.account_holder_name = 'Account holder name is required';
//     if (!account_number.trim()) errors.account_number = 'Account number is required';
//     if (!validateIFSC(ifsc_code).isValid) errors.ifsc_code = 'Invalid IFSC code';

//     // Address validation
//     if (!address_line1.trim()) errors.address_line1 = 'Address line 1 is required';
//     if (!district) errors.district = 'District is required';
//     if (!state) errors.state = 'State is required';
//     if (!/^\d{6}$/.test(pincode)) errors.pincode = 'Pincode must be 6 digits';

//     if (gst_number && !/^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1})$/.test(gst_number)) {
//       errors.gst_number = 'Invalid GST number';
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const payload = {
//       ...formData,
//       phoneNumber: formData.phone_number,
//       name: formData.full_name.trim()
//     };

//     dispatch(completeRegistration(payload));
//   };

//   return (
//     <div>
//       <h2>Vendor Registration</h2>
//       <form onSubmit={handleSubmit}>

//         <fieldset>
//           <legend>🧍 Personal Information</legend>
//           <div>
//             <label>Profile Photo</label>
//             <input type="file" name="vendor_photo" accept="image/*" onChange={handleChange} />
//           </div>
//           <div>
//             <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} />
//             {formErrors.full_name && <div>{formErrors.full_name}</div>}
//           </div>
//           <div>
//             <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} />
//             {formErrors.phone_number && <div>{formErrors.phone_number}</div>}
//           </div>
//           <div>
//             <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//             {formErrors.email && <div>{formErrors.email}</div>}
//           </div>
//           <div>
//             <input type="text" name="aadhar_number" placeholder="Aadhar Number" value={formData.aadhar_number} onChange={handleChange} />
//             {formErrors.aadhar_number && <div>{formErrors.aadhar_number}</div>}
//           </div>

//           {/* Address Section */}
//           <div>
//             <input type="text" name="address_line1" placeholder="Address Line 1" value={formData.address_line1} onChange={handleChange} />
//             {formErrors.address_line1 && <div>{formErrors.address_line1}</div>}
//           </div>
//           <div>
//             <input type="text" name="address_line2" placeholder="Address Line 2 (optional)" value={formData.address_line2} onChange={handleChange} />
//           </div>
//           <div>
//             <select name="state" value={formData.state} onChange={handleChange}>
//               <option value="">Select State</option>
//               {Object.keys(statesWithDistricts).map(state => (
//                 <option key={state} value={state}>{state}</option>
//               ))}
//             </select>
//             {formErrors.state && <div>{formErrors.state}</div>}
//           </div>
//           <div>
//             <select name="district" value={formData.district} onChange={handleChange} disabled={!formData.state}>
//               <option value="">Select District</option>
//               {formData.state && statesWithDistricts[formData.state].map(dist => (
//                 <option key={dist} value={dist}>{dist}</option>
//               ))}
//             </select>
//             {formErrors.district && <div>{formErrors.district}</div>}
//           </div>
//           <div>
//             <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
//             {formErrors.pincode && <div>{formErrors.pincode}</div>}
//           </div>
//         </fieldset>

//         <fieldset>
//           <legend>🏢 Business Details</legend>
//           <div>
//             <input type="text" name="business_name" placeholder="Business Name" value={formData.business_name} onChange={handleChange} />
//             {formErrors.business_name && <div>{formErrors.business_name}</div>}
//           </div>
//           <div>
//             <input type="text" name="business_type" placeholder="Business Type" value={formData.business_type} onChange={handleChange} />
//           </div>
//           <div>
//             <input type="text" name="gst_number" placeholder="GST Number (optional)" value={formData.gst_number} onChange={handleChange} />
//             {formErrors.gst_number && <div>{formErrors.gst_number}</div>}
//           </div>
//           <div>
//             <input type="text" name="business_address" placeholder="Business Address" value={formData.business_address} onChange={handleChange} />
//             {formErrors.business_address && <div>{formErrors.business_address}</div>}
//           </div>
//         </fieldset>

//         <fieldset>
//           <legend>🏦 Bank Details</legend>
//           <div>
//             <input type="text" name="account_holder_name" placeholder="Account Holder Name" value={formData.account_holder_name} onChange={handleChange} />
//             {formErrors.account_holder_name && <div>{formErrors.account_holder_name}</div>}
//           </div>
//           <div>
//             <input type="text" name="account_number" placeholder="Account Number" value={formData.account_number} onChange={handleChange} />
//             {formErrors.account_number && <div>{formErrors.account_number}</div>}
//           </div>
//           <div>
//             <input type="text" name="ifsc_code" placeholder="IFSC Code" value={formData.ifsc_code} onChange={handleChange} />
//             {formErrors.ifsc_code && <div>{formErrors.ifsc_code}</div>}
//           </div>
//         </fieldset>

//         {error && <ErrorMessage message={error} />}
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? (
//             <>
//               <LoadingSpinner size="small" color="white" />
//               <span>Submitting...</span>
//             </>
//           ) : (
//             <span>Register Vendor</span>
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default NameRegistration;












import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { completeRegistration } from '../../redux/slices/authSlices';
import { validateEmail, validateIFSC } from '../../utils/validation';
import ErrorMessage from '../ui/ErrorMessage';
import LoadingSpinner from '../ui/LoadingSpinner';

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

const steps = [
  { label: 'Personal Info', icon: '👤' },
  { label: 'Address Details', icon: '📍' },
  { label: 'Business Details', icon: '🏢' },
  { label: 'Bank Details', icon: '🏦' },
  { label: 'Review & Submit', icon: '✅' }
];

const NameRegistration = () => {
  const dispatch = useDispatch();
  const { isLoading, error, phoneNumber } = useSelector(state => state.auth);
  const [activeStep, setActiveStep] = useState(0);
  const [photoPreview, setPhotoPreview] = useState(null);

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (files && files[0]) {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
      
      // Create preview for photo
      if (name === 'vendor_photo') {
        const reader = new FileReader();
        reader.onloadend = () => setPhotoPreview(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
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

  const validateStep = (step) => {
    const errors = {};
    
    switch (step) {
      case 0: // Personal Information
        if (!formData.full_name.trim()) errors.full_name = 'Full name is required';
        if (formData.email && !validateEmail(formData.email).isValid) errors.email = 'Invalid email format';
        if (!/^\d{12}$/.test(formData.aadhar_number)) errors.aadhar_number = 'Aadhar number must be 12 digits';
        break;
        
      case 1: // Address Details
        if (!formData.address_line1.trim()) errors.address_line1 = 'Address line 1 is required';
        if (!formData.district) errors.district = 'District is required';
        if (!formData.state) errors.state = 'State is required';
        if (!/^\d{6}$/.test(formData.pincode)) errors.pincode = 'Pincode must be 6 digits';
        break;
        
      case 2: // Business Details
        if (!formData.business_name.trim()) errors.business_name = 'Business name is required';
        if (!formData.business_address.trim()) errors.business_address = 'Business address is required';
        if (formData.gst_number && !/^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1})$/.test(formData.gst_number)) {
          errors.gst_number = 'Invalid GST number';
        }
        break;
        
      case 3: // Bank Details
        if (!formData.account_holder_name.trim()) errors.account_holder_name = 'Account holder name is required';
        if (!formData.account_number.trim()) errors.account_number = 'Account number is required';
        if (!validateIFSC(formData.ifsc_code).isValid) errors.ifsc_code = 'Invalid IFSC code';
        break;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
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

  const renderPersonalInfo = () => (
    <div className="step-content">
      <div className="personal-info-layout">
        <div className="photo-section">
          <div className="photo-upload">
            <input
              type="file"
              name="vendor_photo"
              accept="image/*"
              onChange={handleChange}
              id="photo-upload"
              className="photo-input"
            />
            <label htmlFor="photo-upload" className="photo-label">
              <div className="photo-circle">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="preview-image" />
                ) : (
                  <div className="camera-icon">📷</div>
                )}
              </div>
            </label>
            <p className="photo-text">Click to upload photo (Max 5MB)</p>
          </div>
        </div>

        <div className="form-section">
          <div className="form-row">
            <div className="form-field">
              <label className="field-label">Full Name</label>
              <div className="input-with-icon">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="full_name"
                  placeholder=""
                  value={formData.full_name}
                  onChange={handleChange}
                  className={`form-input-inline ${formErrors.full_name ? 'error' : ''}`}
                />
              </div>
              {formErrors.full_name && <div className="error-message">{formErrors.full_name}</div>}
            </div>

            <div className="form-field">
              <label className="field-label">Email Address</label>
              <div className="input-with-icon">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  name="email"
                  placeholder=""
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input-inline ${formErrors.email ? 'error' : ''}`}
                />
              </div>
              {formErrors.email && <div className="error-message">{formErrors.email}</div>}
            </div>

            <div className="form-field">
              <label className="field-label">Aadhar Number</label>
              <div className="input-with-icon">
                <span className="input-icon">🆔</span>
                <input
                  type="text"
                  name="aadhar_number"
                  placeholder=""
                  value={formData.aadhar_number}
                  onChange={handleChange}
                  className={`form-input-inline ${formErrors.aadhar_number ? 'error' : ''}`}
                  maxLength="12"
                />
              </div>
              {formErrors.aadhar_number && <div className="error-message">{formErrors.aadhar_number}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field phone-field">
              <label className="field-label">Phone Number</label>
              <div className="input-with-icon">
                <span className="input-icon">📞</span>
                <input
                  type="text"
                  name="phone_number"
                  placeholder=""
                  value={formData.phone_number}
                  onChange={handleChange}
                  className={`form-input-inline ${formErrors.phone_number ? 'error' : ''}`}
                />
              </div>
              {formErrors.phone_number && <div className="error-message">{formErrors.phone_number}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAddressDetails = () => (
    <div className="step-content">
      <div className="form-grid">
        <div className="input-group full-width">
          <label className="input-label">Address Line 1 *</label>
          <input
            type="text"
            name="address_line1"
            placeholder="Enter address line 1"
            value={formData.address_line1}
            onChange={handleChange}
            className={`form-input ${formErrors.address_line1 ? 'error' : ''}`}
          />
          {formErrors.address_line1 && <div className="error-message">{formErrors.address_line1}</div>}
        </div>

        <div className="input-group full-width">
          <label className="input-label">Address Line 2</label>
          <input
            type="text"
            name="address_line2"
            placeholder="Enter address line 2 (optional)"
            value={formData.address_line2}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="input-group">
          <label className="input-label">State *</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`form-select ${formErrors.state ? 'error' : ''}`}
          >
            <option value="">Select State</option>
            {Object.keys(statesWithDistricts).map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {formErrors.state && <div className="error-message">{formErrors.state}</div>}
        </div>

        <div className="input-group">
          <label className="input-label">District *</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            disabled={!formData.state}
            className={`form-select ${formErrors.district ? 'error' : ''}`}
          >
            <option value="">Select District</option>
            {formData.state && statesWithDistricts[formData.state].map(dist => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
          {formErrors.district && <div className="error-message">{formErrors.district}</div>}
        </div>

        <div className="input-group">
          <label className="input-label">Pincode *</label>
          <input
            type="text"
            name="pincode"
            placeholder="Enter 6-digit pincode"
            value={formData.pincode}
            onChange={handleChange}
            className={`form-input ${formErrors.pincode ? 'error' : ''}`}
            maxLength="6"
          />
          {formErrors.pincode && <div className="error-message">{formErrors.pincode}</div>}
        </div>
      </div>
    </div>
  );

  const renderBusinessDetails = () => (
    <div className="step-content">
      <div className="form-grid">
        <div className="input-group">
          <label className="input-label">Business Name *</label>
          <input
            type="text"
            name="business_name"
            placeholder="Enter business name"
            value={formData.business_name}
            onChange={handleChange}
            className={`form-input ${formErrors.business_name ? 'error' : ''}`}
          />
          {formErrors.business_name && <div className="error-message">{formErrors.business_name}</div>}
        </div>

        <div className="input-group">
          <label className="input-label">Business Type</label>
          <select
            name="business_type"
            value={formData.business_type}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select Business Type</option>
            {businessTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">GST Number</label>
          <input
            type="text"
            name="gst_number"
            placeholder="Enter GST number (optional)"
            value={formData.gst_number}
            onChange={handleChange}
            className={`form-input ${formErrors.gst_number ? 'error' : ''}`}
          />
          {formErrors.gst_number && <div className="error-message">{formErrors.gst_number}</div>}
          <small className="input-hint">Format: 22AAAAA0000A1Z5</small>
        </div>

        <div className="input-group full-width">
          <label className="input-label">Business Address *</label>
          <textarea
            name="business_address"
            placeholder="Enter complete business address"
            value={formData.business_address}
            onChange={handleChange}
            className={`form-textarea ${formErrors.business_address ? 'error' : ''}`}
            rows="3"
          />
          {formErrors.business_address && <div className="error-message">{formErrors.business_address}</div>}
        </div>
      </div>
    </div>
  );

  const renderBankDetails = () => (
    <div className="step-content">
      <div className="form-grid">
        <div className="input-group">
          <label className="input-label">Account Holder Name *</label>
          <input
            type="text"
            name="account_holder_name"
            placeholder="Enter account holder name"
            value={formData.account_holder_name}
            onChange={handleChange}
            className={`form-input ${formErrors.account_holder_name ? 'error' : ''}`}
          />
          {formErrors.account_holder_name && <div className="error-message">{formErrors.account_holder_name}</div>}
        </div>

        <div className="input-group">
          <label className="input-label">Account Number *</label>
          <input
            type="text"
            name="account_number"
            placeholder="Enter account number"
            value={formData.account_number}
            onChange={handleChange}
            className={`form-input ${formErrors.account_number ? 'error' : ''}`}
          />
          {formErrors.account_number && <div className="error-message">{formErrors.account_number}</div>}
        </div>

        <div className="input-group">
          <label className="input-label">IFSC Code *</label>
          <input
            type="text"
            name="ifsc_code"
            placeholder="Enter IFSC code"
            value={formData.ifsc_code}
            onChange={handleChange}
            className={`form-input ${formErrors.ifsc_code ? 'error' : ''}`}
          />
          {formErrors.ifsc_code && <div className="error-message">{formErrors.ifsc_code}</div>}
          <small className="input-hint">Format: ABCD0123456</small>
        </div>
      </div>
    </div>
  );

  const renderReviewSubmit = () => (
    <div className="step-content">
      <div className="review-section">
        <h3 className="section-title">📋 Review Your Information</h3>
        
        <div className="review-cards">
          <div className="review-card">
            <h4>👤 Personal Information</h4>
            <div className="review-item"><strong>Name:</strong> {formData.full_name}</div>
            <div className="review-item"><strong>Phone:</strong> {formData.phone_number}</div>
            {formData.email && <div className="review-item"><strong>Email:</strong> {formData.email}</div>}
            <div className="review-item"><strong>Aadhar:</strong> {formData.aadhar_number}</div>
            <div className="review-item">
              <strong>Address:</strong> {formData.address_line1}
              {formData.address_line2 && `, ${formData.address_line2}`}, {formData.district}, {formData.state} - {formData.pincode}
            </div>
          </div>

          <div className="review-card">
            <h4>🏢 Business Details</h4>
            <div className="review-item"><strong>Business Name:</strong> {formData.business_name}</div>
            {formData.business_type && <div className="review-item"><strong>Type:</strong> {businessTypes.find(t => t.value === formData.business_type)?.label}</div>}
            {formData.gst_number && <div className="review-item"><strong>GST:</strong> {formData.gst_number}</div>}
            <div className="review-item"><strong>Address:</strong> {formData.business_address}</div>
          </div>

          <div className="review-card">
            <h4>🏦 Bank Details</h4>
            <div className="review-item"><strong>Account Holder:</strong> {formData.account_holder_name}</div>
            <div className="review-item"><strong>Account Number:</strong> {formData.account_number}</div>
            <div className="review-item"><strong>IFSC Code:</strong> {formData.ifsc_code}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="vendor-registration">
      <style jsx>{`
        .vendor-registration {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 2rem 1rem;
        }

        .registration-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .header {
          text-align: center;
          background: linear-gradient(135deg, #4a5568 0%, #718096 100%);
          color: white;
          padding: 3rem 2rem;
          border-radius: 0.75rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .header-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .header h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .header p {
          font-size: 1rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.5;
        }

        .stepper {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          border: 1px solid #e5e7eb;
        }

        .stepper-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          padding: 1rem 0;
        }

        .stepper-container::before {
          display: none;
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
          background: white;
          padding: 0;
        }

        .step-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          background: #f3f4f6;
          color: #9ca3af;
          transition: all 0.3s ease;
        }

        .step-icon.active {
          background: #232f3e;
          color: white;
        }

        .step-icon.completed {
          background: #16a34a;
          color: white;
        }

        .step-label {
          font-size: 0.85rem;
          font-weight: 500;
          color: #9ca3af;
          text-align: center;
        }

        .step-label.active {
          color: #232f3e;
          font-weight: 600;
        }

        .personal-info-layout {
          display: flex;
          gap: 3rem;
          align-items: flex-start;
        }

        .photo-section {
          flex-shrink: 0;
        }

        .form-section {
          flex: 1;
        }

        .photo-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed #d1d5db;
          margin-bottom: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .photo-circle:hover {
          border-color: #232f3e;
          background: #f8fafc;
        }

        .camera-icon {
          font-size: 2rem;
          color: #9ca3af;
        }

        .photo-text {
          text-align: center;
          font-size: 0.85rem;
          color: #6b7280;
          margin: 0;
          max-width: 120px;
        }

        .form-row {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .form-field {
          flex: 1;
        }

        .phone-field {
          flex: 0.6;
        }

        .field-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          font-size: 1.1rem;
          color: #9ca3af;
          z-index: 1;
        }

        .form-input-inline {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 3rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          background: white;
        }

        .form-input-inline:focus {
          outline: none;
          border-color: #232f3e;
          box-shadow: 0 0 0 3px rgba(35, 47, 62, 0.1);
        }

        .form-input-inline.error {
          border-color: #ef4444;
        }

        .form-container {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          border: 1px solid #e5e7eb;
        }

        .step-content {
          min-height: 400px;
        }

        .step-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #111827;
        }

        .step-description {
          color: #6b7280;
          margin-bottom: 2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .form-grid.two-column {
          grid-template-columns: 1fr 1fr;
        }

        .photo-upload-section {
          display: flex;
          justify-content: center;
          align-items: center;
          grid-column: 1 / -1;
        }

        .photo-upload {
          text-align: center;
        }

        .photo-input {
          display: none;
        }

        .photo-label {
          cursor: pointer;
          display: block;
        }

        .photo-preview {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 3px dashed #d1d5db;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .photo-preview:hover {
          border-color: #232f3e;
          background: #f9fafb;
        }

        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .photo-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #6b7280;
          font-size: 2rem;
        }

        .photo-placeholder span {
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }

        .photo-hint {
          color: #6b7280;
          font-size: 0.9rem;
          margin: 0;
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .input-group.full-width {
          grid-column: 1 / -1;
        }

        .input-label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .form-input, .form-select, .form-textarea {
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #232f3e;
          box-shadow: 0 0 0 3px rgba(35, 47, 62, 0.1);
        }

        .form-input.error, .form-select.error, .form-textarea.error {
          border-color: #ef4444;
        }

        .form-select:disabled {
          background: #f9fafb;
          color: #9ca3af;
          cursor: not-allowed;
        }

        .error-message {
          color: #ef4444;
          font-size: 0.85rem;
          margin-top: 0.25rem;
        }

        .input-hint {
          color: #6b7280;
          font-size: 0.8rem;
          margin-top: 0.25rem;
        }

        .section-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .address-section {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #e5e7eb;
        }

        .review-section {
          max-width: 800px;
          margin: 0 auto;
        }

        .review-cards {
          display: grid;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .review-card {
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 1.5rem;
        }

        .review-card h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .review-item {
          margin-bottom: 0.75rem;
          color: #374151;
        }

        .review-item strong {
          color: #111827;
        }

        .navigation {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem 2rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          border: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn {
          padding: 0.75rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-secondary {
          background: white;
          color: #6b7280;
          border: 1px solid #d1d5db;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        .btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-primary {
          background: #232f3e;
          color: white;
          border: 1px solid #232f3e;
        }

        .btn-primary:hover:not(:disabled) {
          background: #1e3a8a;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(35, 47, 62, 0.25);
        }

        .btn-primary:disabled {
          background: #9ca3af;
          cursor: not-allowed;
          transform: none;
        }

        .btn-success {
          background: #16a34a;
          color: white;
          border: 1px solid #16a34a;
          padding: 1rem 3rem;
          font-size: 1.1rem;
        }

        .btn-success:hover:not(:disabled) {
          background: #15803d;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(22, 163, 74, 0.35);
        }

        .help-section {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem 2rem;
          margin-top: 2rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          border: 1px solid #e5e7eb;
          text-align: center;
        }

        .help-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .help-description {
          color: #6b7280;
          margin-bottom: 1.5rem;
        }

        .contact-info {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .contact-chip {
          background: #f3f4f6;
          border: 1px solid #d1d5db;
          border-radius: 2rem;
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #374151;
        }

        .error-alert {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 1rem;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }

        @media (max-width: 768px) {
          .vendor-registration {
            padding: 1rem 0.5rem;
          }

          .header {
            padding: 2rem 1rem;
          }

          .header h1 {
            font-size: 1.75rem;
          }

          .stepper {
            padding: 1rem;
          }

          .stepper-container {
            flex-wrap: wrap;
            gap: 1rem;
          }

          .step {
            flex-direction: row;
            background: #f8fafc;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
          }

          .step-icon {
            width: 35px;
            height: 35px;
            margin-right: 0.75rem;
            margin-bottom: 0;
          }

          .step-label {
            text-align: left;
            font-size: 0.8rem;
          }

          .form-container {
            padding: 1.5rem;
          }

          .personal-info-layout {
            flex-direction: column;
            gap: 2rem;
            align-items: center;
          }

          .form-row {
            flex-direction: column;
            gap: 1.5rem;
          }

          .navigation {
            padding: 1rem;
            flex-direction: column;
            gap: 1rem;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }

          .contact-info {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <div className="registration-container">
        {/* Header */}
        <div className="header">
          <div className="header-icon">🏪</div>
          <h1>Become a Vendor</h1>
          <p>
            Join our marketplace and reach thousands of customers. 
            Complete the registration process to start selling your products.
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="stepper">
          <div className="stepper-container">
            {steps.map((step, index) => (
              <div key={index} className="step">
                <div className={`step-icon ${index <= activeStep ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}>
                  {index < activeStep ? '✓' : step.icon}
                </div>
                <div className={`step-label ${index <= activeStep ? 'active' : ''}`}>
                  {step.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="form-container">
          {activeStep === 0 && (
            <div>
              <h2 className="step-title">Personal Information</h2>
              <p className="step-description">
                Please provide your personal details as they appear on your government ID.
              </p>
              {renderPersonalInfo()}
            </div>
          )}

          {activeStep === 1 && (
            <div>
              <h2 className="step-title">Address Details</h2>
              <p className="step-description">
                Provide your complete residential address for communication and verification purposes.
              </p>
              {renderAddressDetails()}
            </div>
          )}

          {activeStep === 2 && (
            <div>
              <h2 className="step-title">Business Details</h2>
              <p className="step-description">
                Tell us about your business and what you plan to sell on our platform.
              </p>
              {renderBusinessDetails()}
            </div>
          )}

          {activeStep === 3 && (
            <div>
              <h2 className="step-title">Bank Account Details</h2>
              <p className="step-description">
                Provide your bank account details for payment processing.
              </p>
              {renderBankDetails()}
            </div>
          )}

          {activeStep === 4 && (
            <div>
              <h2 className="step-title">Review & Submit</h2>
              <p className="step-description">
                Please review all information before submitting your vendor registration application.
              </p>
              {renderReviewSubmit()}
            </div>
          )}

          {error && (
            <div className="error-alert">
              <ErrorMessage message={error} />
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="navigation">
          <button
            type="button"
            onClick={handleBack}
            disabled={activeStep === 0}
            className="btn btn-secondary"
          >
            ← Back
          </button>

          {activeStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary"
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="btn btn-success"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="small" color="white" />
                  Submitting...
                </>
              ) : (
                <>
                  ✓ Submit Application
                </>
              )}
            </button>
          )}
        </div>

        {/* Help Section */}
        <div className="help-section">
          <h3 className="help-title">
            ℹ️ Need Help?
          </h3>
          <p className="help-description">
            If you have any questions about the registration process or need assistance, 
            please contact our vendor support team.
          </p>
          <div className="contact-info">
            <div className="contact-chip">
              📧 vendor-support@example.com
            </div>
            <div className="contact-chip">
              📞 +1 (555) 123-4567
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameRegistration;