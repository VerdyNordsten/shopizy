import React, {useEffect} from "react";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import AdminSidebar from "../../components/Section/AdminSidebar";
import logo from "../../assets/images/logo.svg";

export default function AdminDashboard() {
	useEffect(() => {
		document.title = "SHOPIZY - Admin dashboard";
	}, []);
	return (<>
		<div className="container-fluid d-flex p-0">
			<AdminSidebar active="dashboard" />
			<div className="d-flex flex-column" style={{ height: "100vh", width: "80%" }}>
				<AdminNavbar />
				<div className="d-flex flex-column w-100 h-100 justify-content-center align-items-center" style={{ backgroundColor: "#f4f6f9" }}>
					<div className="d-flex align-items-center">
						<h2 style={{ padding: "15px", fontWeight: "400", marginTop: "auto", marginBottom: "auto" }}>Welcome to</h2>
						<img src={logo} />
						<h2 style={{ padding: "15px", fontWeight: "400", marginTop: "auto", marginBottom: "auto" }}>admin dashboard</h2>
					</div>
				</div>
			</div>
		</div>
	</>
	);
}
