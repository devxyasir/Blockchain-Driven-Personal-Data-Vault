import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Configure axios with token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  }, [token]);

  // Load user data if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('/api/auth/user');
        setCurrentUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading user', err);
        localStorage.removeItem('token');
        setToken(null);
        setCurrentUser(null);
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // Register a new user
  const register = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
      }
      
      return {
        success: true
      };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.msg || 'Registration failed'
      };
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const res = await axios.post('/api/auth/login', formData);
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
      }
      
      return {
        success: true
      };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.msg || 'Login failed'
      };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    navigate('/login');
  };

  // Update user profile
  const updateProfile = async (formData) => {
    try {
      const res = await axios.put('/api/users/profile', formData);
      setCurrentUser(res.data);
      
      return {
        success: true,
        data: res.data
      };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.msg || 'Failed to update profile'
      };
    }
  };

  // Update user password
  const updatePassword = async (formData) => {
    try {
      const res = await axios.put('/api/users/password', formData);
      
      return {
        success: true,
        msg: res.data.msg
      };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.msg || 'Failed to update password'
      };
    }
  };

  const value = {
    currentUser,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    updatePassword,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
