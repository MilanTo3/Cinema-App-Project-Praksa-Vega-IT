import classes from './cinemaReservation.module.css';
import MovieIcon from '@mui/icons-material/Movie';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getScreening } from "../../Services/screeningService";
import { getImage, getMovie } from "../../Services/movieService";

export default function CinemaReservation(){

    const poster = require('../../Assets/img1.jpg');
    const [total, setTotal] = useState(0);
    const [data, setData] = useState({});
    const [movieData, setMovieData] = useState({});
    const [image, setImage] = useState(poster);

    const [media, setMedia] = useState(<img src={image} className={classes.posterImage} />);
    const [chosenSeats, setchosenSeats] = useState(1); //span
    const [seatList, setSeatList] = useState([]);

    const k = useParams().id;

    const handleClick = (event, k, p) => {

        const i = k;
        const j = p;
        var totalprice = total;
        var seatsTaken = seatList;

        for(let k = 0; k < chosenSeats; k++){
            var el = document.getElementById(i + "," + (j + k));
            if(el){
                el.classList.toggle(classes["seatClicked"]);
                el.classList.toggle(classes["hover"]);
                if(el.classList.contains(classes["seatClicked"])){
                    totalprice += data.price;
                    seatsTaken.push(i + "," + (j + k));
                }else{
                    totalprice -= data.price;
                    seatsTaken = seatsTaken.filter(x => x !== (i + "," + (j + k)));
                }
            }else{
                break;
            }
        }
        setTotal(totalprice);
        setSeatList(seatsTaken);
        
    };

    useEffect(() => {

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

        }
        fetchData();

    }, []);

    const seatSpanChange = (e) => {
        console.log(e.target.value);
        setchosenSeats(e.target.value);
    };

    return (<div className={classes.page}>
        <div className={classes.box}>
            <div className={classes.projection}>
                <h1>Screening Seatings:</h1>
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

                    <h3>Reserve your tickets:</h3>
                    <h5>Seating span: <select onChange={(e) => seatSpanChange(e)} className={classes.seatSpan}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select></h5>
                    <h4>Total price:</h4>
                    <h2>{ total } rsd.</h2>
                    <button className={classes.buyButton}>Buy</button>
            </div>
            <div className={classes.movieInfo}>
                <div className={classes.posterOkvir}>
                {media}
                </div>
                <h1 className={classes.title}>{movieData.nameLocal} ({movieData.nameOriginal})</h1>
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
    </div>);
}