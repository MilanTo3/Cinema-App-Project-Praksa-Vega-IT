import { useEffect, useState } from 'react';
import BasicSnackbar from '../../../Components/snackbar/snackbar';
import classes from './editScreening.module.css';
import { getImage } from '../../../Services/movieService';
import { updateScreening, getScreening } from '../../../Services/screeningService';

export default function EditScreeningForm({ id }){

    const def = require("../../../Assets/defaultImage.jpg");
    const [value, setValue] = useState("");
    const [preview, setPreview] = useState(def);

    const [snackbarOpen, setsnackbarOpen] = useState(false);
	const [snackbarContent, setsnackbarContent] = useState("");
	const [snackbarType, setsnackbarType] = useState(0);

    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSnackbarClose = () => {

        setsnackbarOpen(false);
    };
  
    const onChange = (event) => {
        setValue(event.target.value);
    };
  
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };

    const validate = (e) => {

        const errors = {}
        
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

        getScreening(id).then(function (response){
            
            const data = response["data"];
            getImage(data.movieId).then(function (response){
                const file = new Blob([response.data], {type:'image/png'});
                const url = URL.createObjectURL(file);
                setPreview(url);
            });

            const initialFieldValues = {
                movieId: data.movieId,
                screeningId: data.screeningId,
                name: data.name,
                fromScreening: data.fromScreening,
                row: data.row,
                column: data.column,
                price: data.price
            };
    
            setFormValues(initialFieldValues);
            setValue(data.name);

        });

    }, []);

    useEffect(() => {

        if(Object.keys(formErrors).length === 0 && isSubmit){

            const data = {
                name: formValues["name"],
                screeningId: formValues["screeningId"],
                movieId: formValues["movieId"],
                fromScreening: formValues["fromScreening"],
                row: formValues["row"],
                column: formValues["column"],
                price: formValues["price"],
            };

            updateScreening(data).then(function (response){
                setsnackbarType(0);
                setsnackbarOpen(true);
                setsnackbarContent(response["data"]);
            }).catch(function (response){
                setsnackbarType(1);
				setsnackbarOpen(true);
				setsnackbarContent(response["data"]);
            });
            
            setIsSubmit(false);
        }

    }, [isSubmit]);

    return (<div>
            <BasicSnackbar center={true} type={snackbarType} content={snackbarContent} isDialogOpened={snackbarOpen} handleClose={handleSnackbarClose} />
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
			<h1>Edit a movie screening:</h1>
            <img src={ preview } className={classes.uploadImage} />
            <div className={classes["search-container"]}>
                <div className={classes["search-inner"]}>
                    <input type="text" placeholder="Search for a movie..." disabled value={value} onChange={onChange} />
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
			<button type="submit" style={{ marginTop: "21px" }}>Edit Screening</button>
		</form>

    </div>);
}