import Product from '../models/productModel.js';

// @desc    Fetch all active products (DSA Notes)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    let products = await Product.find({ active: true });

    // If no product exists yet in database, create the default DSA Notes product
    if (products.length === 0) {
      const defaultProduct = await Product.create({
        name: 'DSA Notes PDF',
        description:
          'Simple, structured and interview-focused DSA notes designed to help you understand concepts faster and prepare smarter.',
        price: 39,
        features: [
          '70+ Pages',
          '300+ Topics Covered',
          '500+ Practice Questions',
          'Interview Focused',
          'Beginner Friendly',
          'Lifetime Access',
          'Future Updates',
        ],
        pdfPath: 'storage/secure_notes/dsa_notes.pdf',
        active: true,
      });
      products = [defaultProduct];
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product details (price, features, etc.)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price !== undefined ? req.body.price : product.price;
    product.features = req.body.features || product.features;
    product.active = req.body.active !== undefined ? req.body.active : product.active;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
