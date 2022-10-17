import classes from '../logregPage/logregPage.module.css';
import {useState} from 'react'

export default function LogRegPage(){

    const [isActive, setIsActive] = useState(false);
	const logo = require('../../Assets/logo.PNG');

    const buttClicked = (e) => {
        setIsActive(current => !current);

    }

    return <div id="container" className={`${classes["container"]} ${ isActive ? classes["right-panel-active"] : classes["container"] }`}>
	<div className={ `${classes["form-container"]} ${classes["sign-up-container"]}` }>
		<form action="#">
			<h1>Create Account</h1>
			<span>or use your email for registration</span>
			<input type="text" placeholder="Name" />
			<input type="email" placeholder="Email" />
			<input type="Birth date" placeholder="Birth date" type="Date" />
			<input type="password" placeholder="Password" />
			<button>Sign Up</button>
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