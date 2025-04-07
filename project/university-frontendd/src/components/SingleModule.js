import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getModuleByCode } from '../Api';
import axios from 'axios';
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Paper,
} from '@mui/material';

function SingleModule() {
  const { moduleCode } = useParams();
  const [module, setModule] = useState(null);
  const [cohorts, setCohorts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getModuleByCode(moduleCode)
      .then(res => {
        setModule(res.data);

        const urls = res.data.delivered_to;
        Promise.all(urls.map(url => axios.get(url).then(res => res.data)))
          .then(cohortData => setCohorts(cohortData))
          .catch(err => console.error('Error fetching cohorts:', err));
      })
      .catch(err => console.error('Error fetching module:', err));
  }, [moduleCode]);

  if (!module) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Module: {module.full_name} ({module.code})
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Description section */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 4,
          backgroundColor: '#f0f4ff',
          borderLeft: '5px solid #3f51b5',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography>
          {module.code} — {module.full_name}
        </Typography>
      </Paper>

      {/* Delivered to section */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 4,
          backgroundColor: '#f0f4ff',
          borderLeft: '5px solid #3f51b5',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Delivered To
        </Typography>
        <List>
          {cohorts.map(cohort => (
            <ListItem key={cohort.id} disablePadding>
              <ListItemText primary={cohort.name} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Button to view students */}
      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/modules/${module.code}/students`)}
        >
          View All Students in this Class
        </Button>
      </Box>
    </Box>
  );
}

export default SingleModule;
