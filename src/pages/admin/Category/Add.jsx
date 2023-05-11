import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminNavbar from "../../../components/Navbar/AdminNavbar";
import AdminSidebar from "../../../components/Section/AdminSidebar";
import { addCategory } from "../../../redux/action/categoryAdmin";
import { 
	FormGroup,
	Label,
	Input
} from "reactstrap";
export default function AddCategory() {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		categoryName: "",
		photo: null
	});
	const [loading, setLoading] = useState(false);
	const addNewCategory = () => {
		setLoading(true);
		if (!form.categoryName) {
			Swal.fire(
				"Error!",
				"Category name can't be empty",
				"warning"
			);
			setLoading(false);
		} else if (!form.photo) {
			Swal.fire(
				"Error!",
				"Photo can't be empty",
				"warning"
			);
			setLoading(false);
		} else {
			const formData = new FormData();
			formData.append("categoryName", form.categoryName);
			formData.append("photo", form.photo);
			addCategory(formData)
				.then(() => {
					Swal.fire(
						"Success!",
						"Category successfully added",
						"success"
					).then(() => { navigate("/admin/category"); });
				})
				.catch((err) => {
					Swal.fire(
						"Failed!",
						err.response.data.message,
						"error"
					);
				})
				.finally(() => { setLoading(false); });
		}
	};
	useEffect(() => {
		document.title = "SHOPIZY - Add new category";
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
									<h5 className="card-title m-0">Add new category</h5>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-6">
											<label htmlFor="cat-name">Category name: </label>
											<input className="form-control mt-3" id="cat-name" type="text" placeholder="Category Name"
												onChange={(e) => { setForm({ ...form, categoryName: e.target.value }); }}
												required />
										</div>
										<div className="col-6">
											<FormGroup>
												<Label for="cat-file">
													Image
												</Label>
												<Input
													className="mt-2"
													id="cat-file"
													name="file"
													type="file"
													onChange={(e) => { setForm({ ...form, photo: e.target.files[0] }); }}
												/>
											</FormGroup>
										</div>
										<div className="col-12">
											<div className="d-flex w-100">
												<Link to="/admin/category">
													<button className="btn btn-secondary">Back</button>
												</Link>
												{loading ?
													(<button className="btn btn-primary" style={{marginLeft: "auto"}} disabled>Loading</button>) :
													(<button className="btn btn-primary" style={{ marginLeft: "auto" }} onClick={() => { addNewCategory(); }} >Add</button>)
												}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	</>);
}
