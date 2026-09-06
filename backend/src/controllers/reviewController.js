import Review from '../models/reviewModel.js';

// @desc    Get all approved reviews
// @route   GET /api/reviews
// @access  Public
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Public
export const createReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({ message: 'Please provide name, rating, and comment' });
    }

    const review = await Review.create({
      name,
      rating: Number(rating),
      comment,
      isApproved: true,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
