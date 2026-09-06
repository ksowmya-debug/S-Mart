import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// Helper to generate professional readable order ID like ORD123456
const generateOrderId = () => {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `ORD${randomDigits}`;
};

// @desc    Create a new order for DSA Notes
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { productId } = req.body;

    let product;
    if (productId) {
      product = await Product.findById(productId);
    }
    if (!product) {
      product = await Product.findOne({ active: true });
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already has an active paid or verified order
    const existingPaid = await Order.findOne({
      userId: req.user._id,
      productId: product._id,
      status: { $in: ['paid', 'verified'] },
    });

    if (existingPaid) {
      // Auto-clean any orphan pending checkout attempts
      await Order.deleteMany({
        userId: req.user._id,
        productId: product._id,
        status: 'pending',
      });

      return res.status(400).json({
        message: 'You have already purchased these notes!',
        order: existingPaid,
        alreadyOwned: true,
      });
    }

    // Reuse recent pending order if created within the last 30 minutes
    const recentPending = await Order.findOne({
      userId: req.user._id,
      productId: product._id,
      status: 'pending',
      createdAt: { $gte: new Date(Date.now() - 30 * 60 * 1000) },
    }).populate('productId', 'name price');

    if (recentPending) {
      return res.status(200).json(recentPending);
    }

    let orderId = generateOrderId();
    // Guarantee uniqueness
    while (await Order.findOne({ orderId })) {
      orderId = generateOrderId();
    }

    const order = await Order.create({
      orderId,
      userId: req.user._id,
      productId: product._id,
      amount: product.price || 39,
      status: 'pending',
    });

    const populatedOrder = await Order.findById(order._id).populate(
      'productId',
      'name price'
    );

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const paidOrders = await Order.find({
      userId: req.user._id,
      status: { $in: ['paid', 'verified'] },
    });
    if (paidOrders.length > 0) {
      const paidProductIds = paidOrders.map((o) => o.productId);
      await Order.deleteMany({
        userId: req.user._id,
        productId: { $in: paidProductIds },
        status: 'pending',
      });
    }

    const orders = await Order.find({ userId: req.user._id })
      .populate('productId', 'name price features')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by orderId
// @route   GET /api/orders/:orderId
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const cleanId = (orderId || '').replace(/^#/, '');

    // Search by formatted orderId (ORD... or #ORD...) or Mongo _id
    let order = await Order.findOne({
      $or: [{ orderId }, { orderId: `#${cleanId}` }, { orderId: cleanId }],
    })
      .populate('productId', 'name price features')
      .populate('userId', 'name email');

    if (!order && orderId.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(orderId)
        .populate('productId', 'name price features')
        .populate('userId', 'name email');
    }

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Security check: User must own the order OR be admin
    if (
      order.userId._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
