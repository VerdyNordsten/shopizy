import React, {useEffect} from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import Swal from "sweetalert2";
import AdminNavbar from "../../../components/Navbar/AdminNavbar";
import AdminSidebar from "../../../components/Section/AdminSidebar";
import { getAllCategoriesAdmin } from "../../../redux/action/allCategoryAdmin";
import { editStatusCategory, deleteCategory } from "../../../redux/action/categoryAdmin";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
export default function ListCategory() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [queryParams] = useSearchParams();
	const allCategories = useSelector((state) => state.allCategories);
	let url = `${process.env.REACT_APP_API_URL}/category?limit=10`;
	const applyFilter = (page = "") => {
		let url = "/admin/category?";
		if (page) {
			url += `&page=${page}`;
		}
		return navigate(url);
	};
	const setStatusCategory = (id, action) => {
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
					editStatusCategory(id, form)
						.then(() => {
							Swal.fire(
								"Success!",
								"Status successfully updated",
								"success"
							).then(() => { dispatch(getAllCategoriesAdmin(url)); });
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
	const removeCategory = (id) => {
		Swal.fire({
			title: "Are you sure to delete this category ?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#dc3545",
			cancelButtonColor: "#6c757d",
			confirmButtonText: "Delete",
			cancelButtonText: "Cancel"
		})
			.then((response) => {
				if (response.isConfirmed) {
					deleteCategory(id)
						.then(() => {
							Swal.fire(
								"Success!",
								"Category successfully deleted",
								"success"
							).then(() => { dispatch(getAllCategoriesAdmin(url)); });
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
		document.title = "SHOPIZY - List category";
	}, []);
	useEffect(() => {
		if (queryParams.get("page")) {
			url += `&page=${queryParams.get("page")}`;
		}
		dispatch(getAllCategoriesAdmin(url));
	}, [dispatch, navigate, queryParams]);
	return (<>
		<>
			<div className="container-fluid d-flex p-0">
				<AdminSidebar active="category" />
				<div className="d-flex flex-column" style={{ height: "100vh", width: "80%" }}>
					<AdminNavbar />
					<div className="d-flex flex-column w-100 h-100" style={{ backgroundColor: "#f4f6f9", overflow: "auto" }}>
						<h2 style={{ padding: "15px", fontWeight: "400" }}>Category</h2>
						<div className="d-flex justify-content-center">
							<div className="card" style={{ width: "90%" }}>
								<div className="card-header">
									<h5 className="card-title m-0">Category list</h5>
								</div>
								<div className="card-body">
									<Link to="/admin/category/add">
										<button className="btn btn-primary mb-4">
											<FontAwesomeIcon icon={faPlus} />
										&nbsp; New Category
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
											{allCategories.isLoading ? (<div>Loading...</div>) : 
												allCategories.isError ? (<div>{allCategories.error}</div>) : 
													allCategories.data.length > 0 ? allCategories.data.map((item, index) => (
														<tr key={index}>
															<th scope="row">{ index + 1 }</th>
															<td>
																{item.category_name}
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
																<Link to={`/admin/category/view/${item.id}`}>
																	<button className="btn btn-primary btn-sm" style={{ marginRight: "10px" }}>View</button>
																</Link>
																<Link to={`/admin/category/edit/${item.id}`}>
																	<button className="btn btn-info btn-sm text-white" style={{ marginRight: "10px" }}>Edit</button>
																</Link>
																{item.is_active ? 
																	(<button className="btn btn-danger btn-sm" style={{ marginRight: "10px" }} onClick={() => { setStatusCategory(item.id, "deactivate"); }}>
																	Deactivate
																	</button>) : 
																	(<button className="btn btn-success btn-sm" style={{ marginRight: "10px" }} onClick={() => { setStatusCategory(item.id, "activate"); }}>
																	Activate
																	</button>)
																}
																<button className="btn btn-danger btn-sm" style={{ marginRight: "10px" }} onClick={() => { removeCategory(item.id); }} disabled={item.is_active ? true : false} >
																	Delete
																</button>
															</td>
														</tr>
													)) :
														"No data found"
											}
										</tbody>
									</table>
									{allCategories.isLoading ? 
										(<div>Loading...</div>) : 
										allCategories.isError ? 
											(<div>Error</div>) : 
											allCategories.pagination ? 
												(<Pagination pagination={allCategories.pagination} applyFilter={applyFilter} />) : (<div>Error</div>)
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
