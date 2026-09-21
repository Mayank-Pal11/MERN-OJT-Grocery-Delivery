import api from './axios';

export const createRazorpayOrder = async () => {
  const response = await api.post('/payments/create-order');
  return response.data;
};

export const verifyRazorpayPayment = async (paymentData) => {
  const response = await api.post('/payments/verify', paymentData);
  return response.data;
};
