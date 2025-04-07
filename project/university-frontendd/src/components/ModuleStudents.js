import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStudentsByModule, getSingleStudent } from '../Api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material';

function ModuleStudents() {
  const { moduleCode } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getStudentsByModule(moduleCode);
        const grades = res.data;

        const studentIds = grades.map(g =>
          g.student.split('/').filter(Boolean).pop()
        );
        const uniqueIds = [...new Set(studentIds)];

        const studentResponses = await Promise.all(
          uniqueIds.map(id => getSingleStudent(id))
        );
        const fullStudents = studentResponses.map(r => r.data);

        setStudents(fullStudents);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching students:', err);
        setLoading(false);
      }
    };

    fetchStudents();
  }, [moduleCode]);

  if (loading) return <p>Loading students...</p>;

  return (
    <Box sx={{ maxWidth: 1000, margin: 'auto', mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Students in Module: {moduleCode}
      </Typography>

      {students.length === 0 ? (
        <Typography align="center">No students found for this module.</Typography>
      ) : (
        <Paper elevation={6} sx={{ padding: 3, borderRadius: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
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
                {students.map(student => (
                  <TableRow
                    key={student.student_id}
                    hover
                    sx={{
                      transition: 'background-color 0.2s',
                      '&:hover': {
                        backgroundColor: '#f0f4ff',
                        cursor: 'pointer',
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
        </Paper>
      )}
    </Box>
  );
}

export default ModuleStudents;
