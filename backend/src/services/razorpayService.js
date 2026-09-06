import Razorpay from 'razorpay';
import crypto from 'crypto';

/**
 * Razorpay Service
 * 
 * SECURITY:
 * - Backend enforces exact ₹39 (3900 paise) pricing.
 * - Secret key strictly resides on the backend.
 * - Cryptographic HMAC SHA256 signature verification for payments and webhooks.
 * - In production, credentials and signature validation are strictly mandatory.
 */

const getRazorpayConfig = () => {
  const keyId = process.env.RAZORPAY_KEY_ID || '';
  const keySecret = process.env.RAZORPAY_KEY_SECRET || '';
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
  const isProduction = (process.env.NODE_ENV || '').toLowerCase() === 'production';

  return {
    keyId,
    keySecret,
    webhookSecret,
    isProduction,
  };
};

const getRazorpayInstance = () => {
  const { keyId, keySecret, isProduction } = getRazorpayConfig();

  if (!keyId || !keySecret) {
    if (isProduction) {
      throw new Error(
        'SECURITY ERROR: Razorpay credentials (RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET) are missing in production.'
      );
    }
    return null;
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

/**
 * Create Razorpay Order
 * Backend strictly enforces ₹39 (3900 paise)
 */
export const createRazorpayOrder = async ({ orderId, customer = {} }) => {
  const { keyId, isProduction } = getRazorpayConfig();
  const rzp = getRazorpayInstance();

  // Price enforced by backend: 39 INR = 3900 paise
  const AMOUNT_PAISE = 3900;
  const CURRENCY = 'INR';

  if (rzp) {
    const options = {
      amount: AMOUNT_PAISE,
      currency: CURRENCY,
      receipt: orderId.replace(/^#/, ''),
      notes: {
        orderId,
        product: 'Sowmya KCode DSA Notes',
        customerName: customer.name || 'Student',
        customerEmail: customer.email || '',
      },
    };

    const rzpOrder = await rzp.orders.create(options);

    return {
      razorpayOrderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      keyId,
      receipt: rzpOrder.receipt,
    };
  }

  // Development Fallback: Only permitted when not in production
  if (isProduction) {
    throw new Error('SECURITY ERROR: Missing Razorpay production credentials.');
  }

  console.warn('⚠️ [DEV ONLY] RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET not set in .env. Using sandbox development mock order.');
  return {
    razorpayOrderId: `order_dev_${Date.now()}_${Math.random().toString(36).slice(-5)}`,
    amount: AMOUNT_PAISE,
    currency: CURRENCY,
    keyId: keyId || 'rzp_test_placeholder_key',
    receipt: orderId.replace(/^#/, ''),
    isDevMock: true,
  };
};

/**
 * Verify Razorpay Payment Signature
 * HMAC SHA256(order_id + "|" + payment_id, secret) === signature
 */
export const verifyPaymentSignature = ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  const { keySecret, isProduction } = getRazorpayConfig();

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return false;
  }

  if (keySecret) {
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(payload)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'utf-8'),
      Buffer.from(razorpay_signature, 'utf-8')
    );
  }

  // Development Fallback only
  if (isProduction) {
    return false;
  }

  // In local dev without keys, allow test signatures
  return (
    razorpay_signature.startsWith('dev_test_sig_') ||
    razorpay_signature === `mock_sig_${razorpay_order_id}_${razorpay_payment_id}`
  );
};

/**
 * Verify Razorpay Webhook Signature
 */
export const verifyWebhookSignature = (rawBody, signature) => {
  const { webhookSecret, isProduction } = getRazorpayConfig();

  if (!signature) {
    return false;
  }

  if (!webhookSecret) {
    if (isProduction) {
      console.error('SECURITY ERROR: RAZORPAY_WEBHOOK_SECRET is missing in production.');
      return false;
    }
    return true; // Allow testing in dev if webhook secret is omitted
  }

  try {
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'utf-8'),
      Buffer.from(signature, 'utf-8')
    );
  } catch (err) {
    console.error('Webhook signature verification error:', err);
    return false;
  }
};

export default {
  getRazorpayConfig,
  createRazorpayOrder,
  verifyPaymentSignature,
  verifyWebhookSignature,
};
