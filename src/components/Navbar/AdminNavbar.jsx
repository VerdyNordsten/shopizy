import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo.svg";

export default function AdminNavbar() {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.clear();
		navigate("/admin/login");
	};
	return (
		<div className="d-flex align-items-center w-100" style={{ height: "60px", paddingRight: "15px", borderBottom: "1px solid #dee2e6" }}>
			<img src={logo} />
			<div className="d-flex align-items-center" style={{ marginLeft: "auto", cursor: "pointer" }} onClick={() => { logout(); }}>
				<h6 className="text-danger" style={{ margin: "auto 10px auto 0px" }} >Logout</h6>
				<h6 className="my-auto text-danger"><FontAwesomeIcon icon={faRightFromBracket} /></h6>
			</div>
		</div>
	);
}
