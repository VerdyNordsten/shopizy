import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "../../../utils/toastr";
import {
	addAddress,
	editAddress,
	deleteAddress,
} from "../../../redux/action/address";
import { createTransaction } from "../../../redux/action/transaction";
import { getMyAddress } from "../../../redux/action/myAddress";

import { Code } from "react-content-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Style from "../../../assets/styles/Checkout.module.css";
import { getDetailProduct } from "../../../redux/action/product";
import Color from "../../../components/Product/Color";

export default function CheckoutProduct() {
	const dispatch = useDispatch();
	const myAddress = useSelector((state) => state.myAddress);
	const detailProduct = useSelector((state) => state.detailProduct);

	const urlParams = useParams();
	const navigate = useNavigate();

	const token = localStorage.getItem("token");
	const [formAddress, setFormAddress] = useState({
		label: "",
		recipientName: "",
		recipientPhone: "",
		address: "",
		city: "",
		postalCode: "",
		isPrimary: true,
	});
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

	const [paymentWindow, setPaymentWindow] = useState(false);
	const [addressWindow, setAddressWindow] = useState(false);
	const [newAddressWindow, setNewAddressWindow] = useState(false);
	const [editAddressWindow, setEditAddressWindow] = useState(false);
	const [addressId, setAddressId] = useState("");
	const [color, setColor] = useState("");
	const [colorForm, setColorForm] = useState("");
	const [size, setSize] = useState("");

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

	const editAddressToggler = (item) => {
		if (item) {
			setFormAddress({
				label: item.label,
				recipientName: item.recipient_name,
				recipientPhone: item.recipient_phone,
				address: item.address,
				city: item.city,
				postalCode: item.postal_code,
				isPrimary: item.is_primary,
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
			isPrimary: true,
		};
		swal
			.fire({
				title: "Change this address to your primary address ?",
				icon: "question",
				showCancelButton: true,
				confirmButtonColor: "#0d6efd",
				cancelButtonColor: "#6c757d",
				confirmButtonText: "Confirm",
				cancelButtonText: "Cancel",
			})
			.then((response) => {
				if (response.isConfirmed) {
					editAddress(form, item.id)
						.then(() => {
							swal
								.fire("Success!", "Address successfully added", "success")
								.then(() => {
									dispatch(getMyAddress(token));
								});
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
						.finally(() => {
							setAddressWindow(!addressWindow);
						});
				}
			});
	};

	const editMyAddress = () => {
		if (
			!formAddress.label ||
      !formAddress.address ||
      !formAddress.recipientName ||
      !formAddress.recipientPhone ||
      !formAddress.city ||
      !formAddress.postalCode
		) {
			swal.fire("Error!", "All field must be filled", "warning");
		} else {
			editAddress(formAddress, addressId)
				.then((result) => {
					console.log(result);
					swal
						.fire("Success!", "Address successfully edited", "success")
						.then(() => {
							dispatch(getMyAddress(token));
						});
				})
				.catch((err) => {
					console.log(err);
					swal.fire("Failed!", err.response.data.message, "error");
				})
				.finally(() => {
					setEditAddressWindow(!editAddressWindow);
				});
		}
	};

	const deleteMyAddress = (id) => {
		swal
			.fire({
				title: "Delete this address ?",
				text: "Action can't be undone",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#d33",
				cancelButtonColor: "#6c757d",
				confirmButtonText: "Delete",
				cancelButtonText: "Cancel",
			})
			.then((response) => {
				if (response.isConfirmed) {
					deleteAddress(id)
						.then(() => {
							swal.fire("Success!", "Address deleted", "success").then(() => {
								dispatch(getMyAddress(token));
							});
						})
						.catch((err) => {
							swal.fire("Failed!", err.response.data.message, "error");
						})
						.finally(() => {
							setAddressWindow(!addressWindow);
						});
				}
			});
	};

	const addNewAddress = (e) => {
		e.preventDefault();
		if (
			!formAddress.label ||
      !formAddress.recipientName ||
      !formAddress.recipientPhone ||
      !formAddress.address ||
      !formAddress.city ||
      !formAddress.postalCode
		) {
			swal.fire("Error!", "All field must be filled", "error");
		} else {
			addAddress(formAddress)
				.then(() => {
					setNewAddressWindow(!newAddressWindow);
					swal
						.fire("Success!", "Address successfully added", "success")
						.then(() => {
							dispatch(getMyAddress(token));
						});
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

	const changeQty = (type) => {
		if (type === "plus") {
			if (detailProduct.data.stock > transactionForm.qty) {
				setTransactionForm({
					...transactionForm,
					qty: transactionForm.qty + 1,
				});
			}
		}
		if (type === "minus") {
			if (transactionForm.qty > 0) {
				setTransactionForm({
					...transactionForm,
					qty: transactionForm.qty - 1,
				});
			}
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
		if (!transactionForm.qty) {
			swal.fire({
				icon: "error",
				title: "Failed",
				text: "Select quantity!",
			});
			return;
		}
		if (!colorForm) {
			swal.fire({
				icon: "error",
				title: "Failed",
				text: "Color must selected!",
			});
			return;
		}

		if (!size) {
			swal.fire({
				icon: "error",
				title: "Failed",
				text: "Size must selected!",
			});
			return;
		}
		if (!transactionForm.paymentMethod) {
			swal.fire({
				icon: "error",
				title: "Failed",
				text: "Select your payment method!",
			});
			return;
		}

		setTransactionForm({
			...transactionForm,
			color: colorForm,
			size,
		});

		createTransaction(transactionForm)
			.then((response) => {
				console.log(response);
				swal.fire(
					"Payment Completed!",
					"Redirecting you..",
					"success"
				).then(() => { 
					navigate("/profile/buyer");
				});
			})
			.catch((err) => {
				console.log(err);
				swal.fire(
					"Failed!",
					err.response.data.message,
					"error"
				);
			})
			.finally(() => { setPaymentWindow(!paymentWindow); });
	};

	useEffect(() => {
		document.title = "SHOPIZY - Checkout";
		dispatch(getMyAddress(token));
		dispatch(getDetailProduct(urlParams.id));
	}, []);

	useEffect(() => {
		if (detailProduct.data.id) {
			setTransactionForm({
				...transactionForm,
				productId: detailProduct.data.id,
				price: detailProduct.data.price,
			});
		}
	}, [detailProduct]);

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

	return (
		<>
			<div
				className="d-flex flex-column container-fluid align-items-center"
				style={{ padding: "0px" }}
			>
				<Navbar login={token} />
				<div className="d-flex flex-column mb-5" style={{ width: "80%" }}>
					<h2 className="mb-4">Checkout</h2>
					<div className="row">
						<div className="col-lg-8 col-md-12">
							<div className="d-flex flex-column w-100">
								<h6 className="mb-4">Shipping Address</h6>
								{myAddress.isLoading ? (
									<Code />
								) : myAddress.error === "data not found" ? (
									<button
										onClick={() => {
											setNewAddressWindow(!newAddressWindow);
										}}
										style={{
											width: "200px",
											padding: "8px",
											backgroundColor: "#FFF",
											color: "#9B9B9B",
											border: "1px solid #9B9B9B",
											borderRadius: "25px",
											marginBottom: "30px",
										}}
									>
                    Add new address
									</button>
								) : myAddress.isError ? (
									<div>Error</div>
								) : myAddress.data.length > 0 ? (
									myAddress.data.map((item, index) =>
										item.is_primary ? (
											<div
												key={index}
												className="d-flex flex-column w-100 mb-4"
												style={{
													padding: "24px",
													borderRadius: "5px",
													boxShadow: "0px 0px 8px rgba(115, 115, 115, 0.25)",
												}}
											>
												<h6>{item.recipient_name}</h6>
												<p className="mb-4">
													{`[${item.label}] ${item.address},  ${item.city}, ${item.postal_code}, (HP: ${item.recipient_phone})`}
												</p>
												<button
													onClick={() => {
														addressToggler();
													}}
													style={{
														width: "200px",
														padding: "8px",
														backgroundColor: "#FFF",
														color: "#9B9B9B",
														border: "1px solid #9B9B9B",
														borderRadius: "25px",
													}}
												>
                          Choose another address
												</button>
											</div>
										) : null
									)
								) : (
									<button
										onClick={() => {
											setNewAddressWindow(!newAddressWindow);
										}}
										style={{
											width: "200px",
											padding: "8px",
											backgroundColor: "#FFF",
											color: "#9B9B9B",
											border: "1px solid #9B9B9B",
											borderRadius: "25px",
										}}
									>
                    Add new address
									</button>
								)}

								{detailProduct.isLoading ? (
									<Code />
								) : detailProduct.error === "data not found" ? (
									<div>Product not found</div>
								) : detailProduct.isError ? (
									<div>{detailProduct.error}</div>
								) : (
									<div
										className="w-100 mb-4"
										style={{
											padding: "24px",
											borderRadius: "5px",
											boxShadow: "0px 0px 8px rgba(115, 115, 115, 0.25)",
										}}
									>
										<div className="d-flex align-items-center w-100">
											<input type="checkbox" style={{ marginRight: "25px" }} />
											<div className="row w-100">
												<div className="col-lg-7 col-md-12 mb-4">
													<div className="d-flex align-items-center w-100">
														<div
															style={{
																height: "100px",
																width: "100px",
																marginRight: "15px",
																backgroundRepeat: "no-repeat",
																backgroundSize: "cover",
																backgroundPosition: "center",
																backgroundImage:
                                  "url('https://drive.google.com/uc?export=view&id=" +
                                  detailProduct.data.product_images[0]?.photo +
                                  "')",
																borderRadius: "10px",
															}}
														/>
														<div className="d-flex flex-column">
															<h6>{detailProduct.data.product_name}</h6>
															<small style={{ color: "#9B9B9B" }}>
																{detailProduct.data.store_name}
															</small>
														</div>
													</div>
												</div>
												<div className="col-lg-5 col-md-12">
													<div className="d-flex align-items-center w-100 h-100">
														<div className="d-flex align-items-center">
															<button
																style={{
																	borderRadius: "50%",
																	border: "none",
																}}
																onClick={() => changeQty("minus")}
															>
																<FontAwesomeIcon icon={faMinus} />
															</button>
															<h6 className="mx-4 my-auto">
																{transactionForm.qty}
															</h6>
															<button
																style={{
																	borderRadius: "50%",
																	border: "none",
																}}
																onClick={() => changeQty("plus")}
															>
																<FontAwesomeIcon icon={faPlus} />
															</button>
														</div>
														<h6
															style={{
																marginLeft: "auto",
																marginRight: "0px",
															}}
														>
															{new Intl.NumberFormat("id-ID", {
																style: "currency",
																currency: "IDR",
																minimumFractionDigits: 0,
															}).format(
																parseInt(detailProduct.data.price) *
                                  transactionForm.qty
															)}
														</h6>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-12 col-sm-6 col-md-8 mt-4">
												<div>
													<small
														style={{
															fontWeight: "600",
															marginBottom: "10px",
															fontSize: "16px",
														}}
													>
                          Color
													</small>
													<div className="d-flex w-100">
														{detailProduct.data.product_color.map((item) => (
															<Color
																key={item.id}
																color={item.color_value}
																colorName={item.color_name}
																cekColor={color}
																setColor={() => setColor(item.color_value)}
																setColorForm={setColorForm}
															/>
														))}
													</div>
												</div>
											</div>
											<div className="col-12 col-sm-6 col-md-4 mt-4">
												<div>
													<p
														style={{
															fontWeight: "600",
															marginLeft: "0px",
															fontSize: "16px",
														}}
													>
                          Size
													</p>
													<div
														style={{
															fontWeight: "600",
															marginBottom: "15px",
															fontSize: "16px",
															height: "40px",
															display: "flex",
															alignItems: "center",
														}}
													>
														<select
															className="form-select"
															onChange={(e) => setSize(e.target.value)}
														>
															<option value="">Select size</option>
															{detailProduct.data.product_sizes.map(
																(size) => (
																	<option
																		key={size.id}
																		value={
																			size.size === 1
																				? "XS"
																				: size.size === 2
																					? "S"
																					: size.size === 3
																						? "M"
																						: size.size === 4
																							? "L"
																							: size.size === 5
																								? "XL"
																								: "Other"
																		}
																	>
																		{size.size === 1
																			? "XS"
																			: size.size === 2
																				? "S"
																				: size.size === 3
																					? "M"
																					: size.size === 4
																						? "L"
																						: size.size === 5
																							? "XL"
																							: "Other"}
																	</option>
																)
															)}
														</select>
													</div>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="col-lg-4 col-md-12">
							<div className="d-flex flex-column w-100">
								<div
									className="d-flex flex-column w-100"
									style={{
										padding: "24px",
										borderRadius: "5px",
										boxShadow: "0px 0px 8px rgba(115, 115, 115, 0.25)",
									}}
								>
									<h6 style={{ marginBottom: "30px" }}>Shopping summary</h6>
									<div className="d-flex w-100">
										<h6 style={{ color: "#9B9B9B" }}>Order</h6>
										<h6 style={{ marginLeft: "auto", marginRight: "0px" }}>
											{new Intl.NumberFormat("id-ID", {
												style: "currency",
												currency: "IDR",
												minimumFractionDigits: 0,
											}).format(
												parseInt(detailProduct.data.price) * transactionForm.qty
											)}
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
											{new Intl.NumberFormat("id-ID", {
												style: "currency",
												currency: "IDR",
												minimumFractionDigits: 0,
											}).format(
												parseInt(detailProduct.data.price) * transactionForm.qty
											)}
										</h6>
									</div>
									<button
										style={{
											padding: "8px",
											color: "#FFF",
											backgroundColor: "#273AC7",
											border: "none",
											borderRadius: "25px",
										}}
										onClick={() => {
											paymentToggler();
										}}
									>
                    Select Payment
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* // payment modal */}
				<Modal toggle={paymentToggler} isOpen={paymentWindow}>
					<ModalHeader toggle={paymentToggler}>Payment</ModalHeader>
					<ModalBody style={{ minHeight: "60vh" }}>
						<h6 className="mb-4">Payment method</h6>
						<div className="d-flex w-100 align-items-center mb-4">
							<div className="d-flex" style={{ width: "30%" }}>
								<img
									src="/gopay.png"
									alt="gopay"
									style={{ width: "80px", height: "20px" }}
								/>
							</div>
							<h6 className="my-auto">Gopay</h6>
							<input
								className="my-auto"
								type="radio"
								name="payment"
								id="gopay"
								style={{ marginLeft: "auto" }}
								onChange={() => {
									setTransactionForm({
										...transactionForm,
										paymentMethod: "Gopay",
									});
								}}
								checked={
									transactionForm.paymentMethod === "Gopay" ? true : false
								}
							/>
						</div>
						<div className="d-flex w-100 align-items-center mb-4">
							<div className="d-flex" style={{ width: "30%" }}>
								<img
									src="/pos-indonesia.png"
									alt="pos"
									style={{ width: "60px", height: "40px" }}
								/>
							</div>
							<h6 className="my-auto">Pos Indonesia</h6>
							<input
								className="my-auto"
								type="radio"
								name="payment"
								id="pos"
								style={{ marginLeft: "auto" }}
								onChange={() => {
									setTransactionForm({
										...transactionForm,
										paymentMethod: "Pos Indonesia",
									});
								}}
								checked={
									transactionForm.paymentMethod === "Pos Indonesia"
										? true
										: false
								}
							/>
						</div>
						<div className="d-flex w-100 align-items-center mb-4">
							<div className="d-flex" style={{ width: "30%" }}>
								<img
									src="/mastercard.png"
									alt="mastercard"
									style={{ width: "55px", height: "40px" }}
								/>
							</div>
							<h6 className="my-auto">Mastercard</h6>
							<input
								className="my-auto"
								type="radio"
								name="payment"
								id="mastercard"
								style={{ marginLeft: "auto" }}
								onChange={() => {
									setTransactionForm({
										...transactionForm,
										paymentMethod: "Mastercard",
									});
								}}
								checked={
									transactionForm.paymentMethod === "Mastercard" ? true : false
								}
							/>
						</div>
						<hr />
						<h6 className="mb-3">Shopping summary</h6>
						<div className="d-flex w-100">
							<h6 style={{ color: "#9B9B9B" }}>Order</h6>
							<h6 style={{ marginLeft: "auto" }}>
								{new Intl.NumberFormat("id-ID", {
									style: "currency",
									currency: "IDR",
									minimumFractionDigits: 0,
								}).format(
									parseInt(detailProduct.data.price) * transactionForm.qty
								)}
							</h6>
						</div>
						<div className="d-flex w-100">
							<h6 style={{ color: "#9B9B9B" }}>Delivery</h6>
							<h6 style={{ marginLeft: "auto" }}>FREE</h6>
						</div>
					</ModalBody>
					{/* 3 */}
					<ModalFooter
						style={{ boxShadow: "0px -8px 10px rgba(217, 217, 217, 0.25)" }}
					>
						<div className="d-flex align-items-center w-100">
							<div className="d-flex flex-column">
								<h6>Shopping summary</h6>
								<h6>
									{new Intl.NumberFormat("id-ID", {
										style: "currency",
										currency: "IDR",
										minimumFractionDigits: 0,
									}).format(
										parseInt(detailProduct.data.price) * transactionForm.qty
									)}
								</h6>
							</div>
							<button
								style={{
									border: "none",
									borderRadius: "25px",
									backgroundColor: "#273AC7",
									color: "#FFF",
									padding: "8px",
									width: "160px",
									marginLeft: "auto",
								}}
								onClick={() => {
									payNow();
								}}
							>
                Buy
							</button>
						</div>
					</ModalFooter>
					{/* 3 */}
				</Modal>
				{/* // address modal */}
				<Modal
					toggle={addressToggler}
					isOpen={addressWindow}
					className={Style.modalAddress}
				>
					<ModalHeader
						toggle={addressToggler}
						style={{ borderBottom: "none" }}
					/>
					<ModalBody style={{ minHeight: "60vh" }}>
						<h3 className="text-center" style={{ marginBottom: "30px" }}>
              Choose another address
						</h3>
						<h5
							onClick={() => {
								newAddressToggler();
							}}
							style={{
								width: "100%",
								textAlign: "center",
								padding: "35px",
								color: "#9B9B9B",
								border: "1px dashed #9B9B9B",
								borderRadius: "10px",
								marginBottom: "35px",
							}}
						>
							{" "}
              Add new address{" "}
						</h5>
						{myAddress.isLoading ? (
							<Code />
						) : myAddress.isError ? (
							<div>Error</div>
						) : myAddress.data.length > 0 ? (
							myAddress.data.map((item, index) => (
								<div
									key={index}
									className="d-flex flex-column w-100 mb-4"
									style={{
										padding: "30px",
										border: "1px solid #DB3022",
										borderRadius: "5px",
									}}
								>
									<h6>
										{item.recipient_name}{" "}
										{item.is_primary ? (
											<span style={{ color: "blue" }}>(Primary Address)</span>
										) : null}
									</h6>
									<p>
										{`[${item.label}] ${item.address},  ${item.city}, ${item.postal_code}, (HP: ${item.recipient_phone})`}
									</p>
									{!item.is_primary ? (
										<h6
											className="text-primary"
											onClick={() => {
												updatePrimaryAddress(item);
											}}
											style={{ cursor: "pointer" }}
										>
                      Make primary
										</h6>
									) : null}
									<h6
										onClick={() => {
											editAddressToggler(item);
										}}
										style={{ cursor: "pointer" }}
									>
                    Change address
									</h6>
									<h6
										style={{ color: "#DB3022", cursor: "pointer" }}
										onClick={() => {
											deleteMyAddress(item.id);
										}}
									>
                    Delete address
									</h6>
								</div>
							))
						) : null}
					</ModalBody>
				</Modal>
				{/* // new address modal */}
				<Modal
					toggle={newAddressToggler}
					isOpen={newAddressWindow}
					className={Style.modalAddress}
				>
					<ModalHeader
						toggle={newAddressToggler}
						style={{ borderBottom: "none" }}
					/>
					<ModalBody style={{ minHeight: "60vh" }}>
						<h3 className="text-center" style={{ marginBottom: "30px" }}>
              Add new address
						</h3>
						<div className="row">
							<div className="col-12 mb-4">
								<p style={{ color: "#9B9B9B" }}>
                  Save address as (ex : home address, office address)
								</p>
								<input
									type="text"
									style={{
										border: "1px solid #9B9B9B",
										borderRadius: "5px",
										padding: "15px",
										width: "100%",
									}}
									placeholder="Rumah"
									onChange={(e) => {
										setFormAddress({ ...formAddress, label: e.target.value });
									}}
								/>
							</div>
							<div className="col-md-6 col-sm-12 mb-4">
								<p style={{ color: "#9B9B9B", width: "100%" }}>
                  Recipient&apos;s name
								</p>
								<input
									type="text"
									style={{
										border: "1px solid #9B9B9B",
										borderRadius: "5px",
										padding: "15px",
										width: "100%",
									}}
									onChange={(e) => {
										setFormAddress({
											...formAddress,
											recipientName: e.target.value,
										});
									}}
								/>
							</div>
							<div className="col-md-6 col-sm-12 mb-4">
								<p style={{ color: "#9B9B9B", width: "100%" }}>
                  Recipient&apos;s telephone number
								</p>
								<input
									type="number"
									style={{
										border: "1px solid #9B9B9B",
										borderRadius: "5px",
										padding: "15px",
										width: "100%",
									}}
									onChange={(e) => {
										setFormAddress({
											...formAddress,
											recipientPhone: e.target.value,
										});
									}}
								/>
							</div>
							<div className="col-md-6 col-sm-12 mb-4">
								<p style={{ color: "#9B9B9B", width: "100%" }}>Address</p>
								<input
									type="text"
									style={{
										border: "1px solid #9B9B9B",
										borderRadius: "5px",
										padding: "15px",
										width: "100%",
									}}
									onChange={(e) => {
										setFormAddress({ ...formAddress, address: e.target.value });
									}}
								/>
							</div>
							<div className="col-md-6 col-sm-12 mb-4">
								<p style={{ color: "#9B9B9B", width: "100%" }}>Postal code</p>
								<input
									type="number"
									style={{
										border: "1px solid #9B9B9B",
										borderRadius: "5px",
										padding: "15px",
										width: "100%",
									}}
									onChange={(e) => {
										setFormAddress({
											...formAddress,
											postalCode: e.target.value,
										});
									}}
								/>
							</div>
							<div className="col-md-6 col-sm-12 mb-4">
								<p style={{ color: "#9B9B9B", width: "100%" }}>
                  City or Subdistrict
								</p>
								<input
									type="text"
									style={{
										border: "1px solid #9B9B9B",
										borderRadius: "5px",
										padding: "15px",
										width: "100%",
									}}
									onChange={(e) => {
										setFormAddress({ ...formAddress, city: e.target.value });
									}}
								/>
							</div>
						</div>
						<div className="d-flex align-items-center">
							<input
								style={{ marginRight: "15px" }}
								type="checkbox"
								checked={formAddress.isPrimary ? true : false}
								onChange={() => {
									setFormAddress({
										...formAddress,
										isPrimary: !formAddress.isPrimary,
									});
								}}
							/>
							<p className="my-auto" style={{ color: "#9B9B9B" }}>
                Make it the primary address
							</p>
						</div>
					</ModalBody>
					<ModalFooter>
						<button
							onClick={() => {
								setNewAddressWindow(!newAddressWindow);
							}}
							style={{
								padding: "8px 60px",
								border: "1px solid #9B9B9B",
								color: "#9B9B9B",
								backgroundColor: "#FFF",
								borderRadius: "25px",
							}}
						>
              Cancel
						</button>
						<button
							onClick={(e) => {
								addNewAddress(e);
							}}
							style={{
								padding: "8px 60px",
								border: "none",
								color: "#FFF",
								backgroundColor: "#32C33B",
								borderRadius: "25px",
							}}
						>
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
					<ModalHeader
						toggle={editAddressToggler}
						style={{ borderBottom: "none" }}
					/>
					<ModalBody style={{ minHeight: "60vh" }}>
						<h3 className="text-center" style={{ marginBottom: "30px" }}>
              Edit address
						</h3>
						<div className="row">
							<div className="col-12 mb-4">
								<p style={{ color: "#9B9B9B" }}>
                  Save address as (ex : home address, office address)
								</p>
								<input
									type="text"
									style={{
										border: "1px solid #9B9B9B",
										borderRadius: "5px",
										padding: "15px",
										width: "100%",
									}}
									placeholder="Rumah"
									value={formAddress.label}
									onChange={(e) => {
										setFormAddress({ ...formAddress, label: e.target.value });
									}}
								/>
							</div>
							<div className="col-md-6 col-sm-12 mb-4">
								<p style={{ color: "#9B9B9B", width: "100%" }}>
                  Recipient&apos;s name
								</p>
								<input
									type="text"
									style={{
										border: "1px solid #9B9B9B",
										borderRadius: "5px",
										padding: "15px",
										width: "100%",
									}}
									value={formAddress.recipientName}
									onChange={(e) => {
										setFormAddress({
											...formAddress,
											recipientName: e.target.value,
										});
									}}
								/>
							</div>
							<div className="col-md-6 col-sm-12 mb-4">
								<p style={{ color: "#9B9B9B", width: "100%" }}>
                  Recipient&apos;s telephone number
								</p>
								<input
									type="number"
									style={{
										border: "1px solid #9B9B9B",
										borderRadius: "5px",
										padding: "15px",
										width: "100%",
									}}
									value={formAddress.recipientPhone}
									onChange={(e) => {
										setFormAddress({
											...formAddress,
											recipientPhone: e.target.value,
										});
									}}
								/>
							</div>
							<div className="col-md-6 col-sm-12 mb-4">
								<p style={{ color: "#9B9B9B", width: "100%" }}>Address</p>
								<input
									type="text"
									style={{
										border: "1px solid #9B9B9B",
										borderRadius: "5px",
										padding: "15px",
										width: "100%",
									}}
									value={formAddress.address}
									onChange={(e) => {
										setFormAddress({ ...formAddress, address: e.target.value });
									}}
								/>
							</div>
							<div className="col-md-6 col-sm-12 mb-4">
								<p style={{ color: "#9B9B9B", width: "100%" }}>Postal code</p>
								<input
									type="number"
									style={{
										border: "1px solid #9B9B9B",
										borderRadius: "5px",
										padding: "15px",
										width: "100%",
									}}
									value={formAddress.postalCode}
									onChange={(e) => {
										setFormAddress({
											...formAddress,
											postalCode: e.target.value,
										});
									}}
								/>
							</div>
							<div className="col-md-6 col-sm-12 mb-4">
								<p style={{ color: "#9B9B9B", width: "100%" }}>
                  City or Subdistrict
								</p>
								<input
									type="text"
									style={{
										border: "1px solid #9B9B9B",
										borderRadius: "5px",
										padding: "15px",
										width: "100%",
									}}
									value={formAddress.city}
									onChange={(e) => {
										setFormAddress({ ...formAddress, city: e.target.value });
									}}
								/>
							</div>
						</div>
						<div className="d-flex align-items-center">
							<input
								style={{ marginRight: "15px" }}
								type="checkbox"
								checked={formAddress.isPrimary ? true : false}
								onChange={() => {
									setFormAddress({
										...formAddress,
										isPrimary: !formAddress.isPrimary,
									});
								}}
							/>
							<p className="my-auto" style={{ color: "#9B9B9B" }}>
                Make it the primary address
							</p>
						</div>
					</ModalBody>
					<ModalFooter>
						<button
							onClick={() => {
								editAddressToggler();
							}}
							style={{
								padding: "8px 60px",
								border: "1px solid #9B9B9B",
								color: "#9B9B9B",
								backgroundColor: "#FFF",
								borderRadius: "25px",
							}}
						>
              Cancel
						</button>
						<button
							onClick={() => {
								editMyAddress();
							}}
							style={{
								padding: "8px 60px",
								border: "none",
								color: "#FFF",
								backgroundColor: "#32C33B",
								borderRadius: "25px",
							}}
						>
              Save
						</button>
					</ModalFooter>
				</Modal>
			</div>
		</>
	);
}
