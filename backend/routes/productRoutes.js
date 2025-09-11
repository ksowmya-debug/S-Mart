import express from 'express';
const router = express.Router();
import { getProducts, getProductById, getPopularProducts } from '../controllers/productController.js';

router.route('/').get(getProducts);
router.route('/popular').get(getPopularProducts);
router.route('/:id').get(getProductById);

export default router;
