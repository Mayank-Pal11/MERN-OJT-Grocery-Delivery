const express = require('express');
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const router = express.Router();

// Create a new product
router.post('/', protect, admin, createProduct);

// Get all products
router.get('/', getProducts);

// Get a single product by ID
router.get('/:id', getProductById);

// Update a product
router.put('/:id', protect, admin, updateProduct);

// Delete a product
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
