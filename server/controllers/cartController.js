const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    // Validate inputs
    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: 'productId and quantity must be provided.' });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ message: 'quantity must be a positive integer.' });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid productId format.' });
    }

    // Check if the product exists in the database
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Find the cart belonging to the logged-in user
    let cart = await Cart.findOne({ user: userId });
    let statusCode = 200; // Default to 200 OK (Updated)

    if (!cart) {
      // If the user does not have a cart, create a new one
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }]
      });
      statusCode = 201; // 201 Created
    } else {
      // If the user already has a cart, check if the item exists
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // Item exists, increase its quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Item does not exist, add it as a new cart item
        cart.items.push({ product: productId, quantity });
      }
    }

    // Save changes to the database
    await cart.save();

    // Return the appropriate status code and the updated cart
    return res.status(statusCode).json(cart);

  } catch (error) {
    console.error('Error in addToCart:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find the cart and populate the product details
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    // If the user doesn't have a cart, return an empty cart object
    if (!cart) {
      return res.status(200).json({
        cart: {
          items: []
        }
      });
    }

    // Return the populated cart
    return res.status(200).json({ cart });

  } catch (error) {
    console.error('Error in getCart:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.userId;

    // Validate inputs
    if (quantity === undefined) {
      return res.status(400).json({ message: 'quantity must be provided.' });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ message: 'quantity must be a positive integer.' });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid productId format.' });
    }

    // Find the cart belonging to the logged-in user
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    // Find the cart item whose product matches productId
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }

    // Update the quantity
    cart.items[itemIndex].quantity = quantity;

    // Save changes to the database
    await cart.save();

    // Return the updated cart
    return res.status(200).json(cart);

  } catch (error) {
    console.error('Error in updateCartItemQuantity:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItemQuantity
};
