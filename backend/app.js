const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes.js');
const vehicleRoutes = require('./routes/vehicleRoutes.js');
const vendorRoutes = require('./routes/vendorRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const { errorHandler } = require('./middleware/error.js');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/products', productRoutes);

// Error Handler (should be last piece of middleware)
// app.use(errorHandler);

module.exports = app;