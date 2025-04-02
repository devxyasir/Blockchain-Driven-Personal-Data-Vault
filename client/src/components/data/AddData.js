import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  Switch,
  FormControlLabel,
  CircularProgress,
  Chip,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import axios from 'axios';

const categories = [
  { value: 'personal', label: 'Personal' },
  { value: 'financial', label: 'Financial' },
  { value: 'medical', label: 'Medical' },
  { value: 'professional', label: 'Professional' },
  { value: 'other', label: 'Other' }
];

const AddData = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    data: '',
    isEncrypted: true,
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const { title, description, category, data, isEncrypted, tags } = formData;

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'isEncrypted' ? checked : value
    });

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: tags.filter(tag => tag !== tagToRemove)
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!category) {
      newErrors.category = 'Category is required';
    }
    
    if (!data.trim()) {
      newErrors.data = 'Data content is required';
    }
    
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validate()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real application, you would submit the form data to your API
      // await axios.post('/api/data', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLoading(false);
      navigate('/data');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.msg || 'Failed to add data. Please try again.');
    }
  };

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
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Data
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          Securely store your personal data with blockchain verification
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={title}
                onChange={handleChange}
                error={!!formErrors.title}
                helperText={formErrors.title}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={2}
                value={description}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl required fullWidth error={!!formErrors.category}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={category}
                  label="Category"
                  onChange={handleChange}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.category && (
                  <FormHelperText>{formErrors.category}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="data"
                name="data"
                label="Data Content"
                multiline
                rows={6}
                value={data}
                onChange={handleChange}
                error={!!formErrors.data}
                helperText={formErrors.data}
                InputProps={{
                  startAdornment: isEncrypted ? (
                    <SecurityIcon color="success" sx={{ mr: 1 }} />
                  ) : null
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isEncrypted}
                    onChange={handleChange}
                    name="isEncrypted"
                    color="success"
                  />
                }
                label="Encrypt Data"
              />
              {isEncrypted && (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Your data will be encrypted for enhanced security
                </Typography>
              )}
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <InputLabel>Tags</InputLabel>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TextField
                    fullWidth
                    id="tagInput"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyPress={handleTagInputKeyPress}
                    placeholder="Add tags to organize your data"
                    sx={{ mr: 1 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTag}
                    disabled={!tagInput.trim()}
                    startIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleRemoveTag(tag)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  component={RouterLink}
                  to="/data"
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {loading ? 'Saving...' : 'Save Data'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddData;
