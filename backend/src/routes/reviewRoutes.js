import express from 'express';
import { getReviews, createReview } from '../controllers/reviewController.js';

const router = express.Router();

router.route('/')
  .get(getReviews)
  .post(createReview);

export default router;
