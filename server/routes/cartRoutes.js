const express = require('express');
const { addToCart, getCart, updateCartItemQuantity, removeCartItem } = require('../controllers/cartController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Get the user's cart (Protected)
router.get('/', protect, getCart);

// Add a product to the cart (Protected)
router.post('/', protect, addToCart);

// Update a cart item's quantity (Protected)
router.put('/:productId', protect, updateCartItemQuantity);

// Remove an item from the cart (Protected)
router.delete('/:productId', protect, removeCartItem);

module.exports = router;
