import classes from './cinemaReservation.module.css';
import MovieIcon from '@mui/icons-material/Movie';

export default function CinemaReservation(){

    const poster = require('../../Assets/img1.jpg');

    return (<div className={classes.page}>
        <div className={classes.box}>
            <div className={classes.projection}>
                <h1>Screening Seatings:</h1>
                <div className={classes.screen}></div>    
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
                    <p className={classes.writingInfo}>Name (Localized): </p>
                    <p className={classes.writingInfo}>Original Name: </p>
                    <p className={classes.writingInfo}>Screening start: </p>
                    <p className={classes.writingInfo}>Duration: </p>
                    <p className={classes.writingInfo}>Tickets left: </p>
                    <p className={classes.writingInfo}>Price per ticket: </p>
                </div>
                <div className={classes.ticket}>
                    <h3>Watch the trailer:</h3>
                    <button className={classes.ticketButtons}><span className={classes.buttonWriting}>Trailer: <MovieIcon></MovieIcon></span></button>
                    <h3>Reserve your tickets:</h3>

                </div>
            </div>
        </div>
    </div>);
}