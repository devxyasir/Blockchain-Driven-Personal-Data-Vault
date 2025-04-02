import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Paper,
  Divider
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import BlockIcon from '@mui/icons-material/BarChart';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import StorageIcon from '@mui/icons-material/Storage';
import { useAuth } from '../../contexts/AuthContext';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'Secure Storage',
      description: 'Your personal data is encrypted with industry-standard algorithms ensuring maximum security and privacy.'
    },
    {
      icon: <BlockIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'Blockchain Verification',
      description: 'Verify the integrity of your data using Ethereum blockchain technology for tamper-proof storage.'
    },
    {
      icon: <PrivacyTipIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'Privacy Control',
      description: 'Maintain complete control over your data with granular access permissions and sharing options.'
    },
    {
      icon: <StorageIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'Data Management',
      description: 'Easily organize, categorize, and search through your personal data vault.'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'primary.dark',
          color: '#fff',
          mb: 4,
          overflow: 'hidden',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
          height: { xs: '400px', md: '500px' }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
                height: { xs: '400px', md: '500px' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Typography component="h1" variant="h2" color="inherit" gutterBottom sx={{ fontWeight: 700 }}>
                Blockchain-Driven Personal Data Vault
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Secure your personal data with the power of blockchain technology
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                {isAuthenticated ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    component={RouterLink}
                    to="/dashboard"
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      component={RouterLink}
                      to="/register"
                    >
                      Get Started
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ color: 'white', borderColor: 'white' }}
                      size="large"
                      component={RouterLink}
                      to="/login"
                    >
                      Login
                    </Button>
                  </>
                )}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Features
        </Typography>
        <Typography variant="h6" textAlign="center" color="textSecondary" paragraph sx={{ mb: 6 }}>
          The ultimate solution for your personal data security needs
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
                  }
                }}
                elevation={2}
              >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                  {feature.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            How It Works
          </Typography>
          <Typography variant="h6" textAlign="center" color="textSecondary" paragraph sx={{ mb: 6 }}>
            Simple steps to secure your personal data
          </Typography>
          
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <img
                src="https://cdn.pixabay.com/photo/2019/01/31/20/52/web-3967926_1280.jpg"
                alt="Data security"
                style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}
                    >
                      1
                    </Box>
                    Create an Account
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Sign up with your email to create a secure account. Each account is automatically assigned a unique Ethereum wallet address.
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}
                    >
                      2
                    </Box>
                    Store Your Data
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Upload and organize your personal data in encrypted format for maximum security.
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}
                    >
                      3
                    </Box>
                    Verify with Blockchain
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Secure your data's integrity by verifying it on the Ethereum blockchain, ensuring it can't be tampered with.
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}
                    >
                      4
                    </Box>
                    Manage Access
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Control who can access your data with granular permissions and time-limited sharing options.
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom>
            Ready to secure your data?
          </Typography>
          <Typography variant="h6" paragraph>
            Join thousands of users who trust Blockchain Data Vault for their personal data security
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={RouterLink}
            to="/register"
            sx={{ mt: 2, px: 4, py: 1.5 }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
