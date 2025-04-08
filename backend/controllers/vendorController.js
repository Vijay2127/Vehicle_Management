

const Vendor = require('../models/Vendor');

// Get all vendors
exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ name: 1 });
    res.json(vendors);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get vendor by PO number
exports.getVendorByPO = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ poNumber: req.params.poNumber });
    if (!vendor) return res.status(404).json({ msg: 'Vendor not found' });
    res.json(vendor);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Add new vendor
exports.addVendor = async (req, res) => {
  const { name, companyName, poNumber, contact, email } = req.body;

  try {
    const vendor = new Vendor({
      name,
      companyName,
      poNumber,
      contact,
      email
    });

    await vendor.save();
    res.json(vendor);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, companyName, poNumber, contact, email } = req.body;

    const updatedVendor = await Vendor.findByIdAndUpdate(
      id,
      { name, companyName, poNumber, contact, email },
      { new: true }
    );

    if (!updatedVendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    res.json({ success: true, vendor: updatedVendor });
  } catch (err) {
    console.error('Update Vendor Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};