import React, { useState } from "react";
import "../../assets/styles/auth/auth.input.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Input(props) {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<>
			{props.type !== "password" ? (
				<input
					type={props.type}
					className="auth-input"
					placeholder={`${props.placeholder}`}
					onChange={(e) => props.setData(e)}
				/>
			) : (
				<div className="auth-password">
					<input
						type={showPassword ? "text" : "password"}
						className="auth-input-password"
						placeholder={`${props.placeholder}`}
						onChange={(e) => props.setData(e)}
					/>
					<button
						type="button"
						className="auth-show-password"
						onClick={() => setShowPassword(!showPassword)}
					>
						<FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
					</button>
				</div>
			)}
		</>
	);
}
