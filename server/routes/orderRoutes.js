const express = require('express');
const { createOrder } = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new order (Protected)
router.post('/', protect, createOrder);

module.exports = router;
