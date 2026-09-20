const mongoose = require('mongoose');
const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;

    // Validate that all required fields are provided
    if (
      !name ||
      !description ||
      price === undefined ||
      !image ||
      !category ||
      stock === undefined
    ) {
      return res.status(400).json({
        message: 'Please provide all required fields: name, description, price, image, category, and stock.'
      });
    }

    // Create the product using the Product model
    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      stock
    });

    // Return HTTP 201 with success message and created product
    res.status(201).json({
      message: 'Product created successfully.',
      product
    });
  } catch (error) {
    console.error('Error in createProduct:', error.message);
    res.status(500).json({
      message: 'Server error. Please try again later.'
    });
  }
};

const getProducts = async (req, res) => {
  try {
    // Fetch all products, sorting by createdAt descending (newest first)
    const products = await Product.find({}).sort({ createdAt: -1 });

    // Return HTTP 200 with array of products
    res.status(200).json({
      products
    });
  } catch (error) {
    console.error('Error in getProducts:', error.message);
    res.status(500).json({
      message: 'Server error. Please try again later.'
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID format.' });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error in getProductById:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID format.' });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const { name, description, price, image, category, stock } = req.body;

    // Update only the provided fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price !== undefined) product.price = price;
    if (image) product.image = image;
    if (category) product.category = category;
    if (stock !== undefined) product.stock = stock;

    const updatedProduct = await product.save();

    res.status(200).json({
      message: 'Product updated successfully.',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error in updateProduct:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID format.' });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    await product.deleteOne();

    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Error in deleteProduct:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
