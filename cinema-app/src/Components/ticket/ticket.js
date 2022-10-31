import { useEffect, useState } from 'react';
import classes from './ticket.module.css';
import { getImage } from '../../Services/movieService';
import { deleteReservation } from '../../Services/reservationService';
import BasicSnackbar from '../snackbar/snackbar';
import { confirmAlert } from 'react-confirm-alert';

export default function Ticket({type, data, handler}){

    const k = type;
    const img = require('../../Assets/img1.jpg');
    const [poster, setPoster] = useState(img);

    const [snackbarOpen, setsnackbarOpen] = useState(false);
	const [snackbarContent, setsnackbarContent] = useState("");
	const [snackbarType, setsnackbarType] = useState(0);

    const handleSnackbarClose = () => {

		setsnackbarOpen(false);
  	};

    useEffect(() => {

        getImage(data.movieId).then(function (response){
            setPoster(response["data"]);
            const file = new Blob([response.data], {type:'image/png'});
            const url = URL.createObjectURL(file);
            setPoster(url);
        });

    }, []);

    const confirmDialog = () => {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className={classes["custom-ui"]}>
                <h1>Are you sure?</h1>
                <p>Do you wish to cancel reservation?</p>
                <button
                  onClick={() => {

                    deleteReservation(data.reservationId).then(function (response){
                      setsnackbarType(0);
                      setsnackbarContent(response["data"]);
                      setsnackbarOpen(true);
                      handler();
                    }).catch(function (response){
                      setsnackbarType(1);
                      setsnackbarContent(response["data"]);
                      setsnackbarOpen(true);
                    });
                    onClose();
                  }}
                >
                  Confirm
                </button>
                <button onClick={onClose}>No</button>
              </div>
            );
          }
        });
      };

    if(k === 0){
    return (

        <div className={classes.wrapper}>
	        <BasicSnackbar type={snackbarType} content={snackbarContent} isDialogOpened={snackbarOpen} handleClose={handleSnackbarClose} />
            <div className={classes.info}>
                <div className={classes.imageContainer}>
                    <img className={classes.poster} src={poster} />
                </div>
                <div className={classes.information}>
                    <h4>Movie title: <span>{data.title}</span></h4>
                    <h4>Issued to: <span>{data.email}</span></h4>
                    <h4>Start: <span>{new Date(data.start).toLocaleString()}</span></h4>
                    <h4>Seats: <span>{ data.seats.map((x) => {
                        return (
                            <span>[{x}] </span>
                        )
                    }) }</span></h4>
                </div>
            </div>
            <div className={classes["vertical-dotted-line"]}></div>
            <div className={classes.supply}>
                <h3 style={{ color: "#ff4b2b" }}>Cinefra</h3>
                <h3>Total price:</h3>
                <h3>{data.totalprice} rsd.</h3>
                <button className={classes.cancelButton} onClick={confirmDialog}>Cancel</button>
            </div>
        </div>

    );}
        else{
            return (
            <div className={classes.wrapper}>
            <div className={classes.info}>
                <div className={classes.imageContainer}>
                    <img className={classes.poster} src={poster} />
                </div>
                <div className={classes.information}>
                    <h4>Movie title: <span>{data.title}</span></h4>
                    <h4>Issued to: <span>{data.email}</span></h4>
                    <h4>Start: <span>{new Date(data.start).toLocaleString()}</span></h4>
                    <h4>Seats: <span>{ data.seats.map((x) => {
                        return (
                            <span>[{x}] </span>
                        )
                    }) }</span></h4>
                </div>
            </div>
            <div className={classes.torn}>
                <h3 style={{ color: "#ff4b2b" }}>Cinefra</h3>
                <h3>Total price:</h3>
                <h3>{data.totalprice} rsd.</h3>
            </div>
        </div>);
        }
}