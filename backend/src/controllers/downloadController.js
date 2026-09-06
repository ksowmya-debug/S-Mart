import path from 'path';
import fs from 'fs';
import Order from '../models/orderModel.js';
import Download from '../models/downloadModel.js';
import Product from '../models/productModel.js';

// @desc    Secure PDF Download Route
// @route   GET /api/downloads/:orderId
// @access  Private (Paid users only)
export const downloadPdf = async (req, res) => {
  try {
    const { orderId } = req.params;

    // 1. JWT verification is handled by protect middleware (req.user is populated)
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // 2. Find Order for this user
    const cleanId = (orderId || '').replace(/^#/, '');
    let order = await Order.findOne({
      $or: [{ orderId }, { orderId: `#${cleanId}` }, { orderId: cleanId }],
    }).populate('productId');
    if (!order && orderId.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(orderId).populate('productId');
    }

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // 3. Check Product Ownership (User match or Admin override)
    if (
      order.userId.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        message: 'Access Denied: You do not own this order.',
      });
    }

    // 4. Check Payment Status (Both 'paid' and 'verified' unlock the PDF)
    if (order.status !== 'paid' && order.status !== 'verified') {
      return res.status(403).json({
        message: 'Access Denied: Payment has not been completed or verified.',
        orderStatus: order.status,
      });
    }

    // 5. Secure File Retrieval
    const filePath = path.resolve('src/storage/secure_notes/dsa_notes.pdf');

    if (!fs.existsSync(filePath)) {
      // Fallback check in case running from different cwd
      const altPath = path.resolve('backend/src/storage/secure_notes/dsa_notes.pdf');
      if (!fs.existsSync(altPath)) {
        return res.status(500).json({
          message: 'PDF file is temporarily unavailable on server. Please contact support.',
        });
      }
    }

    const finalPath = fs.existsSync(filePath)
      ? filePath
      : path.resolve('backend/src/storage/secure_notes/dsa_notes.pdf');

    // 6. Record successful download in MongoDB
    await Download.create({
      userId: req.user._id,
      productId: order.productId?._id || order.productId,
      orderId: order.orderId,
      ipAddress: req.ip || req.connection?.remoteAddress || '127.0.0.1',
      userAgent: req.headers['user-agent'] || 'Unknown',
    });

    // 7. Stream secure attachment
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="CodeID_SowmyaKCode_DSA_Notes.pdf"'
    );

    const fileStream = fs.createReadStream(finalPath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's download history
// @route   GET /api/downloads/my-history
// @access  Private
export const getMyDownloads = async (req, res) => {
  try {
    const downloads = await Download.find({ userId: req.user._id })
      .populate('productId', 'name')
      .sort({ downloadedAt: -1 });

    res.json(downloads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
