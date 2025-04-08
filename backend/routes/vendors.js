const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getVendors,
  getVendorByPO,
  addVendor,
  updateVendor 
} = require('../controllers/vendorController');

router.get('/', auth, getVendors);
router.get('/po/:poNumber', auth, getVendorByPO);
router.post('/', auth, addVendor);
router.put('/:id', auth, updateVendor);

module.exports = router;