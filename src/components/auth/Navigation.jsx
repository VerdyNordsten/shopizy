import React from "react";
import "../../assets/styles/auth/auth.css";
import { Link } from "react-router-dom";

export default function Navigation(props) {
	return (
		<p style={{fontWeight: "400"}}>
			{props.caption}
			<Link to={props.to} className="auth-caption">
				{props.toCaption}
			</Link>
		</p>
	);
}
