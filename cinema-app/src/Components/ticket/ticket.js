import classes from './ticket.module.scss';

export default function Ticket(){

    return (
    <div className={classes.cardWrap}>
    <div className={ `${classes["card"]} ${classes["cardLeft"]}` }>
        <h1 className={classes.h1}>Startup <span>Cinema</span></h1>
        <div className={classes.title}>
        <h2>How I met your Mother</h2>
        <span>movie</span>
        </div>
        <div className={classes.name}>
        <h2>Vladimir Kudinov</h2>
        <span>name</span>
        </div>
        <div className={classes.seat}>
        <h2>156</h2>
        <span>seat</span>
        </div>
        <div className={classes.time}>
        <h2>12:00</h2>
        <span>time</span>
        </div>
        
    </div>
    <div className={ `${classes["card"]} ${classes["cardRight"]}` }>
        <div className={ classes.eye }></div>
        <div className={ classes.number }>
        <h3>156</h3>
        <span>seat</span>
        </div>
    </div>
    </div>);
}