/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/auth/auth.css";
import Button from "../../components/auth/CekButton";
import Input from "../../components/auth/Input";
import Navigation from "../../components/auth/Navigation";
import Submit from "../../components/auth/SubmitButton";
import Title from "../../components/auth/Title";
import swal from "sweetalert2";
import { toastr } from "../../utils/toastr";
import { login } from "../../redux/action/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [isActive, setIsActive] = useState(true);
	const [buyer, setBuyer] = useState({
		email: "",
		password: "",
		login: "buyer",
	});
	const [seller, setSeller] = useState({
		email: "",
		password: "",
		login: "seller",
	});
	useEffect(() => {
		document.title = "SHOPIZY - Login";
	}, []);
	const onSubmit = () => {
		if (isActive) {
			// login buyer
			setLoading(true);
			if (buyer.email == "") {
				swal
					.fire({
						title: "Error!",
						text: "Email field can't be empty",
						icon: "error",
					})
					.then(() => {
						setLoading(false);
					});
				return;
			}
			if (buyer.password == "") {
				swal
					.fire({
						title: "Error!",
						text: "Password field can't be empty",
						icon: "error",
					})
					.then(() => {
						setLoading(false);
					});
				return;
			}
			login(buyer)
				.then((res) => {
					swal
						.fire({
							title: "Success!",
							text: res.message,
							icon: "success",
						})
						.then(() => {
							// buyer navigate ke home
							return navigate("/");
						});
				})
				.catch((err) => {
					if (err.response.data.message == "Validation Failed") {
						const error = err.response.data.error;
						error.map((e) => {
							toastr(e.msg, "error");
						});
					} else {
						const message = err.response.data.error;
						swal.fire({
							title: "Error!",
							text: message,
							icon: "error",
						});
					}
				})
				.finally(() => {
					setLoading(false);
				});
		} else if (!isActive) {
			// login seller
			setLoading(true);
			if (seller.email == "") {
				swal
					.fire({
						title: "Error!",
						text: "Email field can't be empty",
						icon: "error",
					})
					.then(() => {
						setLoading(false);
					});
				return;
			}
			if (seller.password == "") {
				swal
					.fire({
						title: "Error!",
						text: "Password field can't be empty",
						icon: "error",
					})
					.then(() => {
						setLoading(false);
					});
				return;
			}
			login(seller)
				.then((res) => {
					swal
						.fire({
							title: "Success!",
							text: res.message,
							icon: "success",
						})
						.then(() => {
							// ke halaman profile seller
							return navigate("/profile/seller");
						});
				})
				.catch((err) => {
					console.log(err);
					if (err.response.data.message == "Validation Failed") {
						const error = err.response.data.error;
						error.map((e) => {
							toastr(e.msg, "error");
						});
					} else {
						const message = err.response.data.error;
						swal.fire({
							title: "Error!",
							text: message,
							icon: "error",
						});
					}
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	return (
		<section className="auth">
			<div className="content">
				<Title caption="Please login with your account" />
				<Button isActive={isActive} setIsActive={setIsActive} />
				<form className="form-input" hidden={isActive ? "" : "hidden"}>
					<Input
						type="email"
						placeholder="Email"
						setData={(e) => setBuyer({ ...buyer, email: e.target.value })}
					/>
					<Input
						type="password"
						placeholder="Password"
						setData={(e) => setBuyer({ ...buyer, password: e.target.value })}
					/>
				</form>
				<form className="form-input" hidden={!isActive ? "" : "hidden"}>
					<Input
						type="email"
						placeholder="Email"
						setData={(e) => setSeller({ ...seller, email: e.target.value })}
					/>
					<Input
						type="password"
						placeholder="Password"
						setData={(e) => setSeller({ ...seller, password: e.target.value })}
					/>
				</form>
				<Link to="/forgot" className="forgot">
					Forgot password?
				</Link>
				{loading ? (
					<Submit onSubmit={onSubmit} caption="Login" loading={true} />
				) : (
					<Submit onSubmit={onSubmit} caption="Login" loading={false} />
				)}
				<Navigation
					caption="Don't have a SHOPIZY account?"
					to="/register"
					toCaption="Register"
				/>
			</div>
		</section>
	);
}
