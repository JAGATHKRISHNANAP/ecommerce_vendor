//src/components/auth/OTPVerification.jsx
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowLeft, RotateCcw, CheckCircle, Smartphone } from 'lucide-react'
import { verifyOTP, sendOTP, setLoginMethod } from '../../redux/slices/authSlices'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingSpinner from '../ui/LoadingSpinner'

const OTPVerification = () => {
  const dispatch = useDispatch()
  const { isLoading, error, phoneNumber } = useSelector(state => state.auth)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const inputRefs = useRef([])

  // Timer for resend functionality
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
      setFocusedIndex(0)
    }
  }, [])

  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return
    
    // Only allow single digit
    if (value.length > 1) return
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
      setFocusedIndex(index + 1)
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
      setFocusedIndex(index - 1)
    }
    
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      navigator.clipboard.readText().then(text => {
        const digits = text.replace(/\D/g, '').slice(0, 6)
        const newOtp = [...otp]
        for (let i = 0; i < 6; i++) {
          newOtp[i] = digits[i] || ''
        }
        setOtp(newOtp)
        
        // Focus last filled input or next empty one
        const nextIndex = Math.min(digits.length, 5)
        inputRefs.current[nextIndex]?.focus()
        setFocusedIndex(nextIndex)
      })
    }
  }

  const handleSubmit = () => {
    const otpCode = otp.join('')
    if (otpCode.length === 6) {
      dispatch(verifyOTP({ phoneNumber, otp: otpCode }))
    }
  }

  const handleResendOTP = () => {
    if (canResend) {
      dispatch(sendOTP({ phoneNumber, countryCode: '+1' }))
      setTimeLeft(60)
      setCanResend(false)
      setOtp(['', '', '', '', '', ''])
      // Focus first input
      inputRefs.current[0]?.focus()
      setFocusedIndex(0)
    }
  }

  const handleChangeNumber = () => {
    dispatch(setLoginMethod('phone'))
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const isOtpComplete = otp.every(digit => digit !== '')

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
          boxShadow: '0 4px 14px rgba(76, 175, 80, 0.3)',
          animation: 'pulse 2s infinite'
        }}>
          <Smartphone style={{ width: '28px', height: '28px', color: 'white' }} />
        </div>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '500',
          color: '#333',
          margin: '0 0 8px 0'
        }}>
          Verify Your Phone
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#666',
          margin: '0 0 8px 0',
          lineHeight: '1.5'
        }}>
          We've sent a 6-digit verification code to
        </p>
        <p style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#4caf50',
          margin: '0',
          background: 'rgba(76, 175, 80, 0.1)',
          padding: '8px 16px',
          borderRadius: '20px',
          display: 'inline-block'
        }}>
          📱 {phoneNumber}
        </p>
      </div>

      {/* OTP Input Section */}
      <div style={{ marginBottom: '24px' }}>
        {/* OTP Input Fields */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '24px'
        }}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(-1)}
              disabled={isLoading}
              style={{
                width: '56px',
                height: '56px',
                textAlign: 'center',
                fontSize: '24px',
                fontWeight: '600',
                border: `2px solid ${
                  digit ? '#4caf50' : 
                  focusedIndex === index ? '#2196f3' : 
                  '#e0e0e0'
                }`,
                borderRadius: '12px',
                background: digit ? 'rgba(76, 175, 80, 0.05)' : 'white',
                color: '#333',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxShadow: focusedIndex === index ? '0 0 0 3px rgba(33, 150, 243, 0.1)' : 'none',
                fontFamily: 'monospace'
              }}
              maxLength="1"
            />
          ))}
        </div>

        {/* Progress Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            gap: '4px'
          }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: otp[index] ? '#4caf50' : '#e0e0e0',
                  transition: 'all 0.2s ease'
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Timer and Resend Section */}
        <div style={{
          textAlign: 'center',
          padding: '16px',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: '12px',
          border: '1px solid #e9ecef'
        }}>
          {!canResend ? (
            <div>
              <p style={{
                fontSize: '14px',
                color: '#666',
                margin: '0 0 8px 0'
              }}>
                ⏰ Resend code in
              </p>
              <div style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#2196f3',
                fontFamily: 'monospace'
              }}>
                {formatTime(timeLeft)}
              </div>
            </div>
          ) : (
            <button
              onClick={handleResendOTP}
              disabled={isLoading}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                margin: '0 auto',
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
                opacity: isLoading ? 0.7 : 1,
                outline: 'none'
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(-1px)'
                  e.target.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.4)'
                }
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 2px 8px rgba(76, 175, 80, 0.3)'
              }}
            >
              <RotateCcw style={{ width: '16px', height: '16px' }} />
              <span>Resend Code</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div style={{ marginBottom: '24px' }}>
          <ErrorMessage message={error} />
        </div>
      )}
      
      {/* Verify Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading || !isOtpComplete}
        style={{
          width: '100%',
          height: '56px',
          background: isLoading || !isOtpComplete 
            ? 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)' 
            : 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
          color: isLoading || !isOtpComplete ? '#999' : 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          fontFamily: 'inherit',
          cursor: isLoading || !isOtpComplete ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          transition: 'all 0.2s ease',
          boxShadow: isLoading || !isOtpComplete 
            ? 'none' 
            : '0 4px 12px rgba(33, 150, 243, 0.3)',
          outline: 'none',
          marginBottom: '16px'
        }}
        onMouseOver={(e) => {
          if (!isLoading && isOtpComplete) {
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = '0 6px 16px rgba(33, 150, 243, 0.4)'
          }
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)'
          e.target.style.boxShadow = isLoading || !isOtpComplete 
            ? 'none' 
            : '0 4px 12px rgba(33, 150, 243, 0.3)'
        }}
      >
        {isLoading ? (
          <>
            <LoadingSpinner size="small" color="white" />
            <span>Verifying...</span>
          </>
        ) : (
          <>
            <CheckCircle style={{ width: '20px', height: '20px' }} />
            <span>Verify & Continue</span>
          </>
        )}
      </button>
      
      {/* Change Number Button */}
      <button
        onClick={handleChangeNumber}
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '12px',
          background: 'transparent',
          color: '#666',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          fontFamily: 'inherit',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.2s ease',
          opacity: isLoading ? 0.5 : 1,
          outline: 'none',
          marginBottom: '24px'
        }}
        onMouseOver={(e) => {
          if (!isLoading) {
            e.target.style.borderColor = '#2196f3'
            e.target.style.color = '#2196f3'
          }
        }}
        onMouseOut={(e) => {
          e.target.style.borderColor = '#e0e0e0'
          e.target.style.color = '#666'
        }}
      >
        <ArrowLeft style={{ width: '16px', height: '16px' }} />
        <span>Use Different Number</span>
      </button>
      
      {/* Help Section */}
      <div style={{
        textAlign: 'center',
        padding: '20px',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        borderRadius: '12px',
        border: '1px solid #bbdefb'
      }}>
        <h4 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#1976d2',
          margin: '0 0 8px 0'
        }}>
          💡 Troubleshooting Tips
        </h4>
        <div style={{
          fontSize: '12px',
          color: '#666',
          lineHeight: '1.5'
        }}>
          <p style={{ margin: '0 0 4px 0' }}>• Check your SMS messages and spam folder</p>
          <p style={{ margin: '0 0 4px 0' }}>• Make sure you have cellular signal</p>
          <p style={{ margin: '0' }}>• Code expires in 10 minutes</p>
        </div>
      </div>

      {/* Auto-paste hint */}
      <p style={{
        marginTop: '16px',
        fontSize: '11px',
        color: '#999',
        textAlign: 'center',
        lineHeight: '1.4'
      }}>
        💡 Tip: You can paste the code with Ctrl+V or Cmd+V
      </p>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  )
}

export default OTPVerification