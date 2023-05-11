import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getBrandList } from "../../redux/action/brands";
import { getListCategory } from "../../redux/action/category";
import { addProduct } from "../../redux/action/product";
import { toastr } from "../../utils/toastr";

export default function AddProduct(props) {
	const dispatch = useDispatch();
	const [productPhoto, setProductPhoto] = useState(null);
	const [loading, setLoading] = useState(false);
	const data = useSelector((state) => {
		return state.listBrand;
	});
	const category = useSelector((state) => {
		return state.listCategory;
	});

	useEffect(() => {
		dispatch(getBrandList());
		dispatch(getListCategory());
	}, []);

	const [form, setForm] = useState({
		storeId: "",
		categoryId: "",
		brandId: "",
		productName: "",
		price: "",
		description: "",
		stock: "",
		productSizes: [{ size: 0 }],
		productColors: [{ colorName: "", colorValue: "" }],
		isNew: "",
	});

	useEffect(() => {
		setForm({ ...form, storeId: props.detail.data.data.store_id });
	}, [props.detail.data]);

	const onSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		if (form.productName == "") {
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
		if (form.price == "") {
			swal
				.fire({
					title: "Error!",
					text: "Price field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}
		if (form.brandId == "") {
			swal
				.fire({
					title: "Error!",
					text: "Select one brand",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}

		if (form.categoryId == "") {
			swal
				.fire({
					title: "Error!",
					text: "Select one category",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}
		if (form.isNew !== true && form.isNew !== false) {
			swal
				.fire({
					title: "Error!",
					text: "Select one stock condition",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}
		if (form.stock == "") {
			swal
				.fire({
					title: "Error!",
					text: "Stock field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}
		if (form.productColors[0].colorName == "") {
			swal
				.fire({
					title: "Error!",
					text: "Color field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}
		if (form.productSizes[0].size == 0) {
			swal
				.fire({
					title: "Error!",
					text: "Size field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}
		if (form.description == "") {
			swal
				.fire({
					title: "Error!",
					text: "Description field can't be empty",
					icon: "error",
				})
				.then(() => {
					setLoading(false);
				});
			return;
		}

		const formData = new FormData();

		// formData.append("photo", productPhoto);
		for (let i = 0; i < productPhoto.length; i++) {
			formData.append("photo", productPhoto[i]);
		}

		formData.append("storeId", form.storeId);
		formData.append("categoryId", form.categoryId);
		formData.append("brandId", form.brandId);
		formData.append("productName", form.productName);
		formData.append("price", form.price);
		formData.append("description", form.description);
		formData.append("stock", form.stock);
		formData.append("productSizes", JSON.stringify(form.productSizes));
		formData.append("productColors", JSON.stringify(form.productColors));
		formData.append("isNew", form.isNew);

		addProduct(formData)
			.then((res) => {
				console.log(res);
				swal.fire("Success", "Add New Product success", "success");
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

	const addSize = () => {
		if (form.productSizes[form.productSizes.length - 1].size === "") {
			swal.fire({
				title: "Error!",
				text: "Select a Size first",
				icon: "error",
			});
			return;
		}
		setForm({
			...form,
			productSizes: [...form.productSizes, { size: 0 }],
		});
	};

	const setSizeValue = (value, index) => {
		const newSize = form.productSizes.map((e, i) => {
			if (i === index) {
				return {
					...e,
					size: parseInt(value),
				};
			}
			return e;
		});
		setForm({ ...form, productSizes: newSize });
	};

	const delSize = (index) => {
		if (
			form.productSizes[form.productSizes.length - 1] ===
      form.productSizes[index]
		) {
			const newSize = form.productSizes.map((e, i) => {
				if (i === index) {
					return {
						...e,
						size: 0,
					};
				}
				return e;
			});
			return setForm({ ...form, productSizes: newSize });
		}
		const newSize = form.productSizes.filter((e, i) => {
			if (i !== index) {
				return e;
			}
		});
		setForm({ ...form, productSizes: newSize });
	};

	const addColor = () => {
		if (
			form.productColors[form.productColors.length - 1].colorValue === "" &&
      form.productColors[form.productColors.length - 1].colorName === ""
		) {
			swal.fire({
				title: "Error!",
				text: "Select a color first",
				icon: "error",
			});
			return;
		}
		setForm({
			...form,
			productColors: [...form.productColors, { colorName: "", colorValue: "" }],
		});
	};

	const setColorName = (value, index) => {
		const newColor = form.productColors.map((e, i) => {
			if (i === index) {
				return {
					...e,
					colorName: value,
				};
			}
			return e;
		});
		setForm({ ...form, productColors: newColor });
	};

	const setColorValue = (value, index) => {
		const newColor = form.productColors.map((e, i) => {
			if (i === index) {
				return {
					...e,
					colorValue: value,
				};
			}
			return e;
		});
		setForm({ ...form, productColors: newColor });
	};

	const delColor = (index) => {
		if (
			form.productColors[form.productColors.length - 1] ===
      form.productColors[index]
		) {
			const newColor = form.productColors.map((e, i) => {
				if (i === index) {
					return {
						...e,
						colorName: "",
						colorValue: "",
					};
				}
				return e;
			});
			return setForm({ ...form, productColors: newColor });
		}
		const newColor = form.productColors.filter((e, i) => {
			if (i !== index) {
				return e;
			}
		});
		setForm({ ...form, productColors: newColor });
	};

	return (
		<div className="content" hidden={props.hidden ? "" : "hidden"}>
			<div className="product">
				<h2>Inventory</h2>
				<hr
					style={{
						border: "1px solid #9B9B9B",
						height: "1px",
						backgroundColor: "#9B9B9B",
						width: "100%",
						marginTop: "0px",
					}}
				/>
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
            Name of goods
					</div>
					<input
						type="text"
						onChange={(e) => setForm({ ...form, productName: e.target.value })}
						style={{
							width: "348px",
							height: "48px",
							border: "1px solid #9B9B9B",
							padding: "12px",
							borderRadius: "5px",
						}}
					/>
				</div>
			</div>
			<div className="product">
				<h2>Item details</h2>
				<hr
					style={{
						border: "1px solid #9B9B9B",
						height: "1px",
						backgroundColor: "#9B9B9B",
						width: "100%",
						marginTop: "0px",
					}}
				/>
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
            Unit price
					</div>
					<input
						type="text"
						onChange={(e) => setForm({ ...form, price: e.target.value })}
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
            Stock
					</div>
					<input
						type="text"
						onChange={(e) => setForm({ ...form, stock: e.target.value })}
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
            Stock
					</div>
					<div
						className="d-flex"
						style={{
							width: "348px",
							height: "48px",
							padding: "12px",
						}}
					>
						<input
							type="radio"
							id="new"
							name="stock"
							value="new"
							onChange={() => setForm({ ...form, isNew: true })}
							style={{
								width: "20px",
								height: "26px",
								border: "none",
								margin: "0px 10px",
							}}
						/>
						<label
							htmlFor="new"
							style={{
								fontSize: "16px",
								fontWeight: "500",
								color: "#9B9B9B",
								marginRight: "40px",
								minWidth: "80px",
							}}
						>
              baru
						</label>
						<br></br>
						<input
							type="radio"
							id="old"
							name="stock"
							value="old"
							onChange={() => setForm({ ...form, isNew: false })}
							style={{
								width: "20px",
								height: "26px",
								border: "none",
								margin: "0px 10px",
							}}
						/>
						<label
							htmlFor="old"
							style={{
								fontSize: "16px",
								fontWeight: "500",
								color: "#9B9B9B",
								marginRight: "40px",
							}}
						>
              bekas
						</label>
						<br></br>
					</div>
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
            color
					</div>
					{form.productColors
						? form.productColors.map((item, index) => (
							<div key={index}>
								<input
									type="text"
									value={form.productColors[index].colorName}
									onChange={(e) => setColorName(e.target.value, index)}
									style={{
										width: "348px",
										height: "48px",
										border: "1px solid #9B9B9B",
										padding: "12px",
										borderRadius: "5px",
									}}
								/>
								<input
									type="color"
									value={form.productColors[index].colorValue}
									onChange={(e) => setColorValue(e.target.value, index)}
									style={{
										width: "348px",
										height: "48px",
										border: "1px solid #9B9B9B",
										padding: "12px",
										borderRadius: "5px",
										margin: "6px 0px",
									}}
								/>
								{form.productColors[index].colorValue !== "" ? (
									<button
										style={{
											height: "40px",
											border: "1px solid #9B9B9B",
											borderRadius: "25px",
											fontSize: "20px",
											backgroundColor: "#FFFFFF",
											width: "30px",
											marginLeft: "20px",
										}}
										onClick={() => delColor(index)}
									>
                      x
									</button>
								) : null}
							</div>
						))
						: null}
					<button
						style={{
							height: "40px",
							border: "none",
							borderRadius: "25px",
							fontSize: "20px",
							backgroundColor: "#42D86C",
							color: "#FFFFFF",
							margin: "20px 5px 20px 0px",
							width: "100px",
						}}
						onClick={addColor}
					>
            add color
					</button>
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
            size
					</div>
					{form.productSizes
						? form.productSizes.map((item, index) => (
							<div key={index} className="d-flex">
								<div id="dropdown-size">
									<select
										className="form-select"
										style={{ width: "130px" }}
										value={form.productSizes[index].size}
										onChange={(e) => setSizeValue(e.target.value, index)}
									>
										<option value={0}>Size</option>
										<option value={1}>XS</option>
										<option value={2}>S</option>
										<option value={3}>M</option>
										<option value={4}>L</option>
										<option value={5}>XL</option>
									</select>
								</div>
								{form.productSizes[index].size !== "" ? (
									<button
										style={{
											height: "40px",
											border: "1px solid #9B9B9B",
											borderRadius: "25px",
											fontSize: "20px",
											backgroundColor: "#FFFFFF",
											width: "30px",
											marginLeft: "20px",
										}}
										onClick={() => delSize(index)}
									>
                      x
									</button>
								) : null}
							</div>
						))
						: null}
					<button
						style={{
							height: "40px",
							border: "none",
							borderRadius: "25px",
							fontSize: "20px",
							backgroundColor: "#42D86C",
							color: "#FFFFFF",
							margin: "20px 5px 20px 0px",
							width: "100px",
						}}
						onClick={addSize}
					>
            add size
					</button>
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
            brand
					</div>
					<div id="dropdown-brand">
						<select
							className="form-select"
							style={{ width: "130px" }}
							onChange={(e) => setForm({ ...form, brandId: e.target.value })}
						>
							<option value="">brand</option>
							{data.data
								? data.data.map((item, index) => (
									<option key={index} value={item.id}>
										{item.brand_name}
									</option>
								))
								: null}
						</select>
					</div>
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
            category
					</div>
					<div id="dropdown-brand">
						<select
							className="form-select"
							style={{ width: "130px" }}
							onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
						>
							<option value="">category</option>
							{category.data
								? category.data.map((item, index) => (
									<option key={index} value={item.id}>
										{item.category_name}
									</option>
								))
								: null}
						</select>
					</div>
				</div>
			</div>
			<div className="product">
				<h2>Photo of goods</h2>
				<hr
					style={{
						border: "1px solid #9B9B9B",
						height: "1px",
						backgroundColor: "#9B9B9B",
						width: "100%",
						marginTop: "0px",
					}}
				/>
				<div
					style={{
						margin: "30px 0px",
						border: "2px dashed #9B9B9B",
						width: "100%",
						borderRadius: "10px",
						textAlign: "center",
						padding: "40px 30px",
						fontSize: "16px",
						fontWeight: "500",
						color: "#9B9B9B",
					}}
				>
					<input
						type="file"
						id="files"
						onChange={(e) => {
							setProductPhoto(e.target.files);
						}}
						multiple
					/>
				</div>
			</div>
			<div
				className="product"
				style={{
					marginBottom: "50px",
				}}
			>
				<h2>Description</h2>
				<hr
					style={{
						border: "1px solid #9B9B9B",
						height: "1px",
						backgroundColor: "#9B9B9B",
						width: "100%",
						marginTop: "0px",
					}}
				/>
				<div className="form-input">
					<div
						style={{
							margin: "12px 0px 50px 0px",
							fontSize: "16px",
							fontWeight: "500",
							color: "#9B9B9B",
							marginRight: "40px",
						}}
					></div>
					<textarea
						type="text"
						onChange={(e) => setForm({ ...form, description: e.target.value })}
						style={{
							width: "100%",
							height: "188px",
							border: "1px solid #9B9B9B",
							padding: "12px",
							borderRadius: "5px",
						}}
					></textarea>
				</div>

				{loading ? (
					<button
						type="submit"
						style={{
							position: "absolute",
							height: "40px",
							border: "none",
							borderRadius: "25px",
							fontSize: "20px",
							backgroundColor: "#42D86C",
							color: "#FFFFFF",
							margin: "50px 5px 75px 0px",
							width: "100px",
							right: "80px",
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
						onClick={(e) => onSubmit(e)}
						style={{
							position: "absolute",
							height: "40px",
							border: "none",
							borderRadius: "25px",
							fontSize: "20px",
							backgroundColor: "#42D86C",
							color: "#FFFFFF",
							margin: "50px 5px 75px 0px",
							width: "100px",
							right: "80px",
						}}
					>
            Jual
					</button>
				)}
			</div>
		</div>
	);
}
