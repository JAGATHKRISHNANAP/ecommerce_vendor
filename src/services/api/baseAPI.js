// baseAPI.js
import axios from 'axios'
import { config } from '../../config/environment'
import { getToken, removeToken, setToken, getRefreshToken } from '../storage/tokenStorage'
// import toast from 'react-hot-toast'

// Create axios instance
const api = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request queue for retry mechanism
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  
  failedQueue = []
}

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling and token refresh
api.interceptors.response.use(
  (response) => {
    // Log response time in development
    if (config.DEBUG_MODE && response.config.metadata) {
      const endTime = new Date()
      const duration = endTime - response.config.metadata.startTime
      console.log(`API Call: ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`)
    }
    
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Handle network errors
    if (!error.response) {
      // toast.error('Network error. Please check your connection.')
      console.error('Network error. Please check your connection.')
      return Promise.reject(error)
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Backend does not currently support refresh tokens.
      // Redirect to login immediately.
      removeToken()
      if (window.location.pathname !== '/login') {
         window.location.href = '/login'
      }
      return Promise.reject(error)

      /* Refresh logic disabled until backend support is added
      if (isRefreshing) {
        // If already refreshing, queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        }).catch(err => {
          return Promise.reject(err)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = getRefreshToken()
        // ... (refresh logic)
      } catch (refreshError) {
        // ...
      } finally {
        isRefreshing = false
      }
      */
    }

    // Handle specific error status codes
    switch (error.response.status) {
      case 400:
        // toast.error(error.response.data?.message || 'Bad request')
        console.error(error.response.data?.message || 'Bad request')
        break
      case 403:
        // toast.error('Access denied. You don\'t have permission for this action.')
        console.error('Access denied. You don\'t have permission for this action.')
        break
      case 404:
        // toast.error('Resource not found')
        console.error('Resource not found')
        break
      case 422:
        // Validation errors
        if (error.response.data?.errors) {
          const firstError = Object.values(error.response.data.errors)[0][0]
          // toast.error(firstError)
          console.error(firstError)
        } else {
          // toast.error(error.response.data?.message || 'Validation failed')
          console.error(error.response.data?.message || 'Validation failed')
        }
        break
      case 429:
        // toast.error('Too many requests. Please try again later.')
        console.error('Too many requests. Please try again later.')
        break
      case 500:
        // toast.error('Server error. Please try again later.')
        console.error('Server error. Please try again later.')
        break
      case 503:
        // toast.error('Service temporarily unavailable')
        console.error('Service temporarily unavailable')
        break
      default:
        if (error.response?.data?.message) {
          // toast.error(error.response.data.message)
          console.error(error.response.data.message)
        } else if (error.message) {
          // toast.error(error.message)
          console.error(error.message)
        } else {
          // toast.error('An unexpected error occurred')
          console.error('An unexpected error occurred')
        }
    }

    // Log errors in development
    if (config.DEBUG_MODE) {
      console.error('API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      })
    }

    return Promise.reject(error)
  }
)

// API Health Check
export const healthCheck = async () => {
  try {
    const response = await api.get('/health')
    return response.data
  } catch (error) {
    console.error('Health check failed:', error)
    return { status: 'error', message: 'API unavailable' }
  }
}

// File Upload Helper
export const uploadFile = async (file, endpoint = '/upload', onProgress) => {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await api.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        onProgress(percentCompleted)
      }
    }
  })
  return response.data
}

// Batch Request Helper
export const batchRequest = async (requests) => {
  const promises = requests.map(request => 
    api({
      method: request.method || 'GET',
      url: request.url,
      data: request.data,
      params: request.params
    })
  )
  
  const responses = await Promise.allSettled(promises)
  return responses.map((response, index) => ({
    success: response.status === 'fulfilled',
    data: response.status === 'fulfilled' ? response.value.data : null,
    error: response.status === 'rejected' ? response.reason : null,
    originalRequest: requests[index]
  }))
}

// Rate limiting helper
const rateLimitMap = new Map()

export const rateLimitedRequest = async (key, request, limitMs = 1000) => {
  const now = Date.now()
  const lastRequest = rateLimitMap.get(key)
  
  if (lastRequest && (now - lastRequest) < limitMs) {
    throw new Error(`Rate limited. Please wait ${Math.ceil((limitMs - (now - lastRequest)) / 1000)} seconds.`)
  }
  
  rateLimitMap.set(key, now)
  return request()
}

export default api