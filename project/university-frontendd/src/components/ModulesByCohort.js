import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getModulesByCohort } from '../Api';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function ModulesByCohort() {
  const { cohortId } = useParams();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    getModulesByCohort(cohortId)
      .then(res => setModules(res.data))
      .catch(err => console.error('Error loading modules:', err));
  }, [cohortId]);

  return (
    <div style={{ padding: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>
            Modules Delivered to {cohortId}
        </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="modules table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Module Code</strong></TableCell>
              <TableCell><strong>Module Name</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modules.map((mod) => (
              <TableRow key={mod.code}>
                <TableCell>
                  <Link to={`/modules/${mod.code}`} style={{ textDecoration: 'none', color: 'blue' }}>
                    {mod.code}
                  </Link>
                </TableCell>
                <TableCell>{mod.full_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
