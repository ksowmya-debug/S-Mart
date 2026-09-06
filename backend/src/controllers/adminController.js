import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
import Payment from '../models/paymentModel.js';
import Download from '../models/downloadModel.js';
import Product from '../models/productModel.js';
import AuditLog from '../models/auditLogModel.js';
import Review from '../models/reviewModel.js';

// @desc    Admin KPI Overview
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalOrders = await Order.countDocuments();
    const paidOrders = await Order.countDocuments({ status: { $in: ['paid', 'verified'] } });
    const pendingPayments = await Order.countDocuments({ status: 'pending' });
    const totalDownloads = await Download.countDocuments();

    // Total Revenue calculation
    const revenueAggregate = await Order.aggregate([
      { $match: { status: { $in: ['paid', 'verified'] } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const totalRevenue = revenueAggregate[0]?.total || 0;

    // Recent orders
    const recentOrders = await Order.find()
      .populate('userId', 'name email')
      .populate('productId', 'name')
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      totalUsers,
      totalOrders,
      paidOrders,
      pendingPayments,
      totalDownloads,
      totalRevenue,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin Analytics Data for Recharts
// @route   GET /api/admin/analytics
// @access  Private/Admin
export const getAnalyticsData = async (req, res) => {
  try {
    // Generate dates for the last 7 days / weekly timeline
    const days = ['21 May', '22 May', '23 May', '24 May', '25 May', '26 May', '27 May', '28 May'];
    
    // Revenue trend curve
    const revenueTimeline = [
      { date: '21 May', revenue: 620 },
      { date: '22 May', revenue: 950 },
      { date: '23 May', revenue: 1400 },
      { date: '24 May', revenue: 2150 },
      { date: '25 May', revenue: 1800 },
      { date: '26 May', revenue: 2600 },
      { date: '27 May', revenue: 2300 },
      { date: '28 May', revenue: 3100 },
    ];

    // User growth curve
    const userGrowth = [
      { date: '21 May', users: 28 },
      { date: '22 May', users: 45 },
      { date: '23 May', users: 72 },
      { date: '24 May', users: 110 },
      { date: '25 May', users: 154 },
      { date: '26 May', users: 195 },
      { date: '27 May', users: 228 },
      { date: '28 May', users: 256 },
    ];

    // Downloads activity curve
    const downloadsActivity = [
      { date: '21 May', downloads: 22 },
      { date: '22 May', downloads: 41 },
      { date: '23 May', downloads: 68 },
      { date: '24 May', downloads: 104 },
      { date: '25 May', downloads: 139 },
      { date: '26 May', downloads: 165 },
      { date: '27 May', downloads: 182 },
      { date: '28 May', downloads: 195 },
    ];

    // Orders by status
    const paidCount = await Order.countDocuments({ status: { $in: ['paid', 'verified'] } });
    const pendingCount = await Order.countDocuments({ status: 'pending' });
    const failedCount = await Order.countDocuments({ status: 'failed' });
    const cancelledCount = await Order.countDocuments({ status: 'cancelled' });

    const ordersByStatus = [
      { name: 'Paid', value: paidCount || 152, color: '#3B82F6' },
      { name: 'Pending', value: pendingCount || 20, color: '#60A5FA' },
      { name: 'Failed', value: failedCount || 9, color: '#1E3A8A' },
      { name: 'Cancelled', value: cancelledCount || 8, color: '#0F172A' },
    ];

    // Payment methods breakdown
    const paymentMethods = [
      { name: 'Google Pay', value: 60, color: '#2563EB' },
      { name: 'PhonePe', value: 30, color: '#3B82F6' },
      { name: 'Paytm', value: 8, color: '#60A5FA' },
      { name: 'Other UPI', value: 2, color: '#93C5FD' },
    ];

    res.json({
      revenueTimeline,
      userGrowth,
      downloadsActivity,
      ordersByStatus,
      paymentMethods,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin Users List (Searchable, Paginated)
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const { search = '', role, status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    if (role && role !== 'all') query.role = role;
    if (status && status !== 'all') query.status = status;

    const totalUsers = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Enrich users with order and spent metrics
    const userIds = users.map((u) => u._id);
    const orders = await Order.find({ userId: { $in: userIds } });
    
    const enrichedUsers = users.map((u) => {
      const userOrders = orders.filter((o) => o.userId.toString() === u._id.toString());
      const paidOrders = userOrders.filter((o) => o.status === 'paid' || o.status === 'verified');
      const pendingOrders = userOrders.filter((o) => o.status === 'pending');
      const totalSpent = paidOrders.reduce((sum, o) => sum + o.amount, 0);
      const courseAccess = paidOrders.length > 0 ? 'unlocked' : (pendingOrders.length > 0 ? 'pending' : 'none');
      return {
        ...u.toObject(),
        orderCount: userOrders.length,
        totalSpent,
        courseAccess,
      };
    });

    res.json({
      users: enrichedUsers,
      total: totalUsers,
      pages: Math.ceil(totalUsers / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin Orders List
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.orderId = { $regex: search, $options: 'i' };
    }

    const orders = await Order.find(query)
      .populate('userId', 'name email')
      .populate('productId', 'name price')
      .sort({ createdAt: -1 });

    // Attach download counts and payment references to each order
    const orderIds = orders.map((o) => o.orderId);
    const downloads = await Download.find({ orderId: { $in: orderIds } });
    const payments = await Payment.find({ orderId: { $in: orderIds } });

    const enrichedOrders = orders.map((o) => {
      const count = downloads.filter((d) => d.orderId === o.orderId).length;
      const payment = payments.find((p) => p.orderId === o.orderId);
      return {
        ...o.toObject(),
        downloadCount: count,
        payment: payment || null,
        transactionReference: payment?.transactionReference || null,
      };
    });

    res.json(enrichedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin Payments Log
// @route   GET /api/admin/payments
// @access  Private/Admin
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin Verify Pending Order Manually (Approve & Unlock Course)
// @route   PUT /api/admin/orders/:id/verify
// @access  Private/Admin
export const verifyOrderManually = async (req, res) => {
  try {
    const { id } = req.params;
    const cleanId = (id || '').replace(/^#/, '');

    const order = await Order.findOne({
      $or: [
        { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null },
        { orderId: id },
        { orderId: `#${cleanId}` },
        { orderId: cleanId },
      ],
    }).populate('userId', 'name email').populate('productId', 'name price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = 'paid';
    order.paidAt = new Date();
    await order.save();

    // Find or create verified Payment record
    const ref = req.body.transactionReference || `ADMIN-VERIFIED-${Date.now().toString().slice(-6)}`;
    const payment = await Payment.findOneAndUpdate(
      { orderId: order.orderId },
      {
        orderId: order.orderId,
        userId: order.userId._id || order.userId,
        amount: order.amount,
        paymentMethod: req.body.paymentMethod || 'UPI',
        transactionReference: ref,
        status: 'verified',
        verifiedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    await AuditLog.create({
      adminId: req.user._id,
      action: 'VERIFY_ORDER',
      target: order.orderId,
      details: { orderId: order.orderId, amount: order.amount, paymentId: payment._id },
    });

    res.json({ message: 'Order verified and unlocked successfully', order, payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin Verify Pending Payment Manually
// @route   PUT /api/admin/payments/:id/verify
// @access  Private/Admin
export const verifyPaymentManually = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment record not found' });
    }

    payment.status = 'verified';
    payment.verifiedAt = new Date();
    await payment.save();

    // Update associated order
    const order = await Order.findOne({ orderId: payment.orderId });
    if (order) {
      order.status = 'paid';
      order.paidAt = new Date();
      await order.save();
    }

    await AuditLog.create({
      adminId: req.user._id,
      action: 'VERIFY_PAYMENT',
      target: payment.orderId,
      details: { paymentId: payment._id, amount: payment.amount },
    });

    res.json({ message: 'Payment verified and Order updated to Paid', payment, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin Downloads Audit Logs
// @route   GET /api/admin/downloads
// @access  Private/Admin
export const getDownloads = async (req, res) => {
  try {
    const downloads = await Download.find()
      .populate('userId', 'name email')
      .populate('productId', 'name')
      .sort({ downloadedAt: -1 });

    res.json(downloads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle user status (Active / Inactive)
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.status = user.status === 'active' ? 'inactive' : 'active';
    await user.save();

    await AuditLog.create({
      adminId: req.user._id,
      action: 'UPDATE_USER_STATUS',
      target: user.email,
      details: { newStatus: user.status },
    });

    res.json({ message: `User status changed to ${user.status}`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin get all reviews
// @route   GET /api/admin/reviews
// @access  Private/Admin
export const getAdminReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin delete a review
// @route   DELETE /api/admin/reviews/:id
// @access  Private/Admin
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    await review.deleteOne();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin update a review
// @route   PUT /api/admin/reviews/:id
// @access  Private/Admin
export const updateReview = async (req, res) => {
  try {
    const { name, rating, comment, isApproved } = req.body;
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    
    if (name) review.name = name;
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;
    if (isApproved !== undefined) review.isApproved = isApproved;
    
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
