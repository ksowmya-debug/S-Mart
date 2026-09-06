import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import downloadRoutes from './routes/downloadRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// Core Middleware
app.use(cors({
  origin: '*', // Allow local frontend ports
  credentials: true,
}));
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  },
}));
app.use(express.urlencoded({ extended: true }));

// Health Check / Root Endpoint
app.get('/', (req, res) => {
  res.json({
    brand: 'SOWMYA.KCODE',
    name: 'CodeID DSA Notes API',
    tagline: 'DSA Notes That Every Beginner Needs.',
    status: 'online',
    productPrice: 39,
    timestamp: new Date(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/downloads', downloadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Listen on all network interfaces for local dev testing
app.listen(PORT, '0.0.0.0', () => {
  console.log(`=========================================`);
  console.log(`🚀 SOWMYA.KCODE API Server Running on port ${PORT}`);
  console.log(`📦 Selling: DSA Notes PDF (₹39)`);
  console.log(`🔐 Local Development Environment Active`);
  console.log(`=========================================`);
});
