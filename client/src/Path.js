import React from 'react';
import Register from './Register'
import Login from './Login'	
import Book from './Book'
import Home from './Home'
import Detail from './Detail'
import Session from './Session'
import Admin from './Hostel'

export default function Path({index}){
	
	if(index){
		if(index === "logout"){
			const sess = new Session()
			sess.set("loggedIn=false")
			sess.set("token=None")
			window.location.href="home"
		} 
		if(index === "admin" || index.split("#")[0] === "admin" || index.split("?")[0] === "admin"){
			const sess = new Session()
			if(sess.get("loggedIn=false")){	
				window.location.href="home"
			}
			return (<Admin/>);
		} 
		return (<Home/>);
		switch(index){
			case "home":
				return (<Home />);
			case "login":
				return (<Login/>);
			case "register":
				return (<Register/>);
			case "newbook":
				return <Book/>
			case "detail":
				return <Detail/>
			case "settings":
				window.location.href="account"
			default:
				return (<Home/>);
				
		}
	}
	return (<Home/>);
}