import * as React from 'react';
import classes from "./passwordReset.module.css";
import { useSearchParams } from "react-router-dom";
import { passwordReset } from '../../Services/userService';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import BasicSnackbar from '../../Components/snackbar/snackbar';
import {motion} from 'framer-motion';

export default function PasswordReset(){

    const [searchParams, setSearchParams] = useSearchParams();
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    var form = { password: "", confirmedpassword: "" }
    const [formValues, setFormValues] = React.useState(form);
    const [isSubmit, setIsSubmit] = React.useState(false);
    const [formErrors, setFormErrors] = React.useState({});

    const [snackbarOpen, setsnackbarOpen] = React.useState(false);
	const [snackbarContent, setsnackbarContent] = React.useState("");
	const [snackbarType, setsnackbarType] = React.useState(0);
    const navigate = useNavigate();

    const handleSnackbarClose = () => {

		setsnackbarOpen(false);
  	};

    const handleChange = (e) => {
		const {name, value} = e.target;
		setFormValues({...formValues, [name]: value});
	};

    const validatePasswords = (e) => {

		const errors = {}
		if(!formValues.password){
			errors.password = "New password is required.";
		}
		else if(formValues.password.length < 5) {
			errors.password = "Password must be longer than 5 characters.";
		}

        if(!formValues.confirmedpassword){
			errors.confirmedpassword = "You have to confirm the password";
		}else if(formValues.password !== formValues.confirmedpassword){
			errors.confirmedpassword = "Confirmed password is wrong.";
		}

		return errors;
	};

    useEffect(() => {
        
        if(Object.keys(formErrors).length === 0 && isSubmit){
			
            const data = {
                email: email,
                token: token,
                password: formValues["password"]
            }

        passwordReset(data).then(function (response){
          setsnackbarType(0);
          setsnackbarOpen(true);
          setsnackbarContent("Password reset successfully.");
          setTimeout(() => {
            navigate("/loginregpage");
          }, 1000);
        }).catch(function (error){
          setsnackbarType(1);
          setsnackbarOpen(true);
          setsnackbarContent(error["response"]["data"]);
        });
	
	    }

      }, [formErrors, formValues, isSubmit, email, token, navigate]);

    const handleSubmit = (e) => {

		e.preventDefault();
		setFormErrors(validatePasswords(formValues));
		setIsSubmit(true);

    };

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={classes.container}>
            <BasicSnackbar type={snackbarType} content={snackbarContent} isDialogOpened={snackbarOpen} handleClose={handleSnackbarClose} />
          <form onSubmit={handleSubmit} className={classes.form}>
            <h1>Reset the password:</h1>
            <span>choose a new password:</span>
            <input type="password" name="password" placeholder="New Password" value={formValues.password} onChange={handleChange}/>
            <p className={classes.errors}>{formErrors.password}</p>
            <input type="password" name="confirmedpassword" placeholder="Confirm your Password" value={formValues.confirmedpassword} onChange={handleChange}/>
            <p className={classes.errors}>{formErrors.confirmedpassword}</p>
            <button type="submit">Submit</button>
		      </form>
        </motion.div>
    );
}