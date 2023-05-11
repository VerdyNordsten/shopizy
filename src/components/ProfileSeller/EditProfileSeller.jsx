/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import singa from "../../assets/images/singa.png";
import defaultImg from "../../assets/images/default.png";
import swal from "sweetalert2";
import { toastr } from "../../utils/toastr";
import { editProfileSeller } from "../../redux/action/editProfileSeller";
import { useDispatch, useSelector } from "react-redux";
import { getDetailSeller } from "../../redux/action/detailSeller";

export default function EditProfileSeller(props) {
	const dispatch = useDispatch();
	const dataSeller = props.data;
	const [loading, setLoading] = useState(false);
	const [photo, setPhoto] = useState(null);
	const [form, setForm] = useState({
		name: "",
		photo: "",
		storeName: "",
		storePhone: "",
		storeDescription: "",
	});
	const [email, setEmail] = useState(dataSeller.data?.data?.email);
	// get data
	useEffect(() => {
		if (dataSeller.data.data) {
			setForm({
				name: dataSeller.data?.data?.name,
				photo: dataSeller.data?.data?.photo,
				storeName: dataSeller.data?.data?.store_name,
				storePhone: dataSeller.data?.data?.store_phone,
				storeDescription: dataSeller.data?.data?.store_description,
			});
		}
	}, []);
	// submit perubahan

	const onSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		//return console.log(photo);
		if (form.name == "") {
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
		if (form.storeName == "" || form.storeName == null) {
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
		if (form.storePhone == "" || form.storePhone == null) {
			swal
				.fire({
					title: "Error!",
					text: "Store phone field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}
		if (form.storeDescription == "" || form.storeDescription == null) {
			swal
				.fire({
					title: "Error!",
					text: "Store description field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}

		// ngirim data
		const data = new FormData();
		data.append("name", form.name);
		data.append("photo", photo);
		data.append("storeName", form.storeName);
		data.append("storePhone", form.storePhone);
		data.append("storeDescription", form.storeDescription);
		//for (var key of data) {
		//	console.log(key);
		//}

		editProfileSeller(data)
			.then((res) => {
				dispatch(getDetailSeller());
				swal.fire({
					title: "Success!",
					text: `${res.message}`,
					icon: "success",
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
	};
	return (
		<div className="content" hidden={props.hidden ? "" : "hidden"}>
			<form className="edit-profile" onSubmit={(e) => onSubmit(e)}>
				<h2>My Profile Store</h2>
				<label
					style={{
						fontSize: "16px",
						fontWeight: "500",
						color: "#9B9B9B",
					}}
				>
					Manage your profile information
				</label>
				<hr
					style={{
						border: "1px solid #9B9B9B",
						height: "1px",
						backgroundColor: "#9B9B9B",
						width: "100%",
					}}
				/>
				<div className="form-edit">
					<div className="form-content">
						<div className="form-input">
							<div
								style={{
									margin: "12px",
									fontSize: "16px",
									fontWeight: "500",
									color: "#9B9B9B",
									marginRight: "40px",
								}}
							>
								Name
							</div>
							<input
								value={form.name ? form.name : ""}
								onChange={(e) => setForm({ ...form, name: e.target.value })}
								type="text"
								placeholder="Your Name"
								style={{
									width: "348px",
									height: "48px",
									border: "1px solid #9B9B9B",
									padding: "12px",
									borderRadius: "5px",
								}}
							/>
						</div>
						<div className="form-input">
							<div
								style={{
									margin: "12px",
									fontSize: "16px",
									fontWeight: "500",
									color: "#9B9B9B",
									marginRight: "40px",
								}}
							>
								Email
							</div>
							<input
								value={email}
								type="text"
								placeholder="Your Email"
								style={{
									width: "348px",
									height: "48px",
									border: "1px solid #9B9B9B",
									padding: "12px",
									borderRadius: "5px",
								}}
								disabled
							/>
						</div>
						<div className="form-input">
							<div
								style={{
									margin: "12px",
									fontSize: "16px",
									fontWeight: "500",
									color: "#9B9B9B",
									marginRight: "40px",
								}}
							>
								Phone Number
							</div>
							<input
								value={form.storePhone}
								onChange={(e) =>
									setForm({ ...form, storePhone: e.target.value })
								}
								type="text"
								placeholder="Your Phone Number"
								style={{
									width: "348px",
									height: "48px",
									border: "1px solid #9B9B9B",
									padding: "12px",
									borderRadius: "5px",
								}}
							/>
						</div>
						<div className="form-input">
							<div
								style={{
									margin: "12px",
									fontSize: "16px",
									fontWeight: "500",
									color: "#9B9B9B",
									marginRight: "40px",
								}}
							>
								Store Name
							</div>
							<input
								value={form.storeName}
								onChange={(e) =>
									setForm({ ...form, storeName: e.target.value })
								}
								type="text"
								placeholder="Your Phone Number"
								style={{
									width: "348px",
									height: "48px",
									border: "1px solid #9B9B9B",
									padding: "12px",
									borderRadius: "5px",
								}}
							/>
						</div>
						<div className="form-input">
							<div
								style={{
									margin: "12px",
									fontSize: "16px",
									fontWeight: "500",
									color: "#9B9B9B",
									marginRight: "40px",
								}}
							>
								Store Description
							</div>
							<textarea
								value={form.storeDescription}
								onChange={(e) =>
									setForm({ ...form, storeDescription: e.target.value })
								}
								type="text"
								style={{
									width: "348px",
									height: "188px",
									border: "1px solid #9B9B9B",
									padding: "12px",
									borderRadius: "5px",
								}}
							></textarea>
						</div>
					</div>
					<hr className="line" />
					<div className="form-image">
						{dataSeller?.data?.data?.photo ? (
							<img
								src={`https://drive.google.com/uc?export=view&id=${dataSeller.data.data.photo}`}
								style={{
									width: "100px",
									height: "100px",
									borderRadius: "50%",
									margin: "20px",
								}}
							/>
						) : (
							<img
								src={defaultImg}
								style={{
									width: "100px",
									height: "100px",
									borderRadius: "50%",
									margin: "20px",
								}}
							/>
						)}
						<label
							style={{
								border: "1px solid #9B9B9B",
								height: "36",
								width: "140px",
								borderRadius: "25px",
								textAlign: "center",
								padding: "8px",
							}}
							htmlFor="files"
						>
							Select Photo
						</label>
						<input
							hidden
							type="file"
							id="files"
							onChange={(e) => {
								setPhoto(e.target.files[0]);
							}}
						/>
					</div>
				</div>
				{loading ? (
					<button
						type="submit"
						style={{
							height: "40px",
							border: "none",
							borderRadius: "25px",
							fontSize: "20px",
							backgroundColor: "#42D86C",
							color: "#FFFFFF",
							margin: "50px 5px 75px 150px",
							width: "120px",
						}}
						disabled
					>
						<span
							className="spinner-border spinner-border-sm"
							role="status"
							aria-hidden="true"
						/>
					</button>
				) : (
					<button
						type="submit"
						style={{
							height: "40px",
							border: "none",
							borderRadius: "25px",
							fontSize: "20px",
							backgroundColor: "#42D86C",
							color: "#FFFFFF",
							margin: "50px 5px 75px 150px",
							width: "120px",
						}}
					>
						Save
					</button>
				)}
			</form>
		</div>
	);
}
