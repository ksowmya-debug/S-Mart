import express from 'express';

const router = express.Router();

router.get('/generate-upi-qr', (req, res) => {
  const dummyUpiId = 'test@upi';
  const dummyQrCodeUrl = 'https://via.placeholder.com/150?text=Dummy+UPI+QR'; // Placeholder image

  res.json({
    upiId: dummyUpiId,
    qrCodeUrl: dummyQrCodeUrl,
    message: 'Scan this QR or use the UPI ID to make a dummy payment.'
  });
});

router.post('/simulate-payment', (req, res) => {
  const { status } = req.body; // 'success' or 'failure'

  if (status === 'success') {
    res.json({ message: 'Dummy UPI payment successful!', status: 'success' });
  } else if (status === 'failure') {
    res.status(400).json({ message: 'Dummy UPI payment failed!', status: 'failure' });
  } else {
    res.status(400).json({ message: 'Invalid payment status provided.', status: 'invalid' });
  }
});

export default router;
