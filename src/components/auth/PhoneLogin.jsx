// //src/components/auth/PhoneLogin.jsx
// import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { Phone, ArrowRight, Shield, Smartphone, CheckCircle } from 'lucide-react'
// import { sendOTP } from '../../redux/slices/authSlices'
// import { validatePhoneNumber } from '../../utils/validation'
// import ErrorMessage from '../ui/ErrorMessage'
// import LoadingSpinner from '../ui/LoadingSpinner'

// const PhoneLogin = () => {
//   const dispatch = useDispatch()
//   const { isLoading, error } = useSelector(state => state.auth)
//   const [phoneNumber, setPhoneNumber] = useState('')
//   const [countryCode, setCountryCode] = useState('+91')
//   const [phoneError, setPhoneError] = useState('')
//   const [isFocused, setIsFocused] = useState(false)

//   const handlePhoneChange = (e) => {
//     const value = e.target.value
//     setPhoneNumber(value)
    
//     // Clear error when user starts typing
//     if (phoneError) {
//       setPhoneError('')
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     // Validate phone number
//     const validation = validatePhoneNumber(phoneNumber)
//     if (!validation.isValid) {
//       setPhoneError(validation.error)
//       return
//     }

//     // Format phone number
//     const fullPhoneNumber = `${countryCode}${phoneNumber.replace(/\D/g, '')}`
    
//     // Dispatch OTP sending action
//     dispatch(sendOTP({ 
//       phoneNumber: fullPhoneNumber, 
//       countryCode 
//     }))
//   }

//   const countries = [
//     { code: '+1', flag: '🇺🇸', name: 'United States' },
//     { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
//     { code: '+91', flag: '🇮🇳', name: 'India' },
//     { code: '+33', flag: '🇫🇷', name: 'France' },
//     { code: '+49', flag: '🇩🇪', name: 'Germany' },
//     { code: '+81', flag: '🇯🇵', name: 'Japan' },
//     { code: '+86', flag: '🇨🇳', name: 'China' },
//     { code: '+61', flag: '🇦🇺', name: 'Australia' },
//     { code: '+55', flag: '🇧🇷', name: 'Brazil' },
//     { code: '+34', flag: '🇪🇸', name: 'Spain' }
//   ]

//   return (
//     <div style={{ 
//       fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//       color: '#333',
//       lineHeight: '1.5'
//     }}>
//       {/* Header Section - Material Design Style */}
//       <div style={{
//         textAlign: 'center',
//         marginBottom: '32px',
//         padding: '20px 0'
//       }}>
//         <div style={{
//           width: '64px',
//           height: '64px',
//           background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
//           borderRadius: '50%',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           margin: '0 auto 16px',
//           boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.3)'
//         }}>
//           <Smartphone style={{ width: '32px', height: '32px', color: 'white' }} />
//         </div>
//         <h2 style={{
//           fontSize: '24px',
//           fontWeight: '500',
//           color: '#1976d2',
//           margin: '0 0 8px 0'
//         }}>
//           Phone Verification
//         </h2>
//         <p style={{
//           fontSize: '14px',
//           color: '#666',
//           margin: '0',
//           lineHeight: '1.6'
//         }}>
//           Enter your phone number to receive a verification code
//         </p>
//       </div>

//       {/* Form Container */}
//       <div style={{ marginBottom: '24px' }}>
        
//         {/* Country Code and Phone Input */}
//         <div style={{
//           display: 'flex',
//           gap: '12px',
//           marginBottom: '16px'
//         }}>
//           {/* Country Selector - Material Design */}
//           <div style={{ position: 'relative', minWidth: '120px' }}>
//             <select
//               value={countryCode}
//               onChange={(e) => setCountryCode(e.target.value)}
//               disabled={isLoading}
//               style={{
//                 width: '100%',
//                 height: '56px',
//                 padding: '0 32px 0 12px',
//                 border: `2px solid ${isFocused ? '#1976d2' : '#e0e0e0'}`,
//                 borderRadius: '8px',
//                 background: 'white',
//                 fontSize: '14px',
//                 fontFamily: 'inherit',
//                 outline: 'none',
//                 cursor: 'pointer',
//                 transition: 'all 0.2s ease',
//                 appearance: 'none'
//               }}
//               onFocus={() => setIsFocused(true)}
//               onBlur={() => setIsFocused(false)}
//             >
//               {countries.map((country) => (
//                 <option key={country.code} value={country.code}>
//                   {country.flag} {country.code}
//                 </option>
//               ))}
//             </select>
//             {/* Dropdown Arrow */}
//             <div style={{
//               position: 'absolute',
//               right: '12px',
//               top: '50%',
//               transform: 'translateY(-50%)',
//               pointerEvents: 'none',
//               color: '#666'
//             }}>
//               ▼
//             </div>
//           </div>
          
//           {/* Phone Number Input - Material Design */}
//           <div style={{ 
//             flex: '1',
//             position: 'relative'
//           }}>
//             <input
//               type="tel"
//               value={phoneNumber}
//               onChange={handlePhoneChange}
//               onFocus={() => setIsFocused(true)}
//               onBlur={() => setIsFocused(false)}
//               placeholder="Enter your phone number"
//               disabled={isLoading}
//               style={{
//                 width: '100%',
//                 height: '56px',
//                 padding: '0 16px 0 48px',
//                 border: `2px solid ${phoneError ? '#f44336' : (isFocused ? '#1976d2' : '#e0e0e0')}`,
//                 borderRadius: '8px',
//                 background: 'white',
//                 fontSize: '16px',
//                 fontFamily: 'inherit',
//                 outline: 'none',
//                 transition: 'all 0.2s ease',
//                 boxSizing: 'border-box'
//               }}
//             />
//             {/* Phone Icon */}
//             <Phone style={{
//               position: 'absolute',
//               left: '16px',
//               top: '50%',
//               transform: 'translateY(-50%)',
//               width: '20px',
//               height: '20px',
//               color: isFocused ? '#1976d2' : '#666'
//             }} />
//           </div>
//         </div>
        
//         {/* Phone Error Message */}
//         {phoneError && (
//           <div style={{
//             color: '#f44336',
//             fontSize: '12px',
//             marginTop: '4px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '4px'
//           }}>
//             <span style={{ fontSize: '16px' }}>⚠️</span>
//             {phoneError}
//           </div>
//         )}
//       </div>
      
//       {/* API Error Message */}
//       {error && (
//         <div style={{ marginBottom: '24px' }}>
//           <ErrorMessage message={error} />
//         </div>
//       )}
      
//       {/* Submit Button - Material Design */}
//       <button
//         onClick={handleSubmit}
//         disabled={isLoading || !phoneNumber.trim()}
//         style={{
//           width: '100%',
//           height: '48px',
//           background: isLoading || !phoneNumber.trim() 
//             ? '#e0e0e0' 
//             : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
//           color: isLoading || !phoneNumber.trim() ? '#999' : 'white',
//           border: 'none',
//           borderRadius: '8px',
//           fontSize: '16px',
//           fontWeight: '500',
//           fontFamily: 'inherit',
//           cursor: isLoading || !phoneNumber.trim() ? 'not-allowed' : 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           gap: '8px',
//           transition: 'all 0.2s ease',
//           boxShadow: isLoading || !phoneNumber.trim() 
//             ? 'none' 
//             : '0 2px 8px rgba(25, 118, 210, 0.3)',
//           textTransform: 'none',
//           outline: 'none'
//         }}
//         onMouseOver={(e) => {
//           if (!isLoading && phoneNumber.trim()) {
//             e.target.style.transform = 'translateY(-1px)'
//             e.target.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.4)'
//           }
//         }}
//         onMouseOut={(e) => {
//           e.target.style.transform = 'translateY(0)'
//           e.target.style.boxShadow = isLoading || !phoneNumber.trim() 
//             ? 'none' 
//             : '0 2px 8px rgba(25, 118, 210, 0.3)'
//         }}
//       >
//         {isLoading ? (
//           <>
//             <LoadingSpinner size="small" color="white" />
//             <span>Sending Code...</span>
//           </>
//         ) : (
//           <>
//             <span>Send Verification Code</span>
//             <ArrowRight style={{ width: '20px', height: '20px' }} />
//           </>
//         )}
//       </button>
      

//       {/* Help Text */}
//       <div style={{
//         textAlign: 'center',
//         marginTop: '24px',
//         padding: '16px',
//         background: '#fff',
//         borderRadius: '8px',
//         border: '1px solid #e0e0e0'
//       }}>
//         <p style={{
//           fontSize: '13px',
//           color: '#666',
//           margin: '0',
//           lineHeight: '1.5'
//         }}>
//           📱 You'll receive a 6-digit verification code via SMS<br />
//           💬 Standard messaging rates may apply
//         </p>
//       </div>
//     </div>
//   )
// }

// export default PhoneLogin

// src/components/auth/PhoneLogin.jsx
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Phone, ArrowRight, ChevronDown } from 'lucide-react'
import { sendOTP } from '../../redux/slices/authSlices'
import { validatePhoneNumber } from '../../utils/validation'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingSpinner from '../ui/LoadingSpinner'

const PhoneLogin = () => {
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector(state => state.auth)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phoneError, setPhoneError] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '') // Only numbers
    setPhoneNumber(value)
    if (phoneError) setPhoneError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validation = validatePhoneNumber(phoneNumber)
    if (!validation.isValid) {
      setPhoneError(validation.error)
      return
    }
    const fullPhoneNumber = `${countryCode}${phoneNumber}`
    dispatch(sendOTP({ phoneNumber: fullPhoneNumber, countryCode }))
  }

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ textAlign: 'left', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px', letterSpacing: '-0.5px' }}>
          Welcome back
        </h2>
        <p style={{ fontSize: '15px', color: '#666', margin: '0' }}>
          Enter your phone number to sign in or create an account.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          background: '#f8f9fa',
          borderRadius: '16px',
          padding: '4px',
          border: `2px solid ${phoneError ? '#ff4d4f' : (isFocused ? '#4f46e5' : 'transparent')}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          marginBottom: '12px'
        }}>
          {/* Country Selector */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '0 12px', borderRight: '1px solid #e0e0e0' }}>
             <span style={{ fontSize: '15px', fontWeight: '600', color: '#333' }}>{countryCode}</span>
             <ChevronDown size={14} style={{ marginLeft: '4px', color: '#999' }} />
             <select
               value={countryCode}
               onChange={(e) => setCountryCode(e.target.value)}
               style={{ position: 'absolute', opacity: 0, width: '100%', cursor: 'pointer' }}
             >
               <option value="+91">India (+91)</option>
               <option value="+1">US (+1)</option>
               <option value="+44">UK (+44)</option>
             </select>
          </div>

          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="00000 00000"
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              padding: '16px',
              fontSize: '17px',
              fontWeight: '500',
              outline: 'none',
              letterSpacing: '1px'
            }}
          />
        </div>

        {phoneError && (
          <p style={{ color: '#ff4d4f', fontSize: '13px', margin: '0 0 16px 4px', fontWeight: '500' }}>
            {phoneError}
          </p>
        )}

        {error && <ErrorMessage message={error} />}

        <button
          disabled={isLoading || phoneNumber.length < 8}
          style={{
            width: '100%',
            height: '56px',
            background: '#4f46e5',
            color: '#fff',
            border: 'none',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: (isLoading || phoneNumber.length < 8) ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '20px',
            opacity: (isLoading || phoneNumber.length < 8) ? 0.6 : 1,
            transition: 'transform 0.2s active'
          }}
        >
          {isLoading ? <LoadingSpinner size="small" color="white" /> : (
            <>
              Continue
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: '#999' }}>
        By clicking continue, you agree to our <b>Terms</b> and <b>Privacy Policy</b>.
      </p>
    </div>
  )
}

export default PhoneLogin