/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../../assets/styles/auth/auth.css";
import Button from "../../components/auth/CekButton";
import Input from "../../components/auth/Input";
import Navigation from "../../components/auth/Navigation";
import Submit from "../../components/auth/SubmitButton";
import Title from "../../components/auth/Title";
import swal from "sweetalert2";
import { toastr } from "../../utils/toastr";
import { registerBuyer, registerSeller } from "../../redux/action/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [isActive, setIsActive] = useState(true);
	const [buyer, setBuyer] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [seller, setSeller] = useState({
		name: "",
		email: "",
		phone: "",
		storeName: "",
		password: "",
	});
	useEffect(() => {
		document.title = "SHOPIZY - Register";
	}, []);
	const onSubmit = () => {
		if (isActive) {
			// register buyer
			setLoading(true);
			if (buyer.name == "") {
				swal
					.fire({
						title: "Error!",
						text: "Name field can't be empty",
						icon: "error",
					})
					.then(() => {
						setLoading(false);
					});
				return;
			}
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
			registerBuyer(buyer)
				.then((res) => {
					swal
						.fire({
							title: "Success!",
							text: "Registration is successful, please activate your account via the link we have sent to your email",
							icon: "success",
						})
						.then(() => {
							return navigate("/login");
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
			// register seller
			if (seller.name == "") {
				swal
					.fire({
						title: "Error!",
						text: "Name field can't be empty",
						icon: "error",
					})
					.then(() => {
						setLoading(false);
					});
				return;
			}
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
			if (seller.phone == "") {
				swal
					.fire({
						title: "Error!",
						text: "Phone number field can't be empty",
						icon: "error",
					})
					.then(() => {
						setLoading(false);
					});
				return;
			}
			if (seller.storeName == "") {
				swal
					.fire({
						title: "Error!",
						text: "Store name field can't be empty",
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
			registerSeller(seller)
				.then((res) => {
					swal
						.fire({
							title: "Success!",
							text: "Registration is successful, please activate your account via the link we have sent to your email",
							icon: "success",
						})
						.then(() => {
							return navigate("/login");
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
		}
	};

	return (
		<section className="auth">
			<div className="content">
				<Title caption="Please sign up with your account" />
				<Button isActive={isActive} setIsActive={setIsActive} />
				<form
					className="form-input"
					hidden={isActive ? "" : "hidden"}
					onSubmit={(e) => {
						onSubmit(e);
					}}
				>
					<Input
						type="text"
						placeholder="Name"
						setData={(e) => setBuyer({ ...buyer, name: e.target.value })}
					/>
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
						type="text"
						placeholder="Name"
						setData={(e) => setSeller({ ...seller, name: e.target.value })}
					/>
					<Input
						type="email"
						placeholder="Email"
						setData={(e) => setSeller({ ...seller, email: e.target.value })}
					/>
					<Input
						type="text"
						placeholder="Phone number"
						setData={(e) => setSeller({ ...seller, phone: e.target.value })}
					/>
					<Input
						type="text"
						placeholder="Store Name"
						setData={(e) => setSeller({ ...seller, storeName: e.target.value })}
					/>
					<Input
						type="password"
						placeholder="Password"
						setData={(e) => setSeller({ ...seller, password: e.target.value })}
					/>
				</form>
				{loading ? (
					<Submit onSubmit={onSubmit} caption="Register" loading={true} />
				) : (
					<Submit onSubmit={onSubmit} caption="Register" loading={false} />
				)}
				<Navigation
					caption="Already have a SHOPIZY account?"
					to="/login"
					toCaption="Login"
				/>
			</div>
		</section>
	);
}
