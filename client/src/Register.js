import {React,useEffect} from 'react';
import Navigator from './Navigator'
import $ from 'jquery'
import './styles.css'
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


export default function Register() {
	const sess = new Session()
	useEffect(() => {
	
		const myFunction = (e) => {
			e.preventDefault();
			
			
			var myform = $("#loginform").serialize({ hash: true })
			var errors = false
			let fom = new URLSearchParams(myform)
			if(fom.getAll("password")[0].length < 4){
				createAlert(false,"Password length less than 4");
				errors = true
				return false;
			}
			var payload = {
				email: fom.getAll("email")[0],
				regno:fom.getAll("regno")[0],
				name: fom.getAll("firstname")[0]+" "+fom.getAll("lastname")[0],
				
				password: fom.getAll("password")[0]
			};
			if(errors === false){
				fetch(url+"/api/users/register",{
					method:"POST",
					headers: {
					  "Content-Type": "application/json",
					  // 'Content-Type': 'application/x-www-form-urlencoded',
					},
					body:JSON.stringify( payload ),
				}).then((res)=>{
					res.json().then((r)=>{
						if(r.message){
							createAlert(false,r.message);
						}
						if(r.token){
							sess.set("loggedIn=true")
							sess.set("token="+r.token)
							window.location.href = ""
						}
					})
					
				})
			}
		}
		document.getElementById("loginform").addEventListener("submit",myFunction);
	}, []);
	return (
		<section className="register-page section-b-space">
		  <div className="container">
		    
			  <form id="loginform" className="form_box">
				<div className="row">
				<div className="col-lg-12">
					<h3>create account</h3>
					<div className="theme-card">
						<div className="form-row row">
						  <div className="col-md-6">
						<label htmlFor="email">First Name</label>
						<input	  type="text"  className="form-control"	  id="fname"  name = "firstname"  placeholder="First Name"	required=""	/>
						  </div>
						  <div className="col-md-6">
						<label htmlFor="review">Last Name</label>
						<input  type="text" className="form-control" name = "lastname"  id="lname"  placeholder="Last Name"  required=""/>
						  </div>
						</div>
						<div className="form-row row">
						  <div className="col-md-6">
						<label htmlFor="Regno">Reg No</label>
						<input	  type="text"  className="form-control"	  id="regno"  name = "regno"  placeholder="Regno"	required=""	/>
						  </div>
						</div>
						<div className="form-row row">
						  <div className="col-md-6">
						<label htmlFor="email">email</label>
						<input  type="text" className="form-control" name="email"  id="email" placeholder="Your Email"  required=""/>
						  </div>
						  <div className="col-md-6">
						<label htmlFor="review">Password</label>
						<input type="password"  name="password" className="form-control"  id="review"	  placeholder="Enter your password"  required=""/>
						  </div>
						</div><br/>
						<button className="btn btn-solid" style={{width:"35%"}}>
						  Register
						</button>
						<p>
							Already have an account<a href="login" className="btn btn-solid">Login </a>.
						</p>
						</div>
					</div>
				</div>
			  </form>
			
		  </div>
		</section>

	);
}
