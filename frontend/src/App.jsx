
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import VehicleList from './components/vehicles/VehicleList';
import CheckIn from './components/vehicles/CheckIn';
import CheckOut from './components/vehicles/CheckOut';
import VendorList from './components/vendors/VendorList';
import AddVendor from './components/vendors/AddVendor';
import ProductList from './components/products/ProductList';
import AddProduct from './components/products/AddProduct';


const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
             
                <Dashboard />
              
            }
          >
            

            <Route path="vehicles" element={<VehicleList />} />
            <Route path="vehicles/checkin" element={<CheckIn />} />
            <Route path="vehicles/checkout/:id" element={<CheckOut />} />
            <Route path="vendors" element={<VendorList />} />
            <Route path="vendors/add" element={<AddVendor />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route index element={<Navigate to="vehicles" />} />
          </Route>
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      
    </AuthProvider>
  );
};

export default App;