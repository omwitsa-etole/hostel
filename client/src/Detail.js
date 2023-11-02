import {React,useEffect} from 'react';
import "./detail.css"
import Session from './Session'
import $ from 'jquery'

const uri = require('./config.json').url

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


function Success(){
	let q = window.location.search
	q = q.replace("?","")
	q = q.split("=")
	return (
		<div className="successcard">
		  <button className="dismiss" type="button" onClick={()=>{window.location.href="home"}}>
			×
		  </button>
		  <div className="header">
			<div className="image">
			  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g id="SVGRepo_bgCarrier" strokeWidth={0} />
				<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
				<g id="SVGRepo_iconCarrier">
				  {" "}
				  <path d="M20 7L9.00004 18L3.99994 13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
				  />{" "}
				</g>
			  </svg>
			</div>
			<div className="content">
			  <span className="titleb">Order validated</span>
			  <p className="message">
				Booking of hostel successfull, kindly wait for it to be verified by admin. Thank you
			  </p>
			</div>
			<div className="actions">
			  <button className="history" type="button" onClick={()=>{window.location.href="account#order"}}>
				History
			  </button>
			  <button className="track" type="button" onClick={()=>{window.location.href="booking?booking="+q[1]}}>
				Track my Order
			  </button>
			</div>
		  </div>
		</div>

	);	
}

export function Booking({id}){
	
	const sess = new Session()
	useEffect(()=>{
		fetch(uri+"/api/booking/"+id,{
			method:"get",
			headers: {
			  "Content-Type": "application/json",
			  "x-auth-token": sess.get("token"),
			},
			
		}).then((res)=>{
			res.json().then((r)=>{
				if(r.message){
					createAlert(false,r.message);
				}
				console.log(r)
				$("#booktitle").text(r.name)
				$("#bookprice").text(r.price)
				$("#bookname").text(r.name)
				$("#booktype").text(r.type)
				$("#bookdate").text(r.date)
				$("#bookin").text(r.checkin)
				$("#bookout").text(r.checkout)
			})
		})
	},[])
	const makeBooking = ()=>{
		window.location.href="booking?success"
	}
	const deleteBooking = (id)=>{
		fetch(uri+"/api/booking/"+id,{
			method:"delete",
			headers: {
			  "Content-Type": "application/json",
			  "x-auth-token": sess.get("token"),
			},
			
		}).then((res)=>{
			res.json().then((r)=>{
				if(r.message){
					createAlert(false,r.message);
				}
				createAlert(true,"Booking Deleted")
				setTimeout(()=>{window.location.href="home"},1000)
			})
		})
	}
	return (
	<section className="detail">
		<div className="card">
		  <div className="header">
			<span className="title" id="booktitle">Hotel Name</span>
			<span className="price" id="bookprice">Kshs {500}</span>
		  </div>
		  <p className="desc">Conditions.</p>
		  <ul className="lists">
			<li className="list">
			  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
				<path fillRule="evenodd"
				  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
				  clipRule="evenodd"
				/>
			  </svg>
			  <span>Active</span>
			</li>
			<li className="list">
			  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
				<path fillRule="evenodd"
				  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
				  clipRule="evenodd"/>
			  </svg>
			  <span>Verified</span>
			</li>
			<li className="list">
			  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"  fill="currentColor">
				<path fillRule="evenodd"  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
			  </svg>
			  <span>Trusted</span>
			</li>
		  </ul>
		  <button type="button" className="action" onClick={makeBooking}>
			Book Again
		  </button>
		</div>
		
		<div className="cardb">

		  <span className="desc">
			Details.<br/>
			<span className="small-text" >Name: <b id="bookname"></b></span><br/>
			<span className="small-text" >Type: <b id="booktype"></b></span><br/>
			<span className="small-text" >Booking Date: <b id="bookdate"></b></span><br/>
			<span className="small-text" >Check in: <b id="bookin"></b></span><br/>
			<span className="small-text" >Check Out: <b id="bookout"></b></span><br/>
		  </span>
		  <div className="buttons">
			<a onClick={()=>{deleteBooking(id)}} className="button">
			  <span className="icon">
				<i className="fa-solid fa-trash"></i>
			  </span>
			  <div className="button-text google">
				<span>Delete Booking</span>
			  </div>
			</a>
			<a href="account?order_id=6#order" className="button">
			  <span className="icon">
				<i className="fa fa-eye" />
			  </span>
			  <div className="button-text apple">
				<span>More details</span>
			  </div>
			</a>
		  </div>
		</div>

	</section>
	);
}


export default function Detail(){
	useEffect(()=>{
		document.title = 'Rooms & Suites | Detail';
	},[]);
	let url = window.location.search;
	url = url.replace("?","");
	if(url === "success"){
		return (<Success/>);
	}
	url = url.split("=")[1]
	
	return (
		<section >
			<div className="bookings" style={{marginTop:"5vh"}}>
				Detail for {url}<br/>
				<Booking id={url}/>
			</div>
		</section>
	);
}