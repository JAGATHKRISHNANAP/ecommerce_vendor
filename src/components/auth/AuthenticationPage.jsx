// vendor/src/components/auth/AuthenticationPage.jsx
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { Shield, Phone, Mail } from 'lucide-react'
import { setLoginMethod, clearError } from '../../redux/slices/authSlices'
import PhoneLogin from './PhoneLogin'
import OTPVerification from './OTPVerification'
import NameRegistration from './NameRegistration'
// import SSOLogin from './SSOLogin'

const AuthenticationPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    loginMethod,
    showOtpInput,
    showNameInput,
    isAuthenticated,
    isLoading
  } = useSelector(state => state.auth)

  // Handle successful authentication
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/vendor/dashboard')
    }
  }, [isAuthenticated, navigate])

  // Handle SSO callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const state = urlParams.get('state')
    const provider = urlParams.get('provider')

    if (code && state && provider) {
      // Handle SSO callback logic here
      console.log('SSO callback received:', { provider, code, state })
    }
  }, [])

  const handleMethodChange = (method) => {
    dispatch(setLoginMethod(method))
    dispatch(clearError())
  }

  if (showNameInput) {
    return <NameRegistration />
  }

  const renderAuthContent = () => {
    // Phone authentication flow
    if (loginMethod === 'phone') {
      if (showOtpInput) {
        return <OTPVerification />
      } else {
        return <PhoneLogin />
      }
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Background Animation Elements */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        overflow: 'hidden',
        zIndex: '1'
      }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              background: `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`,
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <div style={{
        width: '100%',
        maxWidth: '440px',
        position: 'relative',
        zIndex: '2'
      }}>

        {/* Header - Don't show for name registration */}
        {!showNameInput && (
          <div style={{
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <Shield style={{
                width: '40px',
                height: '40px',
                color: '#667eea'
              }} />
            </div>

            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#ffffff',
              margin: '0 0 12px 0',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              E c o m m e r c e
            </h1>

            <p style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: '0',
              lineHeight: '1.5'
            }}>
              Sign in to continue
            </p>
          </div>
        )}

        {/* Main Authentication Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Card Background Pattern */}
          <div style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            borderRadius: '0 24px 0 100px'
          }} />

          <div style={{ position: 'relative', zIndex: '1' }}>
            {renderAuthContent()}
          </div>
        </div>

        {/* Footer - Don't show for name registration */}
        {!showNameInput && (
          <div style={{
            textAlign: 'center',
            marginTop: '24px'
          }}>
            <p style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '0',
              lineHeight: '1.6'
            }}>
              By continuing, you agree to our{' '}
              <a
                href="#"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontWeight: '600',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                Terms of Service
              </a>
              {' '}and{' '}
              <a
                href="#"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontWeight: '600',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                Privacy Policy
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthenticationPage