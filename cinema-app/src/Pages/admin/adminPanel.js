import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import classes from '../admin/adminPanel.module.css';
import {Link} from "react-router-dom";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import MovieIcon from '@mui/icons-material/Movie';
import AnimationIcon from '@mui/icons-material/Animation';
import {motion} from "framer-motion";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

export default function AdminPanel(){

    return (<motion.div className={classes.box}>
      <Grid container align="center" >
        <Grid item xs={12} md={12}>
          <div>
            <p className={classes.managtitle}>Administrator Panel Options <SettingsSuggestIcon /></p>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Link to={{ pathname: "/admin/customers" }}><div className={classes.managbox}>
            <p className={classes.managwrite}>Manage Customers <SupervisorAccountIcon /></p>
          </div>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
        <Link to={{ pathname: "/admin/movies" }}><div className={classes.managbox}>
            <p className={classes.managwrite}>Manage Movies <MovieIcon /></p>          </div></Link>
        </Grid>
        <Grid item xs={12} md={6}>
        <Link to={{ pathname: "/admin/genres" }}><div className={classes.managbox}>
            <p className={classes.managwrite}>Manage Genres <AnimationIcon /></p>          </div></Link>
        </Grid>
        <Grid item xs={12} md={6}>
        <Link to={{ pathname: "/admin/screenings" }}><div className={classes.managbox}>
            <p className={classes.managwrite}>Manage Screenings <SmartDisplayIcon /></p>        </div></Link>
        </Grid>
      </Grid>
    </motion.div>);
}