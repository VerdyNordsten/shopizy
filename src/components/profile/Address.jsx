import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Code } from "react-content-loader";
import { useDispatch, useSelector } from "react-redux";
import { getMyAddress } from "../../redux/action/myAddress";
import swal from "sweetalert2";
import {
	addAddress,
	deleteAddress,
	editAddress,
} from "../../redux/action/address";

export default function Address(props) {
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const [edit, setEdit] = useState(false);
	const [addressId, setAddressId] = useState("");
	const modalToggler = () => {
		setShow(!show);
	};

	const myAddress = useSelector((state) => state.myAddress);
	const token = localStorage.getItem("token");

	useEffect(() => {
		document.title = "SHOPIZY - address";
		dispatch(getMyAddress(token));
	}, []);

	const [formAddress, setFormAddress] = useState({
		label: "",
		recipientName: "",
		recipientPhone: "",
		address: "",
		city: "",
		postalCode: "",
		isPrimary: true,
	});

	const reset = () => {
		setFormAddress({
			label: "",
			recipientName: "",
			recipientPhone: "",
			address: "",
			city: "",
			postalCode: "",
			isPrimary: true,
		});
	};

	const onCancel = () => {
		setEdit(false);
		reset();
		modalToggler();
	};

	const addressEdit = (item) => {
		setEdit(true);
		modalToggler();
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
	};

	const primary = (item) => {
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
				confirmButtonColor: "#42D86C",
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

	const deleted = (id) => {
		swal
			.fire({
				title: "Delete this address ?",
				text: "Action can't be undone",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#42D86C",
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
						});
				}
			});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (edit) {
			editOnSubmit();
		} else {
			newOnSubmit(e);
		}
	};
	const editOnSubmit = () => {
		setLoading(true);
		if (formAddress.label == "") {
			swal
				.fire({
					title: "Error!",
					text: "Label field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}
		if (formAddress.address == "") {
			swal
				.fire({
					title: "Error!",
					text: "Address field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}
		if (formAddress.recipientName == "") {
			swal
				.fire({
					title: "Error!",
					text: "Recipient Name field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}
		if (formAddress.recipientPhone == "") {
			swal
				.fire({
					title: "Error!",
					text: "Recipient Telephone field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}
		if (formAddress.city == "") {
			swal
				.fire({
					title: "Error!",
					text: "City field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}
		if (formAddress.postalCode == "") {
			swal
				.fire({
					title: "Error!",
					text: "Postal Code field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}

		editAddress(formAddress, addressId)
			.then(() => {
				swal
					.fire("Success!", "Address successfully edited", "success")
					.then(() => {
						dispatch(getMyAddress(token));
					});
				modalToggler();
				reset();
				setEdit(false);
			})
			.catch((err) => {
				swal.fire("Failed!", err.response.data.message, "error");
			});
		setLoading(false);
	};

	const newOnSubmit = (e) => {
		e.preventDefault();

		setLoading(true);
		if (formAddress.label == "") {
			swal
				.fire({
					title: "Error!",
					text: "Label field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}
		if (formAddress.address == "") {
			swal
				.fire({
					title: "Error!",
					text: "Address field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}
		if (formAddress.recipientName == "") {
			swal
				.fire({
					title: "Error!",
					text: "Recipient Name field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}
		if (formAddress.recipientPhone == "") {
			swal
				.fire({
					title: "Error!",
					text: "Recipient Telephone field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}
		if (formAddress.city == "") {
			swal
				.fire({
					title: "Error!",
					text: "City field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}
		if (formAddress.postalCode == "") {
			swal
				.fire({
					title: "Error!",
					text: "Postal Code field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}

		addAddress(formAddress)
			.then(() => {
				swal
					.fire("Success!", "Address successfully added", "success")
					.then(() => {
						dispatch(getMyAddress(token));
					});
				modalToggler();
				reset();
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
		setLoading(false);
	};

	return (
		<div className="content" hidden={props.hidden ? "" : "hidden"}>
			<div className="address">
				<h2>Choose another address</h2>
				<label
					style={{
						fontSize: "16px",
						fontWeight: "500",
						color: "#9B9B9B",
					}}
				>
          Manage your shipping address
				</label>
				<hr
					style={{
						border: "1px solid #9B9B9B",
						height: "1px",
						backgroundColor: "#9B9B9B",
						width: "100%",
					}}
				/>

				<div>
					<button
						style={{
							margin: "30px 0px",
							border: "3px dashed #9B9B9B",
							height: "100px",
							width: "100%",
							borderRadius: "10px",
							textAlign: "center",
							padding: "8px",
							fontSize: "16px",
							fontWeight: "500",
							color: "#9B9B9B",
						}}
						onClick={() => onCancel()}
					>
            Add Address
					</button>

					<Modal
						toggle={() => onCancel()}
						isOpen={show}
						size="lg"
						style={{ maxWidth: "900px", width: "100%" }}
					>
						<ModalHeader toggle={() => onCancel()}></ModalHeader>
						<ModalBody>
							<div className="row" style={{ marginTop: "30px", width: "100%" }}>
								<h2 className="col-12" style={{ textAlign: "center" }}>
                  Add New Address
								</h2>
								{loading ? (
									<Code />
								) : (
									<>
										<div
											className="col-xl-12 col-lg-12 col-md-12 col-sm-12"
											style={{
												maxWidth: "900px",
												width: "100%",
												padding: "0px 40px",
											}}
										>
											<div
												style={{
													margin: "12px",
													fontSize: "16px",
													fontWeight: "500",
													color: "#9B9B9B",
													marginRight: "40px",
												}}
											>
                        Save address as (ex : home address, office address)
											</div>
											<input
												type="text"
												value={formAddress.label}
												onChange={(e) =>
													setFormAddress({
														...formAddress,
														label: e.target.value,
													})
												}
												placeholder="Rumah"
												style={{
													width: "100%",
													height: "48px",
													border: "1px solid #9B9B9B",
													padding: "12px",
													borderRadius: "5px",
												}}
											/>
										</div>
										<div
											className="col-xl-5 col-lg-5 col-md-5 col-sm-12"
											style={{
												maxWidth: "432px",
												width: "100%",
												padding: "0px 40px",
											}}
										>
											<div
												style={{
													margin: "12px",
													fontSize: "16px",
													fontWeight: "500",
													color: "#9B9B9B",
													marginRight: "40px",
												}}
											>
                        Recipient’s name
											</div>
											<input
												type="text"
												value={formAddress.recipientName}
												onChange={(e) =>
													setFormAddress({
														...formAddress,
														recipientName: e.target.value,
													})
												}
												style={{
													width: "100%",
													height: "48px",
													border: "1px solid #9B9B9B",
													padding: "12px",
													borderRadius: "5px",
												}}
											/>
										</div>
										<div
											className="col-xl-5 col-lg-5 col-md-5 col-sm-12"
											style={{
												maxWidth: "432px",
												width: "100%",
												padding: "0px 40px",
											}}
										>
											<div
												style={{
													margin: "12px",
													fontSize: "16px",
													fontWeight: "500",
													color: "#9B9B9B",
													marginRight: "40px",
												}}
											>
												{"Recipient's telephone number"}
											</div>
											<input
												type="number"
												value={formAddress.recipientPhone}
												onChange={(e) =>
													setFormAddress({
														...formAddress,
														recipientPhone: e.target.value,
													})
												}
												style={{
													width: "100%",
													height: "48px",
													border: "1px solid #9B9B9B",
													padding: "12px",
													borderRadius: "5px",
												}}
											/>
										</div>
										<div
											className="col-xl-5 col-lg-5 col-md-5 col-sm-12"
											style={{
												maxWidth: "432px",
												width: "100%",
												padding: "0px 40px",
											}}
										>
											<div
												style={{
													margin: "12px",
													fontSize: "16px",
													fontWeight: "500",
													color: "#9B9B9B",
													marginRight: "40px",
												}}
											>
                        Address
											</div>
											<input
												type="text"
												value={formAddress.address}
												onChange={(e) =>
													setFormAddress({
														...formAddress,
														address: e.target.value,
													})
												}
												style={{
													width: "100%",
													height: "48px",
													border: "1px solid #9B9B9B",
													padding: "12px",
													borderRadius: "5px",
												}}
											/>
										</div>
										<div
											className="col-xl-5 col-lg-5 col-md-5 col-sm-12"
											style={{
												maxWidth: "432px",
												width: "100%",
												padding: "0px 40px",
											}}
										>
											<div
												style={{
													margin: "12px",
													fontSize: "16px",
													fontWeight: "500",
													color: "#9B9B9B",
													marginRight: "40px",
												}}
											>
                        Postal code
											</div>
											<input
												type="number"
												value={formAddress.postalCode}
												onChange={(e) =>
													setFormAddress({
														...formAddress,
														postalCode: e.target.value,
													})
												}
												style={{
													width: "100%",
													height: "48px",
													border: "1px solid #9B9B9B",
													padding: "12px",
													borderRadius: "5px",
												}}
											/>
										</div>
										<div
											className="col-xl-5 col-lg-5 col-md-5 col-sm-12"
											style={{
												maxWidth: "432px",
												width: "100%",
												padding: "0px 40px",
											}}
										>
											<div
												style={{
													margin: "12px",
													fontSize: "16px",
													fontWeight: "500",
													color: "#9B9B9B",
													marginRight: "40px",
												}}
											>
                        City or Subdistrict
											</div>
											<input
												value={formAddress.city}
												onChange={(e) =>
													setFormAddress({
														...formAddress,
														city: e.target.value,
													})
												}
												type="text"
												style={{
													width: "100%",
													height: "48px",
													border: "1px solid #9B9B9B",
													padding: "12px",
													borderRadius: "5px",
												}}
											/>
										</div>
										<label
											className="col-12"
											style={{
												display: "flex",
												alignItems: "center",
												textAlign: "left",
												width: "100%",
												padding: "0px 40px",
												margin: "30px 10px",
												height: "40px",
												fontSize: "16px",
												fontWeight: "500",
												color: "#9B9B9B",
												marginRight: "40px",
											}}
										>
											<input
												type="checkbox"
												checked={formAddress.isPrimary ? "checked" : ""}
												style={{
													width: "20px",
													height: "20px",
													margin: "0px 20px",
												}}
												onChange={() =>
													setFormAddress({
														...formAddress,
														isPrimary: !formAddress.isPrimary,
													})
												}
											/>
											<span className="checkmark"></span>
                      Make it the primary address
										</label>
									</>
								)}
							</div>
						</ModalBody>
						<ModalFooter>
							{loading ? (
								<button
									type="submit"
									style={{
										height: "50px",
										border: "1px solid #000000",
										borderRadius: "25px",
										fontSize: "20px",
										backgroundColor: "#FFFFFF",
										margin: "5px",
										minWidth: "100px",
										width: "220px",
									}}
									disabled
								>
									<span
										className="spinner-border spinner-border-sm"
										role="status"
										aria-hidden="true"
									/>
								</button>
							) : (
								<button
									className="col-xl-3 col-lg-3 col-md-3 col-sm-3"
									style={{
										height: "50px",
										border: "1px solid #000000",
										borderRadius: "25px",
										fontSize: "20px",
										backgroundColor: "#FFFFFF",
										margin: "5px",
										minWidth: "100px",
										width: "220px",
									}}
									onClick={() => onCancel()}
								>
                  Cancel
								</button>
							)}
							{loading ? (
								<button
									type="submit"
									style={{
										height: "40px",
										border: "none",
										borderRadius: "25px",
										fontSize: "20px",
										backgroundColor: "#42D86C",
										color: "#FFFFFF",
										margin: "50px 5px 75px 150px",
										width: "220px",
									}}
									disabled
								>
									<span
										className="spinner-border spinner-border-sm"
										role="status"
										aria-hidden="true"
									/>
								</button>
							) : (
								<button
									className="col-xl-3 col-lg-3 col-md-3 col-sm-3"
									type="submit"
									style={{
										height: "50px",
										border: "none",
										borderRadius: "25px",
										fontSize: "20px",
										backgroundColor: "#42D86C",
										color: "#FFFFFF",
										margin: "5px",
										minWidth: "100px",
										width: "220px",
									}}
									onClick={(e) => onSubmit(e)}
								>
                  Save
								</button>
							)}
						</ModalFooter>
					</Modal>
				</div>
				<div>
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
										onClick={() => {
											primary(item);
										}}
										style={{ cursor: "pointer" }}
									>
                    Make primary
									</h6>
								) : null}
								<h6
									onClick={() => {
										addressEdit(item);
									}}
									style={{ cursor: "pointer" }}
								>
                  Change address
								</h6>
								<h6
									style={{ color: "#DB3022", cursor: "pointer" }}
									onClick={() => {
										deleted(item.id);
									}}
								>
                  Delete address
								</h6>
							</div>
						))
					) : null}
				</div>
			</div>
		</div>
	);
}
