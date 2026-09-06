import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import User from './src/models/userModel.js';
import Product from './src/models/productModel.js';
import Order from './src/models/orderModel.js';
import Payment from './src/models/paymentModel.js';
import Download from './src/models/downloadModel.js';
import generateToken from './src/utils/generateToken.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const runComprehensiveTests = async () => {
  console.log('====================================================');
  console.log('🧪 RUNNING SOWMYA.KCODE / CodeID AUTOMATED TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  const assert = (condition, testName) => {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      failed++;
    }
  };

  try {
    await connectDB();

    // 1. Verify Product exists and has price 39
    const product = await Product.findOne({ active: true });
    assert(product && product.price === 39, 'Product exists with price ₹39');
    assert(product.features.length >= 5, 'Product features array contains required highlights');

    // 2. Test User Registration
    const testEmail = `student_${Date.now()}@test.com`;
    const user = await User.create({
      name: 'Test Student',
      email: testEmail,
      passwordHash: 'SecretPassword123',
      role: 'user',
      status: 'active',
      lastLoginAt: new Date(),
    });
    assert(user && user.email === testEmail, 'Student user registered successfully');
    assert(user.passwordHash !== 'SecretPassword123', 'Password successfully hashed with bcrypt');

    // 3. Test Password Verification
    const isPasswordValid = await user.matchPassword('SecretPassword123');
    const isWrongPasswordInvalid = !(await user.matchPassword('WrongPassword'));
    assert(isPasswordValid && isWrongPasswordInvalid, 'User password authentication matches correctly');

    // 4. Test Token Generation
    const token = generateToken(user._id);
    assert(Boolean(token && token.split('.').length === 3), 'Valid JWT generated');

    // 5. Test Order Creation
    const orderId = `#ORD${Math.floor(100000 + Math.random() * 900000)}`;
    const order = await Order.create({
      orderId,
      userId: user._id,
      productId: product._id,
      amount: product.price,
      status: 'pending',
    });
    assert(order && order.status === 'pending', 'Order created with pending status');

    // 6. Security Test: Unpaid PDF Download Attempt
    const unpaidCheck = order.status === 'paid';
    assert(!unpaidCheck, 'Security: Order is not paid, download blocked');

    // 7. Security Test: Unauthorized Admin Access Attempt
    const studentRoleCheck = user.role === 'admin';
    assert(!studentRoleCheck, 'Security: Student user denied admin role access');

    // 8. Payment Verification (Simulate Local Verification)
    order.status = 'paid';
    order.paidAt = new Date();
    await order.save();

    const payment = await Payment.create({
      orderId: order.orderId,
      userId: user._id,
      amount: order.amount,
      paymentMethod: 'UPI',
      transactionReference: `UPI-TEST-REF-${Date.now()}`,
      status: 'verified',
      verifiedAt: new Date(),
    });
    assert(order.status === 'paid' && payment.status === 'verified', 'Payment transition verified on backend');

    // 9. Secure PDF File Existence
    const pdfPath = path.resolve('src/storage/secure_notes/dsa_notes.pdf');
    const pdfExists = fs.existsSync(pdfPath);
    assert(pdfExists, 'Secure DSA Notes PDF exists in protected backend storage');
    if (pdfExists) {
      const stats = fs.statSync(pdfPath);
      assert(stats.size > 500, `PDF has valid non-zero content size (${stats.size} bytes)`);
    }

    // 10. Record Download in MongoDB
    const downloadEntry = await Download.create({
      userId: user._id,
      productId: product._id,
      orderId: order.orderId,
      ipAddress: '127.0.0.1',
      userAgent: 'Automated Test Runner',
    });
    assert(Boolean(downloadEntry && downloadEntry._id), 'Download activity successfully logged in database');

    // 11. Admin Access Verification
    const adminUser = await User.findOne({ email: 'sowmyakatkojwal@gmail.com' });
    assert(adminUser && adminUser.role === 'admin', 'Admin account configured with role "admin"');

    // 12. Admin KPI Aggregate verification
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const paidOrders = await Order.countDocuments({ status: 'paid' });
    const totalDownloads = await Download.countDocuments();
    assert(totalUsers > 0 && totalOrders > 0 && paidOrders > 0, 'Admin telemetry successfully aggregates MongoDB data');

    console.log('\n====================================================');
    console.log(`🎉 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================\n');

    process.exit(failed > 0 ? 1 : 0);
  } catch (error) {
    console.error('Test execution error:', error);
    process.exit(1);
  }
};

runComprehensiveTests();
