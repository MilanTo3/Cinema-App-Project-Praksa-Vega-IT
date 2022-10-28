import classes from './frontPage.module.css'
import MediaCard from '../../Components/movieCard/moviecard';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { getMoviesWithScreenings } from '../../Services/movieService';
import Accordion from "@mui/material/Accordion";
import { AccordionSummary } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Frontpage(){

  const [value, setValue] = React.useState([]);

  useEffect(() => {

    getMoviesWithScreenings().then(function (response){
      setValue(response["data"]);
    });

  }, []);


    return (
      <Box className={classes.box} >
        <Accordion className={classes.searchbox}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <p className={classes.summary}>Search movies screnings more thouroughly...</p>
        </AccordionSummary>
        <AccordionDetails>
          
        </AccordionDetails>
      </Accordion>
        <Grid className={classes.grid} spacing={2} container >
          {value.map((movie) => (
              <Grid item xs={12} sm={12} md={6}>
                <MediaCard cardData={movie} />
              </Grid>
            ))}
        </Grid>
        </Box>
    );
}