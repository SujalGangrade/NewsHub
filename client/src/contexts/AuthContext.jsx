import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Verify token with server
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.post('/api/auth/verify');
      setIsAuthenticated(true);
      setUser(response.data.data.admin);
    } catch (error) {
      localStorage.removeItem('adminToken');
      delete axios.defaults.headers.common['Authorization'];
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      const { token, admin } = response.data.data;
      
      localStorage.setItem('adminToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
      setUser(admin);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const createAdmin = async (adminData) => {
    try {
      const response = await axios.post('/api/auth/create-admin', adminData);
      return { success: true, data: response.data.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create admin' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    createAdmin,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};