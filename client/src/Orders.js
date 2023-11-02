import React from 'react';
import "./styles.css";
import img from './assets/images/vegetables/pro/11.jpg'

function ObjectRow(){
	return (
		<div className="box-section" id="" >
				
				  <div className="product-box product-style-5">
				    <a href="product-page.html">
				      <h6>Lemon - Organically Grown (Loose)</h6>
				    </a>
				    <h5>1 Kg</h5>
				    <h4>$5.00</h4>
				    <div className="addtocart_btn">
				      <button
				        className="add-button add_cart"
				        title="Add to cart"
				      >
				        <i className="fa fa-plus" />
				      </button>
				      <div className="qty-box cart_qty">
				        <div className="input-group">
				          <button
				            type="button"
				            className="btn quantity-left-minus"
				            data-type="minus"
				            data-field=""
				          >
				            <i className="fa fa-minus" aria-hidden="true" />
				          </button>
				          <input
				            type="text"
				            name="quantity"
				            className="form-control input-number qty-input"
				            defaultValue={1}
				          />
				          <button
				            type="button"
				            className="btn quantity-right-plus"
				            data-type="plus"
				            data-field=""
				          >
				            <i className="fa fa-plus" aria-hidden="true" />
				          </button>
				        </div>
				      </div>
				    </div>
				    <div className="img-wrapper">
				      <div className="front">
				        <a
				          href="product-page.html"
				          className="bg-size blur-up lazyloaded"
				          style={{
				            backgroundImage: "url({img})",
				            backgroundSize: "cover",
				            backgroundPosition: "center center",
				            display: "block"
				          }}
				        >
				          <img
				            alt=""
				            src={img}
				            className="img-fluid blur-up lazyload bg-img"
				            style={{ display: "none" }}
				          />
				        </a>
				      </div>
				    </div>
				  </div>
				
			      </div>
	);
}

function Products(){
	let rows = [];
	for (let i = 0; i < 5; i++) {
	    rows.push(<ObjectRow key={i}/>);
	}
	return (
		<div className="box-page" style={{display:"flex",flexDirection:"row",flexWrap:"no-wrap"}}>{rows}</div>
	);
}

export default function Orders() {
	return (
		<section className="section-b-space ratio_square category-shop-section">
		  <div className="collection-wrapper">
		    <div className="container">
		      <a
			href="javascript:void(0)"
			className="d-xl-none d-inline-block category-mobile-button"
		      >
			<i className="fa fa-bars" /> Category
		      </a>
		      <div className="row">
			<div className="col-xl-3">
			  <div className="sidebar-overlay" />
			  <div
			    className="nav flex-column"
			    id="v-pills-tab"
			    role="tablist"
			    aria-orientation="vertical"
			  >
			    <a className="nav-link d-xl-none d-block sidebar-back">Back</a>
			    <a
			      className="nav-link active"
			      data-bs-toggle="pill"
			      data-bs-target="#grocery"
			      role="tab"
			      aria-selected="true"
			    >
			     Order history
			    </a>
			    <a
			      className="nav-link"
			      data-bs-toggle="pill"
			      data-bs-target="#vegetables"
			      role="tab"
			      aria-selected="false"
			    >
			      Downloads
			    </a>
			    <a
			      className="nav-link"
			      data-bs-toggle="pill"
			      data-bs-target="#dairy"
			      role="tab"
			      aria-selected="false"
			    >
			      Returns
			    </a>
			  </div>
			</div>
			<div className="col-xl-9">
			  <div className="tab-content" id="v-pills-tabContent">
			    <div className="tab-pane fade active show" id="grocery">
			      <div className="title8">
				<h2>grocery &amp; staples</h2>
				<p>atta, dal, rice and more</p>
			      </div>
			     
			    </div>
			  </div>
			</div>
		      </div>
		    </div>
		  </div>
		</section>

	);
	
}
