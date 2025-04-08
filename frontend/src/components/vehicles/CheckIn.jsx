import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Box, Grid } from '@mui/material';
import React from 'react';

const CheckIn = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    dcNumber: '',
    poNumber: '',
  });
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchVendorAndProducts = async () => {
    try {
      const vendorRes = await axios.get(`/api/vendors/po/${formData.poNumber}`);
      setVendor(vendorRes.data);
      
      const productsRes = await axios.get(`/api/products/po/${formData.poNumber}`);
      setProducts(productsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/vehicles', formData);
      navigate('/dashboard/vehicles');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Vehicle Check-In</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Vehicle Number"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="D.C. Number"
              name="dcNumber"
              value={formData.dcNumber}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="P.O. Number"
              name="poNumber"
              value={formData.poNumber}
              onChange={handleChange}
              onBlur={fetchVendorAndProducts}
              fullWidth
              required
            />
          </Grid>
        </Grid>

        {vendor && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1">Vendor Details</Typography>
            <Typography>Name: {vendor.name}</Typography>
            <Typography>Company: {vendor.companyName}</Typography>
          </Box>
        )}

        {products.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1">Products</Typography>
            <ul>
              {products.map((product) => (
                <li key={product._id}>
                  {product.name} - Qty: {product.quantity}
                </li>
              ))}
            </ul>
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
          disabled={!vendor || products.length === 0}
        >
          Check In Vehicle
        </Button>
      </Box>
    </Paper>
  );
};

export default CheckIn;