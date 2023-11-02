import React from 'react';	
import Path from './Path'



function MyApp() {
	const scrit = document.createElement("script");
	scrit.src = 'https://kit.fontawesome.com/c63faa1f51.js';
	document.head.appendChild(scrit);
	const style = document.createElement("link");
	style.rel = "stylesheet";
	style.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
	style.integrity = "sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN";
	style.crossOrigin = "anonymous"
	document.head.appendChild(style);
	let loc = window.location.href;
	loc = loc.split("/");
	loc = loc.slice(1);loc = loc.slice(1);loc = loc.slice(1);
	return (<Path index={loc[0]}/>);
}
export default MyApp;
