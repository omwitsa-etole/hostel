import React from 'react';
import Session from './Session'
import $ from 'jquery'



export function Button(){
	const sess = new Session()
	console.log(sess.check())
	if(sess.get("loggedIn") === "true"){
		return (
			<div>
			<button onClick={()=>{window.location.href='book'}} type="button" className="v-btn v-btn--outlined v-btn--rounded theme--dark v-size--default"><span className="v-btn__content">BOOK NOW</span></button>
			<button onClick={()=>{window.location.href='logout'}} type="button" className="v-btn v-btn--outlined v-btn--rounded theme--dark v-size--default"><span className="v-btn__content">SIGN OUT</span></button>
			</div>
		);
	}
	return (
		<div><button onClick={()=>{window.location.href='login'}} type="button" className="mr-3 v-btn v-btn--outlined v-btn--rounded theme--dark v-size--default"><span className="v-btn__content">LOGIN</span></button>
		<button type="button"  onClick={()=>{window.location.href='register'}} className="v-btn v-btn--outlined v-btn--rounded theme--dark v-size--default"><span className="v-btn__content">SIGNUP</span></button>
		</div>
	);
}
let user = {name:"User"}
export default function Navigator({title}){
	const sess = new Session()
	
	if(sess.get("token") !== "None"){
		try{
			
			fetch("http://localhost:8081/api/auth",{
				method:"get",
				headers: {
				  "Content-Type": "application/json",
				  'x-auth-token':sess.get("token")
				},
			}).then((res)=>{
				res.json().then((r)=>{
					user = r.user
					
					$("#username").text(user.name.split(" ")[0])
					$("#headline").text(user.name.split(" ")[0][0])
					$("#signedtext").text("You are logged in")
					
				})
			})
		}catch(e){console.log(e)}
	}
	
	if(sess.get("loggedIn") === "true"){
		return (
			<>
			
			<div className="v-avatar" style={{height: "50px", minWidth: "50px", width: "50px"}}>
	<span className="headline white--text" id="headline">{user.name.split(" ")[0][0]}</span>
			</div>
			<div className="navtext">
			<div className="ml-3"><div className="title"> Welcome, <span className="font-weight-bold" id="username">{user.name.split(" ")[0]}</span></div>
			<div className="caption mt-n1" style={{marginLeft:"-29%"}} id="signedtext"> You are not signed in </div></div>
			</div>
			<div className="hidden-xs">
			
			<Button />
			</div>
		</>
		);
	}
	return (
		<>
			
			<div className="v-avatar" style={{height: "50px", minWidth: "50px", width: "50px"}}>
			<span className="headline white--text">D</span>
			</div>
			<div className="navtext">
			<div className="ml-3"><div className="title font-weight-regular"> Welcome, <span className="font-weight-bold">Developer</span></div>
			<div className="caption mt-n1" style={{marginLeft:"-29%"}}> You are not signed in </div></div>
			</div>
			<div className="hidden-xs">
			
			<Button />
			</div>
		</>

	);
}
