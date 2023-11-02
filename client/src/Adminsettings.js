import {React,useEffect} from 'react';
import './stylesheet.css'
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


export function Add({user}){
	
	useEffect(()=>{
		const myFunction = (e)=>{
			e.preventDefault();
			var myform = $("#hostelform").serialize({ hash: true })
			
			let fom = new URLSearchParams(myform)
			var payload = {
				name: fom.getAll("name")[0],
				phone: fom.getAll("phone")[0],
				price: fom.getAll("price")[0],
				type: fom.getAll("type")[0],
			};
			
			fetch(url+"/api/hostels/",{
				method:"POST",
				headers: {
				  "Content-Type": "application/json",
				  'x-auth-token': user,
				},
				body:JSON.stringify( payload ),
			}).then((res)=>{
				res.json().then((r)=>{
					if(r.message){
						createAlert(false,r.message);
					}else{
						createAlert(true,"new Hostel added");
					}
				})
			})
		}
		setTimeout(()=>{document.getElementById("hostelform").addEventListener("submit",myFunction)},2000)
		
	},[]);
	return (
		<div className="single-boking-form">
		  <div className="section-title">
			<div className="sub-title">
			  <h5>ROOMS &amp; SUITES</h5>
			</div>
			<div className="main-title">
			  <h2>Hostel Add Form</h2>
			</div>
		  </div>
		  <div className="row">
			<div className="col-lg-12">
			  <form	id="hostelform" >
				<div className="row">
				  <div className="col-lg-6 col-md-6">
					<div className="boking-titles">
					  <h4>Name</h4>
					</div>
					<div className="form_box">
					  <input type="text"	id="hostelName"	name="name"	placeholder="Hostel Name"  />
					</div>
				  </div>
				  <div className="col-lg-6 col-md-6">
					<div className="boking-titles">
					  <h4>Price Range</h4>
					</div>
					<div className="form_box">
					  <input type="text" id="hostelPrice"	name="price"	placeholder="Hostel price" defaultValue={500}  />
					</div>
				  </div>
				</div>
				<div className="row">
				  <div className="col-lg-6 col-md-6">
					<div className="boking-titles">
					  <h4>Phone</h4>
					</div>
					<div className="form_box">
					 <input type="text"	id="hostelPhone"	name="phone"	placeholder="Hostel phone"  defaultValue={254} />
					</div>
				  </div>
				  <div className="col-lg-6 col-md-6">
					<div className="boking-titles">
					  <h4>Type</h4>
					</div>
					<div className="form_box">
					  <select id="type" name="hostelType">
						<option value="personal">Personal</option>
						<option value="regular">Regular 2+ adults</option>
						<option value="family">Family 1+ adults with any children</option>
					  </select>
					</div>
				  </div>
				  
				  <div className="col-lg-12 col-md-12">
					<div className="form-button">
					  <button type="submit" style={{ width: "85%", marginLeft: "7%" }}>
						Add Hostel
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

export function Orders({user}){
	
	useEffect(()=>{
		let bookings = ""
		fetch(url+"/api/booking/getAll/history",{
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
						let pen = `<a href="admin?booking=${book._id.toString()}&activate=false">Deactivate</a>`
						let status = "active"
						if(book.complete === false){
							pen = `<a href="admin?booking=${book._id.toString()}&activate=true">Activate</a>`
							status = "pending"
						}
						
						bookings += `
							<tr>
								<td className="text-right">${book._id}</td>
								<td className="text-left">${book.name}</td>
								<td className="text-right">1</td>
								<td className="text-left">${status}</td>
								<td className="text-right">${book.price}</td>
								<td className="text-left">${book.bookdate}</td>
								<td className="text-right">
								  <a
									href="admin?booking=${book._id.toString()}#order"	data-toggle="tooltip"	title="" className="btn btn-primary" data-original-title="View"
								  ><i className="fa fa-eye" />View</a>
								</td>
								<td className="text-left">${pen}</td>
								  </tr>
						`;
					}
					setTimeout(()=>{
						document.getElementById("orderhistory").innerHTML = bookings;
					},1000)
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
				<td className="text-left">Hostel</td>
				<td className="text-right">No. of Products</td>
				<td className="text-left">Status</td>
				<td className="text-right">Total</td>
				<td className="text-left">Date Added</td>
				<td className="text-right">Action</td>
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


export function Users({user}){
	
	useEffect(()=>{
		let users = ""
		fetch(url+"/api/booking/getAll/users",{
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
						const curr = r[i]
						if(curr){
							users += `
							<tr>
								<td className="text-right">${curr._id}</td>
								<td className="text-left">${curr.name}</td>
								<td className="text-right">${curr.regno}</td>
								<td className="text-left">${curr.email}</td>
								<td className="text-right">${curr.date}</td>
								<td className="text-left">True</td>
								<td className="text-right">
								  <a
									href="admin?user=${curr._id.toString()}#order"	data-toggle="tooltip"	title="" className="btn btn-primary" data-original-title="View"
								  ><i className="fa fa-eye" />View</a>
								</td>
								
							</tr>
								
							`;
						}
					}
					setTimeout(()=>{
						document.getElementById("users").innerHTML = users;
					},1000)
				})
			})
	},[]);
	
	return(
		<div id="content" className="col-md-9 col-sm-8 col-xs-12">
		  <h1 className="heading">Registered Users</h1>
		  <p id="noorders">You have no Registered users!</p>
		  <div className="table-responsive" >
			  <table className="table table-bordered table-hover">
			    <thead>
			      <tr>
				<td className="text-right">User ID</td>
				<td className="text-left">Name</td>
				<td className="text-right">Regno</td>
				<td className="text-left">Email</td>
				<td className="text-right">Date Created</td>
				<td className="text-left">Verified</td>
				<td className="text-right">Action</td>
				<td />
			      </tr>
			    </thead>
			    <tbody id="users">
			      
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


export function Hostels({user}){
	
	useEffect(()=>{
		let hostels = ""
		fetch(url+"/api/booking/getAll/hostels",{
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
						const curr = r[i]
						
						if(curr){
							hostels += `
							<tr>
								<td className="text-right">${curr._id}</td>
								<td className="text-left">${curr.name}</td>
								<td className="text-right">${curr.price}</td>
								<td className="text-left">${curr.phone}</td>
								<td className="text-right">${curr.type}</td>
								<td className="text-left">${curr.date}</td>
								<td className="text-right">
								  <a
									href="admin?hostel=${curr._id.toString()}#order"	data-toggle="tooltip"	title="" className="btn btn-primary" data-original-title="View"
								  ><i className="fa fa-eye" />View</a>
								</td>
								
							</tr>
								
							`;
						}
					}
					setTimeout(()=>{
						document.getElementById("hostels").innerHTML = hostels;
					},1000)
				})
			})
	},[]);
	
	return(
		<div id="content" className="col-md-9 col-sm-8 col-xs-12">
		  <h1 className="heading">Registered Hostels</h1>
		  <p id="noorders">You have no Registered hostels!</p>
		  <div className="table-responsive" >
			  <table className="table table-bordered table-hover">
			    <thead>
			      <tr>
				<td className="text-right">Hostel ID</td>
				<td className="text-left">Name</td>
				<td className="text-right">price</td>
				<td className="text-left">phone</td>
				<td className="text-right">Type</td>
				<td className="text-left">Date</td>
				<td className="text-right">Action</td>
				<td />
			      </tr>
			    </thead>
			    <tbody id="hostels">
			      
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


export function Hostel({user,id}){
	
		useEffect(()=>{
			fetch(url+"/api/hostels/"+id,{
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
					const hostel = r.hostel
					const bookings = r.bookings
					setTimeout(()=>{
						$("#hostelid").text(hostel._id)
						$("#hostelname").text(hostel.name)
						$("#hostelprice").text(hostel.price)
						$("#hosteltype").text(hostel.type)
						$("#hostelphone").text(hostel.phone)
						$("#hosteldate").text(hostel.date)
						$("#hostelbookings").text(bookings.length)
					},1000)
				})
			})
		},[])
	
	const myFunction = (e) =>{
		let id = $("#hostelid").text()
		if(id){
			fetch(url+"/api/hostels/"+id,{
				method:"delete",
				headers: {
				  "Content-Type": "application/json",
				  "x-auth-token": user,
				},
				
			}).then((res)=>{
				res.json().then((r)=>{
					if(r.message){
						createAlert(false,r.message);
					}
					createAlert(true,r.message);
					setTimeout(()=>{window.location.href="admin#all"},1000);
				})
			})
		}
	}
	return (
	
		<div id="content" className="col-md-9 col-sm-8 col-xs-12" style={{display:"flex"}}>
			
			<div className="cardb">
				<span className="title">Name: <b id="hostelname"></b></span>
				<span className="price" >Kshs: <b id="hostelprice">{500}</b></span> 
				<span className="desc">Type: <b id="hosteltype"></b></span>
				<span className="desc">Phone: <b id="hostelphone"></b></span>
				<span className="desc">Date created: <b id="hosteldate"></b></span>
				<span className="desc">Total Bookings: <b id="hostelbookings"></b></span>
				
			</div>
			<div className="card" style={{background:"#ddd",minWidth:"45%",height:"50%"}}>
				<h3 className="titleb">Action for <i id="hostelid" style={{display:"none"}}></i></h3>
				<div className="cardbuttons">
					<button className="pull-left" onClick={myFunction}>Delete</button>
					<button className="pull-right" disabled>Edit </button> 
				</div>
			</div>

		</div>
	);
	
}

export function Book({user,id}){
	let q = window.location.search
	q = q.replace("?","")
	q = q.split("&")[1]
	q = q.split("=")
	let edit = false
	let payload = {}
	if(q[1] === "true"){
		payload = {complete :true}
		edit = true
	}else if(q[1] === "false"){
		payload = {complete :false}
		edit = true
	}
	console.log(payload)
	if(edit === true){
		fetch(url+"/api/booking/"+id,{
			method:"put",
			headers: {
			  "Content-Type": "application/json",
			  "x-auth-token": user,
			},
			body:JSON.stringify(payload),
		}).then((res)=>{
			res.json().then((r)=>{
				if(r.message){
					createAlert(false,r.message);
				}
				createAlert(true,r.message);
				setTimeout(()=>{window.location.href="admin#orders"},1000);
			})
		})
	}
		useEffect(()=>{
			fetch(url+"/api/booking/"+id,{
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
					const book = r
					setTimeout(()=>{
						$("#bookid").text(book._id)
						$("#userid").text(book.user)
						document.getElementById("userid").href = "admin?user="+book.user
						$("#bookname").text(book.name)
						$("#booktype").text(book.type)
						$("#bookprice").text(book.price)
						$("#checkin").text(book.checkin)
						$("#checkout").text(book.checkout)
						$("#bookdate").text(book.date)
					},1000)
				})
			})
		},[])
	const myFunction = (e) =>{
		let id = $("#bookid").text()
		if(id){
			fetch(url+"/api/booking/"+id,{
				method:"delete",
				headers: {
				  "Content-Type": "application/json",
				  "x-auth-token": user,
				},
				
			}).then((res)=>{
				res.json().then((r)=>{
					if(r.message){
						createAlert(false,r.message);
					}
					createAlert(true,r.message);
					setTimeout(()=>{window.location.href="admin#orders"},1000);
				})
			})
		}
	}
	return (
		<div id="content" className="col-md-9 col-sm-8 col-xs-12" style={{display:"flex"}}>
			<div className="cardb" >
				<span className="title">Name: <b id="bookname"></b></span>
				<span className="price" >Kshs <b id="bookprice">{500}</b></span> 
				<span className="desc">Type: <b id="booktype"></b></span>
				<span className="desc">Checkin: <b id="checkin"></b></span>
				<span className="desc">Checkout: <b id="checkoout"></b></span>
				<span className="desc">Date: <b id="bookdate"></b></span>
				<span className="title">User: <a className="desc" id="userid" href="admin"></a></span>
			</div>
			<div className="card" style={{background:"#ddd",width:"45%",height:"50%"}}>
				<h3 className="titleb">Action <i id="bookid" style={{display:"none"}}></i></h3>
				<div className="cardbuttons">
					<button className="pull-left" onClick={myFunction}>Delete</button>
					<button className="pull-right" disabled>Edit </button> 
				</div>
			</div>
		</div>
	);
	
}

export function User({user,id}){
	
		useEffect(()=>{
			fetch(url+"/api/users/"+id,{
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
					const user = r
					console.log(user)
					setTimeout(()=>{
						$("#userid").text(user._id)
						$("#username").text(user.name)
						$("#userregno").text(user.regno)
						$("#useremail").text(user.email)
						$("#userphone").text(user.phone)
						
						$("#userdate").text(user.date)
					},1000)
				})
			})
		},[])
	const myFunction = (e) =>{
		let id = $("#userid").text()
		console.log(id)
		if(id){
			fetch(url+"/api/users/"+id,{
				method:"delete",
				headers: {
				  "Content-Type": "application/json",
				  "x-auth-token": user,
				},
				
			}).then((res)=>{
				res.json().then((r)=>{
					if(r.message){
						createAlert(false,r.message);
					}
					createAlert(true,r.message);
					setTimeout(()=>{window.location.href="admin#users"},1000);
				})
			})
		}
	}
	return (
		<div id="content" className="col-md-9 col-sm-8 col-xs-12" style={{display:"flex"}}>
			<div className="cardb" >
				<span className="title">Name: <b id="username"></b></span>
				<span className="price" >Reg: <b id="userregno">{500}</b></span> 
				<span className="desc">Email: <b id="useremail"></b></span>
				<span className="desc">Phone: <b id="userphone"></b></span>
				<span className="desc">Date: <b id="userdate"></b></span>
				
			</div>
			<div className="card" style={{background:"#ddd",width:"45%",height:"50%"}}>
				<h3 className="titleb">Action <i id="userid" style={{display:"none"}}></i></h3>
				<div className="cardbuttons">
					<button className="pull-left" onClick={myFunction}>Delete</button>
					<button className="pull-right" disabled>Edit </button> 
				</div>
			</div>
		</div>
	);
	
}