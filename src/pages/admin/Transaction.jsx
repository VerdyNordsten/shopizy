import React, { useEffect } from "react";
import moment from "moment";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import AdminSidebar from "../../components/Section/AdminSidebar";
import { getAllTransactionAdmin } from "../../redux/action/transaction";
import { useDispatch, useSelector } from "react-redux";
export default function TransactionList() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [queryParams] = useSearchParams();
	let url = `${process.env.REACT_APP_API_URL}/transaction/admin?limit=10`;
	const allTransaction = useSelector((state) => state.allTransaction);
	const applyFilter = (page = "") => {
		let url = "/admin/transaction?";
		if (page) {
			url += `&page=${page}`;
		}
		return navigate(url);
	};
	useEffect(() => {
		document.title = "SHOPIZY - List transaction";
	}, []);
	useEffect(() => {
		if (queryParams.get("page")) {
			url += `&page=${queryParams.get("page")}`;
		}
		dispatch(getAllTransactionAdmin(url));
	}, [dispatch, navigate, queryParams]);
	return (<>
		<>
			<div className="container-fluid d-flex p-0">
				<AdminSidebar active="transaction" />
				<div className="d-flex flex-column" style={{ height: "100vh", width: "80%" }}>
					<AdminNavbar />
					<div className="d-flex flex-column w-100 h-100" style={{ backgroundColor: "#f4f6f9", overflow: "auto" }}>
						<h2 style={{ padding: "15px", fontWeight: "400" }}>Transaction</h2>
						<div className="d-flex justify-content-center mb-4">
							<div className="card" style={{ width: "90%" }}>
								<div className="card-header">
									<h5 className="card-title m-0">Transaction list</h5>
								</div>
								<div className="card-body">
									<table className="table table-hover">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Invoice</th>
												<th scope="col">Buyer name</th>
												<th scope="col">Seller name</th>
												<th scope="col">Payment method</th>
												<th scope="col">Total payment</th>
												<th scope="col">Date</th>
												<th scope="col">Status</th>
											</tr>
										</thead>
										<tbody>
											{allTransaction.isLoading ? (<div>Loading...</div>) : 
												allTransaction.isError ? (<div>{allTransaction.error}</div>) : 
													allTransaction.data.length > 0 ? allTransaction.data.map((item, index) => (
														<tr key={index}>
															<th scope="row">{ index + 1 }</th>
															<td>
																{item.invoice}
															</td>
															<td>
																{item.buyer_data.name}
															</td>
															<td>
																{item.seller_data.name}
															</td>
															<td>
																{item.payment_method}
															</td>
															<td>
																{new Intl.NumberFormat("id-ID", {
																	style: "currency",
																	currency: "IDR",
																	minimumFractionDigits: 0,
																}).format(item.total)}
															</td>
															<td>
																{moment(item.date).format("dddd, DD MMMM YYYY (HH:mm)")}
															</td>
															<td>
																{item.status === 0 ?
																	(<span className="badge bg-danger">Cancelled</span>) :
																	item.status === 1 ? 
																		(<span className="badge bg-warning">New</span>) : 
																		item.status === 2 ? 
																			(<span className="badge bg-dark">Packed</span>) : 
																			item.status === 3 ? 
																				(<span className="badge bg-info">Sent</span>) : 
																				item.status === 4 ? 
																					(<span className="badge bg-success">Completed</span>) : 
																					"-"
																}
															</td>
														</tr>
													)) :
														"No data found"
											}
										</tbody>
									</table>
									{allTransaction.isLoading ?
										(<div>Loading...</div>) : 
										allTransaction.isError ? 
											(<div>Error</div>) : 
											allTransaction.pagination ?
												(<Pagination pagination={allTransaction.pagination} applyFilter={applyFilter} />) :
												(<div>Error</div>)
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	</>);
}
