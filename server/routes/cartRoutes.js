const express = require('express');
const { addToCart } = require('../controllers/cartController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Add a product to the cart (Protected)
router.post('/', protect, addToCart);

module.exports = router;
