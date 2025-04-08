

const Vehicle = require('../models/Vehicle');
const Vendor = require('../models/Vendor');
const Product = require('../models/Product');

exports.checkIn = async (req, res) => {
  const { vehicleNumber, dcNumber, poNumber } = req.body;

  try {
    const vendor = await Vendor.findOne({ poNumber });
    if (!vendor) return res.status(400).json({ msg: 'Vendor not found' });

    const products = await Product.find({ poNumber });
    if (!products.length) return res.status(400).json({ msg: 'No products found' });

    const vehicle = new Vehicle({
      vehicleNumber,
      dcNumber,
      poNumber,
      vendor: vendor._id,
      products: products.map(p => p._id)
    });

    await vehicle.save();
    res.json(vehicle);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.checkOut = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ msg: 'Vehicle not found' });

    vehicle.status = 'checked-out';
    vehicle.checkOutTime = Date.now();
    await vehicle.save();

    res.json(vehicle);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('vendor products');
    res.json(vehicles);
  } catch (err) {
    res.status(500).send('Server error');
  }
};