import React, { useEffect } from "react";
import swal from "sweetalert2";
import { getMyCart } from "../../../redux/action/cart";
import { deleteCart } from "../../../redux/action/cart";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Code } from "react-content-loader";

export default function Cart() {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const dispatch = useDispatch();
	const listCart = useSelector((state) => state.myCart);
	const totalPrice = (data) => {
		let price = 0;
		for (let i = 0; i < data.length; i++) {
			const priceNow = data[i].dataCart.cartqty * parseInt(data[i].dataCart.productprice);
			price += priceNow;
		}
		return price;
	};
	const deleteMyCart = (cartId) => {
		swal.fire({
			title: "Are you sure delete this cart?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#6c757d",
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "Cancel"
		})
			.then((response) => {
				if (response.isConfirmed) {
					deleteCart(cartId, token)
						.then(() => {
							swal.fire(
								"Success!",
								"Cart successfully deleted",
								"success"
							).then(() => {
								dispatch(getMyCart(token));
							});
						})
						.catch((err) => {
							swal.fire(
								"Failed",
								err.message,
								"error"
							);
						});
				}
			});
	};
	useEffect(() => {
		document.title = "SHOPIZY - Cart";
		dispatch(getMyCart(token));
	}, []);
	return (<>
		<div className="d-flex flex-column container-fluid align-items-center" style={{ padding: "0px" }}>
			<Navbar login={token} />
			<div className="d-flex flex-column mb-5" style={{ width: "80%" }}>
				<h2 className="mb-4">My bag</h2>
				<div className="row">
					<div className="col-lg-8 col-md-12">
						<div className="d-flex flex-column w-100">
							<div className="d-flex align-items-center w-100 mb-4"
								style={{ padding: "24px", borderRadius: "5px", boxShadow: "0px 0px 8px rgba(115, 115, 115, 0.25)" }}
							>
								<input type="checkbox" style={{ marginRight: "25px" }} />
								<div className="d-flex align-items-center" style={{ width: "100%" }}>
									<h6 style={{ marginTop: "auto", marginBottom: "auto" }}>Select all items&nbsp;</h6>
									<h6 style={{ marginTop: "auto", marginBottom: "auto", color: "#9B9B9B" }}>
										{listCart.isLoading ? "(Loading...)" : 
											listCart.error === "data not found" ? "(No item in your cart)" : 
												listCart.isError ? `(${listCart.error})` : 
													listCart.data.length > 0 ? `(${listCart.data.length} items selected)` : "(No item in your cart)"
										}
									</h6>
									<h6 style={{ marginTop: "auto", marginBottom: "auto", color: "#DB3022", marginLeft: "auto", marginRight: "0px" }}>Delete</h6>
								</div>
							</div>
							{listCart.isLoading ? (<Code />) : 
								listCart.error === "data not found" ? (<div>Cart is empty</div>) : 
									listCart.isError ? (<div>{listCart.error}</div>) : 
										listCart.data.length > 0 ? listCart.data.map((item, index) => {
											return (<div key={index} className="w-100 mb-4"
												style={{ padding: "24px", borderRadius: "5px", boxShadow: "0px 0px 8px rgba(115, 115, 115, 0.25)" }}
											>
												<div className="d-flex align-items-center w-100">
													<input type="checkbox" style={{ marginRight: "25px" }} />
													<div className="row w-100">
														<div className="col-lg-7 col-md-12 mb-4">
															<div className="d-flex align-items-center w-100">
																<div
																	style={{ height: "100px", width: "100px", marginRight: "15px", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", backgroundImage: "url('https://drive.google.com/uc?export=view&id="+ item.productImages[0]?.photo +"')", borderRadius: "10px" }}
																/>
																<div className="d-flex flex-column">
																	<h6>{item.dataCart.productname}</h6>
																	<small style={{ color: "#9B9B9B" }}>{item.dataCart.storename}</small>
																	<h6 style={{ color: "#DB3022", cursor: "pointer" }} onClick={() => { deleteMyCart(item.dataCart.cartid); }} >Remove item from cart</h6>
																</div>
															</div>
														</div>
														<div className="col-lg-5 col-md-12">
															<div className="d-flex align-items-center w-100 h-100">
																<div className="d-flex align-items-center">
																	<button style={{ borderRadius: "50%", border: "none" }}>
																		<FontAwesomeIcon icon={faMinus} />
																	</button>
																	<h6 className="mx-4 my-auto">{item.dataCart.cartqty}</h6>
																	<button style={{ borderRadius: "50%", border: "none" }}>
																		<FontAwesomeIcon icon={faPlus} />
																	</button>
																</div>
																<h6 style={{ marginLeft: "auto", marginRight: "0px" }}>
																	{new Intl.NumberFormat("id-ID", {
																		style: "currency",
																		currency: "IDR",
																		minimumFractionDigits: 0,
																	}).format(parseInt(item.dataCart.productprice) * item.dataCart.cartqty)}
																</h6>
															</div>
														</div>
													</div>
												</div>
											</div>);
										}) : null
							}
						</div>
					</div>
					<div className="col-lg-4 col-md-12">
						<div className="d-flex flex-column w-100">
							<div className="d-flex flex-column w-100"
								style={{ padding: "24px", borderRadius: "5px", boxShadow: "0px 0px 8px rgba(115, 115, 115, 0.25)" }}
							>
								<h6 style={{ marginBottom : "30px" }}>Shopping summary</h6>
								<div className="d-flex w-100" style={{ marginBottom: "30px" }}>
									<h6 style={{ color: "#9B9B9B" }}>Total Price</h6>
									<h6 style={{ marginLeft: "auto", marginRight: "0px" }}>
										{listCart.isLoading ? "Counting..." : 
											listCart.error === "data not found" ? new Intl.NumberFormat("id-ID", {
												style: "currency",
												currency: "IDR",
												minimumFractionDigits: 0,
											}).format(0) : 
												listCart.isError ? "Error" : 
													listCart.data.length > 0 ? new Intl.NumberFormat("id-ID", {
														style: "currency",
														currency: "IDR",
														minimumFractionDigits: 0,
													}).format(totalPrice(listCart.data)) : null }
									</h6>
								</div>
								{listCart.data.length > 0 ?
									(<button style={{ padding: "8px", color: "#FFF", backgroundColor: "#273AC7", border: "none", borderRadius: "25px" }} onClick={() => { navigate("/checkout"); }}>Buy</button>) : 
									(<button style={{ padding: "8px", color: "#FFF", backgroundColor: "#273AC7", border: "none", borderRadius: "25px" }} onClick={() => { 
										swal.fire(
											"Error!",
											"Your cart is empty",
											"error"
										);
									}}>Buy</button>)
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>);
}
