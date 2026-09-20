const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const router = express.Router();

// Create a new product
router.post('/', protect, admin, createProduct);

// Get all products
router.get('/', getProducts);

// Update a product
router.put('/:id', protect, admin, updateProduct);

// Delete a product
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
