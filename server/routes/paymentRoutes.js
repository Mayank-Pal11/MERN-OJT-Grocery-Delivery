const express = require('express');
const { createRazorpayOrder } = require('../controllers/paymentController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Create Razorpay payment order (Protected)
router.post('/create-order', protect, createRazorpayOrder);

module.exports = router;
