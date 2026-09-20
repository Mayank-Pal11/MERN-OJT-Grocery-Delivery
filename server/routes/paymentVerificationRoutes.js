const express = require('express');
const { verifyRazorpayPayment } = require('../controllers/paymentVerificationController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Verify Razorpay payment and finalise order (Protected)
router.post('/verify', protect, verifyRazorpayPayment);

module.exports = router;
