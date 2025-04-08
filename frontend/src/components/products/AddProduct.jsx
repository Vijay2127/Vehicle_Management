import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Box, MenuItem } from '@mui/material';
import React from 'react';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    poNumber: ''
  });
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await axios.get('/api/vendors');
        setVendors(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVendors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', formData);
      navigate('/dashboard/products');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Add Product</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          select
          label="PO Number"
          name="poNumber"
          value={formData.poNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {vendors.map((vendor) => (
            <MenuItem key={vendor._id} value={vendor.poNumber}>
              {vendor.poNumber} - {vendor.companyName}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Save Product
        </Button>
      </Box>
    </Paper>
  );
};

export default AddProduct;