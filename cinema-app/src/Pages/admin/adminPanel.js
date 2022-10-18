import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import classes from '../admin/adminPanel.module.css';

export default function AdminPanel(){

    return (<Box className={classes.box}>
      <Grid container >
        <Grid item xs={12} md={12}>
          <div>
                <p className={classes.managwrite}>Administrator Panel Options</p>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.managbox}>
            <p className={classes.managwrite}>Manage Customers</p>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
        <div className={classes.managbox}>
            <p className={classes.managwrite}>Manage Movies</p>          </div>
        </Grid>
        <Grid item xs={12} md={6}>
        <div className={classes.managbox}>
            <p className={classes.managwrite}>Manage Genres</p>          </div>
        </Grid>
        <Grid item xs={12} md={6}>
        <div className={classes.managbox}>
            <p className={classes.managwrite}>Manage Screenings</p>        </div>
        </Grid>
      </Grid>
    </Box>);
}