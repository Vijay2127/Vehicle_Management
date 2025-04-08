import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, Chip 
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get('/api/vehicles');
        setVehicles(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVehicles();
  }, []);

  const handleCheckout = async (id) => {
    try {
      await axios.put(`/api/vehicles/${id}/checkout`);
      setVehicles(vehicles.map(vehicle => 
        vehicle._id === id ? { ...vehicle, status: 'checked-out' } : vehicle
      ));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Button 
        component="a" 
        href="/dashboard/vehicles/checkin" 
        variant="contained" 
        sx={{ mb: 2 }}
      >
        Check In Vehicle
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vehicle Number</TableCell>
            <TableCell>DC Number</TableCell>
            <TableCell>PO Number</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle._id}>
              <TableCell>{vehicle.vehicleNumber}</TableCell>
              <TableCell>{vehicle.dcNumber}</TableCell>
              <TableCell>{vehicle.poNumber}</TableCell>
              <TableCell>
                {vehicle.status === 'checked-in' ? (
                  <Chip icon={<CheckCircle />} label="Checked In" color="success" />
                ) : (
                  <Chip icon={<Cancel />} label="Checked Out" color="error" />
                )}
              </TableCell>
              <TableCell>
                {vehicle.status === 'checked-in' && (
                  <Button 
                    variant="outlined" 
                    onClick={() => handleCheckout(vehicle._id)}
                  >
                    Check Out
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VehicleList;