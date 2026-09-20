const express = require('express');
const { createOrder, getUserOrders, getOrderById } = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new order (Protected)
router.post('/', protect, createOrder);

// Get all orders for logged-in user (Protected)
router.get('/', protect, getUserOrders);

// Get specific order by ID (Protected)
router.get('/:id', protect, getOrderById);

module.exports = router;
