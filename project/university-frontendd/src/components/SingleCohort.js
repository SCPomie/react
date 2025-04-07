import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCohortById, getStudentsByCohort } from '../Api';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

function SingleCohort() {
  const { cohortId } = useParams();
  const [cohort, setCohort] = useState(null);
  const [students, setStudents] = useState([]);
  const [degreeName, setDegreeName] = useState('');

  useEffect(() => {
    getCohortById(cohortId)
      .then((res) => {
        setCohort(res.data);
        if (res.data.degree) {
          fetch(res.data.degree)
            .then((res) => res.json())
            .then((data) => setDegreeName(data.full_name))
            .catch((err) => console.error('Error fetching degree:', err));
        }
      })
      .catch((err) => console.error('Error fetching cohort:', err));

    getStudentsByCohort(cohortId)
      .then((res) => setStudents(res.data))
      .catch((err) => console.error('Error fetching students:', err));
  }, [cohortId]);

  if (!cohort) return <Typography>Loading cohort info...</Typography>;

  return (
    <Box
      sx={{
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Cohort: {cohort.name}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Year: {cohort.year}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Degree: {degreeName || 'Loading degree...'}
      </Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Students
      </Typography>

      <TableContainer
        component={Paper}
        elevation={6}
        sx={{
          maxWidth: 1000,
          width: '100%',
          padding: 2,
          backgroundColor: '#f9f9fb',
          borderRadius: 2,
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>First Name</strong></TableCell>
              <TableCell><strong>Last Name</strong></TableCell>
              <TableCell><strong>Student ID</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.student_id}
                hover
                sx={{
                  '&:hover': {
                    backgroundColor: '#eef2ff',
                  },
                }}
              >
                <TableCell>{student.first_name}</TableCell>
                <TableCell>{student.last_name}</TableCell>
                <TableCell>{student.student_id}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    component={Link}
                    to={`/students/${student.student_id}`}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={4}>
        <Button
          variant="contained"
          component={Link}
          to={`/cohorts/${cohortId}/modules`}
        >
          View Modules for this Cohort
        </Button>
      </Box>
    </Box>
  );
}

export default SingleCohort;
