import React, {useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import AdminNavbar from "../../../components/Navbar/AdminNavbar";
import AdminSidebar from "../../../components/Section/AdminSidebar";
import { editBrand, getDetailBrandsAdmin } from "../../../redux/action/brandAdmin";
import { 
	FormGroup,
	Label,
	Input
} from "reactstrap";
export default function EditBrand() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const brandId = useParams().id;
	const detailBrands = useSelector((state) => state.detailBrands);
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		brandName: "",
		photo: null
	});
	const setUpdate = () => {
		setLoading(true);
		if (!form.brandName || !form.photo) {
			Swal.fire(
				"Error!",
				"All field must be filled",
				"error"
			);
			setLoading(false);
		} else {
			const formData = new FormData();
			formData.append("brandName", form.brandName);
			formData.append("photo", form.photo);
			editBrand(brandId, formData)
				.then(() => {
					Swal.fire(
						"Success!",
						"Brand successfully updated",
						"success"
					).then(() => { navigate("/admin/brand"); });
				})
				.catch((err) => {
					Swal.fire(
						"Failed!",
						err.response.data.message,
						"error"
					);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};
	useEffect(() => {
		dispatch(getDetailBrandsAdmin(brandId));
		document.title = "SHOPIZY - Edit brand";
	}, []);
	useEffect(() => {
		if (detailBrands.data) {
			setForm({
				brandName: detailBrands.data.brand_name,
				photo: detailBrands.data.photo,
			});
		}
	}, [detailBrands]);
	return (<>
		<>
			<div className="container-fluid d-flex p-0">
				<AdminSidebar active="brand" />
				<div className="d-flex flex-column" style={{ height: "100vh", width: "80%" }}>
					<AdminNavbar />
					<div className="d-flex flex-column w-100 h-100" style={{ backgroundColor: "#f4f6f9" }}>
						<h2 style={{ padding: "15px", fontWeight: "400" }}>Brand</h2>
						<div className="d-flex justify-content-center">
							<div className="card" style={{ width: "90%" }}>
								<div className="card-header">
									<h5 className="card-title m-0">Edit brand</h5>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-6">
											<label htmlFor="cat-name">Brand name: </label>
											<input className="form-control mt-3" id="cat-name" type="text" placeholder="Brand Name"
												onChange={(e) => { setForm({ ...form, brandName: e.target.value }); }}
												value={form.brandName}
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
												<Link to="/admin/brand">
													<button className="btn btn-secondary">Back</button>
												</Link>
												{loading ?
													(<button className="btn btn-primary" style={{ marginLeft: "auto" }} disabled>Loading</button>) : 
													(<button className="btn btn-primary" style={{ marginLeft: "auto" }} onClick={() => { setUpdate(); }}>
													Add
													</button>)
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
