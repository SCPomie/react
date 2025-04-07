import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Button color="inherit" component={Link} to="/"><h3>University Management System</h3></Button>
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/degrees">Degree</Button>
          <Button color="inherit" component={Link} to="/cohorts">Cohorts</Button>
          <Button color="inherit" component={Link} to="/modules">Modules</Button>
          <Button color="inherit" component={Link} to="/search-student">Student</Button>
          <Button color="inherit" component={Link} to="/students/create">Create Student</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
