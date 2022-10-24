import React from "react";
import Typography from '@mui/material/Typography';
import classes from './passwordRequestModal.module.css';
import { requestReset } from "../../Services/userService";
import BasicSnackbar from "../../Components/snackbar/snackbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PasswordRequestModal(){

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
		
		if(!formValues.email){
			errors.email = "Email is required.";
		}

		return errors;
	};

    useEffect(() => {
        
        if(Object.keys(formErrors).length === 0 && isSubmit){
			
            const data = {
                email: formValues.email
            }
            requestReset(data).then(function (response){
				setsnackbarType(0);
                setsnackbarContent("Password requested successfully.");
				setsnackbarOpen(true);
			}).catch(function (error){
				setsnackbarType(1);
                setsnackbarContent(error["response"]["data"]);
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
        <div className={classes.container}>
            <BasicSnackbar type={snackbarType} content={snackbarContent} isDialogOpened={snackbarOpen} handleClose={handleSnackbarClose} />
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Request a new password
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Type in your email address:
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
                <input type="email" name="email" placeholder="Email" value={formValues.email} onChange={handleChange} />
                <p className={classes.errors}>{formErrors.email}</p>
                <button type="submit" className={classes.button}>Send Request</button>
            </form>
        </div>
    );
}