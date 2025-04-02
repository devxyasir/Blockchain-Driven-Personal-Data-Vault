import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  TextField,
  Avatar,
  Tab,
  Tabs,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const { currentUser, updateProfile, updatePassword } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    walletAddress: currentUser?.walletAddress || '',
    avatar: currentUser?.avatar || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errors, setErrors] = useState({});

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }

    // Clear success message on change
    if (profileSuccess) {
      setProfileSuccess(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }

    // Clear success message on change
    if (passwordSuccess) {
      setPasswordSuccess(false);
    }
  };

  const validateProfile = () => {
    const newErrors = {};
    
    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    setErrors({
      ...errors,
      ...newErrors
    });
    
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
    }
    
    setErrors({
      ...errors,
      ...newErrors
    });
    
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess(false);
    
    if (!validateProfile()) {
      return;
    }
    
    setProfileLoading(true);
    
    try {
      // In a real application, you would update the profile via the API
      // const result = await updateProfile(profileData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setProfileLoading(false);
      setProfileSuccess(true);
    } catch (error) {
      setProfileLoading(false);
      setProfileError('Failed to update profile. Please try again.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);
    
    if (!validatePassword()) {
      return;
    }
    
    setPasswordLoading(true);
    
    try {
      // In a real application, you would update the password via the API
      // const result = await updatePassword(passwordData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPasswordLoading(false);
      setPasswordSuccess(true);
      
      // Reset password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    } catch (error) {
      setPasswordLoading(false);
      setPasswordError('Failed to update password. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        User Profile
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" paragraph>
        Manage your account and security settings
      </Typography>
      
      <Paper elevation={3} sx={{ mt: 3, borderRadius: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab
            icon={<AccountCircleIcon />}
            label="Profile Information"
            id="tab-0"
            aria-controls="tabpanel-0"
          />
          <Tab
            icon={<SecurityIcon />}
            label="Security Settings"
            id="tab-1"
            aria-controls="tabpanel-1"
          />
        </Tabs>
        
        <Box role="tabpanel" hidden={activeTab !== 0} id="tabpanel-0" aria-labelledby="tab-0" sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Box component="form" onSubmit={handleProfileSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      fontSize: 40,
                      bgcolor: 'primary.main'
                    }}
                    src={profileData.avatar}
                  >
                    {profileData.name.charAt(0).toUpperCase()}
                  </Avatar>
                </Grid>
                
                {profileSuccess && (
                  <Grid item xs={12}>
                    <Alert severity="success">
                      Profile updated successfully!
                    </Alert>
                  </Grid>
                )}
                
                {profileError && (
                  <Grid item xs={12}>
                    <Alert severity="error">
                      {profileError}
                    </Alert>
                  </Grid>
                )}
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="Full Name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    value={profileData.email}
                    disabled
                    helperText="Email cannot be changed"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="walletAddress"
                    name="walletAddress"
                    label="Ethereum Wallet Address"
                    value={profileData.walletAddress}
                    onChange={handleProfileChange}
                    placeholder="0x..."
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="avatar"
                    name="avatar"
                    label="Avatar URL"
                    value={profileData.avatar}
                    onChange={handleProfileChange}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </Grid>
                
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={profileLoading}
                    startIcon={profileLoading ? <CircularProgress size={20} /> : null}
                  >
                    {profileLoading ? 'Updating...' : 'Update Profile'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
        
        <Box role="tabpanel" hidden={activeTab !== 1} id="tabpanel-1" aria-labelledby="tab-1" sx={{ p: 3 }}>
          {activeTab === 1 && (
            <Box component="form" onSubmit={handlePasswordSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Change Password
                  </Typography>
                  <Divider sx={{ mb: 3, mt: 1 }} />
                </Grid>
                
                {passwordSuccess && (
                  <Grid item xs={12}>
                    <Alert severity="success">
                      Password updated successfully!
                    </Alert>
                  </Grid>
                )}
                
                {passwordError && (
                  <Grid item xs={12}>
                    <Alert severity="error">
                      {passwordError}
                    </Alert>
                  </Grid>
                )}
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    label="Current Password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    error={!!errors.currentPassword}
                    helperText={errors.currentPassword}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    label="New Password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword || 'Password must be at least 6 characters'}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    type="password"
                    label="Confirm New Password"
                    value={passwordData.confirmNewPassword}
                    onChange={handlePasswordChange}
                    error={!!errors.confirmNewPassword}
                    helperText={errors.confirmNewPassword}
                  />
                </Grid>
                
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={passwordLoading}
                    startIcon={passwordLoading ? <CircularProgress size={20} /> : null}
                  >
                    {passwordLoading ? 'Updating...' : 'Change Password'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
