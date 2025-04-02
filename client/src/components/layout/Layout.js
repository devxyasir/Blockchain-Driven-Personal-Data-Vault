import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import Alert from './Alert';

const Layout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Alert />
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
