import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import classes from '../layout/mainNav.module.css';
import {Link} from "react-router-dom";

export default function MainNavigation() {
  
  const logo = require('../../Assets/blacklogo.PNG');
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: 'black' }} className={classes.navbar} position="fixed">
        <Toolbar>
          <Link to="/"><img width="63" src={logo} /></Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <p className={classes.logotext}>CineFra</p>
          </Typography>
          <Link to="/loginregpage"><Button color="inherit" style={{
        borderColor: "red",
        color: "#000",
        backgroundColor: "white",
        fontWeight: "bold"
    }}
    variant="contained">Login/Register</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}