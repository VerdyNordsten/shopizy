import React from "react";
import "../../assets/styles/auth/auth.button.css";

export default function Submit(props) {
	const loading = props.loading;
	return (
		<>
			{loading ? (
				<button className="auth-submit-button" disabled>
					<span
						className="spinner-border spinner-border-sm"
						role="status"
						aria-hidden="true"
					/>
				</button>
			) : (
				<button className="auth-submit-button" onClick={() => props.onSubmit()}>
					{props.caption}
				</button>
			)}
		</>
	);
}
