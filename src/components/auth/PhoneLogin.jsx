//src/components/auth/PhoneLogin.jsx
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Phone, ArrowRight, Shield, Smartphone, CheckCircle } from 'lucide-react'
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
    const value = e.target.value
    setPhoneNumber(value)
    
    // Clear error when user starts typing
    if (phoneError) {
      setPhoneError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate phone number
    const validation = validatePhoneNumber(phoneNumber)
    if (!validation.isValid) {
      setPhoneError(validation.error)
      return
    }

    // Format phone number
    const fullPhoneNumber = `${countryCode}${phoneNumber.replace(/\D/g, '')}`
    
    // Dispatch OTP sending action
    dispatch(sendOTP({ 
      phoneNumber: fullPhoneNumber, 
      countryCode 
    }))
  }

  const countries = [
    { code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: '+86', flag: '🇨🇳', name: 'China' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: '+55', flag: '🇧🇷', name: 'Brazil' },
    { code: '+34', flag: '🇪🇸', name: 'Spain' }
  ]

  return (
    <div style={{ 
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      color: '#333',
      lineHeight: '1.5'
    }}>
      {/* Header Section - Material Design Style */}
      <div style={{
        textAlign: 'center',
        marginBottom: '32px',
        padding: '20px 0'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.3)'
        }}>
          <Smartphone style={{ width: '32px', height: '32px', color: 'white' }} />
        </div>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '500',
          color: '#1976d2',
          margin: '0 0 8px 0'
        }}>
          Phone Verification
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#666',
          margin: '0',
          lineHeight: '1.6'
        }}>
          Enter your phone number to receive a verification code
        </p>
      </div>

      {/* Form Container */}
      <div style={{ marginBottom: '24px' }}>
        
        {/* Country Code and Phone Input */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '16px'
        }}>
          {/* Country Selector - Material Design */}
          <div style={{ position: 'relative', minWidth: '120px' }}>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              disabled={isLoading}
              style={{
                width: '100%',
                height: '56px',
                padding: '0 32px 0 12px',
                border: `2px solid ${isFocused ? '#1976d2' : '#e0e0e0'}`,
                borderRadius: '8px',
                background: 'white',
                fontSize: '14px',
                fontFamily: 'inherit',
                outline: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                appearance: 'none'
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
            {/* Dropdown Arrow */}
            <div style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              color: '#666'
            }}>
              ▼
            </div>
          </div>
          
          {/* Phone Number Input - Material Design */}
          <div style={{ 
            flex: '1',
            position: 'relative'
          }}>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter your phone number"
              disabled={isLoading}
              style={{
                width: '100%',
                height: '56px',
                padding: '0 16px 0 48px',
                border: `2px solid ${phoneError ? '#f44336' : (isFocused ? '#1976d2' : '#e0e0e0')}`,
                borderRadius: '8px',
                background: 'white',
                fontSize: '16px',
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
            />
            {/* Phone Icon */}
            <Phone style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              color: isFocused ? '#1976d2' : '#666'
            }} />
          </div>
        </div>
        
        {/* Phone Error Message */}
        {phoneError && (
          <div style={{
            color: '#f44336',
            fontSize: '12px',
            marginTop: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{ fontSize: '16px' }}>⚠️</span>
            {phoneError}
          </div>
        )}
      </div>
      
      {/* API Error Message */}
      {error && (
        <div style={{ marginBottom: '24px' }}>
          <ErrorMessage message={error} />
        </div>
      )}
      
      {/* Submit Button - Material Design */}
      <button
        onClick={handleSubmit}
        disabled={isLoading || !phoneNumber.trim()}
        style={{
          width: '100%',
          height: '48px',
          background: isLoading || !phoneNumber.trim() 
            ? '#e0e0e0' 
            : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: isLoading || !phoneNumber.trim() ? '#999' : 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '500',
          fontFamily: 'inherit',
          cursor: isLoading || !phoneNumber.trim() ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.2s ease',
          boxShadow: isLoading || !phoneNumber.trim() 
            ? 'none' 
            : '0 2px 8px rgba(25, 118, 210, 0.3)',
          textTransform: 'none',
          outline: 'none'
        }}
        onMouseOver={(e) => {
          if (!isLoading && phoneNumber.trim()) {
            e.target.style.transform = 'translateY(-1px)'
            e.target.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.4)'
          }
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)'
          e.target.style.boxShadow = isLoading || !phoneNumber.trim() 
            ? 'none' 
            : '0 2px 8px rgba(25, 118, 210, 0.3)'
        }}
      >
        {isLoading ? (
          <>
            <LoadingSpinner size="small" color="white" />
            <span>Sending Code...</span>
          </>
        ) : (
          <>
            <span>Send Verification Code</span>
            <ArrowRight style={{ width: '20px', height: '20px' }} />
          </>
        )}
      </button>
      

      {/* Help Text */}
      <div style={{
        textAlign: 'center',
        marginTop: '24px',
        padding: '16px',
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        <p style={{
          fontSize: '13px',
          color: '#666',
          margin: '0',
          lineHeight: '1.5'
        }}>
          📱 You'll receive a 6-digit verification code via SMS<br />
          💬 Standard messaging rates may apply
        </p>
      </div>
    </div>
  )
}

export default PhoneLogin