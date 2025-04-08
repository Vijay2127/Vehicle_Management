import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import React from 'react';

const AddVendor = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    poNumber: '',
    contact: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/vendors', formData);
      navigate('/dashboard/vendors');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Add Vendor</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Vendor Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="PO Number"
          name="poNumber"
          value={formData.poNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Save Vendor
        </Button>
      </Box>
    </Paper>
  );
};

export default AddVendor;