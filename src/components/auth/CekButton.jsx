import React from "react";
import "../../assets/styles/auth/auth.button.css";

export default function Button(props) {

	return (
		<div className="form-button">
			<button
				className={props.isActive ? "select-left" : "white-button-left"}
				onClick={() => props.setIsActive(true)}
			>
        Customer
			</button>
			<button
				className={!props.isActive ? "select-right" : "white-button-right"}
				onClick={() => props.setIsActive(false)}
			>
        Seller
			</button>
		</div>
	);
}
