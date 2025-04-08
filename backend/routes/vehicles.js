const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { checkIn, checkOut, getVehicles } = require('../controllers/vehicleController');

router.post('/', auth, checkIn);
router.put('/:id/checkout', auth, checkOut);
router.get('/', auth, getVehicles);

module.exports = router;