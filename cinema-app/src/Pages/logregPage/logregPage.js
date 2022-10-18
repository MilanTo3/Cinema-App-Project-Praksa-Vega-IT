import classes from '../logregPage/logregPage.module.css';
import {useState, useEffect} from 'react'
import UserModel from '../../Models/userModel';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


export default function LogRegPage(){

    const [isActive, setIsActive] = useState(false);
	const logo = require('../../Assets/logo.PNG');
	var userModel = new UserModel();
	const [formValues, setFormValues] = useState(userModel);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [open, setOpen] = React.useState(false);
  	const handleOpen = () => setOpen(true);
  	const handleClose = () => setOpen(false);
	  const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	  };

    const buttClicked = (e) => {
        setIsActive(current => !current);

    }

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormValues({...formValues, [name]: value});
		console.log(formValues);
	};

	useEffect(() => {
		console.log(formErrors)
		if(Object.keys(formErrors).length === 0 && isSubmit){
			console.log(formValues);
			setIsActive(false);
			for (const [key, value] of Object.entries(formValues)) {
				formValues[key] = '';
			  }
		}

	}, [formErrors]);

	const handleSubmit = (e) => {

		e.preventDefault();
		setFormErrors(validate(formValues));
		setIsSubmit(true);

	};

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
		}else if(formValues.password != formValues.confirmedpassword){
			errors.confirmedpassword = "Confirmed password is wrong.";
		}

		return errors;
	};

    return <div id="container" className={`${classes["container"]} ${ isActive ? classes["right-panel-active"] : classes["container"] }`}>
	<div className={ `${classes["form-container"]} ${classes["sign-up-container"]}` }>
		<form onSubmit={handleSubmit}>
			<h1>Create Account</h1>
			<span>or use your email for registration</span>
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
		<form action="#">
		<img className={classes.logo} src={logo}/>
			<h1 className={classes.signTitle}>Sign in</h1>
			<span>or use your account</span>
			<input type="email" placeholder="Username or Email" />
			<input type="password" placeholder="Password" />
			<button>Sign In</button>
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
				<p>Enter your personal details and start binging cinema with us.</p>
				<button className={classes.ghost} onClick={buttClicked}>Sign Up</button>
			</div>
		</div>
	</div>

	<Modal
	open={open}
	onClose={handleClose}
	aria-labelledby="modal-modal-title"
	aria-describedby="modal-modal-description"
	>
	<Box style={{textAlign:"center"}} sx={style}>
		<Typography id="modal-modal-title" variant="h6" component="h2">
		Request a new password
		</Typography>
		<Typography id="modal-modal-description" sx={{ mt: 2 }}>
			Type in your email address:
		</Typography>
		<input type="email" name="email" placeholder="Email"/>
		<button>Send Request</button>
	</Box>
	</Modal>
</div>;
}