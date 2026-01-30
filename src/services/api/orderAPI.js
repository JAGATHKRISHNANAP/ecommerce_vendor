import api from './baseAPI';

const orderAPI = {
  getOrders: async (status = '') => {
    try {
      const url = status ? `/vendor/orders?status=${status}` : '/vendor/orders';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  updateOrderStatus: async (orderId, statusData) => {
    try {
      // statusData should be { status: "shipped", tracking_number: "xyz" }
      const response = await api.put(`/vendor/orders/${orderId}/status`, statusData);
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
};

export default orderAPI;
