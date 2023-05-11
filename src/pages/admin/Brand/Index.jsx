import React, {useEffect} from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Pagination from "../../../components/Pagination";
import AdminNavbar from "../../../components/Navbar/AdminNavbar";
import AdminSidebar from "../../../components/Section/AdminSidebar";
import { getAllBrandsAdmin, editStatusBrand, deleteBrand } from "../../../redux/action/brandAdmin";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
export default function ListBrand() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [queryParams] = useSearchParams();
	const allBrands = useSelector((state) => state.allBrands);
	let url = `${process.env.REACT_APP_API_URL}/product-brand?limit=10`;
	const applyFilter = (page = "") => {
		let url = "/admin/brand?";
		if (page) {
			url += `&page=${page}`;
		}
		return navigate(url);
	};
	const setStatusBrands = (id, action) => {
		const form = {
			isActive: action === "activate" ? true : false
		};
		Swal.fire({
			title: `Set status to ${action === "activate" ? "Active ?" : "Non-Active ?"}`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#0d6efd",
			cancelButtonColor: "#dc3545",
			confirmButtonText: "Confirm",
			cancelButtonText: "Cancel"
		})
			.then((response) => {
				if (response.isConfirmed) {
					editStatusBrand(id, form)
						.then(() => {
							Swal.fire(
								"Success!",
								"Status successfully updated",
								"success"
							).then(() => { dispatch(getAllBrandsAdmin(url)); });
						})
						.catch((err) => {
							Swal.fire(
								"Failed!",
								err.response.data.message,
								"error"
							);
						});
				}
			});
	};
	const removeBrand = (id) => {
		Swal.fire({
			title: "Are you sure to delete this brand ?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#dc3545",
			cancelButtonColor: "#6c757d",
			confirmButtonText: "Delete",
			cancelButtonText: "Cancel"
		})
			.then((response) => {
				if (response.isConfirmed) {
					deleteBrand(id)
						.then(() => {
							Swal.fire(
								"Success!",
								"Brand successfully deleted",
								"success"
							).then(() => { dispatch(getAllBrandsAdmin(url)); });
						})
						.catch((err) => {
							Swal.fire(
								"Failed!",
								err.response.data.message,
								"error"
							);
						});
				}
			});
	};
	useEffect(() => {
		document.title = "SHOPIZY - List brand";
	}, []);
	useEffect(() => {
		if (queryParams.get("page")) {
			url += `&page=${queryParams.get("page")}`;
		}
		dispatch(getAllBrandsAdmin(url));
	}, [dispatch, navigate, queryParams]);
	return (<>
		<>
			<div className="container-fluid d-flex p-0">
				<AdminSidebar active="brand" />
				<div className="d-flex flex-column" style={{ height: "100vh", width: "80%" }}>
					<AdminNavbar />
					<div className="d-flex flex-column w-100 h-100" style={{ backgroundColor: "#f4f6f9", overflow: "auto" }}>
						<h2 style={{ padding: "15px", fontWeight: "400" }}>Brand</h2>
						<div className="d-flex justify-content-center">
							<div className="card" style={{ width: "90%" }}>
								<div className="card-header">
									<h5 className="card-title m-0">Brand list</h5>
								</div>
								<div className="card-body">
									<Link to="/admin/brand/add">
										<button className="btn btn-primary mb-4">
											<FontAwesomeIcon icon={faPlus} />
										&nbsp; New Brand
										</button>
									</Link>
									<table className="table table-hover">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Name</th>
												<th scope="col">Photo</th>
												<th scope="col">Status</th>
												<th scope="col">Action</th>
											</tr>
										</thead>
										<tbody>
											{allBrands.isLoading ? (<div>Loading...</div>) : 
												allBrands.isError ? (<div>{allBrands.error}</div>) : 
													allBrands.data.length > 0 ? allBrands.data.map((item, index) => (
														<tr key={index}>
															<th scope="row">{ index + 1 }</th>
															<td>
																{item.brand_name}
															</td>
															<td>
																<img src={`https://drive.google.com/uc?id=${item.photo}`} style={{ width: "100px" }} />
															</td>
															<td>
																{item.is_active ?
																	(<span className="badge bg-success">Active</span>) :
																	(<span className="badge bg-danger">Not Active</span>)
																}
																
															</td>
															<td>
																<Link to={`/admin/brand/view/${item.id}`}>
																	<button className="btn btn-primary btn-sm" style={{ marginRight: "10px" }}>View</button>
																</Link>
																<Link to={`/admin/brand/edit/${item.id}`}>
																	<button className="btn btn-info btn-sm text-white" style={{ marginRight: "10px" }}>Edit</button>
																</Link>
																{item.is_active ? 
																	(<button className="btn btn-danger btn-sm" style={{ marginRight: "10px" }} onClick={() => { setStatusBrands(item.id, "deactivate"); }}>
																	Deactivate
																	</button>) : 
																	(<button className="btn btn-success btn-sm" style={{ marginRight: "10px" }} onClick={() => { setStatusBrands(item.id, "activate"); }}>
																	Activate
																	</button>)
																}
																<button className="btn btn-danger btn-sm" style={{ marginRight: "10px" }} onClick={() => { removeBrand(item.id); }} disabled={item.is_active ? true : false} >
																	Delete
																</button>
															</td>
														</tr>
													)) :
														"No data found"
											}
										</tbody>
									</table>
									{allBrands.isLoading ? 
										(<div>Loading...</div>):
										allBrands.isError? 
											(<div>Error</div>) : 
											allBrands.pagination ? 
												(<Pagination pagination={allBrands.pagination} applyFilter={applyFilter} />) : (<div>Error</div>)
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
