const express = require('express');
const { addToCart, getCart } = require('../controllers/cartController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Get the user's cart (Protected)
router.get('/', protect, getCart);

// Add a product to the cart (Protected)
router.post('/', protect, addToCart);

module.exports = router;
