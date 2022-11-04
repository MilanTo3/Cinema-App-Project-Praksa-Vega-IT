import React from "react";
import { useEffect } from "react";
import { addGenre } from "../../../Services/genreService";
import BasicSnackbar from "../../../Components/snackbar/snackbar";
import classes from "./addGenre.module.css";

export default function AddGenreForm(){

    const [formValues, setFormValues] = React.useState({});
    const [formErrors, setFormErrors] = React.useState({});
	const [isSubmit, setIsSubmit] = React.useState(false);

    const [snackbarOpen, setsnackbarOpen] = React.useState(false);
	const [snackbarContent, setsnackbarContent] = React.useState("");
	const [snackbarType, setsnackbarType] = React.useState(0);

    const handleSnackbarClose = () => {

		setsnackbarOpen(false);
  	};

    const handleChange = (e) => {
		const {name, value} = e.target;
		setFormValues({...formValues, [name]: value});
	};

    const validate = (e) => {

		const errors = {}
		
		if(!formValues.name){
			errors.name = "Genre name is required.";
		}

		return errors;
	};

    useEffect(() => {

        if(Object.keys(formErrors).length === 0 && isSubmit){
            const data = {
                name: formValues.name
            }
            addGenre(data).then(function (response){
				setsnackbarType(0);
                setsnackbarContent("Genre added successfully.");
				setsnackbarOpen(true);
			}).catch(function (error){
				setsnackbarType(1);
                setsnackbarContent(error.response.data.error);
				setsnackbarOpen(true);
			});
            setIsSubmit(false);
	    }

    }, [formErrors, formValues, isSubmit]);

    const handleSubmit = (e) => {

		e.preventDefault();
		setFormErrors(validate(formValues));
		setIsSubmit(true);
    };

    return (
        <div>
            <BasicSnackbar center={true} type={snackbarType} content={snackbarContent} isDialogOpened={snackbarOpen} handleClose={handleSnackbarClose} />
            <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                <h1>Add a new genre:</h1>
                <input type="text" name="name" placeholder="Genre name" value={formValues.name} onChange={handleChange} />
                <p className={classes.errors}>{formErrors.name}</p>
                <button type="submit">Add Genre</button>
            </form>
    </div>);
}