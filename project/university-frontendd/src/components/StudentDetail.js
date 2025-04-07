import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSingleStudent, getGradesByStudent } from '../Api';

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link as MuiLink,
  Button,
} from '@mui/material';

function StudentDetail() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    getSingleStudent(studentId)
      .then(res => setStudent(res.data))
      .catch(err => console.error('Error fetching student:', err));

    getGradesByStudent(studentId)
      .then(res => setGrades(res.data))
      .catch(err => console.error('Error fetching grades:', err));
  }, [studentId]);

  if (!student) return <Typography>Loading student info...</Typography>;

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
        {student.first_name} {student.last_name} ({student.student_id})
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Email: {student.email}
      </Typography>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Modules Registered & Grades
      </Typography>

      <TableContainer component={Paper} sx={{ maxWidth: 900 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}><strong>Module</strong></TableCell>
              <TableCell sx={{ color: 'white' }}><strong>CA Mark</strong></TableCell>
              <TableCell sx={{ color: 'white' }}><strong>Exam Mark</strong></TableCell>
              <TableCell sx={{ color: 'white' }}><strong>Total</strong></TableCell>
              <TableCell sx={{ color: 'white' }}><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grades.map((grade) => {
              const moduleCode = grade.module.split('/').filter(Boolean).pop();
              const studentId = grade.student.split('/').filter(Boolean).pop();
              const cohortId = grade.cohort?.split('/').filter(Boolean).pop();

              return (
                <TableRow 
                  key={grade.id}
                  hover
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <TableCell>
                    <MuiLink component={Link} to={`/modules/${moduleCode}`}>
                      {moduleCode}
                    </MuiLink>
                  </TableCell>
                  <TableCell>{grade.ca_mark}</TableCell>
                  <TableCell>{grade.exam_mark}</TableCell>
                  <TableCell>{grade.total_grade}</TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/set-grade?student=${studentId}&module=${moduleCode}&cohort=${cohortId}`}
                      variant="outlined"
                      size="small"
                    >
                      Set Grade
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default StudentDetail;
