import React, { useEffect } from "react";
import moment from "moment";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import AdminSidebar from "../../components/Section/AdminSidebar";
import { getAllBuyers, getAllSellers } from "../../redux/action/users";
import { useDispatch, useSelector } from "react-redux";
export default function UserList() {
	const dispatch = useDispatch();
	const allBuyers = useSelector((state) => state.allBuyers);
	const allSellers = useSelector((state) => state.allSellers);
	useEffect(() => {
		dispatch(getAllBuyers());
		dispatch(getAllSellers());
		document.title = "SHOPIZY - List user";
	}, []);
	return (<>
		<>
			<div className="container-fluid d-flex p-0">
				<AdminSidebar active="user" />
				<div className="d-flex flex-column" style={{ height: "100vh", width: "80%" }}>
					<AdminNavbar />
					<div className="d-flex flex-column w-100 h-100" style={{ backgroundColor: "#f4f6f9", overflow: "auto" }}>
						<h2 style={{ padding: "15px", fontWeight: "400" }}>User</h2>
						<div className="d-flex justify-content-center mb-4">
							<div className="card" style={{ width: "90%" }}>
								<div className="card-header">
									<h5 className="card-title m-0">Buyer list</h5>
								</div>
								<div className="card-body">
									<table className="table table-hover">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Name</th>
												<th scope="col">Email</th>
												<th scope="col">Birth</th>
												<th scope="col">Phone</th>
												<th scope="col">Gender</th>
											</tr>
										</thead>
										<tbody>
											{allBuyers.isLoading ? (<div>Loading...</div>) : 
												allBuyers.isError ? (<div>{allBuyers.error}</div>) : 
													allBuyers.data.length > 0 ? allBuyers.data.map((item, index) => (
														<tr key={index}>
															<th scope="row">{ index + 1 }</th>
															<td>
																{item.name || "-"}
															</td>
															<td>
																{item.email || "-"}
															</td>
															<td>
																{item.birth ? moment(item.birth).format("DD MMMM YYYY") : "-"}
															</td>
															<td>
																{item.phone || "-"}
															</td>
															<td>
																{item.gender === 0 ? "Pria" : item.gender === 1 ? "Wanita" : "-"}
															</td>
														</tr>
													)) :
														"No data found"
											}
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className="d-flex justify-content-center">
							<div className="card" style={{ width: "90%" }}>
								<div className="card-header">
									<h5 className="card-title m-0">Seller list</h5>
								</div>
								<div className="card-body">
									<table className="table table-hover">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Name</th>
												<th scope="col">Email</th>
												<th scope="col">Store name</th>
												<th scope="col">Store phone</th>
												<th scope="col">Store description</th>
											</tr>
										</thead>
										<tbody>
											{allSellers.isLoading ? (<div>Loading...</div>) : 
												allSellers.isError ? (<div>{allSellers.error}</div>) : 
													allSellers.data.length > 0 ? allSellers.data.map((item, index) => (
														<tr key={index}>
															<th scope="row">{ index + 1 }</th>
															<td>
																{item.name}
															</td>
															<td>
																{item.email}
															</td>
															<td>
																{item.store_name}
															</td>
															<td>
																{item.store_phone || "-"}
															</td>
															<td>
																{item.store_description || "-" }
															</td>
														</tr>
													)) :
														"No data found"
											}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	</>);
}
