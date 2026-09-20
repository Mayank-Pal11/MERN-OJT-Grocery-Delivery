const Order = require('../models/Order');
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { deliveryAddress } = req.body;

    // Validate that the deliveryAddress object exists
    if (!deliveryAddress) {
      return res.status(400).json({ message: 'Delivery address is required.' });
    }

    // Validate that all required delivery address fields exist
    const { fullName, phone, addressLine, city, state, pincode } = deliveryAddress;
    if (!fullName || !phone || !addressLine || !city || !state || !pincode) {
      return res.status(400).json({
        message: 'All delivery address fields are required: fullName, phone, addressLine, city, state, pincode.'
      });
    }

    // Find the user's cart and populate product information
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    if (cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty.' });
    }

    let totalAmount = 0;
    const orderItems = [];

    // Construct order items and calculate total amount strictly from DB prices
    for (const item of cart.items) {
      const productData = item.product;

      // Handle missing/deleted product references safely
      if (!productData) {
        return res.status(400).json({
          message: 'One or more products in your cart no longer exist. Please update your cart and try again.'
        });
      }

      const price = productData.price;
      const quantity = item.quantity;
      const name = productData.name;

      totalAmount += price * quantity;

      orderItems.push({
        product: productData._id,
        name,
        price,
        quantity
      });
    }

    // Create the new Order
    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      status: 'pending' // Utilizing the schema default explicitly
    });

    // Save the order to MongoDB
    const savedOrder = await newOrder.save();

    // Empty the user's cart array and save it (DO NOT delete the cart doc)
    cart.items = [];
    await cart.save();

    return res.status(201).json({
      message: 'Order created successfully.',
      order: savedOrder
    });

  } catch (error) {
    console.error('Error in createOrder:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = {
  createOrder
};
