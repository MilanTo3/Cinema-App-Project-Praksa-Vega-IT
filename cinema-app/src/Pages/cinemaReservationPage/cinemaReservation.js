import classes from './cinemaReservation.module.css';
import MovieIcon from '@mui/icons-material/Movie';
import { useState } from 'react';

export default function CinemaReservation(){

    const poster = require('../../Assets/img1.jpg');
    const [total, setTotal] = useState(0);

    const handleClick = (event) => {

        event.target.classList.toggle(classes["seatClicked"]);
        event.target.classList.toggle(classes["hover"]);
        if(event.target.classList.contains(classes["seatClicked"])){
            setTotal(total + 250);
        }else{
            setTotal(total - 250);
        }
        
    };

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
            </div>
            <div className={classes.movieInfo}>
                <div className={classes.posterOkvir}>
                    <img src={poster} className={classes.posterImage} />
                </div>
                <h1 className={classes.title}>Zelena milja (The Green mile)</h1>
                <div className={classes.info}>
                    <p className={classes.writingInfo}>Name (Localized): <span>Green mile</span></p>
                    <p className={classes.writingInfo}>Original Name: <span>Green mile</span></p>
                    <p className={classes.writingInfo}>Screening start: <span>Green mile</span></p>
                    <p className={classes.writingInfo}>Duration: <span>Green mile</span></p>
                    <p className={classes.writingInfo}>Tickets left: <span>Green mile</span></p>
                    <p className={classes.writingInfo}>Price per ticket: <span>Green mile</span></p>
                </div>
                <div className={classes.ticket}>
                    <h3>Watch the trailer:</h3>
                    <button className={classes.ticketButtons}><span className={classes.buttonWriting}>Trailer: <MovieIcon></MovieIcon></span></button>
                    <h3>Reserve your tickets:</h3>
                    <h4>Total price:</h4>
                    <h2>{ total } rsd.</h2>
                    <button className={classes.buyButton}>Buy</button>
                </div>
            </div>
        </div>
    </div>);
}