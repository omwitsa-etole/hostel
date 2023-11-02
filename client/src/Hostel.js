import {React,useEffect} from 'react';
import $ from 'jquery'
import Navigator from './Navigator'
import Session from './Session'
import './styles.css'
import {Add,Orders,Users,Hostels,Hostel,Book,User} from './Adminsettings'
import img from './assets/images/icon/male.png'
import exit from './assets/images/icon/logout.png'

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

function Load({unit}){
	const sess = new Session()
	const user = sess.get("token")
	if(window.location.search.includes("=")){
		let q = window.location.search
		q = q.replace("?","")
		
		q = q.split("&")[0]
		q = q.split("=")
		switch(q[0]){
			case "hostel":
				return <Hostel user={user} id={q[1]}/>
			case "booking":
				return <Book user={user} id={q[1]}/>
			case "user":
				return <User user={user} id={q[1]}/>
		}
	}
	switch(unit){
		case "orders":
			return <Orders user={user}/>
		case "users":
			return <Users user={user}/>
		case "all":
			return <Hostels user={user}/>
		case "add":
			return <Add user={user}/>
		default:
			return <Add user={user}/>
	}
}

export default function Admin(){
	let uri = window.location.hash
	uri = uri.replace("#","");
	uri = uri.split("?")[0];
	useEffect(()=>{
		
		const myFunction = () =>{
			
			uri = uri.replace("#","");
			uri = uri.split("?")[0];
			window.location.reload()
		}
		window.addEventListener("hashchange",myFunction);
	},[])
	
	
	return (
		<section className="section-b-space ratio_square category-shop-section">
		   <div className="account-container">
		        
		 	<aside id="column-right" className="col-md-3 col-sm-4 col-xs-12 hidden-xs" style={{display:"block",marginTop:"8%",left:"1%",width:"16%",position:"fixed"}}>
			  <div className="list-group account-column">
			    <h4>
			      <img src={img} />
			      Dashboard
			    </h4>
			    <a href="admin#orders"    className="list-group-item"  >
			      Orders
			    </a>
			    <a   href="admin#users"  className="list-group-item"   >
			      Users
			    </a>
			    
			    <hr />
			    <h4>
			      <img src={img} />
			      Action
			    </h4>
			    <a  href="admin#add"    className="list-group-item"   >
			      Add Hostel
			    </a>
			    <a   href="admin#all"   className="list-group-item"   >
			      All Hostels
			    </a>
			    
			    <hr />
			    
			    <hr />
			    <h3 className="account-logout">
			      <img src={exit} />
			      <a href="logout" className="list-group-item">
				Logout    </a>
			    </h3>
			  </div>
			</aside>
			<div className="account-row" id="account-row" style={{marginLeft:"20%",width:"79%"}}>
			<Load unit={uri}/>
		        </div>
		     </div>
		</section>

	);
}
