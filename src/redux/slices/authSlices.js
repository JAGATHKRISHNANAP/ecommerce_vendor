// // // authSlices.js
// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// // import { authAPI } from '../../services/api/authAPI'
// // import { 
// //   setToken, 
// //   setRefreshToken, 
// //   setStoredUser, 
// //   removeToken, 
// //   getToken, 
// //   getStoredUser 
// // } from '../../services/storage/tokenStorage'

// // // Remove toast import for now - we'll add it when react-hot-toast is installed
// // // import toast from 'react-hot-toast'

// // // Async Thunks
// // export const sendOTP = createAsyncThunk(
// //   'auth/sendOTP',
// //   async ({ phoneNumber, countryCode }, { rejectWithValue }) => {
// //     try {
// //       const response = await authAPI.sendOTP(phoneNumber, countryCode)
// //       return { ...response, phoneNumber }
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data?.message || error.message)
// //     }
// //   }
// // )

// // export const verifyOTP = createAsyncThunk(
// //   'auth/verifyOTP',
// //   async ({ phoneNumber, otp }, { rejectWithValue }) => {
// //     try {
// //       const response = await authAPI.verifyOTP(phoneNumber, otp)
      
// //       // Store tokens and user data
// //       setToken(response.token)
// //       if (response.refreshToken) {
// //         setRefreshToken(response.refreshToken)
// //       }
// //       setStoredUser(response.user)
      
// //       return response
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data?.message || error.message)
// //     }
// //   }
// // )

// // export const loginWithSSO = createAsyncThunk(
// //   'auth/loginWithSSO',
// //   async (provider, { rejectWithValue }) => {
// //     try {
// //       let response
// //       switch (provider.toLowerCase()) {
// //         case 'google':
// //           response = await authAPI.initiateGoogleSSO()
// //           break
// //         case 'microsoft':
// //           response = await authAPI.initiateMicrosoftSSO()
// //           break
// //         case 'apple':
// //           response = await authAPI.initiateAppleSSO()
// //           break
// //         case 'github':
// //           response = await authAPI.initiateGitHubSSO()
// //           break
// //         case 'linkedin':
// //           response = await authAPI.initiateLinkedInSSO()
// //           break
// //         default:
// //           throw new Error('Unsupported SSO provider')
// //       }
      
// //       if (response.redirectUrl) {
// //         window.location.href = response.redirectUrl
// //         return { redirected: true }
// //       }
      
// //       // Direct login success
// //       setToken(response.token)
// //       if (response.refreshToken) {
// //         setRefreshToken(response.refreshToken)
// //       }
// //       setStoredUser(response.user)
      
// //       return response
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data?.message || error.message)
// //     }
// //   }
// // )

// // export const handleSSOCallback = createAsyncThunk(
// //   'auth/handleSSOCallback',
// //   async ({ provider, code, state }, { rejectWithValue }) => {
// //     try {
// //       const response = await authAPI.handleSSOCallback(provider, code, state)
      
// //       // Store tokens and user data
// //       setToken(response.token)
// //       if (response.refreshToken) {
// //         setRefreshToken(response.refreshToken)
// //       }
// //       setStoredUser(response.user)
      
// //       return response
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data?.message || error.message)
// //     }
// //   }
// // )

// // export const checkAuthStatus = createAsyncThunk(
// //   'auth/checkAuthStatus',
// //   async () => {
// //     try {
// //       const token = getToken()
// //       const user = getStoredUser()
      
// //       if (!token || !user) {
// //         return { isAuthenticated: false }
// //       }
      
// //       // Optionally verify token with backend
// //       const response = await authAPI.getUserProfile()
// //       return {
// //         isAuthenticated: true,
// //         user: response.user || user,
// //         token
// //       }
// //     } catch {
// //       // If token is invalid, clear storage
// //       removeToken()
// //       return { isAuthenticated: false }
// //     }
// //   }
// // )

// // export const refreshAuthToken = createAsyncThunk(
// //   'auth/refreshAuthToken',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const refreshToken = localStorage.getItem('refreshToken')
// //       if (!refreshToken) {
// //         throw new Error('No refresh token available')
// //       }
      
// //       const response = await authAPI.refreshToken(refreshToken)
      
// //       // Update stored tokens
// //       setToken(response.token)
// //       if (response.refreshToken) {
// //         setRefreshToken(response.refreshToken)
// //       }
      
// //       return response
// //     } catch (error) {
// //       removeToken()
// //       return rejectWithValue(error.response?.data?.message || error.message)
// //     }
// //   }
// // )

// // export const logout = createAsyncThunk(
// //   'auth/logout',
// //   async () => {
// //     try {
// //       await authAPI.logout()
// //     } catch (error) {
// //       // Even if API call fails, clear local storage
// //       console.error('Logout API error:', error)
// //     } finally {
// //       removeToken()
// //     }
// //     return {}
// //   }
// // )

// // // Initial State
// // const initialState = {
// //   isLoading: false,
// //   isAuthenticated: false,
// //   isInitialized: false,
// //   user: null,
// //   token: null,
// //   loginMethod: 'phone', // 'phone' | 'sso' | 'email'
// //   showOtpInput: false,
// //   phoneNumber: '',
// //   error: null,
// //   otpSent: false,
// //   lastLoginMethod: null,
// //   tokenExpiry: null
// // }

// // // Auth Slice
// // const authSlice = createSlice({
// //   name: 'auth',
// //   initialState,
// //   reducers: {
// //     setLoginMethod: (state, action) => {
// //       state.loginMethod = action.payload
// //       state.showOtpInput = false
// //       state.error = null
// //     },
    
// //     clearError: (state) => {
// //       state.error = null
// //     },
    
// //     resetAuthState: (state) => {
// //       return { 
// //         ...initialState, 
// //         isInitialized: true,
// //         loginMethod: state.loginMethod 
// //       }
// //     },
    
// //     setPhoneNumber: (state, action) => {
// //       state.phoneNumber = action.payload
// //     },
    
// //     setShowOtpInput: (state, action) => {
// //       state.showOtpInput = action.payload
// //     },
    
// //     updateUserProfile: (state, action) => {
// //       if (state.user) {
// //         state.user = { ...state.user, ...action.payload }
// //         setStoredUser(state.user)
// //       }
// //     }
// //   },
  
// //   extraReducers: (builder) => {
// //     builder
// //       // Send OTP
// //       .addCase(sendOTP.pending, (state) => {
// //         state.isLoading = true
// //         state.error = null
// //       })
// //       .addCase(sendOTP.fulfilled, (state, action) => {
// //         state.isLoading = false
// //         state.showOtpInput = true
// //         state.phoneNumber = action.payload.phoneNumber
// //         state.otpSent = true
// //         state.error = null
// //         // toast.success('OTP sent successfully!')
// //       })
// //       .addCase(sendOTP.rejected, (state, action) => {
// //         state.isLoading = false
// //         state.error = action.payload
// //         state.showOtpInput = false
// //         // toast.error(action.payload || 'Failed to send OTP')
// //       })
      
// //       // Verify OTP
// //       .addCase(verifyOTP.pending, (state) => {
// //         state.isLoading = true
// //         state.error = null
// //       })
// //       .addCase(verifyOTP.fulfilled, (state, action) => {
// //         state.isLoading = false
// //         state.isAuthenticated = true
// //         state.user = action.payload.user
// //         state.token = action.payload.token
// //         state.error = null
// //         state.lastLoginMethod = 'phone'
// //         state.tokenExpiry = action.payload.expiresAt
// //         // toast.success('Login successful!')
// //       })
// //       .addCase(verifyOTP.rejected, (state, action) => {
// //         state.isLoading = false
// //         state.error = action.payload
// //         // toast.error(action.payload || 'Invalid OTP')
// //       })
      
// //       // SSO Login
// //       .addCase(loginWithSSO.pending, (state) => {
// //         state.isLoading = true
// //         state.error = null
// //       })
// //       .addCase(loginWithSSO.fulfilled, (state, action) => {
// //         state.isLoading = false
// //         if (!action.payload.redirected) {
// //           state.isAuthenticated = true
// //           state.user = action.payload.user
// //           state.token = action.payload.token
// //           state.lastLoginMethod = 'sso'
// //           state.tokenExpiry = action.payload.expiresAt
// //           // toast.success('Login successful!')
// //         }
// //       })
// //       .addCase(loginWithSSO.rejected, (state, action) => {
// //         state.isLoading = false
// //         state.error = action.payload
// //         // toast.error(action.payload || 'SSO login failed')
// //       })
      
// //       // SSO Callback
// //       .addCase(handleSSOCallback.pending, (state) => {
// //         state.isLoading = true
// //         state.error = null
// //       })
// //       .addCase(handleSSOCallback.fulfilled, (state, action) => {
// //         state.isLoading = false
// //         state.isAuthenticated = true
// //         state.user = action.payload.user
// //         state.token = action.payload.token
// //         state.lastLoginMethod = 'sso'
// //         state.tokenExpiry = action.payload.expiresAt
// //         // toast.success('Login successful!')
// //       })
// //       .addCase(handleSSOCallback.rejected, (state, action) => {
// //         state.isLoading = false
// //         state.error = action.payload
// //         // toast.error(action.payload || 'SSO callback failed')
// //       })
      
// //       // Check Auth Status
// //       .addCase(checkAuthStatus.pending, () => {
// //         // Don't set loading for silent auth check
// //       })
// //       .addCase(checkAuthStatus.fulfilled, (state, action) => {
// //         state.isInitialized = true
// //         state.isAuthenticated = action.payload.isAuthenticated
// //         if (action.payload.isAuthenticated) {
// //           state.user = action.payload.user
// //           state.token = action.payload.token
// //         }
// //       })
// //       .addCase(checkAuthStatus.rejected, (state) => {
// //         state.isInitialized = true
// //         state.isAuthenticated = false
// //         state.user = null
// //         state.token = null
// //       })
      
// //       // Refresh Token
// //       .addCase(refreshAuthToken.pending, () => {
// //         // Don't set loading for silent token refresh
// //       })
// //       .addCase(refreshAuthToken.fulfilled, (state, action) => {
// //         state.token = action.payload.token
// //         state.tokenExpiry = action.payload.expiresAt
// //       })
// //       .addCase(refreshAuthToken.rejected, (state) => {
// //         state.isAuthenticated = false
// //         state.user = null
// //         state.token = null
// //         state.tokenExpiry = null
// //       })
      
// //       // Logout
// //       .addCase(logout.pending, (state) => {
// //         state.isLoading = true
// //       })
// //       .addCase(logout.fulfilled, () => {
// //         return { 
// //           ...initialState, 
// //           isInitialized: true 
// //         }
// //       })
// //       .addCase(logout.rejected, () => {
// //         // Clear state even if logout API fails
// //         return { 
// //           ...initialState, 
// //           isInitialized: true 
// //         }
// //       })
// //   }
// // })

// // // Export actions
// // export const { 
// //   setLoginMethod, 
// //   clearError, 
// //   resetAuthState, 
// //   setPhoneNumber, 
// //   setShowOtpInput,
// //   updateUserProfile 
// // } = authSlice.actions

// // // Selectors
// // export const selectAuth = (state) => state.auth || initialState
// // export const selectIsAuthenticated = (state) => state.auth?.isAuthenticated || false
// // export const selectUser = (state) => state.auth?.user || null
// // export const selectIsLoading = (state) => state.auth?.isLoading || false
// // export const selectError = (state) => state.auth?.error || null
// // export const selectLoginMethod = (state) => state.auth?.loginMethod || 'phone'
// // export const selectShowOtpInput = (state) => state.auth?.showOtpInput || false
// // export const selectPhoneNumber = (state) => state.auth?.phoneNumber || ''
// // export const selectIsInitialized = (state) => state.auth?.isInitialized || false

// // // Default export
// // const authReducer = authSlice.reducer
// // export default authReducer






// //src/redux/slices/authSlices.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { authAPI } from '../../services/api/authAPI'
// import { 
//   setToken, 
//   setRefreshToken, 
//   setStoredUser, 
//   removeToken, 
//   getToken, 
//   getStoredUser 
// } from '../../services/storage/tokenStorage'

// // Static OTP for testing
// const STATIC_OTP = '123456'

// // Mock user data for testing
// const MOCK_USER = {
//   id: '1',
//   phoneNumber: '+1234567890',
//   name: 'Test User',
//   email: 'test@example.com',
//   isVerified: true,
//   createdAt: new Date().toISOString()
// }

// // Mock token for testing
// const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IlRlc3QgVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.mock-token'

// // Async Thunks
// export const sendOTP = createAsyncThunk(
//   'auth/sendOTP',
//   async ({ phoneNumber, countryCode }, { rejectWithValue }) => {
//     try {
//       // For testing - simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000))
      
//       // In production, uncomment this line:
//       // const response = await authAPI.sendOTP(phoneNumber, countryCode)
      
//       // Mock response for testing
//       const response = {
//         success: true,
//         message: 'OTP sent successfully',
//         otpId: 'mock-otp-id-123'
//       }
      
//       return { ...response, phoneNumber }
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message)
//     }
//   }
// )

// export const verifyOTP = createAsyncThunk(
//   'auth/verifyOTP',
//   async ({ phoneNumber, otp }, { rejectWithValue }) => {
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 800))
      
//       // Static OTP validation for testing
//       if (otp !== STATIC_OTP) {
//         throw new Error('Invalid OTP. Use 123456 for testing.')
//       }
      
//       // In production, uncomment this line:
//       // const response = await authAPI.verifyOTP(phoneNumber, otp)
      
//       // Mock successful response
//       const response = {
//         success: true,
//         token: MOCK_TOKEN,
//         refreshToken: 'mock-refresh-token',
//         user: {
//           ...MOCK_USER,
//           phoneNumber: phoneNumber
//         },
//         expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
//       }
      
//       // Store tokens and user data
//       setToken(response.token)
//       if (response.refreshToken) {
//         setRefreshToken(response.refreshToken)
//       }
//       setStoredUser(response.user)
      
//       return response
//     } catch (error) {
//       return rejectWithValue(error.message || 'Invalid OTP')
//     }
//   }
// )

// export const loginWithSSO = createAsyncThunk(
//   'auth/loginWithSSO',
//   async (provider, { rejectWithValue }) => {
//     try {
//       let response
//       switch (provider.toLowerCase()) {
//         case 'google':
//           response = await authAPI.initiateGoogleSSO()
//           break
//         case 'microsoft':
//           response = await authAPI.initiateMicrosoftSSO()
//           break
//         case 'apple':
//           response = await authAPI.initiateAppleSSO()
//           break
//         case 'github':
//           response = await authAPI.initiateGitHubSSO()
//           break
//         case 'linkedin':
//           response = await authAPI.initiateLinkedInSSO()
//           break
//         default:
//           throw new Error('Unsupported SSO provider')
//       }
      
//       if (response.redirectUrl) {
//         window.location.href = response.redirectUrl
//         return { redirected: true }
//       }
      
//       // Direct login success
//       setToken(response.token)
//       if (response.refreshToken) {
//         setRefreshToken(response.refreshToken)
//       }
//       setStoredUser(response.user)
      
//       return response
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message)
//     }
//   }
// )

// export const handleSSOCallback = createAsyncThunk(
//   'auth/handleSSOCallback',
//   async ({ provider, code, state }, { rejectWithValue }) => {
//     try {
//       const response = await authAPI.handleSSOCallback(provider, code, state)
      
//       // Store tokens and user data
//       setToken(response.token)
//       if (response.refreshToken) {
//         setRefreshToken(response.refreshToken)
//       }
//       setStoredUser(response.user)
      
//       return response
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message)
//     }
//   }
// )

// export const checkAuthStatus = createAsyncThunk(
//   'auth/checkAuthStatus',
//   async () => {
//     try {
//       const token = getToken()
//       const user = getStoredUser()
      
//       if (!token || !user) {
//         return { isAuthenticated: false }
//       }
      
//       // For testing - skip API call
//       // In production, uncomment this:
//       // const response = await authAPI.getUserProfile()
      
//       return {
//         isAuthenticated: true,
//         user: user,
//         token
//       }
//     } catch {
//       // If token is invalid, clear storage
//       removeToken()
//       return { isAuthenticated: false }
//     }
//   }
// )

// export const refreshAuthToken = createAsyncThunk(
//   'auth/refreshAuthToken',
//   async (_, { rejectWithValue }) => {
//     try {
//       const refreshToken = localStorage.getItem('refreshToken')
//       if (!refreshToken) {
//         throw new Error('No refresh token available')
//       }
      
//       const response = await authAPI.refreshToken(refreshToken)
      
//       // Update stored tokens
//       setToken(response.token)
//       if (response.refreshToken) {
//         setRefreshToken(response.refreshToken)
//       }
      
//       return response
//     } catch (error) {
//       removeToken()
//       return rejectWithValue(error.response?.data?.message || error.message)
//     }
//   }
// )

// export const logout = createAsyncThunk(
//   'auth/logout',
//   async () => {
//     try {
//       // In production, uncomment this:
//       // await authAPI.logout()
      
//       // For testing, just simulate delay
//       await new Promise(resolve => setTimeout(resolve, 500))
//     } catch (error) {
//       // Even if API call fails, clear local storage
//       console.error('Logout API error:', error)
//     } finally {
//       removeToken()
//     }
//     return {}
//   }
// )

// // Initial State
// const initialState = {
//   isLoading: false,
//   isAuthenticated: false,
//   isInitialized: false,
//   user: null,
//   token: null,
//   loginMethod: 'phone', // 'phone' | 'sso' | 'email'
//   showOtpInput: false,
//   phoneNumber: '',
//   error: null,
//   otpSent: false,
//   lastLoginMethod: null,
//   tokenExpiry: null
// }

// // Auth Slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setLoginMethod: (state, action) => {
//       state.loginMethod = action.payload
//       state.showOtpInput = false
//       state.error = null
//     },
    
//     clearError: (state) => {
//       state.error = null
//     },
    
//     resetAuthState: (state) => {
//       return { 
//         ...initialState, 
//         isInitialized: true,
//         loginMethod: state.loginMethod 
//       }
//     },
    
//     setPhoneNumber: (state, action) => {
//       state.phoneNumber = action.payload
//     },
    
//     setShowOtpInput: (state, action) => {
//       state.showOtpInput = action.payload
//     },
    
//     updateUserProfile: (state, action) => {
//       if (state.user) {
//         state.user = { ...state.user, ...action.payload }
//         setStoredUser(state.user)
//       }
//     }
//   },
  
//   extraReducers: (builder) => {
//     builder
//       // Send OTP
//       .addCase(sendOTP.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(sendOTP.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.showOtpInput = true
//         state.phoneNumber = action.payload.phoneNumber
//         state.otpSent = true
//         state.error = null
//         // toast.success('OTP sent successfully! Use 123456 for testing')
//       })
//       .addCase(sendOTP.rejected, (state, action) => {
//         state.isLoading = false
//         state.error = action.payload
//         state.showOtpInput = false
//         // toast.error(action.payload || 'Failed to send OTP')
//       })
      
//       // Verify OTP
//       .addCase(verifyOTP.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(verifyOTP.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.isAuthenticated = true
//         state.user = action.payload.user
//         state.token = action.payload.token
//         state.error = null
//         state.lastLoginMethod = 'phone'
//         state.tokenExpiry = action.payload.expiresAt
//         // toast.success('Login successful!')
//       })
//       .addCase(verifyOTP.rejected, (state, action) => {
//         state.isLoading = false
//         state.error = action.payload
//         // toast.error(action.payload || 'Invalid OTP')
//       })
      
//       // SSO Login
//       .addCase(loginWithSSO.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(loginWithSSO.fulfilled, (state, action) => {
//         state.isLoading = false
//         if (!action.payload.redirected) {
//           state.isAuthenticated = true
//           state.user = action.payload.user
//           state.token = action.payload.token
//           state.lastLoginMethod = 'sso'
//           state.tokenExpiry = action.payload.expiresAt
//           // toast.success('Login successful!')
//         }
//       })
//       .addCase(loginWithSSO.rejected, (state, action) => {
//         state.isLoading = false
//         state.error = action.payload
//         // toast.error(action.payload || 'SSO login failed')
//       })
      
//       // SSO Callback
//       .addCase(handleSSOCallback.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(handleSSOCallback.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.isAuthenticated = true
//         state.user = action.payload.user
//         state.token = action.payload.token
//         state.lastLoginMethod = 'sso'
//         state.tokenExpiry = action.payload.expiresAt
//         // toast.success('Login successful!')
//       })
//       .addCase(handleSSOCallback.rejected, (state, action) => {
//         state.isLoading = false
//         state.error = action.payload
//         // toast.error(action.payload || 'SSO callback failed')
//       })
      
//       // Check Auth Status
//       .addCase(checkAuthStatus.pending, () => {
//         // Don't set loading for silent auth check
//       })
//       .addCase(checkAuthStatus.fulfilled, (state, action) => {
//         state.isInitialized = true
//         state.isAuthenticated = action.payload.isAuthenticated
//         if (action.payload.isAuthenticated) {
//           state.user = action.payload.user
//           state.token = action.payload.token
//         }
//       })
//       .addCase(checkAuthStatus.rejected, (state) => {
//         state.isInitialized = true
//         state.isAuthenticated = false
//         state.user = null
//         state.token = null
//       })
      
//       // Refresh Token
//       .addCase(refreshAuthToken.pending, () => {
//         // Don't set loading for silent token refresh
//       })
//       .addCase(refreshAuthToken.fulfilled, (state, action) => {
//         state.token = action.payload.token
//         state.tokenExpiry = action.payload.expiresAt
//       })
//       .addCase(refreshAuthToken.rejected, (state) => {
//         state.isAuthenticated = false
//         state.user = null
//         state.token = null
//         state.tokenExpiry = null
//       })
      
//       // Logout
//       .addCase(logout.pending, (state) => {
//         state.isLoading = true
//       })
//       .addCase(logout.fulfilled, () => {
//         return { 
//           ...initialState, 
//           isInitialized: true 
//         }
//       })
//       .addCase(logout.rejected, () => {
//         // Clear state even if logout API fails
//         return { 
//           ...initialState, 
//           isInitialized: true 
//         }
//       })
//   }
// })

// // Export actions
// export const { 
//   setLoginMethod, 
//   clearError, 
//   resetAuthState, 
//   setPhoneNumber, 
//   setShowOtpInput,
//   updateUserProfile 
// } = authSlice.actions

// // Selectors
// export const selectAuth = (state) => state.auth || initialState
// export const selectIsAuthenticated = (state) => state.auth?.isAuthenticated || false
// export const selectUser = (state) => state.auth?.user || null
// export const selectIsLoading = (state) => state.auth?.isLoading || false
// export const selectError = (state) => state.auth?.error || null
// export const selectLoginMethod = (state) => state.auth?.loginMethod || 'phone'
// export const selectShowOtpInput = (state) => state.auth?.showOtpInput || false
// export const selectPhoneNumber = (state) => state.auth?.phoneNumber || ''
// export const selectIsInitialized = (state) => state.auth?.isInitialized || false

// // Default export
// const authReducer = authSlice.reducer
// export default authReducer



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
      
      return response
    } catch (error) {
      return rejectWithValue(error.detail || error.message || 'Invalid OTP')
    }
  }
)

export const completeRegistration = createAsyncThunk(
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

export const loginWithSSO = createAsyncThunk(
  'auth/loginWithSSO',
  async (provider, { rejectWithValue }) => {
    try {
      let response
      switch (provider.toLowerCase()) {
        case 'google':
          response = await authAPI.initiateGoogleSSO()
          break
        case 'microsoft':
          response = await authAPI.initiateMicrosoftSSO()
          break
        case 'apple':
          response = await authAPI.initiateAppleSSO()
          break
        case 'github':
          response = await authAPI.initiateGitHubSSO()
          break
        case 'linkedin':
          response = await authAPI.initiateLinkedInSSO()
          break
        default:
          throw new Error('Unsupported SSO provider')
      }
      
      if (response.redirectUrl) {
        window.location.href = response.redirectUrl
        return { redirected: true }
      }
      
      // Direct login success
      setToken(response.token)
      if (response.refreshToken) {
        setRefreshToken(response.refreshToken)
      }
      setStoredUser(response.user)
      
      return response
    } catch (error) {
      return rejectWithValue(error.message || 'SSO not available yet')
    }
  }
)

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
      
      // SSO Login
      .addCase(loginWithSSO.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginWithSSO.fulfilled, (state, action) => {
        state.isLoading = false
        if (!action.payload.redirected) {
          state.isAuthenticated = true
          state.user = action.payload.user
          state.token = action.payload.token
          state.lastLoginMethod = 'sso'
          state.tokenExpiry = action.payload.expiresAt
        }
      })
      .addCase(loginWithSSO.rejected, (state, action) => {
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