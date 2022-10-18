import classes from '../logregPage/logregPage.module.css';
import {useState, useEffect} from 'react'
import UserModel from '../../Models/userModel';

export default function LogRegPage(){

    const [isActive, setIsActive] = useState(false);
	const logo = require('../../Assets/logo.PNG');
	var userModel = new UserModel();
	const [formValues, setFormValues] = useState(userModel);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

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
			<p className={classes.forgotPassword}>Forgot your password?</p>
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
</div>;
}