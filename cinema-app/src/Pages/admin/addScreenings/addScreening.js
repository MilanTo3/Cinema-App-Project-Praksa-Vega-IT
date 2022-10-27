import { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import BasicSnackbar from '../../../Components/snackbar/snackbar';
import classes from './addScreening.module.css';
import { getImage, getMovies } from '../../../Services/movieService';

export default function AddScreeningForm(){

    const def = require("../../../Assets/defaultImage.jpg");
    const [value, setValue] = useState("");
    const [preview, setPreview] = useState(def);
    const [idVal, setVal]=useState();
    const [movieData, setMovieData] = useState([]);

    const [snackbarOpen, setsnackbarOpen] = useState(false);
	const [snackbarContent, setsnackbarContent] = useState("");
	const [snackbarType, setsnackbarType] = useState(0);

    const initialFieldValues = {
        movieId: 0,
        fromScreening: '',
        row: '',
        column: '',
        price: '',
    };
    const [formValues, setFormValues] = useState(initialFieldValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSnackbarClose = () => {

        setsnackbarOpen(false);
    };
  
    const onChange = (event) => {
        setValue(event.target.value);
    };
      
    const onSearch = (id, searchTerm) => {
        setValue(searchTerm);
        setVal(id);

        getImage(id).then(function (response){
            const file = new Blob([response.data], {type:'image/png'});
            const url = URL.createObjectURL(file);
            setPreview(url);
        });
          
    };
  
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };

    const validate = (e) => {

        const errors = {}
        
        if(!idVal){
            errors.movieId = "You have to choose a movie for the screening!";
        }
        if(!formValues.fromScreening){
          errors.fromScreening = "Screening time is required.";
        }
        if(!formValues.price){
          errors.price = "Ticket price is a required field.";
        }
        if(!formValues.row){
          errors.row = "Row number of seats is a required field.";
        }else if(formValues.row < 1){
          errors.duration = "Row seats must be a positive number greater than zero.";
        }
        if(!formValues.column){
            errors.row = "Column number of seats is a required field.";
        }else if(formValues.column < 1){
            errors.duration = "Column seats must be a positive number greater than zero.";
        }
    
        return errors;
    };

    const handleSubmit = (event) => {

        event.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    useEffect(() => {

        getMovies().then(function (response){

            setMovieData(response["data"]);

        });

    }, []);

    useEffect(() => {

        if(Object.keys(formErrors).length === 0 && isSubmit){

            const data = {
                movieId: idVal,
                fromScreening: formValues["fromScreening"],
                row: formValues["row"],
                column: formValues["column"],
                price: formValues["price"],
            };

            console.log(data);
            
            setIsSubmit(false);
        }

    }, [isSubmit]);

    return (<div>
            <BasicSnackbar center={true} type={snackbarType} content={snackbarContent} isDialogOpened={snackbarOpen} handleClose={handleSnackbarClose} />
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
			<h1>Add a movie screening:</h1>
            <img src={ preview } className={classes.uploadImage} />
            <div className={classes["search-container"]}>
                <div className={classes["search-inner"]}>
                    <input type="text" placeholder="Search for a movie..." value={value} onChange={onChange} />
                </div>
                <div className={classes["dropdown"]}>
                    {movieData
                    .filter((item) => {
                        const searchTerm = value.toLowerCase();
                        const name = item.nameLocal.toLowerCase();
                        return (
                            searchTerm &&
                            name.startsWith(searchTerm) &&
                            name !== searchTerm
                        );
                    })
                    .slice(0, 10)
                    .map((item) => (
                    <div
                        onClick={() => onSearch(item.movieId, item.nameLocal)}
                        className={classes["dropdown-row"]}
                        key={item.movieId}
                        >
                        {item.nameLocal}
                    </div>
                ))}
                </div>
            </div>
            <p className={classes.errors}>{formErrors.movieId}</p>

			<input type="datetime-local" name="fromScreening" onFocus={(e) => (e.target.type = "datetime-local")}
        onBlur={(e) => (e.target.type = "text")} placeholder="Projection starts at" value={formValues.fromScreening} onChange={handleChange} />
            <p className={classes.errors}>{formErrors.fromScreening}</p>
            <input type="number" name="price" placeholder="Ticket price" value={formValues.price} onChange={handleChange} />
            <p className={classes.errors}>{formErrors.price}</p>
            <input type="number" name="row" placeholder="Seat row number" value={formValues.row} onChange={handleChange} />
            <p className={classes.errors}>{formErrors.row}</p>
            <input type="number" name="column" placeholder="Seat column number" value={formValues.column} onChange={handleChange} />
            <p className={classes.errors}>{formErrors.column}</p>
			<button type="submit" style={{ marginTop: "21px" }}>Add Screening</button>
		</form>

    </div>);
}