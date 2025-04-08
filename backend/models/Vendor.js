

const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  poNumber: { type: String, required: true, unique: true },
  contact: { type: String },
  email: { type: String }
});

module.exports = mongoose.model('Vendor', VendorSchema);