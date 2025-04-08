import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Paper, Box, CircularProgress } from '@mui/material';
import React from 'react';

const CheckOut = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(`/api/vehicles/${id}`);
        setVehicle(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  const handleCheckout = async () => {
    try {
      await axios.put(`/api/vehicles/${id}/checkout`);
      navigate('/dashboard/vehicles');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <CircularProgress />;
  if (!vehicle) return <Typography>Vehicle not found</Typography>;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Check Out Vehicle - {vehicle.vehicleNumber}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography>DC Number: {vehicle.dcNumber}</Typography>
        <Typography>PO Number: {vehicle.poNumber}</Typography>
        <Typography>
          Checked In: {new Date(vehicle.checkInTime).toLocaleString()}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="error"
        onClick={handleCheckout}
        sx={{ mt: 3 }}
      >
        Confirm Check Out
      </Button>
    </Paper>
  );
};

export default CheckOut;