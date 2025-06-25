// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { authAPI } from '../../services/api/authAPI'
// // import toast from 'react-hot-toast'

// // Async Thunks
// export const updateUserProfile = createAsyncThunk(
//   'user/updateProfile',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await authAPI.updateUserProfile(userData)
//       return response
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message)
//     }
//   }
// )

// export const changePassword = createAsyncThunk(
//   'user/changePassword',
//   async ({ currentPassword, newPassword }, { rejectWithValue }) => {
//     try {
//       const response = await authAPI.changePassword(currentPassword, newPassword)
//       return response
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message)
//     }
//   }
// )

// export const deleteAccount = createAsyncThunk(
//   'user/deleteAccount',
//   async (password, { rejectWithValue }) => {
//     try {
//       const response = await authAPI.deleteAccount(password)
//       return response
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message)
//     }
//   }
// )

// export const getActiveSessions = createAsyncThunk(
//   'user/getActiveSessions',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await authAPI.getActiveSessions()
//       return response
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message)
//     }
//   }
// )

// export const revokeSession = createAsyncThunk(
//   'user/revokeSession',
//   async (sessionId, { rejectWithValue }) => {
//     try {
//       const response = await authAPI.revokeSession(sessionId)
//       return { sessionId, ...response }
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message)
//     }
//   }
// )

// // Initial State
// const initialState = {
//   profile: null,
//   preferences: {
//     theme: 'light', // 'light' | 'dark' | 'system'
//     language: 'en',
//     notifications: {
//       email: true,
//       sms: true,
//       push: true,
//       marketing: false
//     },
//     privacy: {
//       profileVisibility: 'public', // 'public' | 'private' | 'friends'
//       showOnlineStatus: true,
//       allowDataCollection: false
//     }
//   },
//   settings: {
//     twoFactorEnabled: false,
//     emailVerified: false,
//     phoneVerified: false,
//     lastLoginAt: null,
//     timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
//   },
//   sessions: [],
//   isLoading: false,
//   error: null,
//   lastUpdated: null
// }

// // User Slice
// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     updatePreferences: (state, action) => {
//       state.preferences = { ...state.preferences, ...action.payload }
//       state.lastUpdated = new Date().toISOString()
//     },
    
//     updateSettings: (state, action) => {
//       state.settings = { ...state.settings, ...action.payload }
//       state.lastUpdated = new Date().toISOString()
//     },
    
//     updateNotificationSettings: (state, action) => {
//       state.preferences.notifications = { 
//         ...state.preferences.notifications, 
//         ...action.payload 
//       }
//       state.lastUpdated = new Date().toISOString()
//     },
    
//     updatePrivacySettings: (state, action) => {
//       state.preferences.privacy = { 
//         ...state.preferences.privacy, 
//         ...action.payload 
//       }
//       state.lastUpdated = new Date().toISOString()
//     },
    
//     setTheme: (state, action) => {
//       state.preferences.theme = action.payload
//       state.lastUpdated = new Date().toISOString()
//     },
    
//     setLanguage: (state, action) => {
//       state.preferences.language = action.payload
//       state.lastUpdated = new Date().toISOString()
//     },
    
//     clearUserData: (state) => {
//       return {
//         ...initialState,
//         preferences: {
//           ...initialState.preferences,
//           theme: state.preferences.theme, // Keep theme preference
//           language: state.preferences.language // Keep language preference
//         }
//       }
//     },
    
//     clearError: (state) => {
//       state.error = null
//     },
    
//     setLastLoginAt: (state, action) => {
//       state.settings.lastLoginAt = action.payload
//     }
//   },
  
//   extraReducers: (builder) => {
//     builder
//       // Update Profile
//       .addCase(updateUserProfile.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.profile = { ...state.profile, ...action.payload.user }
//         state.lastUpdated = new Date().toISOString()
//         // toast.success('Profile updated successfully!')
//       })
//       .addCase(updateUserProfile.rejected, (state, action) => {
//         state.isLoading = false
//         state.error = action.payload
//         // toast.error(action.payload || 'Failed to update profile')
//       })
      
//       // Change Password
//       .addCase(changePassword.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(changePassword.fulfilled, (state) => {
//         state.isLoading = false
//         // toast.success('Password changed successfully!')
//       })
//       .addCase(changePassword.rejected, (state, action) => {
//         state.isLoading = false
//         state.error = action.payload
//         // toast.error(action.payload || 'Failed to change password')
//       })
      
//       // Delete Account
//       .addCase(deleteAccount.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(deleteAccount.fulfilled, (state) => {
//         state.isLoading = false
//         // toast.success('Account deleted successfully')
//         // Clear all user data
//         return initialState
//       })
//       .addCase(deleteAccount.rejected, (state, action) => {
//         state.isLoading = false
//         state.error = action.payload
//         // toast.error(action.payload || 'Failed to delete account')
//       })
      
//       // Get Active Sessions
//       .addCase(getActiveSessions.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(getActiveSessions.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.sessions = action.payload.sessions || []
//       })
//       .addCase(getActiveSessions.rejected, (state, action) => {
//         state.isLoading = false
//         state.error = action.payload
//       })
      
//       // Revoke Session
//       .addCase(revokeSession.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(revokeSession.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.sessions = state.sessions.filter(
//           session => session.id !== action.payload.sessionId
//         )
//         // toast.success('Session revoked successfully')
//       })
//       .addCase(revokeSession.rejected, (state, action) => {
//         state.isLoading = false
//         state.error = action.payload
//         // toast.error(action.payload || 'Failed to revoke session')
//       })
//   }
// })

// // Export actions
// export const {
//   updatePreferences,
//   updateSettings,
//   updateNotificationSettings,
//   updatePrivacySettings,
//   setTheme,
//   setLanguage,
//   clearUserData,
//   clearError,
//   setLastLoginAt
// } = userSlice.actions

// // Selectors
// export const selectUser = (state) => state.user
// export const selectUserProfile = (state) => state.user.profile
// export const selectUserPreferences = (state) => state.user.preferences
// export const selectUserSettings = (state) => state.user.settings
// export const selectUserSessions = (state) => state.user.sessions
// export const selectUserTheme = (state) => state.user.preferences.theme
// export const selectUserLanguage = (state) => state.user.preferences.language
// export const selectUserIsLoading = (state) => state.user.isLoading
// export const selectUserError = (state) => state.user.error

// export default userSlice.reducer












// src/redux/slices/cartSlice.js - Fixed version
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { cartAPI } from '../../services/api/cartAPI'

// Async Thunks
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartAPI.addToCart(productId, quantity)
      return response
    } catch (error) {
      return rejectWithValue(error.detail || error.message || 'Failed to add to cart')
    }
  }
)

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartAPI.getCart()
      return response
    } catch (error) {
      return rejectWithValue(error.detail || error.message || 'Failed to fetch cart')
    }
  }
)

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartAPI.updateCartItem(productId, quantity)
      return response
    } catch (error) {
      return rejectWithValue(error.detail || error.message || 'Failed to update cart item')
    }
  }
)

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await cartAPI.removeFromCart(productId)
      return { ...response, productId }
    } catch (error) {
      return rejectWithValue(error.detail || error.message || 'Failed to remove from cart')
    }
  }
)

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartAPI.clearCart()
      return response
    } catch (error) {
      return rejectWithValue(error.detail || error.message || 'Failed to clear cart')
    }
  }
)

export const fetchCartCount = createAsyncThunk(
  'cart/fetchCartCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartAPI.getCartCount()
      return response
    } catch (error) {
      return rejectWithValue(error.detail || error.message || 'Failed to fetch cart count')
    }
  }
)

// Initial State
const initialState = {
  cart: null,
  items: [],
  totalItems: 0,
  totalQuantity: 0,
  totalAmount: 0,
  isLoading: false,
  isUpdating: false,
  error: null,
  lastAddedItem: null
}

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearLastAddedItem: (state) => {
      state.lastAddedItem = null
    },
    resetCart: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.isUpdating = true
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isUpdating = false
        state.lastAddedItem = action.payload.cart_item
        
        // Update cart summary
        if (action.payload.cart_summary) {
          state.totalItems = action.payload.cart_summary.total_items
          state.totalQuantity = action.payload.cart_summary.total_quantity
          state.totalAmount = action.payload.cart_summary.total_amount
        }
        
        // Update or add item in local state
        const existingItemIndex = state.items.findIndex(
          item => item.product.product_id === action.payload.cart_item.product.product_id
        )
        
        if (existingItemIndex >= 0) {
          state.items[existingItemIndex] = action.payload.cart_item
        } else {
          state.items.push(action.payload.cart_item)
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isUpdating = false
        state.error = action.payload
      })
      
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.cart = action.payload
        state.items = action.payload.items || []
        state.totalItems = action.payload.total_items || 0
        state.totalQuantity = action.payload.total_quantity || 0
        state.totalAmount = action.payload.total_amount || 0
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.isUpdating = true
        state.error = null
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isUpdating = false
        
        // Find the updated item - check response structure
        const updatedItem = action.payload.cart_item || action.payload;
        
        // Update item in local state
        const itemIndex = state.items.findIndex(
          item => item.product.product_id === updatedItem.product.product_id
        )
        
        if (itemIndex >= 0) {
          state.items[itemIndex] = updatedItem
          
          // Recalculate totals based on current items
          state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0)
          state.totalAmount = state.items.reduce(
            (sum, item) => sum + (item.quantity * parseFloat(item.product.price)), 
            0
          )
          state.totalItems = state.items.length
        }
        
        // Use response totals if available
        if (action.payload.cart_summary) {
          state.totalItems = action.payload.cart_summary.total_items
          state.totalQuantity = action.payload.cart_summary.total_quantity
          state.totalAmount = action.payload.cart_summary.total_amount
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isUpdating = false
        state.error = action.payload
      })
      
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.isUpdating = true
        state.error = null
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isUpdating = false
        
        // Remove item from local state
        state.items = state.items.filter(
          item => item.product.product_id !== action.payload.productId
        )
        
        // Update totals from response or recalculate
        if (action.payload.cart_summary) {
          state.totalItems = action.payload.cart_summary.total_items
          state.totalQuantity = action.payload.cart_summary.total_quantity
          state.totalAmount = action.payload.cart_summary.total_amount
        } else {
          // Recalculate from remaining items
          state.totalItems = state.items.length
          state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0)
          state.totalAmount = state.items.reduce(
            (sum, item) => sum + (item.quantity * parseFloat(item.product.price)), 
            0
          )
        }
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isUpdating = false
        state.error = action.payload
      })
      
      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.isUpdating = true
        state.error = null
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.isUpdating = false
        state.items = []
        state.totalItems = 0
        state.totalQuantity = 0
        state.totalAmount = 0
        state.cart = null
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isUpdating = false
        state.error = action.payload
      })
      
      // Fetch Cart Count
      .addCase(fetchCartCount.fulfilled, (state, action) => {
        state.totalItems = action.payload.total_items || 0
        state.totalQuantity = action.payload.total_quantity || 0
        // Don't update totalAmount from count endpoint
      })
  }
})

// Export actions
export const { clearError, clearLastAddedItem, resetCart } = cartSlice.actions

// FIXED SELECTORS - These should match your store structure
export const selectCart = (state) => state.cart.cart
export const selectCartItems = (state) => state.cart.items || []
export const selectCartTotalItems = (state) => state.cart.totalItems || 0
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity || 0
export const selectCartTotalAmount = (state) => state.cart.totalAmount || 0
export const selectCartIsLoading = (state) => state.cart.isLoading || false
export const selectCartIsUpdating = (state) => state.cart.isUpdating || false
export const selectCartError = (state) => state.cart.error || null
export const selectLastAddedItem = (state) => state.cart.lastAddedItem || null

// Helper selector to check if product is in cart
export const selectIsProductInCart = (productId) => (state) => {
  return state.cart.items?.some(item => item.product.product_id === productId) || false
}

// Helper selector to get quantity of product in cart
export const selectProductQuantityInCart = (productId) => (state) => {
  const item = state.cart.items?.find(item => item.product.product_id === productId)
  return item?.quantity || 0
}

// Default export
const cartReducer = cartSlice.reducer
export default cartReducer