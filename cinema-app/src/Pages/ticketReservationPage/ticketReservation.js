import Ticket from "../../Components/ticket/ticket";
import classes from './ticketReservation.module.css';
import { Grid } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useEffect } from "react";
import { getMyReservations } from '../../Services/reservationService';

export default function TicketReservationPage(){

    const [alignment, setAlignment] = React.useState(0);
    const [userData, setUserData] = React.useState();
    const [reloader, setReloader] = React.useState(false);

    const [data, setData] = React.useState([]);

    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };

    const reloaderFunc = () => {
        setReloader(!reloader);
    }

    useEffect(() => {

        var user = JSON.parse(localStorage.getItem("loggedInUser"));
        if(user !== null){
            setUserData(user);
        }

        getMyReservations(alignment, user.email).then(function (response){
            setData(response["data"]);
        });

    }, [alignment, reloader]);

    return (
    
    <div className={ classes.wrapper }>
        <h2 className={classes.title}>My reservation tickets:</h2>
        <ToggleButtonGroup className={classes.group}
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            >
            <ToggleButton className={classes.groupButton} value={0}>Relevant Reservations</ToggleButton>
            <ToggleButton className={classes.groupButton} value={1}>Passed Reservations</ToggleButton>
        </ToggleButtonGroup>
        <Grid container align="center" spacing={2} className={classes.ticketContainer}>
            {
                data.map((ticketDatt) => {
                    return (
                        <Grid item xs={12} sm={12} md={6}>
                            <Ticket type={alignment} data={ticketDatt} handler={reloaderFunc} />
                        </Grid>
                    )
                })
            }
        </Grid>
    </div>);
}