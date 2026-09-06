import express from 'express';
import { downloadPdf, getMyDownloads } from '../controllers/downloadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/my-history', protect, getMyDownloads);
router.get('/:orderId', protect, downloadPdf);

export default router;
