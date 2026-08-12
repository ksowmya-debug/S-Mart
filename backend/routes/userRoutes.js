import express from 'express';
const router = express.Router();
import { authUser, registerUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/login', authUser);
router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile);

export default router;