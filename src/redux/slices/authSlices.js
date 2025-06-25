// src/redux/slices/authSlices.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authAPI } from '../../services/api/authAPI'
import { 
  setToken, 
  setRefreshToken, 
  setStoredUser, 
  removeToken, 
  getToken, 
  getStoredUser 
} from '../../services/storage/tokenStorage'

// Async Thunks
export const sendOTP = createAsyncThunk(
  'auth/sendOTP',
  async ({ phoneNumber, countryCode }, { rejectWithValue }) => {
    try {
      const response = await authAPI.sendOTP(phoneNumber, countryCode)
      return { ...response, phoneNumber }
    } catch (error) {
      return rejectWithValue(error.detail || error.message || 'Failed to send OTP')
    }
  }
)

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async ({ phoneNumber, otp }, { rejectWithValue }) => {
    try {
      const response = await authAPI.verifyOTP(phoneNumber, otp)
      
      // Store tokens and user data
      setToken(response.token)
      if (response.refresh_token) {
        setRefreshToken(response.refresh_token)
      }
      setStoredUser(response.user)

      console.log('User data after verification:', response.user)
      
      return response
    } catch (error) {
      return rejectWithValue(error.detail || error.message || 'Invalid OTP')
    }
  }
)

export const completeRegistrationoriginal = createAsyncThunk(
  'auth/completeRegistration',
  async ({ phoneNumber, name }, { rejectWithValue }) => {
    try {
      const response = await authAPI.completeRegistration(phoneNumber, name)
      
      // Update stored user data
      if (response.user) {
        setStoredUser(response.user)
      }
      
      return response
    } catch (error) {
      return rejectWithValue(error.detail || error.message || 'Failed to complete registration')
    }
  }
)
export const completeRegistration = createAsyncThunk(
  'auth/completeRegistration',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await authAPI.completeRegistration(formData);

      if (response.user) {
        setStoredUser(response.user);
      }

      return response;
    } catch (error) {
      return rejectWithValue(error.detail || error.message || 'Failed to complete registration');
    }
  }
);


// export const completeRegistration = createAsyncThunk(
//   'auth/completeRegistration',
//   async ({ phoneNumber, name }, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await authAPI.completeRegistration(phoneNumber, name)
      
//       // Check if registration was successful (200 status)
//       if (response.status === 200 || response.success) {
//         // Update stored user data
//         if (response.user) {
//           setStoredUser(response.user)
//         }
        
//         // Dispatch navigation event or trigger dashboard navigation
//         // Option 1: Dispatch custom event for navigation
//         window.dispatchEvent(new CustomEvent('registrationSuccess', {
//           detail: {
//             status: 200,
//             data: response
//           }
//         }))
        
//         // Option 2: You can also return a flag to handle navigation in the component
//         return {
//           ...response,
//           shouldNavigateToDashboard: true
//         }
//       }
      
//       return response
//     } catch (error) {
//       // Handle error cases
//       const errorMessage = error.response?.data?.detail || 
//                           error.detail || 
//                           error.message || 
//                           'Failed to complete registration'
      
//       return rejectWithValue({
//         message: errorMessage,
//         status: error.response?.status || 500
//       })
//     }
//   }
// )


export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async () => {
    try {
      const token = getToken()
      const user = getStoredUser()
      
      if (!token || !user) {
        return { isAuthenticated: false }
      }
      
      // Verify token with backend
      const response = await authAPI.getCurrentUser()
      
      return {
        isAuthenticated: true,
        user: response,
        token
      }
    } catch {
      // If token is invalid, clear storage
      removeToken()
      return { isAuthenticated: false }
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error('Logout API error:', error)
    } finally {
      removeToken()
    }
    return {}
  }
)

// Initial State
const initialState = {
  isLoading: false,
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  token: null,
  loginMethod: 'phone', // 'phone' | 'sso' | 'email'
  showOtpInput: false,
  showNameInput: false, // New state for name input
  phoneNumber: '',
  error: null,
  otpSent: false,
  lastLoginMethod: null,
  tokenExpiry: null,
  isNewUser: false // Track if user needs to complete registration
}

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginMethod: (state, action) => {
      state.loginMethod = action.payload
      state.showOtpInput = false
      state.showNameInput = false
      state.error = null
    },
    
    clearError: (state) => {
      state.error = null
    },
    
    resetAuthState: (state) => {
      return { 
        ...initialState, 
        isInitialized: true,
        loginMethod: state.loginMethod 
      }
    },
    
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload
    },
    
    setShowOtpInput: (state, action) => {
      state.showOtpInput = action.payload
    },
    
    setShowNameInput: (state, action) => {
      state.showNameInput = action.payload
    },
    
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        setStoredUser(state.user)
      }
    }
  },
  
  extraReducers: (builder) => {
    builder
      // Send OTP
      .addCase(sendOTP.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.isLoading = false
        state.showOtpInput = true
        state.phoneNumber = action.payload.phoneNumber
        state.otpSent = true
        state.error = null
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.showOtpInput = false
      })
      
      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
        state.lastLoginMethod = 'phone'
        state.tokenExpiry = action.payload.expires_at
        state.isNewUser = action.payload.is_new_user
        
        // If new user without name, show name input
        if (action.payload.is_new_user && !action.payload.user.name) {
          state.showNameInput = true
          state.showOtpInput = false
        } else {
          // Existing user with complete profile
          state.isAuthenticated = true
          state.showOtpInput = false
          state.showNameInput = false
        }
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Complete Registration
      .addCase(completeRegistration.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(completeRegistration.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.showNameInput = false
        state.isNewUser = false
        if (action.payload.user) {
          state.user = action.payload.user
        }
      })
      .addCase(completeRegistration.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Check Auth Status
      .addCase(checkAuthStatus.pending, () => {
        // Don't set loading for silent auth check
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isInitialized = true
        state.isAuthenticated = action.payload.isAuthenticated
        if (action.payload.isAuthenticated) {
          state.user = action.payload.user
          state.token = action.payload.token
        }
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isInitialized = true
        state.isAuthenticated = false
        state.user = null
        state.token = null
      })
      
      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, () => {
        return { 
          ...initialState, 
          isInitialized: true 
        }
      })
      .addCase(logout.rejected, () => {
        // Clear state even if logout API fails
        return { 
          ...initialState, 
          isInitialized: true 
        }
      })
  }
})

// Export actions
export const { 
  setLoginMethod, 
  clearError, 
  resetAuthState, 
  setPhoneNumber, 
  setShowOtpInput,
  setShowNameInput,
  updateUserProfile 
} = authSlice.actions

// Selectors
export const selectAuth = (state) => state.auth || initialState
export const selectIsAuthenticated = (state) => state.auth?.isAuthenticated || false
export const selectUser = (state) => state.auth?.user || null
export const selectIsLoading = (state) => state.auth?.isLoading || false
export const selectError = (state) => state.auth?.error || null
export const selectLoginMethod = (state) => state.auth?.loginMethod || 'phone'
export const selectShowOtpInput = (state) => state.auth?.showOtpInput || false
export const selectShowNameInput = (state) => state.auth?.showNameInput || false
export const selectPhoneNumber = (state) => state.auth?.phoneNumber || ''
export const selectIsInitialized = (state) => state.auth?.isInitialized || false
export const selectIsNewUser = (state) => state.auth?.isNewUser || false

// Default export
const authReducer = authSlice.reducer
export default authReducer