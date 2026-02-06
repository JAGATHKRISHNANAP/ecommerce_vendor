// src/router.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AuthenticationPage from './components/auth/AuthenticationPage'
import Dashboard from './pages/Dashboard'
import AddProductPage from './pages/AddProductPage'
import NameRegistration from './components/auth/NameRegistration'
import ProfilePage from './pages/profile/ProfilePage'
import VendorRegistrationPage from './components/verthee/verthey'
import Layout from './components/dashboard/Layout'
// import EditProduct from './components/addProduct/EditProduct';
import Products from './components/addProduct/Products';
import Orders from './components/orders/Orders';
import Categories from './components/addProduct/Categories'
import Subcategories from './components/addProduct/Subcategories'
import Specifications from './components/addProduct/Specifications'

// Simple 404 component
const NotFound = () => {
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
          fontSize: '72px',
          marginBottom: '16px'
        }}>
          🔍
        </div>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#333',
          margin: '0 0 16px 0'
        }}>
          404
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#666',
          margin: '0 0 24px 0'
        }}>
          Oops! Page not found
        </p>
        <button
          onClick={() => window.location.href = '/vendor/dashboard'}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
          }}
        >
          🏠 Go back to dashboard
        </button>
      </div>
    </div>
  )
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth)
  return isAuthenticated ? children : <Navigate to="/vendor/login" replace />
}

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth)
  return isAuthenticated ? <Navigate to="/vendor/dashboard" replace /> : children
}

const AppRouter = () => {
  const { isAuthenticated } = useSelector(state => state.auth)

  return (
    <Routes>
      {/* Root route - redirects based on auth status */}
      <Route
        path="/vendor"
        element={
          <Navigate to={isAuthenticated ? "/vendor/dashboard" : "/vendor/login"} replace />
        }
      />

      {/* Public Routes */}
      <Route
        path="/vendor/login"
        element={
          <PublicRoute>
            <AuthenticationPage />
          </PublicRoute>
        }
      />

      <Route
        path="/vendor/name-registration"
        element={<NameRegistration />}
      />

      {/* Protected Routes */}
      <Route element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="/vendor/dashboard" element={<Dashboard />} />
        <Route path="/vendor/orders" element={<Orders />} />
        <Route path="/vendor/products" element={<Products viewMode="list" />} />
        <Route path="/vendor/add-product" element={<Products viewMode="add" />} />
        <Route path="/vendor/categories" element={<Categories viewMode="list" />} />
        <Route path="/vendor/add-category" element={<Categories viewMode="add" />} />
        <Route path="/vendor/categories/:categoryId" element={<Subcategories />} />
        <Route path="/vendor/subcategories/:subcategoryId/specifications" element={<Specifications />} />
        <Route path="/vendor/profile" element={<ProfilePage />} />
      </Route>

      <Route
        path="/vendor/test"
        element={
          // <ProtectedRoute>
          <VendorRegistrationPage />
          // </ProtectedRoute>
        }
      />

      {/* Catch all unknown routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter