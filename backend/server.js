import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

import adminRoutes from './routes/adminRoutes.js';
import upiRoutes from './dummy-upi/upiRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// App config
dotenv.config({ path: './.env' });
console.log("MONGO_URI from .env:", process.env.MONGO_URI);
connectDB(); // Connect to MongoDB
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/images', express.static('uploads/images'));

// Root route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// API endpoints
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.use('/api/dummy-upi', upiRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Listener
app.listen(port, '0.0.0.0', () => {
    console.log(`Server started on port ${port}`);
});