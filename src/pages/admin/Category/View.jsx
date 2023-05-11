import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AdminNavbar from "../../../components/Navbar/AdminNavbar";
import AdminSidebar from "../../../components/Section/AdminSidebar";
import { getDetailCategoriesAdmin } from "../../../redux/action/allCategoryAdmin";
export default function CategoryView() {
	const catId = useParams().id;
	const dispatch = useDispatch();
	const detailCategories = useSelector((state) => state.detailCategories);
	useEffect(() => {
		dispatch(getDetailCategoriesAdmin(catId));
		document.title = "SHOPIZY - Detail category";
	}, []);
	return (<>
		<>
			<div className="container-fluid d-flex p-0">
				<AdminSidebar active="category" />
				<div className="d-flex flex-column" style={{ height: "100vh", width: "80%" }}>
					<AdminNavbar />
					<div className="d-flex flex-column w-100 h-100" style={{ backgroundColor: "#f4f6f9" }}>
						<h2 style={{ padding: "15px", fontWeight: "400" }}>Category</h2>
						<div className="d-flex justify-content-center">
							<div className="card" style={{ width: "90%" }}>
								<div className="card-header">
									<h5 className="card-title m-0">Category Detail</h5>
								</div>
								<div className="card-body">
									{detailCategories.isLoading ? 
										(<div>Loading...</div>) : 
										detailCategories.isError ? 
											(<div>{detailCategories.error}</div>) : 
											detailCategories.data ? 
												(<div className="d-flex flex-column w-100">
													<h6>Category name: {detailCategories.data.category_name}</h6>
													<div className="d-flex align-items-center mb-4">
														<h6>Category image:&nbsp;</h6>
														<img src={`https://drive.google.com/uc?id=${detailCategories.data.photo}`} style={{ width: "300px" }} />
													</div>
													<div className="d-flex w-100">
														<Link to="/admin/category">
															<button className="btn btn-secondary">Back</button>
														</Link>
													</div>
												</div>):
												null
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
