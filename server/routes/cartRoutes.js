const express = require('express');
const { addToCart, getCart, updateCartItemQuantity } = require('../controllers/cartController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Get the user's cart (Protected)
router.get('/', protect, getCart);

// Add a product to the cart (Protected)
router.post('/', protect, addToCart);

// Update a cart item's quantity (Protected)
router.put('/:productId', protect, updateCartItemQuantity);

module.exports = router;
