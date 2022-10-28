import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import classes from './moviecard.module.css';
import { useEffect, useReact } from 'react';
import { getImage } from '../../Services/movieService';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

export default function MediaCard({cardData}) {
  
  const def = require('../../Assets/cinemabanner.jpg')
  const [data, setData] = React.useState({});
  const [image, setImage] = React.useState(def);
  
  useEffect(() => {

    getImage(cardData.movieId).then(function (response){

      const file = new Blob([response.data], {type:'image/png'});
      const url = URL.createObjectURL(file);
      setImage(url);
    });
    setData(cardData);
    console.log(cardData.genres);

  }, []);
  
  return (
    <div className={classes.card}>
      <div className={classes.imagepart}>
        <img className={classes.image} src={image}/>
      </div>
      <div className={classes.infopart}>
        <h2>{data.nameLocal} <span>({data.nameOriginal})</span></h2>
        <p>Duration: <span className={classes.minutes}>{data.duration} min.</span></p>
        <p>Genres: {cardData.genres.map((x) => (
              <span className={classes.genres}>{x}</span>
            ))}</p>
        <h2>Projection dates:</h2>
        <div className={classes.datetimes}>
          { cardData.movieScreenings.map((screening) => (
            <div className={classes.huset}>
              <ConfirmationNumberIcon style={{ color: "green" }}/>
              <p>{new Date(screening.fromScreening).toLocaleDateString()}</p>
              <p>{new Date(screening.fromScreening).toLocaleTimeString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}