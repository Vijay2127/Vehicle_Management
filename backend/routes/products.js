const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getProducts,
  getProductsByPO,
  addProduct,
  updateProduct
} = require('../controllers/productController');

router.get('/', auth, getProducts);
router.get('/po/:poNumber', auth, getProductsByPO);
router.post('/', auth, addProduct);
router.put('/:id', auth, updateProduct);

module.exports = router;