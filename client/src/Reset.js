import {React,useEffect} from 'react';

import $ from 'jquery'
import Navigator from './Navigator'
import Session from './Session'

const url = require('./config.json').url

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


function Login(){
	useEffect(() => {
		const sess = new Session()
		
		const myFunction = (e) => {
			e.preventDefault();
			var myform = $("#resetform").serialize({ hash: true })
			
			let fom = new URLSearchParams(myform)
			var payload = {
				email: fom.getAll("email")[0],
				password: fom.getAll("password")[0]
			};
			
			fetch(url+"/api/users/reset",{
				method:"POST",
				headers: {
				  "Content-Type": "application/json",
				  // 'Content-Type': 'application/x-www-form-urlencoded',
				},
				body:JSON.stringify( payload ),
			}).then((res)=>{
				res.json().then((r)=>{
					if(r.message){
						createAlert(true,r.message);
					}
					createAlert(true,r.message);
					
				})
			})
		}
		setTimeout(()=>{document.getElementById("resetform").addEventListener("submit",myFunction)},2000);
	}, []);
	return (
		<form className="form_box" id="resetform" style={{margin:"4% auto"}}>
		  <p className="form-title">Reset your password</p>
		  <div className="form-group">
			  <label htmlFor="email">Email</label>
			  <input type="text"className="form-control" name="email" id="email"	placeholder="Email" required=""   />
			</div>
			<div className="form-group">
			  <label htmlFor="review">Password</label>
			  <input
			type="password"
			className="form-control"
			id="password"
			name = "password"
			placeholder="Enter your new password"
			required=""
			  />
			</div><br/>
			<button className="btn btn-solid">
			  Reset
			</button>
		  
		  <p className="signup-link">
			<a href="login">Login</a>
		  </p>
		</form>


	);
}

export default Login;
