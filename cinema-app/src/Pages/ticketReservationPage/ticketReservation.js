import Ticket from "../../Components/ticket/ticket";
import classes from './ticketReservation.module.css';
import { Grid, Box } from "@mui/material";

export default function TicketReservationPage(){

    return (
    
    
    <div className={ classes.wrapper }>

        <div className={ classes.upcomingReservations }>
            <h2 className={classes.title}>Upcoming:</h2>
            <div className={classes.ticketContainer}>
                <Ticket />
            </div>
        </div>

        
    </div>);
}