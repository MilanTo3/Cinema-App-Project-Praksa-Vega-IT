import classes from './cinemaReservation.module.css';

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

            </div>
        </div>
    </div>);
}