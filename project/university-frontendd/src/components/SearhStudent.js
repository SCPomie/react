import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

function SearchStudent() {
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentId.trim()) {
      navigate(`/students/${studentId}`);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, margin: '40px auto' }}>
      <Typography variant="h4" gutterBottom align="center">
        Search Student by ID
      </Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} justifyContent="center">
        <TextField
          label="Student ID"
          variant="outlined"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <Button variant="contained" type="submit">
          Search
        </Button>
      </Box>
    </Paper>
  );
}

export default SearchStudent;
