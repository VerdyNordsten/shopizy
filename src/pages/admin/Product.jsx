import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import AdminSidebar from "../../components/Section/AdminSidebar";
import { getListProduct } from "../../redux/action/product";
import { useDispatch, useSelector } from "react-redux";
export default function ProductList() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [queryParams] = useSearchParams();
	const allProduct = useSelector((state) => state.listProduct);
	const applyFilter = (page = "") => {
		let url = "/admin/product?";
		if (page) {
			url += `&page=${page}`;
		}
		return navigate(url);
	};
	useEffect(() => {
		let url = `${process.env.REACT_APP_API_URL}/product?limit=10`;
		if (queryParams.get("page")) {
			url += `&page=${queryParams.get("page")}`;
		}
		dispatch(getListProduct(url));
		document.title = "SHOPIZY - List product";
	}, [dispatch, navigate, queryParams]);
	return (<>
		<>
			<div className="container-fluid d-flex p-0">
				<AdminSidebar active="product" />
				<div className="d-flex flex-column" style={{ height: "100vh", width: "80%" }}>
					<AdminNavbar />
					<div className="d-flex flex-column w-100 h-100" style={{ backgroundColor: "#f4f6f9", overflow: "auto" }}>
						<h2 style={{ padding: "15px", fontWeight: "400" }}>Product</h2>
						<div className="d-flex justify-content-center">
							<div className="card" style={{ width: "90%" }}>
								<div className="card-header">
									<h5 className="card-title m-0">Product list</h5>
								</div>
								<div className="card-body">
									<table className="table table-hover">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Name</th>
												<th scope="col">Price</th>
												<th scope="col">Stock</th>
												<th scope="col">Status</th>
												<th scope="col">Store name</th>
												<th scope="col">Category name</th>
											</tr>
										</thead>
										<tbody>
											{allProduct.isLoading ? (<div>Loading...</div>) : 
												allProduct.isError ? (<div>{allProduct.error}</div>) : 
													allProduct.data.length > 0 ? allProduct.data.map((item, index) => (
														<tr key={index}>
															<th scope="row">{ index + 1 }</th>
															<td>
																{item.product_name}
															</td>
															<td>
																{new Intl.NumberFormat("id-ID", {
																	style: "currency",
																	currency: "IDR",
																	minimumFractionDigits: 0,
																}).format(item.price)}
															</td>
															<td>
																{item.stock}
															</td>
															<td>
																{item.is_active ?
																	(<span className="badge bg-success">Active</span>) :
																	(<span className="badge bg-danger">Not Active</span>)
																}
																
															</td>
															<td>
																{item.store_name}
															</td>
															<td>
																{item.category_name}
															</td>
														</tr>
													)) :
														"No data found"
											}
										</tbody>
									</table>
									{allProduct.isLoading ?
										(<div>Loading...</div>) : 
										allProduct.isError ? 
											(<div>Error</div>) : 
											allProduct.pagination ? 
												(<Pagination pagination={allProduct.pagination} applyFilter={applyFilter} />) : null
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
