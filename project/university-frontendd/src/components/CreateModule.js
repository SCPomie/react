import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCohorts, createModule } from '../Api';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Box,
  Chip
} from '@mui/material';

function CreateModule() {
  const [code, setCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [caSplit, setCaSplit] = useState('');
  const [deliveredTo, setDeliveredTo] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCohorts()
      .then(res => setCohorts(res.data))
      .catch(err => console.error('Failed to load cohorts:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const BASE_COHORT_URL = 'http://127.0.0.1:8000/api/cohort/';
    const formattedDeliveredTo = deliveredTo.map(id => `${BASE_COHORT_URL}${id}/`);

    const newModule = {
      code,
      full_name: fullName,
      ca_split: parseInt(caSplit),
      delivered_to: formattedDeliveredTo
    };

    createModule(newModule)
      .then(() => navigate('/modules'))
      .catch(err => console.error('Error creating module:', err));
  };

  const handleDeliveredToChange = (event) => {
    const { value } = event.target;
    setDeliveredTo(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create New Module
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="CA Split (0-100)"
            value={caSplit}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || (/^\d+$/.test(val) && +val >= 0 && +val <= 100)) {
                setCaSplit(val);
              }
            }}
            margin="normal"
            required
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              style: {
                MozAppearance: 'textfield'
              }
            }}
            sx={{
              '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                WebkitAppearance: 'none',
                margin: 0
              }
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Delivered To (Cohorts)</InputLabel>
            <Select
              multiple
              value={deliveredTo}
              onChange={handleDeliveredToChange}
              input={<OutlinedInput label="Delivered To (Cohorts)" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((id) => {
                    const cohort = cohorts.find(c => c.id === id);
                    return (
                      <Chip key={id} label={`${cohort?.name} (${cohort?.id})`} />
                    );
                  })}
                </Box>
              )}
            >
              {cohorts.map((cohort) => (
                <MenuItem key={cohort.id} value={cohort.id}>
                  {cohort.name} ({cohort.id})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: 2 }}
          >
            Create Module
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default CreateModule;

