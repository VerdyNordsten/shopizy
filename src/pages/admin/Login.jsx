import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import { login } from "../../redux/action/auth";
export default function LoginAdmin() {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: "",
		password: "",
		login: "admin"
	});
	const [loading, setLoading] = useState(false);
	const submitLogin = () => {
		setLoading(true);
		if (!form.email || !form.password) {
			Swal.fire(
				"Error!",
				"All field must be filled",
				"warning"
			);
			setLoading(false);
		} else {
			login(form)
				.then((response) => {
					Swal.fire(
						"Success!",
						response.message,
						"success"
					).then(() => { navigate("/admin"); });
				})
				.catch((err) => {
					Swal.fire(
						"Failed!",
						err.response.data.error,
						"error"
					);
				})
				.finally(() => { setLoading(false); });
		}
	};
	useEffect(() => {
		document.title = "SHOPIZY - Admin Login";
	}, []);
	return (<>
		<div className="d-flex flex-column justify-content-center align-items-center container-fluid p-0" style={{ height: "100vh" }}>
			<div className="d-flex flex-column" style={{ padding: "20px", width: "300px" }}>
				<h2>SHOPIZY Admin</h2>
				<hr className="mb-4" />
				<form>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">Email address</label>
						<input type="email" className="form-control" id="email" placeholder="name@example.com"
							onChange={(e) => { setForm({ ...form, email: e.target.value }); }}
							required />
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">Password</label>
						<input type="password" className="form-control" id="password" placeholder="your password"
							onChange={(e) => { setForm({ ...form, password: e.target.value }); }}
							required />
					</div>
					<div className="d-flex w-100 justify-content-end align-items-center">
						{loading ? 
							(<button type="submit" className="btn btn-primary" disabled>Loading</button>) :
							(<button type="submit" className="btn btn-primary" onClick={() => { submitLogin(); }}>Login</button>)
						}
					</div>
				</form>
			</div>
		</div>
	</>
	);
}
