import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Paper,
  Divider,
  CircularProgress,
  Chip,
  Link
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import StorageIcon from '@mui/icons-material/Storage';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalItems: 0,
    verifiedItems: 0,
    sharedItems: 0
  });
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, you would fetch this data from the server
        // For now, we'll simulate this with a timeout
        setTimeout(() => {
          setStats({
            totalItems: 12,
            verifiedItems: 5,
            sharedItems: 2
          });
          
          setRecentItems([
            {
              _id: '1',
              title: 'Personal ID Document',
              category: 'personal',
              dateCreated: new Date(),
              blockchainVerified: true
            },
            {
              _id: '2',
              title: 'Insurance Policy',
              category: 'financial',
              dateCreated: new Date(Date.now() - 86400000), // 1 day ago
              blockchainVerified: true
            },
            {
              _id: '3',
              title: 'Medical Records',
              category: 'medical',
              dateCreated: new Date(Date.now() - 172800000), // 2 days ago
              blockchainVerified: false
            }
          ]);
          
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {currentUser?.name || 'User'}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage and secure your personal data with blockchain verification
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                mb={2}
              >
                <StorageIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Total Data Items
                </Typography>
              </Box>
              <Typography variant="h3" component="div" color="primary">
                {stats.totalItems}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={RouterLink}
                to="/data"
              >
                View All
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                mb={2}
              >
                <SecurityIcon color="success" fontSize="large" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Blockchain Verified
                </Typography>
              </Box>
              <Typography variant="h3" component="div" color="success.main">
                {stats.verifiedItems}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={RouterLink}
                to="/data"
              >
                Verify More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                mb={2}
              >
                <LockIcon color="info" fontSize="large" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Shared Items
                </Typography>
              </Box>
              <Typography variant="h3" component="div" color="info.main">
                {stats.sharedItems}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={RouterLink}
                to="/data"
              >
                Manage Sharing
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Items */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" component="h2">
            Recently Added Items
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            component={RouterLink}
            to="/data/add"
          >
            Add New Data
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />
        
        {recentItems.length === 0 ? (
          <Typography variant="body1" color="textSecondary" align="center" sx={{ py: 4 }}>
            No data items yet. Add your first item to get started.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {recentItems.map((item) => (
              <Grid item xs={12} key={item._id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="h6" component="div">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(item.dateCreated).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box>
                        <Chip
                          label={item.category}
                          color="primary"
                          variant="outlined"
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <Chip
                          icon={<SecurityIcon />}
                          label={item.blockchainVerified ? "Verified" : "Not Verified"}
                          color={item.blockchainVerified ? "success" : "default"}
                          variant="outlined"
                          size="small"
                        />
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      component={RouterLink}
                      to={`/data/${item._id}`}
                    >
                      View Details
                    </Button>
                    {!item.blockchainVerified && (
                      <Button
                        size="small"
                        color="success"
                      >
                        Verify on Blockchain
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Quick Actions */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" mb={2}>
          Quick Actions
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Button
              variant="outlined"
              fullWidth
              component={RouterLink}
              to="/data/add"
              sx={{ py: 2 }}
            >
              Add New Data
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="outlined"
              fullWidth
              component={RouterLink}
              to="/profile"
              sx={{ py: 2 }}
            >
              Update Profile
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="outlined"
              fullWidth
              component={RouterLink}
              to="/data"
              sx={{ py: 2 }}
            >
              Manage Data Vault
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;
