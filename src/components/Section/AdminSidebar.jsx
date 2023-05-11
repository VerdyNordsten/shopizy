import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTag, faCopyright, faBriefcase, faUser, faReceipt } from "@fortawesome/free-solid-svg-icons";
import Style from "../../assets/styles/Admin.module.css";
export default function AdminSidebar({active}) {
	return (
		<div className="d-flex flex-column" style={{ height: "100vh", width: "20%", minWidth: "300px", backgroundColor: "#343a40", overflowX: "auto" }}>
			<h4 style={{ width: "100%", textAlign: "center", margin: "10px 0px 0px 0px", color: "#FFF", fontWeight: "400" }} >SHOPIZY admin</h4>
			<hr style={{ color: "#FFF", marginBottom: "30px" }} />
			<Link to="/admin">
				<div className={`d-flex align-items-center w-100 ${Style.listMenu}`} style={active === "dashboard" ? { background: "rgba(255, 255, 255, 0.2)" } : null}>
					<FontAwesomeIcon icon={faHome} style={{ marginRight: "15px", color: "#FFF" }} size="xl" />
					<h6 style={{ width: "100%", margin: "auto 0px auto 0px", color: "#FFF", fontWeight: "400" }} >Dashboard</h6>
				</div>
			</Link>
			<Link to="/admin/category">
				<div className={`d-flex align-items-center w-100 ${Style.listMenu}`} style={active === "category" ? { background: "rgba(255, 255, 255, 0.2)" } : null}>
					<FontAwesomeIcon icon={faTag} style={{ marginRight: "15px", color: "#FFF" }} size="xl" />
					<h6 style={{ width: "100%", margin: "auto 0px auto 0px", color: "#FFF", fontWeight: "400" }} >Category List</h6>
				</div>
			</Link>
			<Link to="/admin/brand">
				<div className={`d-flex align-items-center w-100 ${Style.listMenu}`} style={active === "brand" ? { background: "rgba(255, 255, 255, 0.2)" } : null}>
					<FontAwesomeIcon icon={faCopyright} style={{ marginRight: "15px", color: "#FFF" }} size="xl" />
					<h6 style={{ width: "100%", margin: "auto 0px auto 0px", color: "#FFF", fontWeight: "400" }} >Brand List</h6>
				</div>
			</Link>
			<Link to="/admin/product">
				<div className={`d-flex align-items-center w-100 ${Style.listMenu}`} style={active === "product" ? { background: "rgba(255, 255, 255, 0.2)" } : null}>
					<FontAwesomeIcon icon={faBriefcase} style={{ marginRight: "15px", color: "#FFF" }} size="xl" />
					<h6 style={{ width: "100%", margin: "auto 0px auto 0px", color: "#FFF", fontWeight: "400" }} >Product List</h6>
				</div>
			</Link>
			<Link to="/admin/user">
				<div className={`d-flex align-items-center w-100 ${Style.listMenu}`} style={active === "user" ? { background: "rgba(255, 255, 255, 0.2)" } : null}>
					<FontAwesomeIcon icon={faUser} style={{ marginRight: "15px", color: "#FFF" }} size="xl" />
					<h6 style={{ width: "100%", margin: "auto 0px auto 0px", color: "#FFF", fontWeight: "400" }} >User List</h6>
				</div>
			</Link>
			<Link to="/admin/transaction">
				<div className={`d-flex align-items-center w-100 ${Style.listMenu}`} style={active === "transaction" ? { background: "rgba(255, 255, 255, 0.2)" } : null}>
					<FontAwesomeIcon icon={faReceipt} style={{ marginRight: "15px", color: "#FFF" }} size="xl" />
					<h6 style={{ width: "100%", margin: "auto 0px auto 0px", color: "#FFF", fontWeight: "400" }} >Transaction List </h6>
				</div>
			</Link>
		</div>
	);
}
