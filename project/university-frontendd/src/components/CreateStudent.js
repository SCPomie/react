import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStudent, getCohorts, getModulesByCohort, createGrade } from '../Api';
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Box,
} from '@mui/material';

function CreateStudent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cohort, setCohort] = useState('');
  const [cohorts, setCohorts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCohorts()
      .then(res => setCohorts(res.data))
      .catch(err => console.error('Failed to load cohorts:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStudent = {
      first_name: firstName,
      last_name: lastName,
      cohort: `http://127.0.0.1:8000/api/cohort/${cohort}/`,
    };

    try {
      const res = await createStudent(newStudent);
      const studentId = res.data.student_id;

      // Get all modules for the selected cohort
      const modulesRes = await getModulesByCohort(cohort);
      const modules = modulesRes.data;

      // Create an empty grade entry for each module
      await Promise.all(modules.map(mod =>
        createGrade({
          student: `http://127.0.0.1:8000/api/student/${studentId}/`,
          module: `http://127.0.0.1:8000/api/module/${mod.code}/`,
          cohort: `http://127.0.0.1:8000/api/cohort/${cohort}/`,
          grade: ""  // Or use null or 0 if your backend expects a value
        })
      ));

      navigate(`/students/${studentId}`);
    } catch (err) {
      console.error('Error creating student or grades:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create New Student
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            select
            label="Cohort"
            value={cohort}
            onChange={(e) => setCohort(e.target.value)}
            required
            fullWidth
          >
            <MenuItem value="">Select Cohort</MenuItem>
            {cohorts.map(co => (
              <MenuItem key={co.id} value={co.id}>
                {co.name}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Create Student
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateStudent;
