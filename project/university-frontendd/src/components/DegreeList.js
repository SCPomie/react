import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDegrees } from '../Api';

import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Box,
  Paper,
} from '@mui/material';

function DegreeList() {
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    getDegrees()
      .then((res) => setDegrees(res.data))
      .catch((err) => console.error(err));
  }, []);

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
        List Of All Degrees
      </Typography>

      <Paper
        elevation={3}
        sx={{
          backgroundColor: '#f5f5f5',
          padding: 2,
          borderRadius: 2,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <List>
          {degrees.map((d) => (
            <ListItem key={d.id} disablePadding>
              <ListItemButton component={Link} to={`/degrees/${d.shortcode}`}>
                <ListItemText primary={d.shortcode} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box mt={3}>
        <Button variant="contained" component={Link} to="/create-degree">
          Create New Degree
        </Button>
      </Box>
    </Box>
  );
}

export default DegreeList;
