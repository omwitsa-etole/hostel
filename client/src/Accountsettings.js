import {React,useEffect} from 'react';
import './stylesheet.css'
import Return from './Return'
import $ from 'jquery'


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

export function Wishlist(){
	return(
		<div id="content" className="col-md-9 col-sm-8 col-xs-12">
		  <h1 className="heading">Wishlist</h1>
		  <p></p>
		  <div className="table-responsive">
			  <table className="table table-bordered table-hover">
			    <thead>
			      <tr>
				<td className="text-center">Image</td>
				<td className="text-left">Product Name</td>
				<td className="text-left">Model</td>
				<td className="text-right">Stock</td>
				<td className="text-right">Unit Price</td>
				<td className="text-right">Action</td>
			      </tr>
			    </thead>
			    <tbody>
			      <tr>
				<td className="text-center">
				  <a href="product?product_id=43">
				    <img
				      src={require("./assets/images/product/inspire-opencart-free-theme-product-06-47x47.jpg")}
				      alt="MacBook"
				      title="MacBook"
				    />
				  </a>
				</td>
				<td className="text-left">
				  <a href="product?product_id=43">
				    MacBook
				  </a>
				</td>
				<td className="text-left">Product 16</td>
				<td className="text-right">In Stock</td>
				<td className="text-right">
				  {" "}
				  <div className="price">
				    {" "}
				    <b>$302.00</b> <s>$602.00</s>
				  </div>
				</td>
				<td className="text-right">
				  <button
				    type="button"
				    onclick="cart.add('43');"
				    data-toggle="tooltip"
				    title=""
				    className="btn btn-primary"
				    data-original-title="Add to Cart"
				  >
				    <i className="fa fa-shopping-cart" />
				  </button>
				  <a
				    href="#wishlist?remove=43"
				    data-toggle="tooltip"
				    title=""
				    className="btn btn-danger"
				    data-original-title="Remove"
				  >
				    <i className="fa fa-times" />
				  </a>
				</td>
			      </tr>
			    </tbody>
			  </table>
			</div>

		  <div className="buttons clearfix">
		    <div className="pull-right">
		      <a
			href="#account"
			className="btn btn-primary"
		      >
			Continue
		      </a>
		    </div>
		  </div>
		</div>
	);
}

export function Newsletter(){
	return(
		<div id="content" className="col-md-9 col-sm-8 col-xs-12">
		  <h1 className="heading">Newsletter Subscription</h1>
		  <form action="#newsletter" method="post" encType="multipart/form-data" className="form-horizontal">
		    <fieldset>
		      <div className="form-group">
			<label className="col-sm-2 control-label">Subscribe</label>
			<div className="col-sm-10">
			  <label className="radio-inline">
			    <input type="radio" name="newsletter" defaultValue={1} />
			    Yes{" "}
			  </label>
			  <label className="radio-inline">
			    <input
			      type="radio"
			      name="newsletter"
			      defaultValue={0}
			      defaultChecked="checked"
			    />
			    No
			  </label>
			</div>
		      </div>
		    </fieldset>
		    <div className="buttons clearfix">
		      <div className="pull-left">
			<a
			  href="#account"
			  className="btn btn-default"
			>
			  Back
			</a>
		      </div>
		      <div className="pull-right">
			<input
			  type="submit"
			  defaultValue="Continue"
			  className="btn btn-primary"
			/>
		      </div>
		    </div>
		  </form>
		</div>

	);
}

export function Rewards(){
	return(
		<div id="content" className="col-md-9 col-sm-8 col-xs-12">
		  <h1 className="heading">Your Reward Points</h1>
		  <p>
		    Your total number of reward points is: <b>0</b>.
		  </p>
		  <div className="table-responsive">
		    <table className="table table-bordered table-hover">
		      <thead>
			<tr>
			  <td className="text-left">Date Added</td>
			  <td className="text-left">Description</td>
			  <td className="text-right">Points</td>
			</tr>
		      </thead>
		      <tbody>
			<tr>
			  <td className="text-center" colSpan={3}>
			    You do not have any reward points!
			  </td>
			</tr>
		      </tbody>
		    </table>
		  </div>
		  <div className="row">
		    <div className="col-sm-6 text-left" />
		    <div className="col-sm-6 text-right">Showing 0 to 0 of 0 (0 Pages)</div>
		  </div>
		  <div className="buttons clearfix">
		    <div className="pull-right">
		      <a
			href="#account"
			className="btn btn-primary"
		      >
			Continue
		      </a>
		    </div>
		  </div>
		</div>
	);
}

export function Recurring(){
	return(
		<div id="content" className="col-md-9 col-sm-8 col-xs-12">
		  <h1 className="heading">Recurring Payments</h1>
		  <p>No recurring payments found!</p>
		  <div className="buttons clearfix">
		    <div className="pull-right">
		      <a
			href="#account"
			className="btn btn-primary"
		      >
			Continue
		      </a>
		    </div>
		  </div>
		</div>
	);
}

export function Transactions(){
	return(
		<div id="content" className="col-md-9 col-sm-8 col-xs-12">
		  <h1 className="heading">Your Transactions</h1>
		  <p>
		    Your current balance is: <b>$0.00</b>.
		  </p>
		  <div className="table-responsive">
		    <table className="table table-bordered table-hover">
		      <thead>
			<tr>
			  <td className="text-left">Date Added</td>
			  <td className="text-left">Description</td>
			  <td className="text-right">Amount (USD)</td>
			</tr>
		      </thead>
		      <tbody>
			<tr>
			  <td className="text-center" colSpan={5}>
			    You do not have any transactions!
			  </td>
			</tr>
		      </tbody>
		    </table>
		  </div>
		  <div className="row">
		    <div className="col-sm-6 text-left" />
		    <div className="col-sm-6 text-right">Showing 0 to 0 of 0 (0 Pages)</div>
		  </div>
		  <div className="buttons clearfix">
		    <div className="pull-right">
		      <a
			href="#account"
			className="btn btn-primary"
		      >
			Continue
		      </a>
		    </div>
		  </div>
		</div>
	);
}


export function Downloads({user}){
	useEffect(()=>{
		let bookings = ""
		fetch(url+"/api/booking/get/history",{
				method:"get",
				headers: {
				  "Content-Type": "application/json",
				  "x-auth-token": user,
				},
				
			}).then((res)=>{
				res.json().then((r)=>{
					if(r.message){
						createAlert(false,r.message);
					}
					if(r.length > 0){
						$("#noorders").text("Click the download button to get your order history in a file")
						document.getElementById("download").style.display="block"
					}
					for(let i=0;i<r.length;i++){
						const book = r[i]
						let pen = "pending"
						if(book.complete === true){
							pen = "complete"
						}
						bookings += `
						`;
					}
					
				})
			})
	},[]);
	return(
		<div id="content" className="col-md-9 col-sm-8 col-xs-12">
		  <h1 className="heading">Order Downloads</h1>
		  <p id="noorders">You have not made any previous downloadable orders!</p>
		  <div className="buttons clearfix">
		   <div className="pull-left">
		      <a id="download" style={{display:"none"}}
			href="#"
			className="btn btn-primary"
		      >
			Download
		      </a>
		    </div>
		    <div className="pull-right">
		      <a
			href="#account"
			className="btn btn-primary"
		      >
			Continue
		      </a>
		    </div>
		  </div>
		</div>
	);
}

export function Returns({user}){
	useEffect(()=>{
		let bookings = ""
		fetch(url+"/api/booking/get/deleted",{
			method:"get",
			headers: {
			  "Content-Type": "application/json",
			  "x-auth-token": user,
			},
			
		}).then((res)=>{
			res.json().then((r)=>{	
				if(r.message){
						createAlert(false,r.message);
					}
					if(r.length > 0){
						$("noorders").text("")
					}
					for(let i=0;i<r.length;i++){
						const book = r[i]
						let pen = "pending"
						if(book.complete === true){
							pen = "complete"
						}
						bookings += `
							<tr>
								<td className="text-right">${book._id}</td>
								<td className="text-left">${book.name}</td>
								<td className="text-right">1</td>
								<td className="text-left">${pen}</td>
								<td className="text-right">${book.price}</td>
								<td className="text-left">${book.date}</td>
								<td className="text-right">
								  <a
									href="booking?booking=${book._id.toString()}#order"
									data-toggle="tooltip"
									title=""
									className="btn btn-primary"
									data-original-title="View"
								  >
									<i className="fa fa-eye" />
								  </a>
								</td>
								  </tr>
						`;
					}
					setTimeout(()=>{
						document.getElementById("orderhistory").innerHTML = bookings;
					},2000)	
			})
		})
	},[]);
	return(
		<div id="content" className="col-md-9 col-sm-8 col-xs-12">
		  <h1 className="heading">Order Returns</h1>
		  <p id="noorders">You have not made any previous returns on orders!</p>
		  <div className="table-responsive">
			  <table className="table table-bordered table-hover">
			    <thead>
			      <tr>
				<td className="text-right">Order ID</td>
				<td className="text-left">Name</td>
				<td className="text-right">No. of Products</td>
				<td className="text-left">Status</td>
				<td className="text-right">Price</td>
				<td className="text-left">Date Deleted</td>
				<td />
			      </tr>
			    </thead>
			    <tbody id="orderhistory">
			      
			    </tbody>
			  </table>
		  </div>
		  
		  <div className="buttons clearfix">
		    <div className="pull-right">
		      <a
			href="#account"
			className="btn btn-primary"
		      >
			Continue
		      </a>
		    </div>
		  </div>
		</div>
	);
}

export function Orders({user}){
	
	useEffect(()=>{
		let bookings = ""
		fetch(url+"/api/booking/get/history",{
				method:"get",
				headers: {
				  "Content-Type": "application/json",
				  "x-auth-token": user,
				},
				
			}).then((res)=>{
				res.json().then((r)=>{
					if(r.message){
						createAlert(false,r.message);
					}
					if(r.length > 0){
						$("noorders").text("")
					}
					for(let i=0;i<r.length;i++){
						const book = r[i]
						let pen = "Active"
						console.log("order=",book.complete)
						if(book.complete === false){
							pen = "Pending"
						}
						
						bookings += `
							<tr>
								<td className="text-right"><a href='booking?booking=${book._id}'>${book._id}</a></td>
								<td className="text-left">${book.name}</td>
								<td className="text-right">1</td>
								<td className="text-left">${pen}</td>
								<td className="text-right">${book.price}</td>
								<td className="text-left">${book.bookdate}</td>
								<td className="text-right">
								  <a
									href="booking?booking=${book._id.toString()}#order"
									data-toggle="tooltip"
									title=""
									className="btn btn-primary"
									data-original-title="View"
								  >
									<i className="fa fa-eye" />
								  </a>
								</td>
								  </tr>
						`;
					}
					setTimeout(()=>{
						document.getElementById("orderhistory").innerHTML = bookings;
					},2000)
				})
			})
	},[]);
	
	return(
		<div id="content" className="col-md-9 col-sm-8 col-xs-12">
		  <h1 className="heading">Order History</h1>
		  <p id="noorders">You have not made any previous orders!</p>
		  <div className="table-responsive">
			  <table className="table table-bordered table-hover">
			    <thead>
			      <tr>
				<td className="text-right">Order ID</td>
				<td className="text-left">Customer</td>
				<td className="text-right">No. of Products</td>
				<td className="text-left">Status</td>
				<td className="text-right">Total</td>
				<td className="text-left">Date Added</td>
				<td />
			      </tr>
			    </thead>
			    <tbody id="orderhistory">
			      
			    </tbody>
			  </table>
			</div>

		  <div className="buttons clearfix">
		     
		    <div className="pull-right">
		      <a
			href="#account"
			className="btn btn-primary"
		      >
			Continue
		      </a>
		    </div>
		  </div>
		</div>
	);
}
export function Address({user}){
	return (<div>None</div>);
}

export function Password({user}){
	useEffect(() => {
		const myFunction = (e)=>{
			e.preventDefault();
			var myform = $("#passwordform").serialize({ hash: true })
			let fom = new URLSearchParams(myform)
			if(fom.getAll("password")[0] !== fom.getAll("confirm")[0]){
				createAlert(false,"Password do not match")
				return false;
			}
			var payload = {
			
				password:fom.getAll("password")[0]
			};
			try{	
				fetch(url+"/api/users/update",{
					method:"post",
					headers: {
					  "Content-Type": "application/json",
					  'x-auth-token':user
					},
					body:JSON.stringify(payload),
				}).then((res)=>{
					res.json().then((r)=>{
						if(r.message) createAlert(false,r.message);
						
						createAlert(true,"Password change successfull");
					})
				})
			}catch(e){console.log(e)}
		}
		setTimeout(document.getElementById("passwordform").addEventListener("submit",myFunction),2000);
	}, []);
	return(
		<div id="content" className="col-md-9 col-sm-8 col-xs-12">
		  <h1 className="heading">Change Password</h1>
		  <form id="passwordform"  className="form-horizontal">
		    <fieldset>
		      <legend>Your Password</legend>
		      <div className="form-group required">
			<label className="col-sm-2 control-label" htmlFor="input-password">
			  Password
			</label>
			<div className="col-sm-10">
			  <input
			    type="password"
			    name="password"
			    defaultValue=""
			    placeholder="Password"
			    id="input-password"
			    className="form-control"
			  />
			</div>
		      </div>
		      <div className="form-group required">
			<label className="col-sm-2 control-label" htmlFor="input-confirm">
			  Password Confirm
			</label>
			<div className="col-sm-10">
			  <input
			    type="password"
			    name="confirm"
			    defaultValue=""
			    placeholder="Password Confirm"
			    id="input-confirm"
			    className="form-control"
			  />
			</div>
		      </div>
		    </fieldset>
		    <div className="buttons clearfix">
		      <div className="pull-left">
			<a
			  href="account"
			  className="btn btn-default"
			>
			  Back
			</a>
		      </div>
		      <div className="pull-right">
			<input
			  type="submit"
			  defaultValue="Continue"
			  className="btn btn-primary"
			/>
		      </div>
		    </div>
		  </form>
		</div>

	);
}
export function Edit({user}) {
	
	useEffect(() => {
		
		if(user.token) user = user.token
		const myFunction = (e)=>{
			e.preventDefault();
			var myform = $("#editform").serialize({ hash: true })
			let fom = new URLSearchParams(myform)
			var payload = {
				email: fom.getAll("email")[0],
				name: fom.getAll("firstname")[0] +" "+fom.getAll("lastname")[0],
				phone:fom.getAll("phone")[0]
			};
			try{	
				fetch(url+"/api/users/update",{
					method:"post",
					headers: {
					  "Content-Type": "application/json",
					  'x-auth-token':user
					},
					body:JSON.stringify(payload),
				}).then((res)=>{
					res.json().then((r)=>{
						
						if(r.message){ createAlert(false,r.message);}else{
						createAlert(true,"Data changed successfull");
						}
					})
				})
			}catch(e){console.log(e)}
			
		}
		setTimeout(document.getElementById("editform").addEventListener("submit",myFunction),2000);
	}, []);
	try{	
		
		fetch(url+"/api/auth",{
			method:"get",
			headers: {
			  "Content-Type": "application/json",
			  'x-auth-token':user
			},
		}).then((res)=>{
			res.json().then((r)=>{
				
				if(r.message){
					createAlert(false,r.message)
				}
				$("#regno").text(r.user.regno)
				$("#firstname").val(r.user.name.split(" ")[0])
				$("#lastname").val(r.user.name.split(" ")[1])
				$("#email").val(r.user.email)
				$("#phone").val(r.user.phone)
			})
		})
	}catch(e){console.log(e)}
	
	return (
			<div id="content" className="col-md-9 col-sm-8 col-xs-12">
			  <h1 className="heading">My Account Information</h1>
			  <form id="editform"	  >
				<fieldset>
				  <legend>Your Personal Details :<b id="regno"></b></legend>
				  <div className="form-group required">
				<label className="col-sm-2 control-label" htmlFor="input-firstname">
				  First Name{" "}
				</label>
				<div className="col-sm-10">
				  <input type="text" name="firstname" defaultValue=""	placeholder="First Name"id="firstname" className="form-control"  />
				</div>
				  </div>
				  <div className="form-group required">
				<label className="col-sm-2 control-label" htmlFor="input-lastname">
				  Last Name
				</label>
				<div className="col-sm-10">
				  <input type="text" name="lastname" defaultValue="" placeholder="Last Name" id="lastname" className="form-control"
				  />
				</div>
				  </div>
				  <div className="form-group required">
				<label className="col-sm-2 control-label" htmlFor="input-email">
				  E-Mail
				</label>
				<div className="col-sm-10">
				  <input type="email" name="email" defaultValue="" placeholder="E-Mail" id="email"className="form-control"
				  />
				</div>
				  </div>
				  <div className="form-group required">
				<label className="col-sm-2 control-label" htmlFor="input-telephone">
				  Telephone
				</label>
				<div className="col-sm-10">
				  <input type="tel" name="phone" defaultValue={254} placeholder="Telephone" id="phone" className="form-control"/>
				</div>
				  </div>
				</fieldset>
				<div className="buttons clearfix">
				  <div className="pull-left">
				<a href="account" className="btn btn-default">Back</a>
				  </div>
				  <div className="pull-right">
				<input type="submit" defaultValue="Continue" className="btn btn-primary"/>
				  </div>
				</div>
			  </form>
			</div>

	);
}
