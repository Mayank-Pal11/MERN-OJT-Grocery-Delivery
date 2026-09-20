const crypto = require('crypto');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const verifyRazorpayPayment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, deliveryAddress } = req.body;

    // Validate that all required fields are provided
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !deliveryAddress) {
      return res.status(400).json({
        message: 'Missing required payment or delivery details.'
      });
    }

    // Verify the Razorpay signature using HMAC SHA256
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    // Use timingSafeEqual to prevent timing attacks
    const expectedSignature = Buffer.from(generatedSignature, 'hex');
    const receivedSignature = Buffer.from(razorpay_signature, 'hex');

    if (
      expectedSignature.length !== receivedSignature.length ||
      !crypto.timingSafeEqual(expectedSignature, receivedSignature)
    ) {
      return res.status(400).json({ message: 'Payment verification failed.' });
    }

    // Check for an existing processed order to prevent duplicate orders for the same payment
    const existingOrder = await Order.findOne({
      razorpayOrderId: razorpay_order_id,
      user: userId
    });

    if (existingOrder && existingOrder.paymentStatus === 'paid') {
      return res.status(200).json({
        message: 'Payment already verified.',
        order: existingOrder
      });
    }

    // Validate the deliveryAddress
    const { fullName, phone, addressLine, city, state, pincode } = deliveryAddress;
    if (!fullName || !phone || !addressLine || !city || !state || !pincode) {
      return res.status(400).json({
        message: 'All delivery address fields are required: fullName, phone, addressLine, city, state, pincode.'
      });
    }

    // Find the logged-in user's cart
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

      // Strictly validate stock before generating the final order
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

    // Create the new Order with Razorpay details
    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      status: 'pending',
      paymentStatus: 'paid',
      paymentMethod: 'razorpay',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature
    });

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
      message: 'Payment verified and order created successfully.',
      order: savedOrder
    });

  } catch (error) {
    console.error('Error in verifyRazorpayPayment:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = {
  verifyRazorpayPayment
};
