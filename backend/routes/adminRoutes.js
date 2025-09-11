import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';
import {
    getUsers,
    deleteUser,
    updateUser,
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    getOrders,
    getSummary
} from '../controllers/adminController.js';

router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id')
    .delete(protect, admin, deleteUser)
    .put(protect, admin, updateUser);
router.route('/products').get(protect, admin, getProducts);
router.route('/products/:id')
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);
router.route('/products').post(protect, admin, createProduct);
router.route('/orders').get(protect, admin, getOrders);
router.route('/summary').get(protect, admin, getSummary);

export default router;
