import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import classes from '../layout/mainNav.module.css';
import {Link} from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';

export default function MainNavigation() {
  
  const logo = require('../../Assets/blacklogo.PNG');
  var name = "";
  var isLogged = false;
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [anchorEl, setAnchorEl] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
    setAnchorEl(null);
  }

  var adminOpt = "";
  var navigate = useNavigate();

  if(loggedUser !== null){
    name = loggedUser.name;
    isLogged = true;
    var role = loggedUser.role;
    if(role === "admin"){
      adminOpt = <Link to="/admin"><MenuItem className={classes["dropDown"]} onClick={handleClick}>Admin Panel</MenuItem></Link>
    }

  }

  if(isLogged === false){
    return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: 'black' }} className={classes.navbar} position="fixed">
        <Toolbar>
          <Link to="/"><img width="63" src={logo} /></Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <p className={classes.logotext}>CineFra</p>
          </Typography>
    <div>
    <Link to="/loginregpage"><Button style={{ backgroundColor: "white", color: "black", fontWeight: "bold" }} className={classes.buttonStyle}
  id="fade-button"
  aria-controls={open ? 'fade-menu' : undefined}
  aria-haspopup="true"
  aria-expanded={open ? 'true' : undefined}
  onClick={handleClick}
  variant="contained">
  Login/Register</Button></Link>
    </div>
        </Toolbar>
      </AppBar>
    </Box>

    );
  }else{
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: 'black' }} className={classes.navbar} position="fixed">
        <Toolbar>
          <Link to="/"><img width="63" src={logo} /></Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <p className={classes.logotext}>CineFra</p>
          </Typography>
    <div>
    <Button style={{ backgroundColor: "white", color: "black", fontWeight: "bold" }} className={classes.buttonStyle}
    id="fade-button"
    aria-controls={open ? 'fade-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
    onClick={handleClick}
    variant="contained">
    {name}</Button>      
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem className={classes["dropDown"]} onClick={handleClose}><Link to="/myProfile">My Profile</Link></MenuItem>
        <MenuItem className={classes["dropDown"]} onClick={handleClose}><Link to="/reservations">My Reservations</Link></MenuItem>
        {adminOpt}
        <MenuItem className={classes["dropDown"]} onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
        </Toolbar>
      </AppBar>
    </Box>
    );
  }
}