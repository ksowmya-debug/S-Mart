import express from 'express';
import {
  getProducts,
  getProductById,
  updateProduct,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', protect, adminOnly, updateProduct);

export default router;
