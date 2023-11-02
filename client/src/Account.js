import React from 'react';
import "./stylesheet.css";
import img from './assets/images/icon/male.png'
import exit from './assets/images/icon/logout.png'
import { useEffect } from "react";
import {Edit,Password,Address,Orders,Downloads,Transactions,Recurring,Wishlist,Newsletter,Rewards,Returns} from "./Accountsettings.js"
import Session from './Session'

function Load({unit}){
	const sess = new Session()
	var user = sess.get("token")
	switch(unit){
		case "home":
			return(<Home user={user} />);
		case "edit":
			return (<Edit user={user} />);
		case "password":
			return (<Password user={user} />);
		case "address":
			return (<Address />);
		case "address-add":
			return (<Address add={true} />);
		case "order":
			return (<Orders user={user} />);
		case "download":
			return (<Downloads user={user} />);
		case "transaction":
			return (<Transactions />);
		case "recurring":
			return (<Recurring />);
		case "wishlist":
			return (<Wishlist />);
		case "Newsletter":
			return (<Newsletter />);
		case "reward":
			return (<Rewards />);
		case "return":
			return (<Returns user={user} />);
		case "404":
			return (<div><h3>Error, The Page you are trying to reach is not viewabale because you dont have sufficient privilleges, login and try again</h3></div>)
		case "logout":
			const sess = new Session()
			sess.set("loggedIn=false")
			window.location.href="home"
		default:
			return(<Home />);
	}
}

function Home(){
	return (
		<div id="content" className="col-md-9 col-sm-8 col-xs-12">
		  <div className="account-right">
		    <h2>My Account</h2>
		    <div className="row account-part">
		      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
			<a href="#edit">
			  <span>
			    <img
			      src={require(`./assets/images/icon/edit-account.png`)}
			      className="img-respinsive"
			    />
			  </span>
			  <span>
			    Edit account
			    <br />
			    <h5>edit your account</h5>
			  </span>
			</a>
		      </div>
		      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
			<a href="#password">
			  <span>
			    <img
			      src={require(`./assets/images/icon/pass.png`)}
			      className="img-respinsive"
			    />
			  </span>
			  <span>
			    password
			    <br />
			    <h5>Change Your Passowrd</h5>
			  </span>
			</a>
		      </div>
		      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
			
		      </div>
		      
		    </div>
		    <h2>My Orders</h2>
		    <div className="row account-part">
		      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
			<a href="#order">
			  <span>
			    <img
			      src={require(`./assets/images/icon/order-list.png`)}
			      className="img-respinsive"
			    />
			  </span>
			  <span>
			    order history
			    <br />
			    <h5>See your order history</h5>
			  </span>
			</a>
		      </div>
		      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
			<a href="#download">
			  <span>
			    <img
			      src={require(`./assets/images/icon/download.png`)}
			      className="img-respinsive"
			    />
			  </span>
			  <span>
			    Downloads
			    <br />
			    <h5>Download Your Orders</h5>
			  </span>
			</a>
		      </div>
		      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
			
		      </div>
		      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
			<a href="#return">
			  <span>
			    <img
			      src={require(`./assets/images/icon/return.png`)}
			      className="img-respinsive"
			    />
			  </span>
			  <span>
			    Deleted
			    <br />
			    <h5>See your Deleted bookings</h5>
			  </span>
			</a>
		      </div>
		      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
			<a href="#transaction">
			  <span>
			    <img
			      src={require(`./assets/images/icon/transaction.png`)}
			      className="img-respinsive"
			    />
			  </span>
			  <span>
			    Transactions
			    <br />
			    <h5>See your Transaction</h5>
			  </span>
			</a>
		      </div>
		      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
			
		      </div>
		    </div>
		    <h2>My Account</h2>
		    <div className="row account-part">
		      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" style={{width:"45%"}}>
			<a href="logout">
			  <span>
			    <img
			      src={require(`./assets/images/icon/edit-account.png`)}
			      className="img-respinsive"
			    />
			  </span>
			  <span>
			    Logout
			    <br />
			    <h5>Sign out of your account</h5>
			  </span>
			</a>
		      </div>
		    </div>
		  </div>
		</div>

	);
}

function Show({title}){
    
	return (
		<section className="section-b-space ratio_square category-shop-section">
		   <div className="account-container">
		        
		 	<aside id="column-right" className="col-md-3 col-sm-4 col-xs-12 hidden-xs">
			  <div className="list-group account-column">
			    <h4>
			      <img src={img} />
			      My Account
			    </h4>
			    <a
			      href="#account"
			      className="list-group-item"
			    >
			      My Account
			    </a>
			    <a
			      href="#edit"
			      className="list-group-item"
			    >
			      Edit Account
			    </a>
			    <a
			      href="#password"
			      className="list-group-item"
			    >
			      Password
			    </a>
			    <a
			      href="#address"
			      className="list-group-item"
			    >
			      Address Book
			    </a>
			    <hr />
			    <h4>
			      <img src={img} />
			      My Orders
			    </h4>
			    <a
			      href="#order"
			      className="list-group-item"
			    >
			      Order History
			    </a>
			    <a
			      href="#download"
			      className="list-group-item"
			    >
			      Downloads
			    </a>
			    <a
			      href="#return"
			      className="list-group-item"
			    >
			      Returns
			    </a>
			    <a
			      href="#transaction"
			      className="list-group-item"
			    >
			      Transactions
			    </a>
			    <hr />
			    <h4>
			      <img src={img} />
			      My Stuff
			    </h4>
			    <a
			      href="#wishlist"
			      className="list-group-item"
			    >
			      Wish List
			    </a>
			    <a
			      href="#recurring"
			      className="list-group-item"
			    >
			      Recurring payments
			    </a>
			    <a
			      href="#reward"
			      className="list-group-item"
			    >
			      Reward Points
			    </a>
			    <a
			      href="#newsletter"
			      className="list-group-item"
			    >
			      Newsletter
			    </a>
			    <hr />
			    <h3 className="account-logout">
			      <img src={exit} />
			      <a
				href="logout"
				className="list-group-item"
			      >
				Logout
			      </a>
			    </h3>
			  </div>
			</aside>
			<div className="account-row" id="account-row">
			<Load unit={title}/>
		        </div>
		     </div>
		</section>

	);
}

export default function Account() {
	let y = window.location.hash;
	y = y.replace("#","");
	y = y.split("?")[0];
	useEffect(() => {
	    const doSomething = () => {
	    	y = window.location.hash;y = y.replace("#","");y = y.split("?")[0];
	    	window.location.reload();
	    };

	    window.addEventListener("hashchange", doSomething);
	    document.title = 'Rooms & Suites | Account';
	  }, []);
	const sess = new Session()
	console.log(sess.get("loggedIn"))
	if(sess.get("loggedIn") === "true"){
		return(<Show title={y}/>);
	}else{
		return(<Load unit="404"/>);
	}
	
	
}
