import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.remove();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin; // This will be a boolean

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get all products
// @route   GET /api/admin/products
// @access  Private/Admin
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/admin/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, category, subCategory, sizes } = req.body;
    const product = new Product({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name,
        price,
        description,
        image,
        category,
        subCategory,
        sizes,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, category, subCategory, sizes } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.category = category || product.category;
        product.subCategory = subCategory || product.subCategory;
        product.sizes = sizes || product.sizes;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});

// @desc    Get dashboard summary
// @route   GET /api/admin/summary
// @access  Private/Admin
const getSummary = asyncHandler(async (req, res) => {
    const orders = await Order.find({});
    const users = await User.find({});
    const products = await Product.find({});

    const totalProfit = orders.reduce((acc, order) => acc + order.totalPrice, 0);
    const popularProducts = await Order.aggregate([
        { $unwind: '$orderItems' },
        { $group: { _id: '$orderItems.name', count: { $sum: '$orderItems.qty' } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
    ]);

    const salesData = await Order.aggregate([
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, totalSales: { $sum: "$totalPrice" } } },
        { $sort: { _id: 1 } },
    ]);

    const topSellingProductsByRevenue = await Order.aggregate([
        { $unwind: '$orderItems' },
        { $group: { _id: '$orderItems.name', totalRevenue: { $sum: { $multiply: ["$orderItems.price", "$orderItems.qty"] } } } },
        { $sort: { totalRevenue: -1 } },
        { $limit: 5 },
    ]);

    res.json({
        totalProfit,
        userCount: users.length,
        productCount: products.length,
        orderCount: orders.length,
        popularProducts,
        salesData,
        topSellingProductsByRevenue,
    });
});

export {
    getUsers,
    deleteUser,
    updateUser,
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    getOrders,
    getSummary,
};
