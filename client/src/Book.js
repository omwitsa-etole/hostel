import {React,useEffect} from 'react';
import './style.css'
import './styles.css'
import './stylesheet.css'
import $ from 'jquery'
import Session from './Session'
import ReactDOMServer from 'react-dom/server'

const url = require('./config.json').url

const createAlert = (success,message)=>{
	
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

export function Books(key){
	let fill = "none"
	if(key.saved === true){
		fill = "#111"
	}
	
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
				<div className="icon-box" >
					
				  <p className="span">Book Now</p>
				</div>
			  </div>
			</div>
		</div>
	);
}


function Query({uri}){
	let rows = "";
	const sess = new Session()
	useEffect(()=>{
		const makeBook = (e) =>{
			let id = e.target.parentElement.parentElement
			console.log(id.id)
			if(id.id){
				fetch(url+"/api/booking/"+id.id,{
					method:"post",
					headers: {
					  "Content-Type": "application/json",
					  "x-auth-token": sess.get("token"),
					},
					
				}).then((res)=>{
					res.json().then((r)=>{
						if(r.message){
							createAlert(false,r.message);
						}
						if(res.status === 200){
							window.location.href = "booking?success="+r._id
						}
						createAlert(true,"success");
					})
				})
			}
		}
		const saveBook = (e)=>{
			let id = e.srcElement.attributes.name
			
			id = id.value
			let u = url+"/api/booking/save/"+id
			if(e.target.style.fill.length === 0 || e.target.style.fill === "none"){
				u = url+"/api/booking/save/"+id
				e.target.style.fill = "#111"
			}else{
				u = url+"/api/booking/remove/"+id
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
					createAlert(true,"Saved booking");
					
				})
			})
			
		}
		setTimeout(()=>{
			var els = document.getElementsByClassName('svg');

			for(let i =0;i<els.length;i++){
				try{
					els[i].onclick= saveBook;
				}catch(e){console.log(e)}
			}
			var els = document.getElementsByClassName('icon-box');

			for(let i =0;i<els.length;i++){
				try{
					els[i].onclick= makeBook;
				}catch(e){console.log(e)}
			}
		},3500)
	},[])
	fetch(url+"/api/hostels/",{
		method:"get",
		headers: {
		  "Content-Type": "application/json",
		  "x-auth-token":sess.get("token")
		},
	}).then((res)=>{
		res.json().then((r)=>{
			
			if(r.length){
				for (let i = 0; i < r.length; i++) {
					rows+= Books(r[i]);
				}
				setTimeout(()=>{
					document.getElementById("bookings").innerHTML=rows;
				},2000)
			}
		})
	})
	
	
	return (
		<div className="bookings">
		<div className="bookingtitle">Results for {uri}<br/></div>
		<div id="bookings"></div>
		</div>
	)
	
}



export default function Book(){
	
	useEffect(()=>{
		document.title = 'Rooms & Suites | Book';
		
	},[]);
	const sess = new Session()
	if(sess.get("loggedIn")==="false"){
		return (<h4>Error <a href="login">login to continue</a></h4>);
	}
	let loc = window.location.href;
	loc = loc.split("/");
	loc = loc.slice(1);loc = loc.slice(1);loc = loc.slice(1);
	let url =  loc[0].split("?")
		
	if(url.length > 1){
		const xs = url[1].split("&")
		const arr = []
		for (const x in xs){
			
			arr.push([xs[x].split("=")[0], xs[x].split("=")[1]])
		}
		let q = ""
		
		for(const x in arr){
			
			q=q+arr[x][0]+":'"+arr[x][1]+"',"
			
		}
		
		q = JSON.stringify(q)
		
		return (
			<div className="" style={{marginTop:"9vh",width:"100%"}}>
				
				<Query url={q}/>;
			</div>
			
		)
	
	}
	
	return (
		<div className="single-boking-form">
		  <div className="section-title">
			<div className="sub-title">
			  <h5>ROOMS &amp; SUITES</h5>
			</div>
			<div className="main-title">
			  <h2>Hotel Booking Form</h2>
			</div>
		  </div>
		  <div className="row">
			<div className="col-lg-12">
			  <form	id="bookform" method="get">
				<div className="row">
				  <div className="col-lg-6 col-md-6">
					<div className="boking-titles">
					  <h4>Destination</h4>
					</div>
					<div className="form_box">
					  <input
						type="text"
						id="myDestination"
						name="destination"
						placeholder="Hostel Destination"
					  />
					</div>
				  </div>
				  <div className="col-lg-6 col-md-6">
					<div className="boking-titles">
					  <h4>Price Range</h4>
					</div>
					<div className="form_box">
					  <select id="range" name="rangelist">
						<option value={1}>3000</option>
						<option value={2}>5000</option>
						<option value={3}>9000</option>
						<option value={4}>15000</option>
					  </select>
					</div>
				  </div>
				</div>
				<div className="row">
				  <div className="col-lg-6 col-md-6">
					<div className="boking-titles">
					  <h4>Check In</h4>
					</div>
					<div className="form_box">
					  <input
						type="date"
						id="myDate"
						name="name"
						placeholder="MM/DD/YYYY"
					  />
					</div>
				  </div>
				  <div className="col-lg-6 col-md-6">
					<div className="boking-titles">
					  <h4>Check Out</h4>
					</div>
					<div className="form_box">
					  <input
						type="date"
						id="myDate"
						name="email"
						placeholder="MM/DD/YYYY"
					  />
					</div>
				  </div><br/>
				  <div className="col-lg-6 col-md-6">
					<div className="boking-titles">
					  <h4>Adult</h4>
					</div>
					<div className="form_box">
					  <select id="cars" name="adult">
						<option value="1">1</option>
						<option value="2">1</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7+</option>
					  </select>
					</div>
				  </div>
				  <div className="col-lg-6 col-md-6">
					<div className="boking-titles">
					  <h4>Children</h4>
					</div>
					<div className="form_box">
					  <select id="cars" name="child">
						<option value="1">1</option>
						<option value="2">1</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7+</option>
					  </select>
					</div>
				  </div>
				  <div className="col-lg-12 col-md-12">
					<div className="form-button">
					  <button type="submit" style={{ width: "85%", marginLeft: "5%" }}>
						Check Availability
					  </button>
					</div>
				  </div>
				</div>
			  </form>
			  <div id="status" />
			</div>
		  </div>
		</div>

	);
}