// src/services/api/authAPI.js
import axios from 'axios'

const BASE_URL =  'http://localhost:8000/api/vendor'

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  // Send OTP to phone number
  sendOTP: async (phoneNumber, countryCode) => {
    try {
      const response = await api.post('/auth/send-otp', {
        phone_number: phoneNumber,
        country_code: countryCode,
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Verify OTP
  verifyOTP: async (phoneNumber, otp) => {
    try {
      const response = await api.post('/auth/verify-otp', {
        phone_number: phoneNumber,
        otp: otp,
      })
      return response.data
      
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Complete registration (add name)
  completeRegistration: async (phoneNumber, name) => {
    try {
      const response = await api.post('/auth/complete-registration', {
        phone_number: phoneNumber,
        name: name,
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await api.post('/auth/logout')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // SSO methods (for future implementation)
  initiateGoogleSSO: async () => {
    // Placeholder for Google SSO
    throw new Error('Google SSO not implemented yet')
  },

  initiateMicrosoftSSO: async () => {
    // Placeholder for Microsoft SSO
    throw new Error('Microsoft SSO not implemented yet')
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    try {
      const response = await api.post('/auth/refresh-token', {
        refresh_token: refreshToken,
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },
}

export default api