import {React,useEffect} from 'react';
import './style.css'
import $ from 'jquery'
import Navigator from './Navigator'
import Session from './Session'


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

function Login(){
	useEffect(() => {
		const sess = new Session()
		
		const myFunction = (e) => {
			e.preventDefault();
			var myform = $("#loginform").serialize({ hash: true })
			
			let fom = new URLSearchParams(myform)
			var payload = {
				email: fom.getAll("email")[0],
				password: fom.getAll("password")[0]
			};
			
			fetch(url+"/api/auth",{
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
						window.location.reload()
					}
				})
			})
		}
		document.getElementById("loginform").addEventListener("submit",myFunction);
	}, []);
	return (
		<section className="login-page section-b-space">
		  
			<div className="theme-card">
			  <form id="loginform" className="form_box" method="post">
				<div className="container">
				<div className="row">
				  <div className="col-lg-6">
				<h3>Login</h3>
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
					placeholder="Enter your password"
					required=""
					  />
					</div><br/>
					<button className="btn btn-solid">
					  Login
					</button>
					
					<p>Sign up for a free account<a href="register" className="btn btn-solid">Register </a></p>
					<p>Forgot password<a href="reset" className="btn btn-solid">Reset </a></p>
				</div>
		      </div>
			  </div>
			  </form>
			  	    
		  </div>
		</section>

	);
}

export default Login;
