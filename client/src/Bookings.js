import {React,useEffect} from 'react';
import $ from 'jquery'
import Account from './Account'
import Register from './Register'
import Login from './Login'	
import Book from './Book'
import Detail from './Detail'
import Reset from './Reset'
import Session from './Session'
import ReactDOMServer from 'react-dom/server';
import './style.css'
import './styles.css'

const ur = require('./config.json').url

const createAlert = (success,message)=>{
	console.log(message)
	const div = document.createElement("div")
	div.setAttribute("class","showalert");
	div.setAttribute("id","alert");
	if(!success){
		div.setAttribute("style","background:red;color:white;");
	}else{
		div.setAttribute("style","background:green;color:white;");
	}
	div.innerHTML = `
		<div class="alertcard">
				
				<div class="content">
					<span class="titleb">Message!</span>
					<div class="desc">${message}.</div> 
					   
				</div>
				<button type="button" class="close" onclick="()=>{document.getElementById('alert').remove()}">
					<svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
				</button>
		</div>
	`;
	document.body.appendChild(div);
	setTimeout(()=>{document.getElementById('alert').remove()},4000);
}

function Objectrow(key){
	
	let fill = "none"
	if(key.saved === true){
		fill = "#111"
	}
	let id = key._id
	
	const ref = "booking?booking="+id.toString()
	return ReactDOMServer.renderToStaticMarkup(
		<div className="booking" >
			<div className="card" id={key._id}>
			  <div className="img">
				<h3 style={{marginLeft:"-5%"}}>{key.type} </h3>
				<div className="save">
				  <svg className="svg" name={key._id} width={683} height={683} viewBox="0 0 683 683" fill={fill} xmlns="http://www.w3.org/2000/svg"  >
					<g clipPath="url(#clip0_993_25)">
					  <mask
						id="mask0_993_25"
						style={{ maskType: "luminance" }}
						maskUnits="userSpaceOnUse" x={0} y={0} width={683} height={683} >
						<path
						  d="M0 -0.00012207H682.667V682.667H0V-0.00012207Z" fill="white" name={key._id}
						/>
					  </mask>
					  <g mask="url(#mask0_993_25)">
						<path
						  d="M148.535 19.9999C137.179 19.9999 126.256 24.5092 118.223 32.5532C110.188 40.5866 105.689 51.4799 105.689 62.8439V633.382C105.689 649.556 118.757 662.667 134.931 662.667H135.039C143.715 662.667 151.961 659.218 158.067 653.09C186.451 624.728 270.212 540.966 304.809 506.434C314.449 496.741 327.623 491.289 341.335 491.289C355.045 491.289 368.22 496.741 377.859 506.434C412.563 541.074 496.752 625.242 524.816 653.348C530.813 659.314 538.845 662.667 547.308 662.667C563.697 662.667 576.979 649.395 576.979 633.019V62.8439C576.979 51.4799 572.48 40.5866 564.447 32.5532C556.412 24.5092 545.489 19.9999 534.133 19.9999H148.535Z"
						  stroke="#CED8DE" 
						  strokeWidth={40}
						  strokeMiterlimit={1}
						  strokeLinecap="round"
						  strokeLinejoin="round" name={key._id}
						/>
					  </g>
					</g>
					<defs>
					  <clipPath id="clip0_993_25">
						<rect width="682.667" height="682.667" fill="white" />
					  </clipPath>
					</defs>
				  </svg>
				</div>
			  </div>
			  <div className="text">
				<p className="h3" id="hostel"> {key.name}</p>
				<p className="p" id="inout"> Price: {key.price} </p>
				<div className="icon-box" onclick="window.location.href='/booking?booking='{key._id}">
					<a href={ref}>
				  <p className="span">View Details</p>
				     </a>
				</div>
			  </div>
			</div>
		</div>
	);
}

function GetBookings(uri){
	
	var bookings = ""
	var books = ""
	const sess = new Session()
	
	fetch(uri,{
		method:"get",
		headers: {
		  "Content-Type": "application/json",
		  "x-auth-token":sess.get("token")
		},
	}).then((res)=>{
		res.json().then((r)=>{
			if(r.message){
				createAlert(false,r.message);
			}
			for (let i = 0; i < r.length; i++) {
				if(r[i].complete === true){
					bookings += Objectrow(r[i]);
				}else{
					books += Objectrow(r[i]);
				}
			}
			setTimeout(()=>{
				document.getElementById("bookings").innerHTML=bookings;
				document.getElementById("bookings2").innerHTML=books;
			},2000)
			
		})
	})
	
	
	
}


function Banner(){
	
	const myFunction = ()=>{
		const date = new Date()
		const hours = date.getHours();
		const isAM = hours >= 0 && hours < 12 ? true : false;
		const period = isAM ? "AM" : "PM";

		const currDate = date.toDateString();
		const currTime = date.toLocaleTimeString();
		if(document.getElementById("currDate")){
			document.getElementById("currDate").textContent = currDate;
			document.getElementById("period").textContent = period;
			document.getElementById("currTime").textContent = currTime;
			
		}
	}
	useEffect(()=>{
		
		setTimeout(myFunction,1000);
		
	},[])
	return (
		<section className="popup">
		<div className="banner" onClick={myFunction}>
			<div className="moon" id="moon"><i className="fa-solid fa-sun"></i></div>
		  <p className="time-text">
			<span id="currTime">currTime</span>
			<span className="time-sub-text" id="period">PM</span>
		  </p>
		  <p className="day-text" id="currDate">currDate</p>
		</div>
		</section>
	);
}



export default function Bookings({url}){
	const sess = new Session()
	useEffect(()=>{
		const saveBook = (e)=>{
			let id = e.srcElement.attributes.name
			
			id = id.value
			if(id){
				let u = ur+"/api/booking/save/"+id
				if(e.target.style.fill.length === 0 || e.target.style.fill === "none"){
					u = ur+"/api/booking/save/"+id
					e.target.style.fill = "#111"
				}else{
					u = ur+"/api/booking/remove/"+id
					e.target.style.fill = "none"
				}
				fetch(u,{
					method:"put",
					headers: {
					  "Content-Type": "application/json",
					  "x-auth-token": sess.get("token"),
					},
					
				}).then((res)=>{
					res.json().then((r)=>{
						if(r.message){
							createAlert(false,r.message);
						}
						
						e.target.style.fill = "#111"
						
					})
				})
			}
		}
		setTimeout(()=>{
			var els = document.getElementsByClassName('svg');

			for(let i =0;i<els.length;i++){
				try{
					els[i].addEventListener("click",saveBook);
				}catch(e){console.log(e)}
			}
		},3500)
	},[])
	if(url && url === "register"){
		return(
		
			<Register/>
		);
	}
	if(url && url === "reset"){
		return(
		
			<Reset/>
		);
	}
	if(sess.get("loggedIn")==="false" && url !== "register"){
		return (<Login/>);
	}
	
	if(url && url === "wish"){
		return(
			<section >
			<div className="bookings" style={{marginTop:"12vh"}}>
				<div className="bookingtitle"><div className="titleb font-weight-regular">Saved Bookings</div><br/></div>
				<div id="bookings">{GetBookings(ur+"/api/booking/get/saved") }</div>
			</div>
			<br/>
			<div className="bookings">
				<div className="bookingtitle"><div className="titleb font-weight-regular">Pending Bookings</div><br/></div>
				<div id="bookings2"></div>	
			</div><br/>
			<Banner/>
			</section>
		);
	}else if(url && url === "account"){
		return(
			<Account/>
		);
	}else if(url && url === "book"){
		return(
			<Book/>
		);
	}else if(url && url === "booking"){
		return(
		
			<Detail/>
		);
	}else{
		return(
			<section >
			<div className="bookings" >
				<div className="bookingtitle"><div className="titleb font-weight-regular">Active Bookings</div><br/></div>
				<div id="bookings">{GetBookings(ur+"/api/booking/") }</div>
			</div>
			<br/>
			<div className="bookings">
				<div className="bookingtitle"><div className="titleb font-weight-regular">Pending Bookings</div><br/></div>
				<div id="bookings2">{GetBookings(ur+"/api/booking/") }</div>
				
						
			</div><br/>
			<Banner/>
			</section>
		);
	}
}