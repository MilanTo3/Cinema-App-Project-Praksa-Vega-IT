import Ticket from "../../Components/ticket/ticket";
import classes from './ticketReservation.module.css';
import { Grid, Box } from "@mui/material";

export default function TicketReservationPage(){

    return (
    
    
    <div className={ classes.wrapper }>
        <h2 className={classes.title}>My reservation tickets:</h2>
        <Grid container align="center" spacing={2} className={classes.ticketContainer}>
            <Grid item xs={12} md={6}>
                <Ticket type={0}></Ticket>
            </Grid>
            <Grid item xs={12} md={6}>
                <Ticket></Ticket>
            </Grid>
        </Grid>
    </div>);
}