import React from 'react';
import $ from 'jquery';

const url = "https://localhost:2345"

export default class Session {
	constructor(){
		document.cookie = "session=false";
		if(!this.get("loggedIn")){
			document.cookie = "loggedIn=false"
		}
		if(!this.get("token")){
			document.cookie = "token=None"
		}
	}
	
	check(session=false){
		return document.cookie
	}
	get(session){
		if(session){
			session = session.replace(" ","");
			let cookie = document.cookie;
			const slits = cookie.split(";");
			for(const slit of slits){
				let sls = slit.split("=");
				
				if( sls[0].replace(" ","") === session){
				
					this.session = sls[1].replace(" ","");
					return this.session
				}
			}
			return false
		}
		return false;
	}
	set(session){
		document.cookie = session;
	}
	toJson(session){
		return JSON.parse(session);
	}
} 
