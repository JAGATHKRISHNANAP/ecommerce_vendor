import axiosInstance from './axiosInstance';

export const api = {
  get: async (endpoint, params = {}) => {
    try {
      const response = await axiosInstance.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  post: async (endpoint, data, config = {}) => {
    try {
      const response = await axiosInstance.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  put: async (endpoint, data, config = {}) => {
    try {
      const response = await axiosInstance.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  delete: async (endpoint) => {
    try {
      const response = await axiosInstance.delete(endpoint);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
