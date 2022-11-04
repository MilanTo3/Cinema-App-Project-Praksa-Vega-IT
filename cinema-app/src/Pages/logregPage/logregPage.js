import classes from '../logregPage/logregPage.module.css';
import {useState, useEffect} from 'react'
import UserModel from '../../Models/userModel';
import * as React from 'react';
import LoginModel from '../../Models/loginModel';
import { registerUser, loginUser } from '../../Services/userService';
import BasicSnackbar from '../../Components/snackbar/snackbar';
import { useNavigate } from "react-router-dom";
import PasswordRequestModal from '../PasswordRequestModal/passwordRequestModal';
import BasicModal from '../../Components/modal/modal';
import { motion } from 'framer-motion';

export default function LogRegPage(){

    const [isActive, setIsActive] = useState(false);
	const logo = require('../../Assets/logo.PNG');
	var userModel = new UserModel();
	var loginModel = new LoginModel();
	const [formValues, setFormValues] = useState(userModel);
	const [loginFormValue, setLoginFormValue] = useState(loginModel);
	const [loginFormErrors, setLoginFormErrors] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [loginIsSubmit, setLoginSubmit] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [snackbarOpen, setsnackbarOpen] = React.useState(false);
	const [snackbarContent, setsnackbarContent] = React.useState("");
	const [snackbarType, setsnackbarType] = React.useState(0);
  	const handleOpen = () => setOpen(true);
  	const handleClose = () => setOpen(false);
	var modal = <PasswordRequestModal />

	const navigate = useNavigate();

    const buttClicked = (e) => {
        setIsActive(current => !current);

    }

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormValues({...formValues, [name]: value});
	};

	useEffect(() => {
		if(Object.keys(formErrors).length === 0 && isSubmit){
			setIsActive(false);
			
			const formData = {
				name: formValues["name"],
				email: formValues["email"],
				birthday: formValues["birthday"],
				password: formValues["password"],
			}

			registerUser(formData).then(function (response){
				setsnackbarType(0);
				setsnackbarOpen(true);
				setsnackbarContent("Registered successfully.");
			}).catch(function (error){
				setsnackbarType(1);
				setsnackbarOpen(true);
				setsnackbarContent(error.response.data.error);
			});

			for (const [key, value] of Object.entries(formValues)) {
				
				formValues[key] = '';
			}
			setIsSubmit(false);
		}

		if(Object.keys(loginFormErrors).length === 0 && loginIsSubmit){
			
			const formData = {
				email: loginFormValue["email"],
				password: loginFormValue["password"],
			}

			loginUser(formData).then(function (response){
				setsnackbarType(0);
				setsnackbarOpen(true);
				setsnackbarContent("Welcome back :)");
				setTimeout(() => {
					localStorage.setItem("loggedInUser", JSON.stringify(response["data"]));
					navigate("/");
				}, 1000);
				
			}).catch(function (error) {
				setsnackbarType(1);
				setsnackbarOpen(true);
				setsnackbarContent(error.response.data.error);
			});
			setLoginSubmit(false);
		}

	}, [formErrors, formValues, isSubmit, loginFormValue, loginFormErrors, loginIsSubmit]);

	const handleSubmit = (e) => {

		e.preventDefault();
		setFormErrors(validate(formValues));
		setIsSubmit(true);

	};

	const handleLoginChange = (e) => {
		const {name, value} = e.target;
		setLoginFormValue({...loginFormValue, [name]: value});
	};

	const loginHandleSubmit = (e) => {

		e.preventDefault();
		setLoginFormErrors(validateLogin(loginFormValue));
		setLoginSubmit(true);

	};

	const validateLogin = (e) => {

		const errors = {}
		if(!loginFormValue.email){
			errors.email = "Email is required.";
		}
		if(!loginFormValue.password){
			errors.password = "Password is required.";
		}else if(loginFormValue.password.length < 5) {
			errors.password = "Password must be longer than 5 characters.";
		}

		return errors;
	}

	const validate = (e) => {

		const errors = {}
		
		if(!formValues.name){
			errors.name = "Name is required.";
		}
		if(!formValues.email){
			errors.email = "Email is required.";
		}
		if(!formValues.password){
			errors.password = "Password is required.";
		}else if(formValues.password.length < 5){
			errors.password = "Password must be longer than 5 characters.";
		}
		if(!formValues.birthday){
			errors.birthday = "Birthday is required.";
		}
		if(!formValues.confirmedpassword){
			errors.confirmedpassword = "You have to confirm the password";
		}else if(formValues.password !== formValues.confirmedpassword){
			errors.confirmedpassword = "Confirmed password is wrong.";
		}

		return errors;
	};

	const handleSnackbarClose = () => {

		setsnackbarOpen(false);
  	};

    return <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} id="container" className={`${classes["container"]} ${classes["body"]} ${ isActive ? classes["right-panel-active"] : classes["container"] }`}>

	<div className={ `${classes["form-container"]} ${classes["sign-up-container"]}` }>
		<form onSubmit={handleSubmit} className={classes.form}>
			<h1>Create Account</h1>
			<span>join us, you get a 5% discount!</span>
			<input type="text" name="name" placeholder="Name" value={formValues.name} onChange={handleChange} />
			<p className={classes.errors}>{formErrors.name}</p>
			<input type="email" name="email" placeholder="Email" value={formValues.email} onChange={handleChange}/>
			<p className={classes.errors}>{formErrors.email}</p>
			<input type="text" onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")} name="birthday" placeholder="Birth date" value={formValues.birthday} onChange={handleChange}/>
			<p className={classes.errors}>{formErrors.birthday}</p>
			<input type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange}/>
			<p className={classes.errors}>{formErrors.password}</p>
			<input type="password" name="confirmedpassword" placeholder="Confirm your Password" value={formValues.confirmedpassword} onChange={handleChange}/>
			<p className={classes.errors}>{formErrors.confirmedpassword}</p>
			<button type="submit">Sign Up</button>
		</form>
	</div>
	<div className={`${classes["form-container"]} ${classes["sign-in-container"]}`}>
		<form onSubmit={loginHandleSubmit} className={classes.form}>
			<img className={classes.logo} src={logo}/>
			<h1 className={classes.signTitle}>Sign in</h1>
			<span>or use your account</span>
			<input type="email" name="email" placeholder="Username or Email" value={loginFormValue.email} onChange={handleLoginChange} />
			<p className={classes.errors}>{loginFormErrors.email}</p>
			<input type="password" name="password" placeholder="Password" value={loginFormValue.password} onChange={handleLoginChange} />
			<p className={classes.errors}>{loginFormErrors.password}</p>
			<button type="submit">Sign In</button>
			<p onClick={handleOpen} className={classes.forgotPassword}>Forgot your password?</p>
		</form>
	</div>
	<div className={classes["overlay-container"]}>
		<div className={classes.overlay}>
			<div className={`${classes["overlay-panel"]} ${classes["overlay-left"]}`}>
				<h1>Already have an account?</h1>
				<p>To keep connected with us please login with your personal info.</p>
				<button className={classes.ghost} onClick={buttClicked}>Sign In</button>
			</div>
			<div className={`${classes["overlay-panel"]} ${classes["overlay-right"]}`}>
				<h1>First time here?</h1>
				<p>Enter your personal details and start binging cinema with us, you get a 5% discount!</p>
				<button className={classes.ghost} onClick={buttClicked}>Sign Up</button>
			</div>
		</div>
	</div>
	<BasicSnackbar type={snackbarType} content={snackbarContent} isDialogOpened={snackbarOpen} handleClose={handleSnackbarClose} />
	<BasicModal content={modal} isDialogOpened={open} handleCloseDialog={handleClose} />

</motion.div>;
}