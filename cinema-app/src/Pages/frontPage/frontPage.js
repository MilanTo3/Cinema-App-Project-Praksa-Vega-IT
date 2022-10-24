import classes from './frontPage.module.css'
import MediaCard from '../../Components/movieCard/moviecard';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function Frontpage(){

    return (
      <Box className={classes.box} >
        <Grid spacing={1} container >
          <Grid item xs={12} sm={6} md={3}>
            <MediaCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MediaCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MediaCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MediaCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MediaCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MediaCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MediaCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MediaCard/>
          </Grid>
        </Grid>
        </Box>
    );
}