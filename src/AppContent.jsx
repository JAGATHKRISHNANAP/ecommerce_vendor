import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkAuthStatus } from './redux/slices/authSlices'
import LoadingSpinner from './components/ui/LoadingSpinner'
import AppRouter from './router'

function AppContent() {
  const dispatch = useDispatch()
  const { isLoading, isInitialized } = useSelector(state => state.auth)

  useEffect(() => {
    if (!isInitialized) {
      dispatch(checkAuthStatus())
    }
  }, [dispatch, isInitialized])

  // Show loading spinner while checking auth status
  if (!isInitialized || isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '24px'
          }}>
            🚀
          </div>
          <LoadingSpinner size="large" />
          <p style={{
            marginTop: '16px',
            fontSize: '16px',
            color: '#666',
            fontWeight: '500'
          }}>
            Loading your dashboard...
          </p>
          <p style={{
            marginTop: '8px',
            fontSize: '14px',
            color: '#999'
          }}>
            Please wait while we set everything up
          </p>
        </div>
      </div>
    )
  }

  return <AppRouter />
}

export default AppContent