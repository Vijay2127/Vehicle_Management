import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // <--- ADD THIS IMPORT
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import React from 'react';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // <--- ADD THIS HOOK

  const handleLogout = () => {
    logout();
    navigate('/login'); // <--- ADD NAVIGATION AFTER LOGOUT
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Vehicle Management System
        </Typography>
        <Button color="inherit" onClick={handleLogout}> {/* <--- UPDATE THIS */}
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;