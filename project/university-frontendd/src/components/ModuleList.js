import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Collapse, Paper, Typography, Box, Button
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getAllModules } from '../Api';

function Row({ mod }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {/* Module name on the left */}
        <TableCell component="th" scope="row">
          <Link to={`/modules/${mod.code}`} style={{ textDecoration: 'none', fontWeight: 'bold' }}>
            {mod.full_name} ({mod.code})
          </Link>
        </TableCell>

        {/* Arrow on the right */}
        <TableCell align="right">
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={2} sx={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="subtitle1" gutterBottom component="div">
                Delivered to Cohorts:
              </Typography>
              {mod.delivered_to?.length > 0 ? (
                <ul>
                  {mod.delivered_to.map((cohortUrl) => {
                    const cohortId = cohortUrl.split('/').filter(Boolean).pop();
                    return (
                      <li key={cohortId}>
                        <Link to={`/cohorts/${cohortId}/modules`}>
                          {cohortId}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No cohorts found.
                </Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function ModuleList() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    getAllModules()
      .then(res => setModules(res.data))
      .catch(err => console.error('Failed to fetch modules:', err));
  }, []);

  return (
    <Box p={3}>
      <Box textAlign="center" mb={2}>
        <Typography variant="h4" fontWeight="bold">
          All Modules
        </Typography>
        <Button variant="contained" component={Link} to="/modules/create" sx={{ mt: 2 }}>
          Create New Module
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell><h2>Module</h2></TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {modules.map((mod) => (
              <Row key={mod.code} mod={mod} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ModuleList;
