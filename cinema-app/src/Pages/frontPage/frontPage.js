import classes from './frontPage.module.css'
import MediaCard from '../../Components/movieCard/moviecard';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Frontpage(){

    return (
        <Grid spacing={2} container className={classes.box}>
          <Grid item xs={12} sm={6} md={3}>
            <Item><MediaCard/></Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Item><MediaCard/></Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Item><MediaCard/></Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Item><MediaCard/></Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Item><MediaCard/></Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Item><MediaCard/></Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Item><MediaCard/></Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Item><MediaCard/></Item>
          </Grid>
        </Grid>
    );
}