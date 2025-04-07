import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCohortByDegree } from '../Api';

import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

function DegreeDetails() {
  const { degreeName } = useParams();
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    getCohortByDegree(degreeName)
      .then(res => setCohorts(res.data))
      .catch(err => console.error(err));
  }, [degreeName]);

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
        Degree: {degreeName}
      </Typography>

      <Typography variant="h5" gutterBottom>
        Cohorts:
      </Typography>

      <Paper
        elevation={3}
        sx={{
          backgroundColor: '#f5f5f5',
          padding: 2,
          borderRadius: 2,
          width: '100%',
          maxWidth: 500,
        }}
      >
        <List>
          {cohorts.map((c) => (
            <ListItem key={c.id} disablePadding>
              <ListItemButton component={Link} to={`/cohorts/${c.id}`}>
                <ListItemText primary={`${c.name} (${c.year})`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default DegreeDetails;
