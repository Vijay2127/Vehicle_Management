import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentVendor, setCurrentVendor] = useState(null);
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [poNumber, setPoNumber] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');


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

  const handleClickOpen = (vendor) => {
    setCurrentVendor(vendor);
    setName(vendor.name);
    setCompanyName(vendor.companyName);
    setPoNumber(vendor.poNumber);
    setContact(vendor.contact);
    setEmail(vendor.email);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentVendor(null);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedVendor = { name, companyName, poNumber, contact, email };
      await axios.put(`/api/vendors/${currentVendor._id}`, updatedVendor);

      setVendors((prev) =>
        prev.map((vendor) =>
          vendor._id === currentVendor._id ? { ...vendor, ...updatedVendor } : vendor
        )
      );

      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Button component={Link} to="/dashboard/vendors/add" variant="contained" sx={{ mb: 2 }}>
        Add Vendor
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>PO Number</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor._id}>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>{vendor.companyName}</TableCell>
              <TableCell>{vendor.poNumber}</TableCell>
              <TableCell>
                
              <Button onClick={() => handleClickOpen(vendor)} variant="contained">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Vendor</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Company Name" fullWidth margin="normal" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          <TextField label="PO Number" fullWidth margin="normal" value={poNumber} onChange={(e) => setPoNumber(e.target.value)} />
          <TextField label="Contact" fullWidth margin="normal" value={contact} onChange={(e) => setContact(e.target.value)} />
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSaveChanges} color="primary">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default VendorList;