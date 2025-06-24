// src/components/auth/NameRegistration.jsx
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { User, ArrowRight, CheckCircle } from 'lucide-react'
import { completeRegistration } from '../../redux/slices/authSlices'
import { validateName } from '../../utils/validation'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingSpinner from '../ui/LoadingSpinner'

const NameRegistration = () => {
  const dispatch = useDispatch()
  const { isLoading, error, phoneNumber } = useSelector(state => state.auth)
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleNameChange = (e) => {
    const value = e.target.value
    setName(value)
    
    // Clear error when user starts typing
    if (nameError) {
      setNameError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate name
    const validation = validateName(name, 'Name')
    if (!validation.isValid) {
      setNameError(validation.error)
      return
    }
    
    // Submit registration
    dispatch(completeRegistration({ 
      phoneNumber,
      name: name.trim()
    }))
  }

  return (
    <div style={{
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      color: '#333'
    }}>
      {/* Header Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: '0 4px 14px rgba(76, 175, 80, 0.3)'
        }}>
          <User style={{ width: '32px', height: '32px', color: 'white' }} />
        </div>
        
        <h2 style={{
          fontSize: '24px',
          fontWeight: '500',
          color: '#333',
          margin: '0 0 8px 0'
        }}>
          Welcome! Let's get to know you
        </h2>
        
        <p style={{
          fontSize: '14px',
          color: '#666',
          margin: '0 0 8px 0',
          lineHeight: '1.5'
        }}>
          Please enter your name to complete registration
        </p>
        
        <p style={{
          fontSize: '13px',
          color: '#999',
          margin: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <CheckCircle style={{ width: '16px', height: '16px', color: '#4caf50' }} />
          Phone verified: {phoneNumber}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '24px' }}>
          {/* Name Input */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter your full name"
              disabled={isLoading}
              autoFocus
              style={{
                width: '100%',
                height: '56px',
                padding: '0 16px 0 48px',
                border: `2px solid ${nameError ? '#f44336' : (isFocused ? '#4caf50' : '#e0e0e0')}`,
                borderRadius: '12px',
                background: 'white',
                fontSize: '16px',
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
            />
            {/* User Icon */}
            <User style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              color: isFocused ? '#4caf50' : '#666'
            }} />
          </div>
          
          {/* Name Error Message */}
          {nameError && (
            <div style={{
              color: '#f44336',
              fontSize: '12px',
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{ fontSize: '16px' }}>⚠️</span>
              {nameError}
            </div>
          )}
          
          {/* Help Text */}
          <p style={{
            fontSize: '12px',
            color: '#999',
            marginTop: '8px',
            textAlign: 'center'
          }}>
            This is how we'll address you in our communications
          </p>
        </div>
        
        {/* API Error Message */}
        {error && (
          <div style={{ marginBottom: '24px' }}>
            <ErrorMessage message={error} />
          </div>
        )}
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !name.trim()}
          style={{
            width: '100%',
            height: '56px',
            background: isLoading || !name.trim() 
              ? 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)' 
              : 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
            color: isLoading || !name.trim() ? '#999' : 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: 'inherit',
            cursor: isLoading || !name.trim() ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            transition: 'all 0.2s ease',
            boxShadow: isLoading || !name.trim() 
              ? 'none' 
              : '0 4px 12px rgba(76, 175, 80, 0.3)',
            outline: 'none'
          }}
          onMouseOver={(e) => {
            if (!isLoading && name.trim()) {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 16px rgba(76, 175, 80, 0.4)'
            }
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = isLoading || !name.trim() 
              ? 'none' 
              : '0 4px 12px rgba(76, 175, 80, 0.3)'
          }}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="small" color="white" />
              <span>Creating your account...</span>
            </>
          ) : (
            <>
              <span>Complete Registration</span>
              <ArrowRight style={{ width: '20px', height: '20px' }} />
            </>
          )}
        </button>
      </form>
      
      {/* Privacy Note */}
      <div style={{
        textAlign: 'center',
        marginTop: '32px',
        padding: '16px',
        background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
        borderRadius: '12px',
        border: '1px solid #c8e6c9'
      }}>
        <p style={{
          fontSize: '12px',
          color: '#388e3c',
          margin: '0',
          lineHeight: '1.5'
        }}>
          🔒 Your information is secure and will only be used to personalize your experience
        </p>
      </div>
    </div>
  )
}

export default NameRegistration