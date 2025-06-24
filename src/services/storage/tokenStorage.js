// // Token storage keys
// const TOKEN_KEY = 'authToken'
// const REFRESH_TOKEN_KEY = 'refreshToken'
// const USER_KEY = 'userData'

// // Get authentication token
// export const getToken = () => {
//   try {
//     return localStorage.getItem(TOKEN_KEY)
//   } catch (error) {
//     console.error('Error getting token:', error)
//     return null
//   }
// }

// // Set authentication token
// export const setToken = (token) => {
//   try {
//     if (token) {
//       localStorage.setItem(TOKEN_KEY, token)
//     } else {
//       localStorage.removeItem(TOKEN_KEY)
//     }
//   } catch (error) {
//     console.error('Error setting token:', error)
//   }
// }

// // Get refresh token
// export const getRefreshToken = () => {
//   try {
//     return localStorage.getItem(REFRESH_TOKEN_KEY)
//   } catch (error) {
//     console.error('Error getting refresh token:', error)
//     return null
//   }
// }

// // Set refresh token
// export const setRefreshToken = (refreshToken) => {
//   try {
//     if (refreshToken) {
//       localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
//     } else {
//       localStorage.removeItem(REFRESH_TOKEN_KEY)
//     }
//   } catch (error) {
//     console.error('Error setting refresh token:', error)
//   }
// }

// // Get stored user data
// export const getStoredUser = () => {
//   try {
//     const userData = localStorage.getItem(USER_KEY)
//     return userData ? JSON.parse(userData) : null
//   } catch (error) {
//     console.error('Error getting stored user:', error)
//     return null
//   }
// }

// // Set stored user data
// export const setStoredUser = (user) => {
//   try {
//     if (user) {
//       localStorage.setItem(USER_KEY, JSON.stringify(user))
//     } else {
//       localStorage.removeItem(USER_KEY)
//     }
//   } catch (error) {
//     console.error('Error setting stored user:', error)
//   }
// }

// // Remove all tokens and user data
// export const removeToken = () => {
//   try {
//     localStorage.removeItem(TOKEN_KEY)
//     localStorage.removeItem(REFRESH_TOKEN_KEY)
//     localStorage.removeItem(USER_KEY)
//   } catch (error) {
//     console.error('Error removing tokens:', error)
//   }
// }

// // Check if user is authenticated
// export const isAuthenticated = () => {
//   const token = getToken()
//   const user = getStoredUser()
//   return !!(token && user)
// }

// // Clear all auth data
// export const clearAuthData = () => {
//   try {
//     localStorage.removeItem(TOKEN_KEY)
//     localStorage.removeItem(REFRESH_TOKEN_KEY)
//     localStorage.removeItem(USER_KEY)
//   } catch (error) {
//     console.error('Error clearing auth data:', error)
//   }
// }



// src/services/storage/tokenStorage.js

const TOKEN_KEY = 'token'
const REFRESH_TOKEN_KEY = 'refreshToken'
const USER_KEY = 'user'

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
  }
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export const setRefreshToken = (refreshToken) => {
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  }
}

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const setStoredUser = (user) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }
}

export const getStoredUser = () => {
  const userStr = localStorage.getItem(USER_KEY)
  if (userStr) {
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }
  return null
}

export const clearStorage = () => {
  removeToken()
}