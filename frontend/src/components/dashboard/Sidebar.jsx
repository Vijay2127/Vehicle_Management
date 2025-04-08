import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, DirectionsCar, People, Inventory } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Vehicles', icon: <DirectionsCar />, path: '/dashboard/vehicles' },
    { text: 'Vendors', icon: <People />, path: '/dashboard/vendors' },
    { text: 'Products', icon: <Inventory />, path: '/dashboard/products' },
  ];

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem button key={item.text} component={Link} to={item.path}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;