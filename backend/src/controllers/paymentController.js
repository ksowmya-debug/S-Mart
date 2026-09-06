import Order from '../models/orderModel.js';
import Payment from '../models/paymentModel.js';
import {
  createRazorpayOrder as createRazorpayOrderService,
  verifyPaymentSignature,
  verifyWebhookSignature,
} from '../services/razorpayService.js';

// Configuration for UPI payments (modular)
const UPI_CONFIG = {
  upiId: process.env.UPI_ID || 'sowmya0410.k@okhdfcbank',
  merchantName: 'SOWMYA.KCODE',
  currency: 'INR',
};

// @desc    Get UPI payment config & generate QR payload for order
// @route   GET /api/payments/info/:orderId
// @access  Private
export const getPaymentInfo = async (req, res) => {
  try {
    const { orderId } = req.params;
    const cleanId = (orderId || '').replace(/^#/, '');

    const order = await Order.findOne({
      $or: [{ orderId }, { orderId: `#${cleanId}` }, { orderId: cleanId }],
    }).populate('productId', 'name price');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (
      order.userId.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized for this order' });
    }

    // Standard NPCI UPI URI Scheme for QR code scanners
    // upi://pay?pa=<UPI_ID>&pn=<NAME>&am=<AMOUNT>&cu=INR&tn=<TRANSACTION_NOTE>
    const upiPayload = `upi://pay?pa=${encodeURIComponent(UPI_CONFIG.upiId)}&pn=${encodeURIComponent(UPI_CONFIG.merchantName)}&am=${order.amount}&cu=${UPI_CONFIG.currency}&tn=${encodeURIComponent(`Order ${order.orderId}`)}`;

    res.json({
      orderId: order.orderId,
      amount: order.amount,
      currency: 'INR',
      status: order.status,
      paidAt: order.paidAt,
      upiId: UPI_CONFIG.upiId,
      merchantName: UPI_CONFIG.merchantName,
      upiPayload,
      supportedApps: ['Google Pay', 'PhonePe', 'Paytm', 'BHIM', 'Any UPI App'],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit payment reference/proof after scanning UPI
// @route   POST /api/payments/submit
// @access  Private
export const submitPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod, transactionReference } = req.body;
    const cleanId = (orderId || '').replace(/^#/, '');

    const order = await Order.findOne({
      $or: [{ orderId }, { orderId: `#${cleanId}` }, { orderId: cleanId }],
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized for this order' });
    }

    if (order.status === 'paid') {
      return res.status(400).json({ message: 'This order is already paid!' });
    }

    const cleanRef = (transactionReference || '').trim();
    if (!cleanRef) {
      return res.status(400).json({
        message: 'Please provide a valid 12-digit UPI UTR / Transaction Reference number from your payment receipt.',
      });
    }

    const payment = await Payment.findOneAndUpdate(
      { orderId: order.orderId },
      {
        orderId: order.orderId,
        userId: req.user._id,
        amount: order.amount,
        paymentMethod: paymentMethod || 'UPI',
        transactionReference: cleanRef,
        status: 'pending',
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      message: 'Payment submission received. Your ₹39 payment will be verified shortly.',
      payment,
      orderStatus: order.status,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Safe Mock/Test Payment Verification for Local Development
// @route   POST /api/payments/verify-mock
// @access  Private
export const verifyPaymentMock = async (req, res) => {
  try {
    const { orderId, transactionReference, paymentMethod } = req.body;
    const cleanId = (orderId || '').replace(/^#/, '');

    const order = await Order.findOne({
      $or: [{ orderId }, { orderId: `#${cleanId}` }, { orderId: cleanId }],
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (
      order.userId.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized for this order' });
    }

    if (order.status === 'paid') {
      return res.json({
        message: 'Order is already marked as paid',
        order,
        paid: true,
      });
    }

    // Backend controls payment transition
    order.status = 'paid';
    order.paidAt = new Date();
    await order.save();

    // Create or update Payment record
    const ref = transactionReference || `UPI-VERIFIED-${Date.now().toString().slice(-6)}`;
    const payment = await Payment.findOneAndUpdate(
      { orderId: order.orderId },
      {
        orderId: order.orderId,
        userId: req.user._id,
        amount: order.amount,
        paymentMethod: paymentMethod || 'UPI',
        transactionReference: ref,
        status: 'verified',
        verifiedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: 'Payment successfully verified!',
      order,
      payment,
      paid: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check real-time payment status
// @route   GET /api/payments/status/:orderId
// @access  Private
export const checkPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const cleanId = (orderId || '').replace(/^#/, '');

    const order = await Order.findOne({
      $or: [{ orderId }, { orderId: `#${cleanId}` }, { orderId: cleanId }],
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (
      order.userId.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized for this order' });
    }

    const payment = await Payment.findOne({ orderId: order.orderId });

    const isPaid = order.status === 'paid' || order.status === 'verified';
    res.json({
      orderId: order.orderId,
      status: order.status,
      isPaid,
      paidAt: order.paidAt,
      paymentVerifiedAt: order.paymentVerifiedAt || order.verifiedAt || null,
      razorpayOrderId: order.razorpayOrderId || null,
      razorpayPaymentId: order.razorpayPaymentId || null,
      hasSubmittedPayment: !!payment,
      transactionReference: payment?.transactionReference || payment?.razorpayPaymentId || null,
      paymentStatus: payment?.status || null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order OR POST /api/payments/create-order
// @access  Private
export const createRazorpayOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const cleanId = (orderId || '').replace(/^#/, '');

    let order;
    if (orderId) {
      order = await Order.findOne({
        $or: [{ orderId }, { orderId: `#${cleanId}` }, { orderId: cleanId }],
      }).populate('productId');
    }

    if (!order) {
      // Find or reuse active pending order for user
      order = await Order.findOne({
        userId: req.user._id,
        status: 'pending',
      }).populate('productId');
    }

    if (!order) {
      return res.status(404).json({ message: 'No active pending order found to pay.' });
    }

    if (
      order.userId.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized for this order' });
    }

    // If order is already paid/verified, return immediately
    if (order.status === 'paid' || order.status === 'verified') {
      return res.status(200).json({
        message: 'Order is already paid and verified!',
        isPaid: true,
        orderId: order.orderId,
      });
    }

    // Call Razorpay Order service (strictly enforces ₹39 / 3900 paise)
    const rzpOrder = await createRazorpayOrderService({
      orderId: order.orderId,
      customer: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
      },
    });

    // Save Razorpay order id to internal order
    order.razorpayOrderId = rzpOrder.razorpayOrderId;
    await order.save();

    res.status(200).json({
      success: true,
      orderId: order.orderId,
      amount: rzpOrder.amount, // 3900 paise
      currency: rzpOrder.currency || 'INR',
      razorpayOrderId: rzpOrder.razorpayOrderId,
      keyId: rzpOrder.keyId,
      isDevMock: !!rzpOrder.isDevMock,
    });
  } catch (error) {
    console.error('Razorpay Create Order Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify Razorpay Payment Signature & Unlock Course
// @route   POST /api/payment/verify OR POST /api/payments/verify
// @access  Private
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const cleanId = (orderId || '').replace(/^#/, '');

    const order = await Order.findOne({
      $or: [
        { orderId },
        { orderId: `#${cleanId}` },
        { orderId: cleanId },
        { razorpayOrderId: razorpay_order_id },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found for verification' });
    }

    if (
      order.userId.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized for this order' });
    }

    // IDEMPOTENCY: If already verified, return success without re-processing
    if (order.status === 'verified' || order.status === 'paid') {
      return res.json({
        success: true,
        verified: true,
        isPaid: true,
        message: 'Order is already verified and unlocked!',
        order,
      });
    }

    // Verify cryptographic signature with Razorpay secret key
    const isValidSignature = verifyPaymentSignature({
      razorpay_order_id: razorpay_order_id || order.razorpayOrderId,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (!isValidSignature) {
      console.error('SECURITY WARNING: Invalid Razorpay signature verification attempt for order', order.orderId);
      return res.status(400).json({
        success: false,
        verified: false,
        message: 'Payment verification failed: Invalid signature.',
      });
    }

    // AUTOMATIC APPROVAL & PDF UNLOCK
    const now = new Date();
    order.status = 'verified';
    order.paidAt = order.paidAt || now;
    order.paymentVerifiedAt = now;
    order.verifiedAt = now;
    order.razorpayOrderId = razorpay_order_id || order.razorpayOrderId;
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    await order.save();

    // Create or update Payment audit record
    const payment = await Payment.findOneAndUpdate(
      { orderId: order.orderId },
      {
        orderId: order.orderId,
        userId: order.userId,
        amount: order.amount || 39,
        paymentMethod: 'Razorpay',
        transactionReference: razorpay_payment_id,
        razorpayOrderId: order.razorpayOrderId,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'verified',
        paymentVerifiedAt: now,
        verifiedAt: now,
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      verified: true,
      isPaid: true,
      message: 'Payment Successful! 🎉 Your DSA Notes are now unlocked.',
      order,
      payment,
    });
  } catch (error) {
    console.error('Razorpay Verification Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Razorpay Webhook Handler (Idempotent background confirmation)
// @route   POST /api/payment/webhook OR POST /api/payments/webhook
// @access  Public (Signature verified)
export const razorpayWebhook = async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const rawBody = req.rawBody || JSON.stringify(req.body);

    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.error('SECURITY WARNING: Invalid Razorpay webhook signature.');
      return res.status(400).json({ message: 'Invalid webhook signature' });
    }

    const payload = req.body || {};
    const event = payload.event;
    const paymentEntity = payload.payload?.payment?.entity;
    const orderEntity = payload.payload?.order?.entity;

    const rzpOrderId = paymentEntity?.order_id || orderEntity?.id;
    const rzpPaymentId = paymentEntity?.id;

    if (!rzpOrderId) {
      return res.status(200).json({ received: true, note: 'No razorpay order ID in event' });
    }

    // Find corresponding order in DB
    const order = await Order.findOne({
      $or: [
        { razorpayOrderId: rzpOrderId },
        { orderId: paymentEntity?.notes?.orderId },
        { orderId: orderEntity?.notes?.orderId },
        { orderId: orderEntity?.receipt },
      ],
    });

    if (!order) {
      console.warn(`Webhook: No matching internal order found for Razorpay order ${rzpOrderId}`);
      return res.status(200).json({ received: true, note: 'Order not found in DB' });
    }

    // Process only payment capture or order paid events
    if (
      (event === 'payment.captured' || event === 'order.paid') &&
      order.status !== 'verified' &&
      order.status !== 'paid'
    ) {
      const now = new Date();
      order.status = 'verified';
      order.paidAt = order.paidAt || now;
      order.paymentVerifiedAt = now;
      order.verifiedAt = now;
      order.razorpayOrderId = rzpOrderId;
      if (rzpPaymentId) order.razorpayPaymentId = rzpPaymentId;
      await order.save();

      await Payment.findOneAndUpdate(
        { orderId: order.orderId },
        {
          orderId: order.orderId,
          userId: order.userId,
          amount: order.amount || 39,
          paymentMethod: 'Razorpay',
          transactionReference: rzpPaymentId || order.orderId,
          razorpayOrderId: rzpOrderId,
          razorpayPaymentId: rzpPaymentId,
          status: 'verified',
          paymentVerifiedAt: now,
          verifiedAt: now,
        },
        { upsert: true, new: true }
      );

      console.log(`✅ [Razorpay Webhook] Order ${order.orderId} automatically verified.`);
    }

    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Razorpay Webhook Error:', error);
    res.status(500).json({ message: error.message });
  }
};
