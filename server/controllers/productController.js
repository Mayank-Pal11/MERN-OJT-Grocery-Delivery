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

module.exports = {
  createProduct,
  getProducts
};
