import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [poNumber, setPoNumber] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);
  
  const handleClickOpen = (product) => {
    setCurrentProduct(product);
    setName(product.name);
    setQuantity(product.quantity);
    setPoNumber(product.poNumber);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduct(null);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedProduct = {
        ...currentProduct,
        name,
        quantity,
        poNumber,
      };
      console.log(updatedProduct)
      // Update the product data
      await axios.put(`/api/products/${currentProduct._id}`, updatedProduct);
      // Update the products list with the new data
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === currentProduct._id ? updatedProduct : product
        )
      );
      handleClose(); // Close the modal after saving
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <TableContainer component={Paper}>
        <Button component={Link} to="/dashboard/products/add" variant="contained" sx={{ mb: 2 }}>
          Add Product
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>PO Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.poNumber}</TableCell>
                <TableCell>
                  {/* <Button component={Link} to={`/dashboard/products/edit/${product._id}`}>
                  Edit
                </Button> */}
                  <Button onClick={() => handleClickOpen(product)} variant="contained" color="primary">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Quantity"
            fullWidth
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            margin="normal"
          />
          <TextField
            label="PO Number"
            fullWidth
            value={poNumber}
            onChange={(e) => setPoNumber(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default ProductList;