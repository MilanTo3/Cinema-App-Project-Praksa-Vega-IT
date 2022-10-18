import classes from './footer.module.css';
import React from 'react';

export default function Footer(){

    const logo = require('../../Assets/blacklogo.PNG');

    return (
  <footer className={classes.footer}>
  	<div className={classes.container}>
  	 	<div className={classes.row}>
  	 		<div className={classes["footer-col"]}>
  	 			<h4>company</h4>
  	 			<ul>
  	 				<li><a href="#">about us</a></li>
  	 				<li><a href="#">our services</a></li>
  	 				<li><a href="#">privacy policy</a></li>
  	 				<li><a href="#">affiliate program</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className={classes["footer-col"]}>
  	 			<h4>get help</h4>
  	 			<ul>
  	 				<li><a href="#">FAQ</a></li>
  	 				<li><a href="#">shipping</a></li>
  	 				<li><a href="#">returns</a></li>
  	 				<li><a href="#">order status</a></li>
  	 			</ul>
  	 		</div>
               <img src={logo} className={classes.image} />
  	 	</div>
		<p className={classes.disclaimer}>Copyright disclaimer: If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at mtomin367@gmail.com. Our Disclaimer was generated with the help of the <a className={classes.disclaimer} href="https://www.disclaimergenerator.net/">Free Disclaimer Generator</a>.</p>

  	 </div>
  </footer>
 
    );
}