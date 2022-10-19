import classes from './footer.module.css';
import React from 'react';

export default function Footer(){

    const logo = require('../../Assets/blacklogo.PNG');

    return (
		<footer>
			<div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}><img style={{ marginRight: "21px", borderRadius: "10px" }} src={logo} width="60" />
		<p>
			Copyright cinefra. ©2022 C# Corner. All contents are copyright of their authors.
		</p></div>
	</footer>
 
    );
}