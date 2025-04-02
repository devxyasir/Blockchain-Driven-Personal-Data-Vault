import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
  Divider,
  CircularProgress,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Tooltip,
  Stack
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import axios from 'axios';

const DataDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataItem, setDataItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const fetchDataItem = async () => {
      try {
        // In a real application, you would fetch this data from the server
        // For now, we'll simulate this with a timeout
        setTimeout(() => {
          const mockDataItem = {
            _id: id,
            title: 'Personal ID Document',
            description: 'Passport and ID documents with all personal details.',
            category: 'personal',
            data: 'This is encrypted sensitive data that would typically be securely stored and encrypted.',
            dateCreated: new Date(),
            lastUpdated: new Date(),
            isEncrypted: true,
            blockchainVerified: id === '1' || id === '2' || id === '5',
            blockchainHash: id === '1' || id === '2' || id === '5' ? '0x71c7656ec7ab88b098defb751b7401b5f6d8976f' : null,
            blockchainTxId: id === '1' || id === '2' || id === '5' ? '0x34a946f0bc23e1f282bffafc74a1bb1d62f723de5a0035a6a80d7854aac22d9d' : null,
            tags: ['important', 'id', 'passport'],
            accessControl: [
              {
                user: {
                  _id: 'user123',
                  name: 'Jane Doe',
                  email: 'jane@example.com'
                },
                accessLevel: 'read',
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
              }
            ]
          };
          
          setDataItem(mockDataItem);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data item:', error);
        setError('Failed to load data item');
        setLoading(false);
      }
    };

    fetchDataItem();
  }, [id]);

  const handleDeleteClick = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleConfirmDelete = async () => {
    try {
      // In a real application, you would delete via API
      // await axios.delete(`/api/data/${id}`);
      
      setOpenDelete(false);
      navigate('/data');
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete data item');
    }
  };

  const handleVerifyOnBlockchain = async () => {
    setVerifying(true);
    
    try {
      // In a real application, you would call the API to verify on blockchain
      // await axios.post(`/api/blockchain/verify`, { dataId: id });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setDataItem({
        ...dataItem,
        blockchainVerified: true,
        blockchainHash: '0x71c7656ec7ab88b098defb751b7401b5f6d8976f',
        blockchainTxId: '0x34a946f0bc23e1f282bffafc74a1bb1d62f723de5a0035a6a80d7854aac22d9d'
      });
      
      setVerifying(false);
    } catch (error) {
      console.error('Error verifying on blockchain:', error);
      setError('Failed to verify on blockchain');
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          component={RouterLink}
          to="/data"
          sx={{ mt: 2 }}
        >
          Back to Data List
        </Button>
      </Container>
    );
  }

  if (!dataItem) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning">Data item not found</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          component={RouterLink}
          to="/data"
          sx={{ mt: 2 }}
        >
          Back to Data List
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Button
        startIcon={<ArrowBackIcon />}
        component={RouterLink}
        to="/data"
        sx={{ mb: 3 }}
      >
        Back to Data List
      </Button>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4" component="h1">
            {dataItem.title}
          </Typography>
          
          <Box>
            <Button
              color="primary"
              startIcon={<EditIcon />}
              component={RouterLink}
              to={`/data/edit/${id}`}
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <Button
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle1" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" paragraph>
              {dataItem.description}
            </Typography>
            
            <Typography variant="subtitle1" gutterBottom>
              Category
            </Typography>
            <Chip
              label={dataItem.category}
              color="primary"
              sx={{ mb: 2 }}
            />
            
            <Typography variant="subtitle1" gutterBottom>
              Data Content (Encrypted)
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mb: 2,
                backgroundColor: '#f5f5f5',
                fontFamily: 'monospace',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ filter: 'blur(4px)' }}>
                {dataItem.data}
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Chip
                  icon={<SecurityIcon />}
                  label="Encrypted Data"
                  color="success"
                />
              </Box>
            </Paper>
            
            <Typography variant="subtitle1" gutterBottom>
              Tags
            </Typography>
            <Box sx={{ mb: 3 }}>
              {dataItem.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  variant="outlined"
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3, backgroundColor: '#f8f9fa' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Data Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    Created:
                  </Typography>
                  <Typography variant="body1">
                    {new Date(dataItem.dateCreated).toLocaleDateString()} {new Date(dataItem.dateCreated).toLocaleTimeString()}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    Last Updated:
                  </Typography>
                  <Typography variant="body1">
                    {new Date(dataItem.lastUpdated).toLocaleDateString()} {new Date(dataItem.lastUpdated).toLocaleTimeString()}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    Encryption:
                  </Typography>
                  <Typography variant="body1">
                    {dataItem.isEncrypted ? 'Encrypted' : 'Not Encrypted'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            
            <Card sx={{ mb: 3, backgroundColor: dataItem.blockchainVerified ? '#e8f5e9' : '#fff' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Blockchain Verification
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {dataItem.blockchainVerified ? (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2
                      }}
                    >
                      <VerifiedUserIcon color="success" sx={{ fontSize: 40 }} />
                    </Box>
                    
                    <Alert severity="success" sx={{ mb: 2 }}>
                      This data is verified on blockchain
                    </Alert>
                    
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body2" color="textSecondary">
                        Hash:
                      </Typography>
                      <Tooltip title={dataItem.blockchainHash}>
                        <Typography
                          variant="body2"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontFamily: 'monospace'
                          }}
                        >
                          {dataItem.blockchainHash}
                        </Typography>
                      </Tooltip>
                    </Box>
                    
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body2" color="textSecondary">
                        Transaction ID:
                      </Typography>
                      <Tooltip title={dataItem.blockchainTxId}>
                        <Typography
                          variant="body2"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontFamily: 'monospace'
                          }}
                        >
                          {dataItem.blockchainTxId}
                        </Typography>
                      </Tooltip>
                    </Box>
                    
                    <Button
                      fullWidth
                      variant="outlined"
                      color="success"
                      sx={{ mt: 1 }}
                    >
                      View on Etherscan
                    </Button>
                  </>
                ) : (
                  <>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      This data is not yet verified on blockchain
                    </Alert>
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      onClick={handleVerifyOnBlockchain}
                      disabled={verifying}
                    >
                      {verifying ? <CircularProgress size={24} /> : 'Verify on Blockchain'}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1
                  }}
                >
                  <Typography variant="h6">
                    Shared Access
                  </Typography>
                  <Button
                    startIcon={<ShareIcon />}
                    size="small"
                  >
                    Share
                  </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                {dataItem.accessControl.length > 0 ? (
                  <Stack spacing={1}>
                    {dataItem.accessControl.map((access, index) => (
                      <Box key={index} sx={{ p: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                        <Typography variant="subtitle2">
                          {access.user.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {access.user.email}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                          <Chip
                            label={access.accessLevel}
                            size="small"
                            color={
                              access.accessLevel === 'admin'
                                ? 'error'
                                : access.accessLevel === 'write'
                                ? 'warning'
                                : 'info'
                            }
                          />
                          <Typography variant="caption">
                            Expires: {new Date(access.expiresAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="body2" color="textSecondary" align="center">
                    No shared access
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
      >
        <DialogTitle>Delete Data Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{dataItem.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DataDetail;
