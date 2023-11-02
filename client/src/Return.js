import React from 'react';
import './stylesheet.css'
export default function Return(){
	return (
		<div id="content" className="col-md-9 col-sm-8 col-xs-12">
		  <h1 className="heading">Product Returns</h1>
		  <p>Please complete the form below to request an RMA number.</p>
		  <form method="post" encType="multipart/form-data"
		    className="form-horizontal"
		  >
		    <fieldset>
		      <legend>Order Information</legend>
		      <div className="form-group required">
			<label className="col-sm-2 control-label" htmlFor="input-firstname">
			  First Name
			</label>
			<div className="col-sm-10">
			  <input
			    type="text"
			    name="firstname"
			    defaultValue="bradone"
			    placeholder="First Name"
			    id="input-firstname"
			    className="form-control"
			  />
			</div>
		      </div>
		      <div className="form-group required">
			<label className="col-sm-2 control-label" htmlFor="input-lastname">
			  Last Name
			</label>
			<div className="col-sm-10">
			  <input
			    type="text"
			    name="lastname"
			    defaultValue="omwitsa"
			    placeholder="Last Name"
			    id="input-lastname"
			    className="form-control"
			  />
			</div>
		      </div>
		      <div className="form-group required">
			<label className="col-sm-2 control-label" htmlFor="input-email">
			  E-Mail
			</label>
			<div className="col-sm-10">
			  <input
			    type="text"
			    name="email"
			    defaultValue="omwitsabra@gmail.com"
			    placeholder="E-Mail"
			    id="input-email"
			    className="form-control"
			  />
			</div>
		      </div>
		      <div className="form-group required">
			<label className="col-sm-2 control-label" htmlFor="input-telephone">
			  Telephone
			</label>
			<div className="col-sm-10">
			  <input
			    type="text"
			    name="telephone"
			    defaultValue="0716925062"
			    placeholder="Telephone"
			    id="input-telephone"
			    className="form-control"
			  />
			</div>
		      </div>
		      <div className="form-group required">
			<label className="col-sm-2 control-label" htmlFor="input-order-id">
			  Order ID
			</label>
			<div className="col-sm-10">
			  <input
			    type="text"
			    name="order_id"
			    defaultValue={6}
			    placeholder="Order ID"
			    id="input-order-id"
			    className="form-control"
			  />
			</div>
		      </div>
		      <div className="form-group">
			<label className="col-sm-2 control-label" htmlFor="input-date-ordered">
			  Order Date
			</label>
			<div className="col-sm-3">
			  <div className="input-group date">
			    <input
			      type="text"
			      name="date_ordered"
			      defaultValue="2023-09-21"
			      placeholder="Order Date"
			      data-date-format="YYYY-MM-DD"
			      id="input-date-ordered"
			      className="form-control"
			    />
			    <span className="input-group-btn">
			      <button type="button" className="btn btn-default">
				<i className="fa fa-calendar" />
			      </button>
			    </span>
			  </div>
			</div>
		      </div>
		    </fieldset>
		    <fieldset>
		      <legend>Product Information</legend>
		      <div className="form-group required">
			<label className="col-sm-2 control-label" htmlFor="input-product">
			  Product Name
			</label>
			<div className="col-sm-10">
			  <input
			    type="text"
			    name="product"
			    defaultValue="MacBook"
			    placeholder="Product Name"
			    id="input-product"
			    className="form-control"
			  />
			</div>
		      </div>
		      <div className="form-group required">
			<label className="col-sm-2 control-label" htmlFor="input-model">
			  Product Code
			</label>
			<div className="col-sm-10">
			  <input
			    type="text"
			    name="model"
			    defaultValue="Product 16"
			    placeholder="Product Code"
			    id="input-model"
			    className="form-control"
			  />
			</div>
		      </div>
		      <div className="form-group">
			<label className="col-sm-2 control-label" htmlFor="input-quantity">
			  Quantity
			</label>
			<div className="col-sm-10">
			  <input
			    type="text"
			    name="quantity"
			    defaultValue={1}
			    placeholder="Quantity"
			    id="input-quantity"
			    className="form-control"
			  />
			</div>
		      </div>
		      <div className="form-group required">
			<label className="col-sm-2 control-label">Reason for Return</label>
			<div className="col-sm-10">
			  {" "}
			  <div className="radio">
			    <label>
			      <input type="radio" name="return_reason_id" defaultValue={1} />
			      Dead On Arrival
			    </label>
			  </div>
			  <div className="radio">
			    <label>
			      <input type="radio" name="return_reason_id" defaultValue={4} />
			      Faulty, please supply details
			    </label>
			  </div>
			  <div className="radio">
			    <label>
			      <input type="radio" name="return_reason_id" defaultValue={3} />
			      Order Error
			    </label>
			  </div>
			  <div className="radio">
			    <label>
			      <input type="radio" name="return_reason_id" defaultValue={5} />
			      Other, please supply details
			    </label>
			  </div>
			  <div className="radio">
			    <label>
			      <input type="radio" name="return_reason_id" defaultValue={2} />
			      Received Wrong Item
			    </label>
			  </div>
			</div>
		      </div>
		      <div className="form-group required">
			<label className="col-sm-2 control-label">Product is opened</label>
			<div className="col-sm-10">
			  <label className="radio-inline">
			    {" "}
			    <input type="radio" name="opened" defaultValue={1} />
			    Yes
			  </label>
			  <label className="radio-inline">
			    {" "}
			    <input
			      type="radio"
			      name="opened"
			      defaultValue={0}
			      defaultChecked="checked"
			    />
			    No
			  </label>
			</div>
		      </div>
		      <div className="form-group">
			<label className="col-sm-2 control-label" htmlFor="input-comment">
			  Faulty or other details
			</label>
			<div className="col-sm-10">
			  <textarea
			    name="comment"
			    rows={10}
			    placeholder="Faulty or other details"
			    id="input-comment"
			    className="form-control"
			    defaultValue={""}
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
			  defaultValue="Submit"
			  className="btn btn-primary"
			/>
		      </div>
		    </div>
		  </form>
		</div>

	);
}
