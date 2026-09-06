import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import Order from '../models/orderModel.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, async (req, res) => {
  try {
    const order = await Order.findOne({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('productId', 'name price features');
    if (order) {
      return res.json(order);
    }
    return res.status(404).json({ message: 'No active order found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/my-orders', protect, getMyOrders);
router.get('/:orderId', protect, getOrderById);

export default router;
