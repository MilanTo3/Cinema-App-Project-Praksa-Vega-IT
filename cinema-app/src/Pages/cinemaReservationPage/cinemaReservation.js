import classes from './cinemaReservation.module.css';
import MovieIcon from '@mui/icons-material/Movie';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getScreening } from "../../Services/screeningService";
import { getImage, getMovie } from "../../Services/movieService";
import { addReservation, getReservedSeats } from '../../Services/reservationService';
import { confirmAlert } from 'react-confirm-alert';
import BasicSnackbar from '../../Components/snackbar/snackbar';
import {motion} from "framer-motion";

export default function CinemaReservation(){

    const poster = require('../../Assets/img1.jpg');
    const [total, setTotal] = useState(0);
    const [data, setData] = useState({});
    const [movieData, setMovieData] = useState({});
    const [image, setImage] = useState(poster);

    const [media, setMedia] = useState(<img src={image} className={classes.posterImage} />);
    const [chosenSeats, setchosenSeats] = useState(1); //span
    const [seatList, setSeatList] = useState([]);

    const [email, setEmail] = useState("");
    const [buyClicked, setBuyClicked] = useState(false);
    const [formErrors, setFormErrors] = useState("");
    const [discount, setDiscount] = useState("");

    //snackbar
    const [snackbarOpen, setsnackbarOpen] = useState(false);
	const [snackbarContent, setsnackbarContent] = useState("");
	const [snackbarType, setsnackbarType] = useState(0);

    const [user, setUser] = useState({});

    const k = useParams().id;

    const handleClick = (event, k, p) => {

        const i = k;
        const j = p;
        var totalprice = total;
        var seatsTaken = seatList;

        var el = document.getElementById(event.target.id);
        if(el.classList.contains(classes["takenSeat"])){
            return;
        }

        for(let k = 0; k < chosenSeats; k++){
            var el = document.getElementById(i + "," + (j + k));
            if(el){
                el.classList.toggle(classes["seatClicked"]);
                el.classList.toggle(classes["hover"]);
                if(el.classList.contains(classes["seatClicked"])){
                    totalprice += Math.round(data.price);
                    seatsTaken.push(i + "," + (j + k));
                }else{
                    totalprice -= Math.round(data.price);
                    if(totalprice < 0){
                        totalprice = 0;
                    }
                    seatsTaken = seatsTaken.filter(x => x !== (i + "," + (j + k)));
                }
            }else{
                break;
            }
        }

        if(user.email && (totalprice > 0)){
            totalprice = Math.round(totalprice - (totalprice/20));
        }
        setTotal(totalprice);
        setSeatList(seatsTaken);
        
    };

    const handleSnackbarClose = () => {

		setsnackbarOpen(false);
  	};

    const confirmDialog = () => {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className={classes["custom-ui"]}>
                <h1>Are you sure?</h1>
                <p>Do you wish to book tickets for this screening?</p>
                <button
                  onClick={() => {

                    const form = new FormData();
                    form.append("email", email);
                    form.append("screeningId", data.screeningId);
                    form.append("totalPrice", total);
                    seatList.map((x) => { form.append("seats[]", x) });

                    addReservation(form).then(function (response){
                      setsnackbarType(0);
                      setsnackbarContent(response["data"]);
                      setsnackbarOpen(true);
                      signSeats();
                      setSeatList([]);
                      setTotal(0);
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

    useEffect(() => {

        var user = JSON.parse(localStorage.getItem("loggedInUser"));
        if(user){
            setEmail(user.email);
            setUser(user);
            setDiscount(<p className={classes.discount}>5% discount!</p>);
        }

        async function awaiter(){
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

                signSeats();

            }
            await fetchData();
        }
        awaiter();

    }, []);

    useEffect(() => {

        if(Object.keys(formErrors).length === 0 && buyClicked){
            confirmDialog();
        }
        setBuyClicked(false);
    }, [buyClicked]);

    const signSeats = () => {
        
        getReservedSeats(k).then(function (response){

            var arr = response.data;
            console.log(arr);
            arr.map((seatid) => {
                var el = document.getElementById(seatid);
                if(el){
                    el.classList.add(classes["takenSeat"]);
                    el.classList.remove(classes["hover"]);
                    el.id = el.id + "Taken";
                }
            });

        });
    }

    const seatSpanChange = (e) => {
        setchosenSeats(e.target.value);

    };

    const handleChange = (e) => {
		setEmail(e.target.value);
	};

    const validate = (e) => {

        const errors = {}
		
		if(!email){
			errors.email = "Email is required.";
		}
        if(!seatList || seatList.length === 0){
            errors.seating = "Please choose the seatings!";
        }

        return errors;
    }

    const handleReservation = (e) => {
        e.preventDefault();
        setFormErrors(validate(email));
        setBuyClicked(true);

    };

    return (<motion.div className={classes.page} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        <BasicSnackbar type={snackbarType} content={snackbarContent} isDialogOpened={snackbarOpen} handleClose={handleSnackbarClose} />
        <div className={classes.box}>
            <div className={classes.projection}>
                <h3>Reserve your tickets:</h3>
                <div className={classes.screen}></div>    
                {
                    
                    Array.from(Array(data.row)).map((x, i) => {
                        return (<div className={classes.row}>
                            {
                            Array.from(Array(data.column)).map((x, j) => {
                                return(<div id={i + "," + j} className={`${classes.seat} ${classes.hover}`} onClick={e => handleClick(e, i, j)}></div>)
                            })
                            }
                        </div>)
                    })
                }

                <div className={classes.buyoptions}>
                    <div>
                        <h4>Seating span: <select onChange={(e) => seatSpanChange(e)} className={classes.seatSpan}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select></h4>
                        <h4>Total price:</h4>
                        <h2>{ total } rsd.</h2>
                    </div>
                    {discount}
                    <form className={classes.form} onSubmit={handleReservation}>
                        <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange}/>
			            <p className={classes.errors}>{formErrors.email}</p>
                        <p className={classes.errors}>{formErrors.seating}</p>
                        <button type="submit" className={classes.buyButton}>Buy</button>
                    </form>
                </div>
            </div>
            <div className={classes.movieInfo}>
                <div className={classes.posterOkvir}>
                {media}
                </div>
                <h2 className={classes.title}>{movieData.nameLocal} ({movieData.nameOriginal})</h2>
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
    </motion.div>);
}