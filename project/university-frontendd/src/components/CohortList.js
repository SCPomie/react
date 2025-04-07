import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCohorts } from '../Api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography
} from '@mui/material';

function CohortList() {
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    getCohorts()
      .then((res) => setCohorts(res.data))
      .catch((err) => console.error('Failed to fetch cohorts:', err));
  }, []);

  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        All Cohorts
      </Typography>

      <TableContainer
        component={Paper}
        elevation={3}
        style={{
          maxWidth: 600,
          width: '100%',
          marginBottom: '1rem',
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Cohort Name</strong></TableCell>
              <TableCell align="right"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cohorts.map((cohort) => (
              <TableRow
                key={cohort.id}
                hover
                sx={{
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: '#f0f4ff',
                  },
                }}
              >
                <TableCell>{cohort.name}</TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    to={`/cohorts/${cohort.id}`}
                    variant="outlined"
                    size="small"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/create-cohort"
      >
        Create New Cohort
      </Button>
    </div>
  );
}

export default CohortList;
