// src/services/api/cartAPI.js
import api from './authAPI' // Use the same axios instance with auth

export const cartAPI = {
  // Add product to cart
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await api.post('/cart/add', {
        product_id: productId,
        quantity: quantity
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  

  // Get cart
  getCart: async () => {
    try {
      const response = await api.get('/cart')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Update cart item quantity
  updateCartItem: async (productId, quantity) => {
    try {
      const response = await api.put(`/cart/item/${productId}`, {
        quantity: quantity
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Remove from cart
  removeFromCart: async (productId) => {
    try {
      const response = await api.delete(`/cart/item/${productId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      const response = await api.delete('/cart/clear')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get cart count (for navbar)
  getCartCount: async () => {
    try {
      const response = await api.get('/cart/count')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
}




export const getCustomerId = () => {
  const customerId = sessionStorage.getItem('customer_id');
  return customerId ? parseInt(customerId) : null;
};

// Get auth token if you're using authentication
export const getAuthToken = () => {
  return sessionStorage.getItem('auth_token') || localStorage.getItem('auth_token');
};

// Create headers with auth if available
export const createHeaders = (includeAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};
