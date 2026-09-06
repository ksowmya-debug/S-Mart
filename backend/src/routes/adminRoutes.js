import express from 'express';
import {
  getDashboardStats,
  getAnalyticsData,
  getUsers,
  getOrders,
  getPayments,
  verifyPaymentManually,
  verifyOrderManually,
  getDownloads,
  toggleUserStatus,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Apply auth + admin guard to all admin routes
router.use(protect, adminOnly);

router.get('/dashboard', getDashboardStats);
router.get('/analytics', getAnalyticsData);
router.get('/users', getUsers);
router.put('/users/:id/status', toggleUserStatus);
router.get('/orders', getOrders);
router.put('/orders/:id/verify', verifyOrderManually);
router.get('/payments', getPayments);
router.put('/payments/:id/verify', verifyPaymentManually);
router.get('/downloads', getDownloads);

export default router;
