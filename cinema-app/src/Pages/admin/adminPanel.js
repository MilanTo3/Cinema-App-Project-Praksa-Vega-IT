import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import classes from '../admin/adminPanel.module.css';
import {Link} from "react-router-dom";

export default function AdminPanel(){

    return (<Box className={classes.box}>
      <Grid container >
        <Grid item xs={12} md={12}>
          <div>
                <p className={classes.managtitle}>Administrator Panel Options</p>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Link to={{ pathname: "/adminCrudPage/customers" }}><div className={classes.managbox}>
            <p className={classes.managwrite}>Manage Customers</p>
          </div>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
        <Link to={{ pathname: "/adminCrudPage/movies" }}><div className={classes.managbox}>
            <p className={classes.managwrite}>Manage Movies</p>          </div></Link>
        </Grid>
        <Grid item xs={12} md={6}>
        <Link to={{ pathname: "/adminCrudPage/genres" }}><div className={classes.managbox}>
            <p className={classes.managwrite}>Manage Genres</p>          </div></Link>
        </Grid>
        <Grid item xs={12} md={6}>
        <Link to={{ pathname: "/adminCrudPage/screenings" }}><div className={classes.managbox}>
            <p className={classes.managwrite}>Manage Screenings</p>        </div></Link>
        </Grid>
      </Grid>
    </Box>);
}