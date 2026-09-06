import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'DSA Notes PDF',
    },
    description: {
      type: String,
      required: true,
      default: 'Simple, structured and interview-focused DSA notes designed to help you understand concepts faster and prepare smarter.',
    },
    price: {
      type: Number,
      required: true,
      default: 39,
    },
    features: {
      type: [String],
      default: [
        'Phone-First Digital Book',
        '16 Structured Modules (Parts 0-15)',
        'Multi-Language (Java, C++, Python)',
        '14 Master Coding Patterns',
        '30/60/90-Day Study Roadmaps',
        'Visual ASCII Diagrams & Dry Runs',
        'Lifetime Access & Updates',
      ],
    },
    pdfPath: {
      type: String,
      required: true,
      default: 'storage/secure_notes/dsa_notes.pdf',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
