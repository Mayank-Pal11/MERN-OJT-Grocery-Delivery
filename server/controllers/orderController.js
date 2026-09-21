const mongoose = require('mongoose');
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

    // Construct order items, calculate total amount, and validate stock
    for (const item of cart.items) {
      const productData = item.product;

      // Handle missing/deleted product references safely
      if (!productData) {
        return res.status(400).json({
          message: 'One or more products in your cart no longer exist. Please update your cart and try again.'
        });
      }

      const quantity = item.quantity;

      // Validate stock before proceeding
      if (quantity > productData.stock) {
        return res.status(400).json({
          message: `Insufficient stock for ${productData.name}. Available stock: ${productData.stock}.`
        });
      }

      const price = productData.price;
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

    // Reduce product stock in MongoDB now that the order is safely created
    for (const item of cart.items) {
      const productData = item.product;
      productData.stock -= item.quantity;
      await productData.save();
    }

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

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find all orders for this user and sort newest first
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (error) {
    console.error('Error in getUserOrders:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order ID format.' });
    }

    // Find the specific order belonging to this user
    const order = await Order.findOne({
      _id: id,
      user: userId
    });

    // If order doesn't exist, or belongs to someone else
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    return res.status(200).json({ order });
  } catch (error) {
    console.error('Error in getOrderById:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid order ID format.'
      });
    }

    const order = await Order.findOne({
      _id: id,
      user: userId
    });

    if (!order) {
      return res.status(404).json({
        message: 'Order not found.'
      });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({
        message: 'Only pending orders can be cancelled.'
      });
    }

    order.status = 'cancelled';

    await order.save();

    return res.status(200).json({
      message: 'Order cancelled successfully.',
      order
    });
  } catch (error) {
    console.error('Error in cancelOrder:', error.message);
    return res.status(500).json({
      message: 'Server error. Please try again later.'
    });
  }
};

const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product')
      .sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (error) {
    console.error('Error in getAdminOrders:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order ID format.' });
    }

    const allowedStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      message: 'Order status updated successfully.',
      order
    });
  } catch (error) {
    console.error('Error in updateOrderStatus:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const getAdminDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });

    const revenueResult = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    return res.status(200).json({
      stats: {
        totalOrders,
        pendingOrders,
        totalRevenue: Math.round(totalRevenue * 100) / 100
      }
    });
  } catch (error) {
    console.error('Error in getAdminDashboardStats:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const getAdminOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order ID format.' });
    }

    const order = await Order.findById(id).populate('user', 'name email').populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    return res.status(200).json({ order });
  } catch (error) {
    console.error('Error in getAdminOrderById:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  getAdminOrders,
  updateOrderStatus,
  getAdminDashboardStats,
  getAdminOrderById
};
