import classes from './frontPage.module.css'
import MediaCard from '../../Components/movieCard/moviecard';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { getMoviesWithScreenings, getMoviesWithScreenings1 } from '../../Services/movieService';
import Accordion from "@mui/material/Accordion";
import { AccordionSummary } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getGenres } from '../../Services/genreService';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

export default function Frontpage(){

  const [value, setValue] = React.useState([]);
  const [genresSearch, setGenresSearch] = React.useState([]);
  const [val, setVal] = React.useState([]);
  const [addClicked, setAddClicked] = React.useState(false);
  const [genreTerm, setGenreTerm] = React.useState("");
  const [applyClicked, setApplyClicked] = React.useState(false);
  const [dateClicked, setDateClicked] = React.useState(new Date());
  const [sort, setSort] = React.useState(false);

  var arr = [0, 1, 2, 3, 4, 5, 6];

  useEffect(() => {

    const data = {
      date: dateClicked,
      genres: val,
      sort: sort,
    }

    getMoviesWithScreenings1(data).then(function (response){
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

  useEffect(() => {

    if(applyClicked){

      const data = {
        date: dateClicked,
        genres: val,
        sort: sort,
      }

      getMoviesWithScreenings1(data).then(function (response){
        setValue(response["data"]);
      });

      setApplyClicked(false);
    }

  }, [applyClicked]);

  useEffect(() => {
    const data = {
      date: dateClicked,
      genres: val,
      sort: sort,
    }

    getMoviesWithScreenings1(data).then(function (response){
      setValue(response["data"]);
    });
  }, [dateClicked]);

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

  const handleToggleChange = (event) => {
    setSort(!sort);
    event.target.classList.toggle(classes["sortClicked"]);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setApplyClicked(true);

  };

  const handleDateSet = (e, x) => {
    var result = new Date();
    result.setDate(result.getDate() + x);
    setDateClicked(result);
    
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
            <Autocomplete className={classes.genreAC} onChange={(event, value) => setGenreTerm(value)}
                disablePortal
                id="combo-box-demo"
                options={genresSearch}
                sx={{ width: 400 }}
                renderInput={(params) => <TextField multiline {...params} label="Genre" variant="outlined" size="small" />}/>
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
            <button className={classes.sortbutton} onClick={(e)=>handleToggleChange(e)}>Sort <SortByAlphaIcon className={classes.alphabetIcon} /></button>
            <button className={classes.trakaButton} onClick={(e)=>handleFilter(e)}>Apply</button></div>
        </AccordionDetails>
      </Accordion>

      <div className={classes.dates}>
        {arr.map((x)=>{

          var result = new Date();
          result.setDate(result.getDate() + x);
          return(
            <button className={classes.timestamp} onClick={(e) => handleDateSet(e, x)}>{result.toDateString()}</button>
          )
        })}
      </div>

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