

const Product = require('../models/Product');
const Vendor = require('../models/Vendor');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('vendor', 'name companyName');
    res.json(products);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get products by PO number
exports.getProductsByPO = async (req, res) => {
  try {
    const products = await Product.find({ poNumber: req.params.poNumber })
      .populate('vendor', 'name companyName');
    res.json(products);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Add new product
exports.addProduct = async (req, res) => {
  const { name, quantity, poNumber } = req.body;

  try {
    const vendor = await Vendor.findOne({ poNumber });
    if (!vendor) return res.status(400).json({ msg: 'Vendor not found for this PO' });

    const product = new Product({
      name,
      quantity,
      poNumber,
      vendor: vendor._id
    });

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, poNumber } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, quantity, poNumber },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, product: updatedProduct });
  } catch (err) {
    console.error('Update Product Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};