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
  TextField,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import VerifiedIcon from '@mui/icons-material/Verified';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'personal', label: 'Personal' },
  { value: 'financial', label: 'Financial' },
  { value: 'medical', label: 'Medical' },
  { value: 'professional', label: 'Professional' },
  { value: 'other', label: 'Other' }
];

const DataList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real application, you would fetch this data from the server
        // For now, we'll simulate this with a timeout
        setTimeout(() => {
          const mockData = [
            {
              _id: '1',
              title: 'Personal ID Document',
              description: 'Passport and ID documents',
              category: 'personal',
              dateCreated: new Date(),
              blockchainVerified: true,
              tags: ['important', 'id', 'passport']
            },
            {
              _id: '2',
              title: 'Insurance Policy',
              description: 'Health and life insurance policy details',
              category: 'financial',
              dateCreated: new Date(Date.now() - 86400000),
              blockchainVerified: true,
              tags: ['insurance', 'health']
            },
            {
              _id: '3',
              title: 'Medical Records',
              description: 'Latest medical checkup results',
              category: 'medical',
              dateCreated: new Date(Date.now() - 172800000),
              blockchainVerified: false,
              tags: ['medical', 'health', 'checkup']
            },
            {
              _id: '4',
              title: 'Resume',
              description: 'Updated professional resume',
              category: 'professional',
              dateCreated: new Date(Date.now() - 259200000),
              blockchainVerified: false,
              tags: ['work', 'cv']
            },
            {
              _id: '5',
              title: 'Tax Documents',
              description: 'Tax returns and related documents',
              category: 'financial',
              dateCreated: new Date(Date.now() - 345600000),
              blockchainVerified: true,
              tags: ['finance', 'tax', 'important']
            }
          ];
          
          setData(mockData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = data.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory = category === 'all' || item.category === category;
    
    return matchesSearch && matchesCategory;
  });

  const handleDeleteItem = (id) => {
    // In a real application, you would delete the item via API
    setData(data.filter(item => item._id !== id));
  };

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
          My Data Vault
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Securely store and manage your personal data
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" component="h2">
            Data Items
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

        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by title, description or tags"
              value={search}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              variant="outlined"
              value={category}
              onChange={handleCategoryChange}
              InputProps={{
                startAdornment: <FilterListIcon color="action" sx={{ mr: 1 }} />
              }}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Verified</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body1" sx={{ py: 2 }}>
                      No data items found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item._id}>
                      <TableCell component="th" scope="row">
                        <Box>
                          <Typography variant="subtitle1">{item.title}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {item.description}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.category}
                          color="primary"
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(item.dateCreated).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {item.blockchainVerified ? (
                          <Chip
                            icon={<VerifiedIcon />}
                            label="Verified"
                            color="success"
                            size="small"
                          />
                        ) : (
                          <Chip
                            label="Not Verified"
                            variant="outlined"
                            size="small"
                          />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          component={RouterLink}
                          to={`/data/${item._id}`}
                          size="small"
                          sx={{ mr: 1 }}
                        >
                          View
                        </Button>
                        <IconButton
                          component={RouterLink}
                          to={`/data/edit/${item._id}`}
                          size="small"
                          color="primary"
                          sx={{ mr: 1 }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteItem(item._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default DataList;
