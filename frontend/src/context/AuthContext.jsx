

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
// import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  // const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const res = await axios.post('/api/auth/login', { username, password },
        {
          withCredentials: true
        }
        
      );
     
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      // await loadUser();
      return true;
      // navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      throw err;
    }
  };

  

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    // navigate('/login');
  };

  const loadUser = async () => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      try {
        const res = await axios.get('/api/auth/user');
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

 

  useEffect(() => {
    loadUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);