import express from 'express';
import {
  getPaymentInfo,
  submitPayment,
  verifyPaymentMock,
  checkPaymentStatus,
  createRazorpayOrder,
  verifyRazorpayPayment,
  razorpayWebhook,
} from '../controllers/paymentController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/info/:orderId', protect, getPaymentInfo);
router.post('/submit', protect, submitPayment);
router.post('/verify-mock', protect, adminOnly, verifyPaymentMock);
router.get('/status/:orderId', protect, checkPaymentStatus);

// Razorpay Payment Routes (Supports both /create-order and /razorpay/create-order)
router.post('/create-order', protect, createRazorpayOrder);
router.post('/verify', protect, verifyRazorpayPayment);
router.post('/webhook', razorpayWebhook);

// Also alias under /razorpay/*
router.post('/razorpay/create-order', protect, createRazorpayOrder);
router.post('/razorpay/verify', protect, verifyRazorpayPayment);
router.post('/razorpay/webhook', razorpayWebhook);

export default router;
