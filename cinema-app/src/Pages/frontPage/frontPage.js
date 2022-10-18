import classes from './frontPage.module.css'
import MediaCard from '../../Components/movieCard/moviecard';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function Frontpage(){

    return (
       <Box className={classes.wrapper} sx={{ flexGrow: 1 }}>
        <Grid spacing={2} container>
          <Grid item xs={12} sm={6} md={2.4}>
            <MediaCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <MediaCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <MediaCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <MediaCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <MediaCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <MediaCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <MediaCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <MediaCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <MediaCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <MediaCard/>
          </Grid>
        </Grid>
      </Box>
    );
}