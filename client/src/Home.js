import {React,useEffect} from 'react';
import './style.css'
import './styles.css'
import Navigator from './Navigator'
import Path from './Path'
import Bookings from './Bookings'
import Register from './Register'
import Login from './Login'	
import Book from './Book'
import Detail from './Detail'
import Account from './Account'
import Session from './Session'
import Reset from './Reset'

const map = {"login":Login,"register":Register,"":Book,"book":Book,"booking":Detail,"settings":Account,"account":Account,"reset":Reset}

function Panel(){
	const sess = new Session()
	if(sess.get("loggedIn")==="true"){
		return (
			<>
			<a href="account" id="account" aria-current="page" className="v-tab active" tabindex="0" aria-selected="false" role="tab">
			<i aria-hidden="true" className="v-icon notranslate v-icon--left mdi mdi-webhook theme--dark"></i>ACCOUNT 
			</a>
			<a href="wish" id="wish" className="v-tab" tabindex="0" aria-selected="false" role="tab">
			<i aria-hidden="true" className="v-icon notranslate v-icon--left mdi mdi-file-document-outline theme--dark"></i>Saved
			</a>
			</>
		);
	}else{
		return (
			<p></p>
		);
	}
}

export default function Home(){
	useEffect(() => {
		const myFunction = () =>{
			const els = document.getElementsByClassName("v-tab")
			for(let i=0;i<els.length;i++){
				let e = els[i]
				if(e.classList.contains("active")){
					e.classList.remove("active")
				}
				
			}
			if(document.getElementById(url)){
				document.getElementById(url).setAttribute("style","background:#ddd;color:green;")
			}else{
				document.getElementById("home").setAttribute("style","background:#ddd;color:green;")
			}
		}
		setTimeout(myFunction,1999)
		document.title = 'Rooms & Suites | Home';
	}, []);
	let url = "home";
	newRole();
	function newRole(){
		let loc = window.location.href;
		loc = loc.split("/");
		loc = loc.slice(1);loc = loc.slice(1);loc = loc.slice(1);
		 loc[0]=  loc[0].split("?")[0]
		url = loc[0].split("#")[0];
		
		if(document.getElementById("dialog")){
			/*
			document.getElementById("dialog").style.display = "block";
			setTimeout(()=>{document.getElementById("closebtn").addEventListener("click", closeRole);document.getElementById("cancel").addEventListener("click", closeRole)}
			,1999);*/
		}else{setTimeout(newRole,2000);}
	}
	function closeRole(){
		if(document.getElementById("dialog")){
			document.getElementById("dialog").style.display = "none";
		}
	}
	const sess = new Session()
	if(url === "login" || url === "register"){
		if(sess.get("loggedIn")==="true"){
			url = "book"
		}
	}
	
	
	const Dest = (map[url] === undefined) ? map["book"]() : map[url]();
   return (
		<section className="header">
			<div className="v-card" style={{position:"fixed",top:"0"}}>
			<div className="ha">

			<Navigator title="h"/>

			</div>

			<div className="hb">
			<a href="home" id="home" className="v-tab active"  tabIndex="0" aria-selected="true" role="tab">
			<i aria-hidden="true" className="v-icon notranslate v-icon--left mdi mdi-home-account theme--dark"></i>HOME 
			</a>
			<Panel />

			</div>
			</div>
			<div className="panel">
			<Bookings url={url} />
			</div>
			<div role="dialog" id="dialog" aria-modal="true" className="v-dialog__content" style={{zIndex: "1202",display:"none",opacity:""}}>
			<div className="v-dialog" style={{transformOrigin: "center center",marginLeft:"-.5%", maxWidth: "95%",minWidth:"555px", display: "block",height:"95%",overflowY:"auto",opacity:"",background:"white"}}>
				<a id="closebtn" href="javascript:void(0)" ><i className="fa fa-times"></i></a>
				{Dest}
				<a id="cancel">Cancel</a>
				<div>
				
				</div>
			</div>
			</div>

		</section>
  	
  );
}