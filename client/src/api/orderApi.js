import api from './axios';

export const getMyOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await api.patch(`/orders/${orderId}/cancel`);
  return response.data;
};

export const getAdminOrders = async () => {
  const response = await api.get('/orders/admin');
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.patch(`/orders/admin/${id}/status`, {
    status
  });
  return response.data;
};

export const getAdminDashboardStats = async () => {
  const response = await api.get('/orders/admin/dashboard-stats');
  return response.data;
};

export const getAdminOrderById = async (orderId) => {
  const response = await api.get(`/orders/admin/${orderId}`);
  return response.data;
};
