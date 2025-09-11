import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    image: [{
        type: String,
        required: true,
    }],
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    sizes: [{
        type: String,
    }],
    bestseller: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    _id: false
});

const Product = mongoose.model('Product', productSchema);

export default Product;
