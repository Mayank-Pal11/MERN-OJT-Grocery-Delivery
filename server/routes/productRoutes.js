const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const router = express.Router();

// Create a new product
router.post('/', protect, admin, createProduct);

// Get all products
router.get('/', getProducts);

module.exports = router;
