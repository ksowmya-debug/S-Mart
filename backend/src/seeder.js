import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import Payment from './models/paymentModel.js';
import Download from './models/downloadModel.js';
import AuditLog from './models/auditLogModel.js';
import connectDB from './config/db.js';
import { generateDsaNotesPdf } from './utils/create_pdf.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    // Ensure PDF file exists
    generateDsaNotesPdf();

    console.log('Seeding SOWMYA.KCODE database...');

    // 1. Seed Product
    let product = await Product.findOne();
    if (!product) {
      product = await Product.create({
        name: 'DSA Demystified: Phone-First Edition',
        description:
          'Simple, structured, phone-first DSA learning book in Java, C++, and Python with 14 master interview patterns and visual dry-runs.',
        price: 39,
        features: [
          'Phone-First Digital Book',
          '16 Structured Modules (Parts 0-15)',
          'Multi-Language (Java, C++, Python)',
          '14 Master Coding Patterns',
          '30/60/90-Day Study Roadmaps',
          'Visual ASCII Diagrams & Dry Runs',
          'Lifetime Access & Updates',
        ],
        pdfPath: 'storage/secure_notes/dsa_notes.pdf',
        active: true,
      });
      console.log('Product created: DSA Notes PDF (₹39)');
    } else {
      product.name = 'DSA Demystified: Phone-First Edition';
      product.description =
        'Simple, structured, phone-first DSA learning book in Java, C++, and Python with 14 master interview patterns and visual dry-runs.';
      product.price = 39;
      product.features = [
        'Phone-First Digital Book',
        '16 Structured Modules (Parts 0-15)',
        'Multi-Language (Java, C++, Python)',
        '14 Master Coding Patterns',
        '30/60/90-Day Study Roadmaps',
        'Visual ASCII Diagrams & Dry Runs',
        'Lifetime Access & Updates',
      ];
      await product.save();
    }

    // 2. Seed Admin Users
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('@sowmya0410', salt);
    const userPassword = await bcrypt.hash('User@123', salt);

    // Primary Admin (Sowmya)
    await User.findOneAndUpdate(
      { email: 'sowmyakatkojwal@gmail.com' },
      {
        name: 'Sowmya Katkojwal',
        email: 'sowmyakatkojwal@gmail.com',
        passwordHash: adminPassword,
        role: 'admin',
        status: 'active',
        lastLoginAt: new Date(),
      },
      { upsert: true, new: true }
    );

    // Secondary Admin for easy demo login
    await User.findOneAndUpdate(
      { email: 'admin@codeid.com' },
      {
        name: 'CodeID Admin',
        email: 'admin@codeid.com',
        passwordHash: adminPassword,
        role: 'admin',
        status: 'active',
        lastLoginAt: new Date(),
      },
      { upsert: true, new: true }
    );

    // 3. Seed Students / Users matching Reference UI
    const mockUsers = [
      { name: 'Sowmya K.', email: 'sowmya@example.com', role: 'user', date: '28 May 2025' },
      { name: 'Ankita R.', email: 'ankita@example.com', role: 'user', date: '27 May 2025' },
      { name: 'Rohit S.', email: 'rohit@example.com', role: 'user', date: '26 May 2025' },
      { name: 'Neha T.', email: 'neha@example.com', role: 'user', date: '25 May 2025' },
      { name: 'Pranav K.', email: 'pranav@example.com', role: 'user', date: '24 May 2025' },
      { name: 'Aditya P.', email: 'aditya@example.com', role: 'user', date: '23 May 2025' },
      { name: 'Meera J.', email: 'meera@example.com', role: 'user', date: '23 May 2025' },
      { name: 'Demo Student', email: 'user@codeid.com', role: 'user', date: '20 May 2025' },
    ];

    for (const u of mockUsers) {
      const existing = await User.findOne({ email: u.email });
      if (!existing) {
        const createdUser = await User.create({
          name: u.name,
          email: u.email,
          passwordHash: userPassword,
          role: u.role,
          status: 'active',
          lastLoginAt: new Date(u.date),
        });

        // Create an order for buyers
        if (u.name !== 'Neha T.' && u.name !== 'Meera J.') {
          const ordId = `#ORD${Math.floor(100000 + Math.random() * 900000)}`;
          const order = await Order.create({
            orderId: ordId,
            userId: createdUser._id,
            productId: product._id,
            amount: 39,
            status: 'paid',
            paidAt: new Date(u.date),
          });

          await Payment.create({
            orderId: ordId,
            userId: createdUser._id,
            amount: 39,
            paymentMethod: ['UPI', 'GPay', 'PhonePe'][Math.floor(Math.random() * 3)],
            transactionReference: `UPI/${Date.now().toString().slice(-6)}/${Math.floor(1000 + Math.random() * 9000)}`,
            status: 'verified',
            verifiedAt: new Date(u.date),
          });

          await Download.create({
            userId: createdUser._id,
            productId: product._id,
            orderId: ordId,
            downloadedAt: new Date(u.date),
            ipAddress: '127.0.0.1',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          });
        }
      }
    }

    // Demo student (user@codeid.com) has a paid order so they can immediately test download!
    const demoUser = await User.findOne({ email: 'user@codeid.com' });
    if (demoUser) {
      const demoOrder = await Order.findOne({ userId: demoUser._id, status: 'paid' });
      if (!demoOrder) {
        const ordId = '#ORD123456';
        await Order.create({
          orderId: ordId,
          userId: demoUser._id,
          productId: product._id,
          amount: 39,
          status: 'paid',
          paidAt: new Date(),
        });

        await Payment.create({
          orderId: ordId,
          userId: demoUser._id,
          amount: 39,
          paymentMethod: 'UPI',
          transactionReference: 'UPI-DEMO-PAY-123456',
          status: 'verified',
          verifiedAt: new Date(),
        });
      }
    }

    console.log('Database seeding complete successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  }
};

importData();
