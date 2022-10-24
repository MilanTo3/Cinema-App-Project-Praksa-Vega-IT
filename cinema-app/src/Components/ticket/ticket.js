import classes from './ticket.module.css';

export default function Ticket(prop){

    const k = prop.type;

    if(k === 0){
    return (

        <div className={classes.wrapper}>

            <div className={classes.info}>
                <h3>Movie title: <span>spanning</span></h3>
                <h3>Issued to: <span>spanning</span></h3>
                <h3>Start: <span>12:00</span></h3>
            </div>
            <div className={classes["vertical-dotted-line"]}></div>
            <div className={classes.torn}>
                <h3 style={{ color: "#ff4b2b" }}>Cinefra</h3>
                <h2>Seat num:</h2>
                <h2>2</h2>
            </div>
        </div>

    );}
        else{
            return (
            <div className={classes.wrapper}>

            <div className={classes.info}>
                <h3>Movie title: <span>spanning</span></h3>
                <h3>Issued to: <span>spanning</span></h3>
                <h3>Start: <span>12:00</span></h3>
            </div>
            <div style={{ borderLeft: "8px solid red" }}>
                <p className={classes.writing}>USED</p>
            </div>
            <div className={classes.torn}>
                <h3 style={{ color: "#ff4b2b" }}>Cinefra</h3>
                <h2>Seat num:</h2>
                <h2>2</h2>
            </div>
        </div>);
        }
}