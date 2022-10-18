import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
  
  const image = require('../../Assets/cinemabanner.jpg');
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Movie
        </Typography>
        <Typography variant="body2" color="text.secondary">
          1.10.2022 - 22.10.2022
        </Typography>
        <Typography variant="body1" color="text.secondary">
          2500 rsd.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Available
        </Typography>
      </CardContent>
    </Card>
  );
}