import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  next();
});

const admin = (req, res, next) => {
  next();
};

export { protect, admin };