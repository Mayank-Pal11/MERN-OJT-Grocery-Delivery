import api from './axios';

export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const addToCart = async (productId, quantity) => {
  const response = await api.post('/cart', {
    productId,
    quantity
  });
  window.dispatchEvent(new Event('cartUpdated'));
  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await api.put(`/cart/${productId}`, {
    quantity
  });
  window.dispatchEvent(new Event('cartUpdated'));
  return response.data;
};

export const removeCartItem = async (productId) => {
  const response = await api.delete(`/cart/${productId}`);
  window.dispatchEvent(new Event('cartUpdated'));
  return response.data;
};
