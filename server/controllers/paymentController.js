const Cart = require('../models/Cart');
const razorpayInstance = require('../config/razorpay');

const createRazorpayOrder = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find the user's cart and populate product information
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    if (cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty.' });
    }

    let totalAmount = 0;

    // Loop through the cart to validate stock and calculate the final amount
    for (const item of cart.items) {
      const productData = item.product;

      // Handle missing/deleted product references safely
      if (!productData) {
        return res.status(400).json({
          message: 'One or more products in your cart no longer exist. Please update your cart and try again.'
        });
      }

      const quantity = item.quantity;

      // Strictly validate stock before allowing the payment order to be generated
      if (quantity > productData.stock) {
        return res.status(400).json({
          message: `Insufficient stock for ${productData.name}. Available stock: ${productData.stock}.`
        });
      }

      const price = productData.price;
      totalAmount += price * quantity;
    }

    // Razorpay requires the amount in the smallest currency unit (paise for INR)
    // Math.round is used to avoid floating point precision errors
    const amountInPaise = Math.round(totalAmount * 100);

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${userId}_${Date.now()}`
    };

    // Create the order using the Razorpay SDK
    const razorpayOrder = await razorpayInstance.orders.create(options);

    // Return the specific details needed by the frontend checkout flow
    // Do NOT reduce stock or delete cart yet; wait for payment verification!
    return res.status(201).json({
      message: 'Razorpay order created successfully.',
      razorpayOrder: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
      cartTotal: totalAmount
    });

  } catch (error) {
    console.error('Error in createRazorpayOrder:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = {
  createRazorpayOrder
};
