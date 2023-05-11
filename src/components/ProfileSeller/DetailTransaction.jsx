/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import moment from "moment";
import {
	packedStatusTransaction,
	sentStatusTransaction,
} from "../../redux/action/orderStatusSeller";
import { Facebook } from "react-content-loader";
import swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrderSeller } from "../../redux/action/myOrderSeller";

export default function DetailTransaction(props) {
	const data = props.data;
	const dispatch = useDispatch();
	const myOrderSeller = useSelector((state) => {
		return state.myOrderSeller;
	});
	const idr = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	});
	//const status = data.status;
	const onUpdate = (e, id, status) => {
		if (status == 1) {
			swal
				.fire({
					title: "Changed status transactions",
					text: "Are you sure to change the status to packed ?",
					icon: "question",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Yes, I Sure!",
				})
				.then(async (toPacked) => {
					if (toPacked.isConfirmed) {
						try {
							const res = await packedStatusTransaction(id);
							dispatch(getMyOrderSeller()).then(() => {
								props.setOrder();
							});
							swal.fire({
								title: "Success!",
								text: res.message,
								icon: "success",
							});
						} catch (err) {
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
						}
					}
				});
		}
		if (status == 2) {
			swal
				.fire({
					title: "Changed status transactions",
					text: "Are you sure to change the status to sent ?",
					icon: "question",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Yes, I Sure!",
				})
				.then(async (toSent) => {
					if (toSent.isConfirmed) {
						try {
							const res = await sentStatusTransaction(id);
							dispatch(getMyOrderSeller()).then(() => {
								props.setOrder();
							});
							swal.fire({
								title: "Success!",
								text: res.message,
								icon: "success",
							});
						} catch (err) {
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
						}
					}
				});
		}
	};
	useEffect(() => {}, []);

	return (
		<>
			{myOrderSeller.isLoading ? (
				<Facebook />
			) : myOrderSeller.isError ? (
				<div>Error..</div>
			) : (
				<div className="content" hidden={props.hidden ? "" : "hidden"}>
					<div className="order d-flex flex-column justify-content-center">
						<h2>Order detail</h2>

						<hr
							style={{
								border: "1px solid #9B9B9B",
								height: "1px",
								backgroundColor: "#9B9B9B",
								width: "100%",
							}}
						/>
						<table
							style={{
								borderCollapse: "collapse",
								width: "100%",
							}}
							className="table-order"
						>
							<tr>
								<td style={{ width: "30%", fontWeight: "500" }}>Invoice</td>
								<td style={{ width: "70%" }}>{data.invoice}</td>
							</tr>
							<tr>
								<td style={{ width: "30%", fontWeight: "500" }}>Payment</td>
								<td style={{ width: "70%" }}>{data.payment_method}</td>
							</tr>
							<tr>
								<td style={{ width: "30%", fontWeight: "500" }}>Status</td>
								{data.status == 1 && <td style={{ width: "70%" }}>new</td>}
								{data.status == 2 && <td style={{ width: "70%" }}>packed</td>}
								{data.status == 3 && <td style={{ width: "70%" }}>sent</td>}
								{data.status == 4 && (
									<td style={{ width: "70%" }}>completed</td>
								)}
								{data.status == 0 && (
									<td style={{ width: "70%" }}>cancelled</td>
								)}
							</tr>
							<tr>
								<td style={{ width: "30%", fontWeight: "500" }}>Total Price</td>
								<td style={{ width: "70%" }}>{idr.format(data.total)}</td>
							</tr>
							<tr>
								<td style={{ width: "30%", fontWeight: "500" }}>Created at</td>
								<td style={{ width: "70%" }}>
									{moment(data.date).format("DD MMMM YYYY")}
								</td>
							</tr>
							<tr>
								<td style={{ width: "30%", fontWeight: "500" }}>Product</td>
								<td style={{ width: "70%" }}>{data.product_name}</td>
							</tr>
							<tr>
								<td style={{ width: "30%", fontWeight: "500" }}>
									Recipient Name
								</td>
								<td style={{ width: "70%" }}>{data.recipient_name}</td>
							</tr>
							<tr>
								<td style={{ width: "30%", fontWeight: "500" }}>
									Recipient Phone
								</td>
								<td style={{ width: "70%" }}>{data.recipient_phone}</td>
							</tr>
							<tr>
								<td style={{ width: "30%", fontWeight: "500" }}>Address</td>
								<td style={{ width: "70%" }}>{data.address}</td>
							</tr>
							{data.status == 1 && (
								<tr>
									<td style={{ width: "30%", fontWeight: "500" }}>
										Update status to:{" "}
									</td>
									<td style={{ width: "70%" }}>
										<button
											type="button"
											className="btn btn-outline-primary"
											style={{ marginRight: "15px" }}
											onClick={(e) => {
												onUpdate(e, data.id, data.status);
											}}
										>
											Packed
										</button>
									</td>
								</tr>
							)}
							{data.status == 2 && (
								<tr>
									<td style={{ width: "30%", fontWeight: "500" }}>
										Update status to:{" "}
									</td>
									<td style={{ width: "70%" }}>
										<button
											type="button"
											className="btn btn-outline-primary"
											style={{ marginRight: "15px" }}
											onClick={(e) => {
												onUpdate(e, data.id, data.status);
											}}
										>
											sent
										</button>
									</td>
								</tr>
							)}
						</table>
						<div className="d-flex align-items-center w-100 justify-content-end mt-3">
							<button
								type="button"
								className="btn btn-secondary"
								onClick={() => {
									props.setOrder();
								}}
							>
								Back to my store transaction
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
