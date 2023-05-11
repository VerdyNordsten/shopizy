import React from "react";
import "../../assets/styles/auth/auth.title.css";
import logo from "../../assets/images/logo.png";

export default function Title(props) {

	return (
		<section className="header">
			<label className="title">
				<img src={logo} />SHOPIZY
			</label>
			<p className="caption">{props.caption}</p>
		</section>
	);
}
