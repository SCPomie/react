import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { createCohort, getDegrees } from '../Api';

export default function CreateCohort() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [degree, setDegree] = useState('');
  const [degrees, setDegrees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getDegrees()
      .then((res) => setDegrees(res.data))
      .catch((err) => console.error('Error fetching degrees:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createCohort({ id, name, year, degree })
      .then(() => navigate('/cohorts'))
      .catch((err) => {
        console.error('Failed to create cohort:', err);
        alert('Something went wrong. Please try again.');
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create New Cohort
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Cohort ID"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <TextField
            label="Cohort Name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Year"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <FormControl fullWidth required margin="normal">
            <InputLabel id="degree-label">Degree</InputLabel>
            <Select
              labelId="degree-label"
              value={degree}
              label="Degree"
              onChange={(e) => setDegree(e.target.value)}
            >
              {degrees.map((deg) => (
                <MenuItem key={deg.shortcode} value={`http://127.0.0.1:8000/api/degree/${deg.shortcode}/`}>
                  {deg.shortcode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            CREATE COHORT
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

