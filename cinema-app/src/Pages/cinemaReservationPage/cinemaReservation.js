import classes from './cinemaReservation.module.css';
import MovieIcon from '@mui/icons-material/Movie';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getScreening } from "../../Services/screeningService";
import { getImage, getMovie } from "../../Services/movieService";

export default function CinemaReservation(){

    const poster = require('../../Assets/img1.jpg');
    const [total, setTotal] = useState(0);
    const [data, setData] = useState({});
    const [movieData, setMovieData] = useState({});
    const [image, setImage] = useState(poster);

    const [media, setMedia] = useState(<img src={image} className={classes.posterImage} />);

    const k = useParams().id;

    const handleClick = (event) => {

        event.target.classList.toggle(classes["seatClicked"]);
        event.target.classList.toggle(classes["hover"]);
        if(event.target.classList.contains(classes["seatClicked"])){
            setTotal(total + 250);
        }else{
            setTotal(total - 250);
        }
        
    };

    useEffect(() => {

        async function fetchData() {
            let j = await getScreening(k);
            setData(j["data"]);

            let l = await getMovie(j["data"].movieId);
            setMovieData(l["data"]);

            if(l["data"].trailer.startsWith('https://www.youtube.com/')){
                setMedia(<iframe className={classes.posterImage} src={l["data"].trailer.replace("watch?v=", "embed/")}></iframe>);
            }else{

                let img = await getImage(j["data"].movieId);
                const file = new Blob([img.data], {type:'image/png'});
                const url = URL.createObjectURL(file);
                setImage(url);
            }

        }
        fetchData();

    }, []);

    return (<div className={classes.page}>
        <div className={classes.box}>
            <div className={classes.projection}>
                <h1>Screening Seatings:</h1>
                <div className={classes.screen}></div>    
                <div className={classes.row}>
                    <div className={`${classes.seat} ${classes.hover}`} onClick={e => handleClick(e)}></div>
                    <div className={`${classes.seat} ${classes.hover}`} onClick={e => handleClick(e)}></div>
                    <div className={`${classes.seat} ${classes.hover}`} onClick={e => handleClick(e)}></div>
                    <div className={`${classes.seat} ${classes.hover}`} onClick={e => handleClick(e)}></div>
                    <div className={`${classes.seat} ${classes.hover}`} onClick={e => handleClick(e)}></div>
                    <div className={`${classes.seat} ${classes.hover}`} onClick={e => handleClick(e)}></div>
                    <div className={classes.seat} onClick={e => handleClick(e)}></div>
                    <div className={classes.seat}></div>
                </div>
                <div className={classes.row}>
                    <div className={classes.seat}></div>
                    <div className={classes.seat}></div>
                    <div className={classes.seat}></div>
                    <div className={classes.seat}></div>
                    <div className={classes.seat}></div>
                    <div className={classes.seat}></div>
                    <div className={classes.seat}></div>
                    <div className={classes.seat}></div>
                </div>
                    <h3>Reserve your tickets:</h3>
                    <h4>Total price:</h4>
                    <h2>{ total } rsd.</h2>
                    <button className={classes.buyButton}>Buy</button>
            </div>
            <div className={classes.movieInfo}>
                <div className={classes.posterOkvir}>
                {media}
                </div>
                <h1 className={classes.title}>{movieData.nameLocal} ({movieData.nameOriginal})</h1>
                <div className={classes.info}>
                    <p className={classes.writingInfo}>Name (Localized): <span>{movieData.nameLocal}</span></p>
                    <p className={classes.writingInfo}>Original Name: <span>{movieData.nameOriginal}</span></p>
                    <p className={classes.writingInfo}>Screening start: <span>{new Date(data["fromScreening"]).toLocaleString()}</span></p>
                    <p className={classes.writingInfo}>Duration: <span>{movieData.duration} min.</span></p>
                    <p className={classes.writingInfo}>Tickets left: <span>Green mile</span></p>
                    <p className={classes.writingInfo}>Price per ticket: <span>{data.price} RSD.</span></p>
                </div>
            </div>
        </div>
    </div>);
}