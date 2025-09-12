import express from 'express';
const router = express.Router();
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

router.route('/users').get(getUsers);
router.route('/users/:id')
    .delete(deleteUser)
    .put(updateUser);
router.route('/products').get(getProducts);
router.route('/products/:id')
    .delete(deleteProduct)
    .put(updateProduct);
router.route('/products').post(createProduct);
router.route('/orders').get(getOrders);
router.route('/summary').get(getSummary);

export default router;