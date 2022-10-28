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
import { getGenres } from '../../Services/genreService';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function Frontpage(){

  const [value, setValue] = React.useState([]);
  const [genresSearch, setGenresSearch] = React.useState([]);
  const [val, setVal] = React.useState([]);
  const [addClicked, setAddClicked] = React.useState(false);
  const [genreTerm, setGenreTerm] = React.useState("");

  useEffect(() => {

    getMoviesWithScreenings().then(function (response){
      setValue(response["data"]);
    });

    getGenres().then(function (response){
      let data = response["data"];
      let result = data.map(data => data.name);
      setGenresSearch(result);
    });

  }, []);

  useEffect(() => {

    if(val.includes(genreTerm) === false && addClicked){
      const abc = [...val, genreTerm];
      setVal(abc);
    }

    setAddClicked(false);

  }, [addClicked]);

  const handleDelete=(e, i)=>{
    e.preventDefault()
    const deletVal=[...val]
    deletVal.splice(i,1)
    setVal(deletVal)
  };

  const onsearch = (e) => {
    e.preventDefault();
    setAddClicked(true);
  }


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
        <AccordionDetails className={classes.detilas}>
          <div className={classes.form}>
            <input type="date" min="2014-05-11" max="2014-05-20" />
            <Autocomplete className={classes.genreAC} onChange={(event, value) => setGenreTerm(value)}
                disablePortal
                id="combo-box-demo"
                options={genresSearch}
                sx={{ width: 300 }}
                style={{ width: "800px", height: "20px" }}
                renderInput={(params) => <TextField {...params} label="Genre" variant="standard" size="small" />}/>
            <button className={classes.trakaButton} onClick={e => onsearch(e)}>Add</button>
            <Grid container className={classes.tagBox}>
              {val.map((data,i)=>{
                    return(
                      <Grid item xs={4} md={4} className={classes.tag}>
                            <div>{data}</div>
                            <button className={classes.tagButton} onClick={(e)=>handleDelete(e, i)}>x</button>
                      </Grid>
                    )
                })}
            </Grid>
            <button className={classes.trakaButton}>Apply</button></div>
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