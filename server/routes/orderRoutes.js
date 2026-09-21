const express = require('express');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  getAdminOrders,
  updateOrderStatus,
  getAdminDashboardStats,
  getAdminOrderById
} = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const router = express.Router();

// Admin routes (must be before /:id)
router.get('/admin/dashboard-stats', protect, admin, getAdminDashboardStats);
router.get('/admin', protect, admin, getAdminOrders);
router.get('/admin/:id', protect, admin, getAdminOrderById);
router.patch('/admin/:id/status', protect, admin, updateOrderStatus);

// Create a new order (Protected)
router.post('/', protect, createOrder);

// Get all orders for logged-in user (Protected)
router.get('/', protect, getUserOrders);

// Get specific order by ID (Protected)
router.get('/:id', protect, getOrderById);

router.patch('/:id/cancel', protect, cancelOrder);

module.exports = router;
