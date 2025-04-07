import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDegree } from '../Api';

import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
} from '@mui/material';

function CreateDegree() {
  const [fullName, setFullName] = useState('');
  const [shortcode, setShortcode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    createDegree({
      full_name: fullName,
      shortcode: shortcode,
    })
      .then(() => {
        navigate('/degrees'); // Redirect to degrees page
      })
      .catch((err) => {
        console.error('Failed to create degree:', err);
        alert('Something went wrong. Please try again.');
      });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Create New Degree
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            fullWidth
            required
            margin="normal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            label="Shortcode"
            fullWidth
            required
            margin="normal"
            value={shortcode}
            onChange={(e) => setShortcode(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Create Degree
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default CreateDegree;

