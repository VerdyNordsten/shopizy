import React, {useEffect, useState} from "react";
import Navbar from "../../../components/Navbar";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "../../../utils/toastr";
import { addAddress, editAddress, deleteAddress } from "../../../redux/action/address";
import { deleteCart } from "../../../redux/action/cart";
import { createTransaction } from "../../../redux/action/transaction";
import { getMyCart } from "../../../redux/action/cart";
import { getMyAddress } from "../../../redux/action/myAddress";

import { Code } from "react-content-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { 
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from "reactstrap";
import Style from "../../../assets/styles/Checkout.module.css";

export default function Checkout() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const myAddress = useSelector((state) => state.myAddress);
	const listCart = useSelector((state) => state.myCart);
	const [formAddress, setFormAddress] = useState({
		label: "",
		recipientName: "",
		recipientPhone: "",
		address: "",
		city: "",
		postalCode: "",
		isPrimary: true
	});
	const token = localStorage.getItem("token");
	const [paymentWindow, setPaymentWindow] = useState(false);
	const [addressWindow, setAddressWindow] = useState(false);
	const [newAddressWindow, setNewAddressWindow] = useState(false);
	const [editAddressWindow, setEditAddressWindow] = useState(false);
	const [transactionForm, setTransactionForm] = useState({
		productId: "",
		paymentMethod: "",
		city: "",
		postalCode: "",
		address: "",
		recipientPhone: "",
		recipientName: "",
		price: "",
		qty: 0,
		color: "",
		size: "",
	});
	const [cartId, setCartId] = useState("");
	const [addressId, setAddressId] = useState("");
	const paymentToggler = () => {
		setPaymentWindow(!paymentWindow);
	};
	const addressToggler = () => {
		setAddressWindow(!addressWindow);
	};
	const newAddressToggler = () => {
		setNewAddressWindow(!newAddressWindow);
		setAddressWindow(!addressWindow);
	};
	const redirectToHome = () => {
		return swal.fire(
			"Cart is empty!",
			"Redirecting you...",
			"error"
		).then(() => { navigate("/"); });
	};
	const setQty = (action) => {
		if (action === "minus") {
			if (transactionForm.qty > 0) {
				setTransactionForm({ ...transactionForm, qty: transactionForm.qty - 1 });
			}
		}
		if (action === "plus") {
			setTransactionForm({ ...transactionForm, qty: transactionForm.qty + 1 });
		}
		console.log(transactionForm);
	};
	// const totalPrice = (data) => {
	// 	let price = 0;
	// 	for (let i = 0; i < data.length; i++) {
	// 		const priceNow = data[i].dataCart.cartqty * parseInt(data[i].dataCart.productprice);
	// 		price += priceNow;
	// 	}
	// 	return price;
	// };
	const editAddressToggler = (item) => {
		if (item) {
			setFormAddress({
				label: item.label,
				recipientName: item.recipient_name,
				recipientPhone: item.recipient_phone,
				address: item.address,
				city: item.city,
				postalCode: item.postal_code,
				isPrimary: item.is_primary
			});
			setAddressId(item.id);
		}
		setEditAddressWindow(!editAddressWindow);
		setAddressWindow(!addressWindow);
	};
	const updatePrimaryAddress = (item) => {
		const form = {
			label: item.label,
			recipientName: item.recipient_name,
			recipientPhone: item.recipient_phone,
			address: item.address,
			city: item.city,
			postalCode: item.postal_code,
			isPrimary: true
		};
		swal.fire({
			title: "Change this address to your primary address ?",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#0d6efd",
			cancelButtonColor: "#6c757d",
			confirmButtonText: "Confirm",
			cancelButtonText: "Cancel"
		})
			.then((response) => {
				if (response.isConfirmed) {					
					editAddress(form, item.id)
						.then(() => {
							swal.fire(
								"Success!",
								"Address successfully added",
								"success"
							).then(() => { dispatch(getMyAddress(token)); });
						})
						.catch((err) => {
							if (err.response.data.message == "Validation Failed") {
								const error = err.response.data.error;
								error.map((e) => {
									toastr(e.msg, "error");
								});
							} else {
								const message = err.response.data.error;
								swal.fire({
									title: "Error!",
									text: message,
									icon: "error",
								});
							}
						})
						.finally(() => { setAddressWindow(!addressWindow); });
				}
			});
			
	};
	const editMyAddress = () => {
		if (!formAddress.label || !formAddress.address || !formAddress.recipientName || !formAddress.recipientPhone || !formAddress.city || !formAddress.postalCode) {
			swal.fire(
				"Error!",
				"All field must be filled",
				"warning"
			);
		} else {
			editAddress(formAddress, addressId)
				.then((result) => {
					console.log(result);
					swal.fire(
						"Success!",
						"Address successfully edited",
						"success"
					).then(() => { dispatch(getMyAddress(token)); });
				})
				.catch((err) => {
					console.log(err);
					swal.fire(
						"Failed!",
						err.response.data.message,
						"error"
					);
				})
				.finally(() => { setEditAddressWindow(!editAddressWindow); });
		}
	};
	const deleteMyAddress = (id) => {
		swal.fire({
			title: "Delete this address ?",
			text: "Action can't be undone",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#6c757d",
			confirmButtonText: "Delete",
			cancelButtonText: "Cancel"
		})
			.then((response) => {
				if (response.isConfirmed) {
					deleteAddress(id)
						.then(() => {
							swal.fire(
								"Success!",
								"Address deleted",
								"success"
							).then(() => { dispatch(getMyAddress(token)); });
						})
						.catch((err) => {
							swal.fire(
								"Failed!",
								err.response.data.message,
								"error"
							);
						})
						.finally(() => {
							setAddressWindow(!addressWindow);
						});
				}
			});
	};
	const addNewAddress = (e) => {
		e.preventDefault();
		if (!formAddress.label || !formAddress.recipientName || !formAddress.recipientPhone || !formAddress.address || !formAddress.city || !formAddress.postalCode) {
			swal.fire(
				"Error!",
				"All field must be filled",
				"error"
			);
		} else {
			addAddress(formAddress)
				.then(() => {
					setNewAddressWindow(!newAddressWindow);
					swal.fire(
						"Success!",
						"Address successfully added",
						"success"
					).then(() => { dispatch(getMyAddress(token)); });
				})
				.catch((err) => {
					if (err.response.data.message == "Validation Failed") {
						const error = err.response.data.error;
						error.map((e) => {
							toastr(e.msg, "error");
						});
					} else {
						const message = err.response.data.error;
						swal.fire({
							title: "Error!",
							text: message,
							icon: "error",
						});
					}
				});
		}
	};
	const payNow = () => {
		if (!transactionForm.city || !transactionForm.postalCode || !transactionForm.address || !transactionForm.recipientPhone || !transactionForm.recipientName) {
			swal.fire(
				"Error!",
				"Set your primary address before made a transaction",
				"warning"
			);
			return;
		}
		if (!transactionForm.paymentMethod) {
			swal.fire(
				"Error!",
				"Select your payment method",
				"warning"
			);
			return;
		}
		if (!transactionForm.productId || !transactionForm.price || !transactionForm.qty) {
			swal.fire(
				"Error!",
				"No cart in your bag",
				"warning"
			);
			return;
		}
		createTransaction(transactionForm)
			.then((response) => {
				console.log(response);
				swal.fire(
					"Payment Completed!",
					"Redirecting you..",
					"success"
				).then(() => { 
					deleteCart(cartId, token)
						.then(() => {
							navigate("/profile/buyer");
						})
						.catch((err) => {
							console.log(err);
							navigate("/profile/buyer");
						});
				});
			})
			.catch((err) => {
				console.log(err);
				swal.fire(
					"Failed!",
					err.response.data.error,
					"error"
				);
			})
			.finally(() => { setPaymentWindow(!paymentWindow); });
	};
	useEffect(() => {
		document.title = "SHOPIZY - Checkout";
		dispatch(getMyAddress(token));
		dispatch(getMyCart(token));
	}, []);
	useEffect(() => {
		if (listCart.error === "data not found") {
			redirectToHome();
		} else {
			if (listCart.data.length > 0) {
				setTransactionForm({
					...transactionForm,
					productId: listCart.data[0].dataCart.productid,
					price: listCart.data[0].dataCart.productprice,
					qty: listCart.data[0].dataCart.cartqty,
					color: listCart.data[0].dataCart.cartcolor,
					size: listCart.data[0].dataCart.cartsize
				});
				setCartId(listCart.data[0].dataCart.cartid);
			}
		}
	}, [listCart]);
	useEffect(() => {
		if (myAddress.data.length > 0) {
			myAddress.data.map((item) => { 
				if (item.is_primary) {
					setTransactionForm({
						...transactionForm,
						city: item.city,
						postalCode: item.postal_code,
						address: item.address,
						recipientPhone: item.recipient_phone,
						recipientName: item.recipient_name
					});
				}
			});
		}
	}, [myAddress]);
	return (<>
		<div className="d-flex flex-column container-fluid align-items-center" style={{ padding: "0px" }}>
			<Navbar login={token} />
			<div className="d-flex flex-column mb-5" style={{ width: "80%" }}>
				<h2 className="mb-4">Checkout</h2>
				<div className="row">
					<div className="col-lg-8 col-md-12">
						<div className="d-flex flex-column w-100">
							<h6 className="mb-4">Shipping Address</h6>
							{myAddress.isLoading ?
								(<Code />) 
								: myAddress.error === "data not found" ?
									(<button onClick={() => { setNewAddressWindow(!newAddressWindow); }} style={{ width: "200px", padding: "8px", backgroundColor: "#FFF", color: "#9B9B9B", border: "1px solid #9B9B9B", borderRadius: "25px", marginBottom : "30px" }}>
									Add new address
									</button>)
									: myAddress.isError ?
										(<div>Error</div>)
										: myAddress.data.length > 0 ?
											myAddress.data.map((item, index) => (
												item.is_primary ? (<div key={index} className="d-flex flex-column w-100 mb-4"
													style={{ padding: "24px", borderRadius: "5px", boxShadow: "0px 0px 8px rgba(115, 115, 115, 0.25)" }}
												>
													<h6>{item.recipient_name}</h6>
													<p className="mb-4">
														{`[${item.label}] ${item.address},  ${item.city}, ${item.postal_code}, (HP: ${item.recipient_phone})`}
													</p>
													<button onClick={() => { addressToggler(); }} style={{ width: "200px", padding: "8px", backgroundColor: "#FFF", color: "#9B9B9B", border: "1px solid #9B9B9B", borderRadius: "25px" }}>
									Choose another address
													</button>
												</div>) : null
											))
											: (<button onClick={() => { setNewAddressWindow(!newAddressWindow); }} style={{ width: "200px", padding: "8px", backgroundColor: "#FFF", color: "#9B9B9B", border: "1px solid #9B9B9B", borderRadius: "25px" }}>
									Add new address
											</button>)
							}
							{listCart.isLoading ? 
								(<Code />)
								: listCart.error === "data not found" ? (<div>Cart is empty</div>)
									: listCart.isError ? 
										(<div>{listCart.error}</div>)
										: listCart.data.length > 0 ?
											listCart.data.map((item, index) => (
												<div key={index} className="w-100 mb-4"
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
																		<p className="m-0">Size: {item.dataCart.cartsize}</p>
																		<p className="m-0">Color: {item.dataCart.cartcolor}</p>
																	</div>
																</div>
															</div>
															<div className="col-lg-5 col-md-12">
																<div className="d-flex align-items-center w-100 h-100">
																	<div className="d-flex align-items-center">
																		<button style={{ borderRadius: "50%", border: "none" }} onClick={() => { setQty("minus"); } }>
																			<FontAwesomeIcon icon={faMinus} />
																		</button>
																		<h6 className="mx-4 my-auto">{transactionForm.qty}</h6>
																		<button style={{ borderRadius: "50%", border: "none" }} onClick={() => { setQty("plus"); } }>
																			<FontAwesomeIcon icon={faPlus} />
																		</button>
																	</div>
																	<h6 style={{ marginLeft: "auto", marginRight: "0px" }}>
																		{new Intl.NumberFormat("id-ID", {
																			style: "currency",
																			currency: "IDR",
																			minimumFractionDigits: 0,
																		}).format(parseInt(transactionForm.price) * transactionForm.qty)
																		}
																	</h6>
																</div>
															</div>
														</div>
													</div>
												</div>
											)) : null
							}
						</div>
					</div>
					<div className="col-lg-4 col-md-12">
						<div className="d-flex flex-column w-100">
							<div className="d-flex flex-column w-100"
								style={{ padding: "24px", borderRadius: "5px", boxShadow: "0px 0px 8px rgba(115, 115, 115, 0.25)" }}
							>
								<h6 style={{ marginBottom : "30px" }}>Shopping summary</h6>
								<div className="d-flex w-100">
									<h6 style={{ color: "#9B9B9B" }}>Order</h6>
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
													}).format(parseInt(transactionForm.price) * transactionForm.qty) : null }
									</h6>
								</div>
								<div className="d-flex w-100">
									<h6 style={{ color: "#9B9B9B" }}>Delivery</h6>
									<h6 style={{ marginLeft: "auto", marginRight: "0px" }}>
										FREE
									</h6>
								</div>
								<hr style={{ height: "1px", color: "#9B9B9B" }} />
								<div className="d-flex w-100 mb-3">
									<h6>Shopping summary</h6>
									<h6 style={{ marginLeft: "auto", marginRight: "0px" }}>
										{listCart.isLoading ? "Counting..." : 
											listCart.error === "data not found" ? new Intl.NumberFormat("id-ID", {
												style: "currency",
												currency: "IDR",
												minimumFractionDigits: 0,
											}).format(5000) : 
												listCart.isError ? "Error" : 
													listCart.data.length > 0 ? new Intl.NumberFormat("id-ID", {
														style: "currency",
														currency: "IDR",
														minimumFractionDigits: 0,
													}).format(parseInt(transactionForm.price) * transactionForm.qty) : null }
									</h6>
								</div>
								<button
									style={{ padding: "8px", color: "#FFF", backgroundColor: "#273AC7", border: "none", borderRadius: "25px" }}
									onClick={() => { paymentToggler(); }}
								>
									Select Payment
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* // payment modal */}
			<Modal
				toggle={paymentToggler}
				isOpen={paymentWindow}
			>
				<ModalHeader toggle={paymentToggler}>
					Payment
				</ModalHeader>
				<ModalBody style={{ minHeight: "60vh" }}>
					<h6 className="mb-4">Payment method</h6>
					<div className="d-flex w-100 align-items-center mb-4">
						<div className="d-flex" style={{ width: "30%" }}>
							<img src="/gopay.png" alt="gopay" style={{ width: "80px", height: "20px" }} />
						</div>
						<h6 className="my-auto">Gopay</h6>
						<input className="my-auto" type="radio" name="payment" id="gopay" style={{ marginLeft: "auto" }} 
							onChange={() => { setTransactionForm({ ...transactionForm, paymentMethod: "Gopay" }); }}
							checked={transactionForm.paymentMethod === "Gopay" ? true : false}
						/>
					</div>
					<div className="d-flex w-100 align-items-center mb-4">
						<div className="d-flex" style={{ width: "30%" }}>
							<img src="/pos-indonesia.png" alt="pos" style={{ width: "60px", height: "40px" }} />
						</div>
						<h6 className="my-auto">Pos Indonesia</h6>
						<input className="my-auto" type="radio" name="payment" id="pos" style={{ marginLeft: "auto" }} 
							onChange={() => { setTransactionForm({ ...transactionForm, paymentMethod: "Pos Indonesia" }); }}
							checked={transactionForm.paymentMethod === "Pos Indonesia" ? true : false}
						/>
					</div>
					<div className="d-flex w-100 align-items-center mb-4">
						<div className="d-flex" style={{ width: "30%" }}>
							<img src="/mastercard.png" alt="mastercard" style={{ width: "55px", height: "40px" }} />
						</div>
						<h6 className="my-auto">Mastercard</h6>
						<input className="my-auto" type="radio" name="payment" id="mastercard" style={{ marginLeft: "auto" }} 
							onChange={() => { setTransactionForm({ ...transactionForm, paymentMethod: "Mastercard" }); }}
							checked={transactionForm.paymentMethod === "Mastercard" ? true : false}
						/>
					</div>
					<hr />
					<h6 className="mb-3">Shopping summary</h6>
					<div className="d-flex w-100">
						<h6 style={{ color: "#9B9B9B" }}>Order</h6>
						<h6 style={{ marginLeft: "auto" }}>
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
										}).format(parseInt(transactionForm.price) * transactionForm.qty) : null }
						</h6>
					</div>
					<div className="d-flex w-100">
						<h6 style={{ color: "#9B9B9B" }}>Delivery</h6>
						<h6 style={{ marginLeft: "auto" }}>FREE</h6>
					</div>
				</ModalBody>
				<ModalFooter style={{ boxShadow: "0px -8px 10px rgba(217, 217, 217, 0.25)" }}>
					<div className="d-flex align-items-center w-100">
						<div className="d-flex flex-column">
							<h6>Shopping summary</h6>
							<h6>
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
											}).format(parseInt(transactionForm.price) * transactionForm.qty) : null }
							</h6>
						</div>
						<button style={{ border: "none", borderRadius: "25px", backgroundColor: "#273AC7", color: "#FFF", padding: "8px", width: "160px", marginLeft: "auto" }}
							onClick={() => { payNow(); }}
						>
							Buy
						</button>
					</div>
				</ModalFooter>
			</Modal>
			{/* // address modal */}
			<Modal
				toggle={addressToggler}
				isOpen={addressWindow}
				className={Style.modalAddress}
			>
				<ModalHeader toggle={addressToggler} style={{ borderBottom: "none" }} />
				<ModalBody style={{ minHeight: "60vh" }}>
					<h3 className="text-center" style={{ marginBottom: "30px" }}>Choose another address</h3>
					<h5 onClick={() => { newAddressToggler(); }} style={{ width: "100%", textAlign: "center", padding: "35px", color: "#9B9B9B", border: "1px dashed #9B9B9B", borderRadius: "10px", marginBottom: "35px" }}> Add new address </h5>
					{myAddress.isLoading ?
						(<Code />)
						: myAddress.isError ? 
							(<div>Error</div>)
							: myAddress.data.length > 0 ? 
								myAddress.data.map((item, index) => (
									<div key={index} className="d-flex flex-column w-100 mb-4" style={{ padding: "30px", border: "1px solid #DB3022", borderRadius: "5px" }}>
										<h6>{item.recipient_name} {item.is_primary ? (<span style={{ color: "blue"}}>(Primary Address)</span>): null}</h6>
										<p>
											{`[${item.label}] ${item.address},  ${item.city}, ${item.postal_code}, (HP: ${item.recipient_phone})`}
										</p>
										{!item.is_primary ? (<h6 className="text-primary" onClick={() => { updatePrimaryAddress(item); }} style={{cursor: "pointer"}}>Make primary</h6>) : null}
										<h6 onClick={() => { editAddressToggler(item); }} style={{ cursor: "pointer" }} >Change address</h6>
										<h6 style={{ color: "#DB3022", cursor: "pointer" }} onClick={() => { deleteMyAddress(item.id); }} >Delete address</h6>
									</div>
								)) : null
					}
				</ModalBody>
			</Modal>
			{/* // new address modal */}
			<Modal
				toggle={newAddressToggler}
				isOpen={newAddressWindow}
				className={Style.modalAddress}
			>
				<ModalHeader toggle={newAddressToggler} style={{ borderBottom: "none" }} />
				<ModalBody style={{ minHeight: "60vh" }}>
					<h3 className="text-center" style={{ marginBottom: "30px" }}>Add new address</h3>
					<div className="row">
						<div className="col-12 mb-4">
							<p style={{ color: "#9B9B9B" }}>Save address as (ex : home address, office address)</p>
							<input type="text" style={{ border: "1px solid #9B9B9B", borderRadius: "5px", padding: "15px", width: "100%" }} placeholder="Rumah"
								onChange={(e) => { setFormAddress({...formAddress, label: e.target.value}); }}
							/>
						</div>
						<div className="col-md-6 col-sm-12 mb-4">
							<p style={{ color: "#9B9B9B", width: "100%" }}>Recipient&apos;s name</p>
							<input type="text" style={{ border: "1px solid #9B9B9B", borderRadius: "5px", padding: "15px", width: "100%" }}
								onChange={(e) => { setFormAddress({...formAddress, recipientName: e.target.value}); }}
							/>
						</div>
						<div className="col-md-6 col-sm-12 mb-4">
							<p style={{ color: "#9B9B9B", width: "100%" }}>Recipient&apos;s telephone number</p>
							<input type="number" style={{ border: "1px solid #9B9B9B", borderRadius: "5px", padding: "15px", width: "100%" }}
								onChange={(e) => { setFormAddress({...formAddress, recipientPhone: e.target.value}); }}
							/>
						</div>
						<div className="col-md-6 col-sm-12 mb-4">
							<p style={{ color: "#9B9B9B", width: "100%" }}>Address</p>
							<input type="text" style={{ border: "1px solid #9B9B9B", borderRadius: "5px", padding: "15px", width: "100%" }}
								onChange={(e) => { setFormAddress({...formAddress, address: e.target.value}); }}
							/>
						</div>
						<div className="col-md-6 col-sm-12 mb-4">
							<p style={{ color: "#9B9B9B", width: "100%" }}>Postal code</p>
							<input type="number" style={{ border: "1px solid #9B9B9B", borderRadius: "5px", padding: "15px", width: "100%" }}
								onChange={(e) => { setFormAddress({...formAddress, postalCode: e.target.value}); }}
							/>
						</div>
						<div className="col-md-6 col-sm-12 mb-4">
							<p style={{ color: "#9B9B9B", width: "100%" }}>City or Subdistrict</p>
							<input type="text" style={{ border: "1px solid #9B9B9B", borderRadius: "5px", padding: "15px", width: "100%" }}
								onChange={(e) => { setFormAddress({...formAddress, city: e.target.value}); }}
							/>
						</div>
					</div>
					<div className="d-flex align-items-center">
						<input style={{ marginRight: "15px" }} type="checkbox"
							checked={formAddress.isPrimary ? true : false}
							onChange={() => { setFormAddress({...formAddress, isPrimary: !formAddress.isPrimary}); }}
						/>
						<p className="my-auto" style={{ color: "#9B9B9B" }}>Make it the primary address</p>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						onClick={() => { setNewAddressWindow(!newAddressWindow); }}
						style={{ padding: "8px 60px", border: "1px solid #9B9B9B", color: "#9B9B9B", backgroundColor: "#FFF", borderRadius: "25px" }}>
						Cancel
					</button>
					<button
						onClick={(e) => { addNewAddress(e); }}
						style={{ padding: "8px 60px", border: "none", color: "#FFF", backgroundColor: "#32C33B", borderRadius: "25px" }}>
						Save
					</button>
				</ModalFooter>
			</Modal>
			{/* edit address modal */}
			<Modal
				toggle={editAddressToggler}
				isOpen={editAddressWindow}
				className={Style.modalAddress}
			>
				<ModalHeader toggle={editAddressToggler} style={{ borderBottom: "none" }} />
				<ModalBody style={{ minHeight: "60vh" }}>
					<h3 className="text-center" style={{ marginBottom: "30px" }}>Edit address</h3>
					<div className="row">
						<div className="col-12 mb-4">
							<p style={{ color: "#9B9B9B" }}>Save address as (ex : home address, office address)</p>
							<input type="text" style={{ border: "1px solid #9B9B9B", borderRadius: "5px", padding: "15px", width: "100%" }} placeholder="Rumah" value={formAddress.label}
								onChange={(e) => { setFormAddress({...formAddress, label: e.target.value}); }}
							/>
						</div>
						<div className="col-md-6 col-sm-12 mb-4">
							<p style={{ color: "#9B9B9B", width: "100%" }}>Recipient&apos;s name</p>
							<input type="text" style={{ border: "1px solid #9B9B9B", borderRadius: "5px", padding: "15px", width: "100%" }} value={formAddress.recipientName}
								onChange={(e) => { setFormAddress({...formAddress, recipientName: e.target.value}); }}
							/>
						</div>
						<div className="col-md-6 col-sm-12 mb-4">
							<p style={{ color: "#9B9B9B", width: "100%" }}>Recipient&apos;s telephone number</p>
							<input type="number" style={{ border: "1px solid #9B9B9B", borderRadius: "5px", padding: "15px", width: "100%" }} value={formAddress.recipientPhone}
								onChange={(e) => { setFormAddress({...formAddress, recipientPhone: e.target.value}); }}
							/>
						</div>
						<div className="col-md-6 col-sm-12 mb-4">
							<p style={{ color: "#9B9B9B", width: "100%" }}>Address</p>
							<input type="text" style={{ border: "1px solid #9B9B9B", borderRadius: "5px", padding: "15px", width: "100%" }} value={formAddress.address}
								onChange={(e) => { setFormAddress({...formAddress, address: e.target.value}); }}
							/>
						</div>
						<div className="col-md-6 col-sm-12 mb-4">
							<p style={{ color: "#9B9B9B", width: "100%" }}>Postal code</p>
							<input type="number" style={{ border: "1px solid #9B9B9B", borderRadius: "5px", padding: "15px", width: "100%" }} value={formAddress.postalCode}
								onChange={(e) => { setFormAddress({...formAddress, postalCode: e.target.value}); }}
							/>
						</div>
						<div className="col-md-6 col-sm-12 mb-4">
							<p style={{ color: "#9B9B9B", width: "100%" }}>City or Subdistrict</p>
							<input type="text" style={{ border: "1px solid #9B9B9B", borderRadius: "5px", padding: "15px", width: "100%" }} value={formAddress.city}
								onChange={(e) => { setFormAddress({...formAddress, city: e.target.value}); }}
							/>
						</div>
					</div>
					<div className="d-flex align-items-center">
						<input style={{ marginRight: "15px" }} type="checkbox"
							checked={formAddress.isPrimary ? true : false}
							onChange={() => { setFormAddress({...formAddress, isPrimary: !formAddress.isPrimary}); }}
						/>
						<p className="my-auto" style={{ color: "#9B9B9B" }}>Make it the primary address</p>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						onClick={() => { editAddressToggler(); }}
						style={{ padding: "8px 60px", border: "1px solid #9B9B9B", color: "#9B9B9B", backgroundColor: "#FFF", borderRadius: "25px" }}>
						Cancel
					</button>
					<button
						onClick={() => { editMyAddress(); }}
						style={{ padding: "8px 60px", border: "none", color: "#FFF", backgroundColor: "#32C33B", borderRadius: "25px" }}>
						Save
					</button>
				</ModalFooter>
			</Modal>
		</div>
	</>);
}
