import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import ProductList from "../../../components/Section/ProductList";
import starIcon from "../../../assets/images/star.svg";
import Color from "../../../components/Product/Color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/product.css";
import {
	getDetailProduct,
	getListProductByCategory,
} from "../../../redux/action/product";

export default function ProductPage() {
	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { detailProduct, listProductByCategory } = useSelector(
		(state) => state
	);
	const urlParams = useParams();
	const [color, setColor] = useState("");
	const [photo, setPhoto] = useState("");
	const [size, setSize] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [colorForm, setColorForm] = useState("");
	const [chat, setChat] = useState("");

	useEffect(() => {
		document.title = "SHOPIZY - Detail";
	}, []);

	useEffect(() => {
		dispatch(getDetailProduct(urlParams.id));

		window.scrollTo(0, 0);
	}, [urlParams]);

	useEffect(() => {
		dispatch(getListProductByCategory(detailProduct.data.category_id));
	}, [detailProduct]);

	useEffect(() => {
		if(detailProduct.data.id) {
			if (detailProduct.data.product_images.length) {
				setPhoto(
					`https://drive.google.com/uc?export=view&id=${detailProduct.data.product_images[0].photo}`
				);
			} else {
				setPhoto("/category.webp");
			}
		}
	}, [detailProduct]);

	const changeQty = (type) => {
		if (type === "plus") {
			if (detailProduct.data.stock > quantity) {
				setQuantity(quantity + 1);
			}
		}
		if (type === "minus") {
			if (quantity > 0) {
				setQuantity(quantity - 1);
			}
		}
	};

	const addToBag = async () => {
		if (quantity < 1) {
			Swal.fire({
				icon: "error",
				title: "Failed",
				text: "Quantity must selected!",
			});
			return;
		}

		if (!colorForm) {
			Swal.fire({
				icon: "error",
				title: "Failed",
				text: "Color must selected!",
			});
			return;
		}

		if (!size) {
			Swal.fire({
				icon: "error",
				title: "Failed",
				text: "Size must selected!",
			});
			return;
		}

		axios
			.post(
				`${process.env.REACT_APP_API_URL}/cart`,
				{
					qty: quantity,
					productId: detailProduct.data.id,
					color: colorForm,
					size,
				},
				{
					headers: {
						token,
					},
				}
			)
			.then(() => {
				Swal.fire({
					icon: "success",
					title: "Success",
					text: "Success add to cart!",
				});
				
				return navigate("/cart");
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const createInitialChat = () => {
		if (!chat) {
			Swal.fire({
				icon: "error",
				title: "Failed",
				text: "Chat required!",
			});
			return;
		}

		axios
			.post(
				`${process.env.REACT_APP_API_URL}/chat`,
				{
					senderId: localStorage.getItem("userId"),
					receiverId: detailProduct.data.store_id,
					message: chat,
				},
				{
					headers: {
						token: localStorage.getItem("token"),
					},
				}
			)
			.then(() => {
				document.getElementById("close").click();

				return navigate("/chat");
			})
			.catch((error) => console.log(error.message));
	};

	return (
		<>
			<div
				className="product d-flex flex-column container-fluid align-items-center"
				style={{ padding: "0px" }}
			>
				<Navbar login={token} />

				{detailProduct.isLoading ? (
					<div className="spinner-border mt-3" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				) : (
					<>
						{detailProduct.isError ? (
							<h2 className="mt-3">{detailProduct.error}</h2>
						) : (
							<>
								<section className="content row">
									{detailProduct.data.id ? (
										<>
											<div className="form-image col-xl-4 col-lg-4 col-md-12 col-sm-12">
												<div>
													<img
														src={photo ? photo : "/category.webp"}
														alt="foto"
														style={{
															width: "100%",
															height: "100%",
														}}
													/>
												</div>
												<div
													className="scroll d-flex"
													style={{
														overflowX: "scroll",
														paddingLeft: "150px",
														justifyContent: "center",
														alignItems: "center",
														width: "100%",
													}}
												>
													{detailProduct.data.product_images.map((img) => (
														<img
															key={img.id}
															src={`https://drive.google.com/uc?export=view&id=${img.photo}`}
															alt="foto"
															className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-4"
															style={{
																width: "70px",
																height: "70px",
																padding: "10px",
															}}
															onClick={() =>
																setPhoto(
																	`https://drive.google.com/uc?export=view&id=${img.photo}`
																)
															}
														/>
													))}
												</div>
											</div>

											<div className="detail col-xl-7 col-lg-7 col-md-12 col-sm-12">
												<h2 style={{ marginBottom: "10px" }}>
													{detailProduct.data.product_name}
												</h2>
												<small
													style={{ color: "#9B9B9B", marginBottom: "15px" }}
												>
													{detailProduct.data.store_name || "Toko Saya"}
												</small>
												<div
													className="d-flex w-100"
													style={{ marginBottom: "30px" }}
												>
													<img src={starIcon} />
													<img src={starIcon} />
													<img src={starIcon} />
													<img src={starIcon} />
													<img src={starIcon} />
													<small
														style={{ color: "#9B9B9B", marginLeft: "5px" }}
													>
                            (10)
													</small>
												</div>
												<div className="row">
													<div className="col">
														<small
															style={{ color: "#9B9B9B", marginBottom: "10px" }}
														>
                              Price
														</small>
														<h2
															style={{
																fontWeight: "700",
																marginBottom: "40px",
															}}
														>
															{new Intl.NumberFormat("id-ID", {
																style: "currency",
																currency: "IDR",
																minimumFractionDigits: 0,
															}).format(detailProduct.data.price)}
														</h2>
													</div>
													<div className="col">
														<small
															style={{ color: "#9B9B9B", marginBottom: "10px" }}
														>
                              Stock
														</small>
														<h2
															style={{
																fontWeight: "700",
																marginBottom: "40px",
															}}
														>
															{detailProduct.data.stock}
														</h2>
													</div>
												</div>
												<small
													style={{
														fontWeight: "600",
														marginBottom: "10px",
														fontSize: "16px",
													}}
												>
                          Color
												</small>
												<div className="d-flex w-100">
													{detailProduct.data.product_color.map((item) => (
														<Color
															key={item.id}
															color={item.color_value}
															colorName={item.color_name}
															cekColor={color}
															setColor={() => setColor(item.color_value)}
															setColorForm={setColorForm}
														/>
													))}
												</div>
												<div className="d-flex w-100">
													<div
														style={{
															margin: "10px",
															marginBottom: "40px",
															height: "80px",
														}}
													>
														<p
															style={{
																margin: "20px",
																fontWeight: "600",
																marginLeft: "0px",
																fontSize: "16px",
																height: "20px",
															}}
														>
                              Size
														</p>
														<div
															style={{
																fontWeight: "600",
																marginBottom: "15px",
																fontSize: "16px",
																height: "40px",
																display: "flex",
																alignItems: "center",
															}}
														>
															<select
																className="form-select"
																onChange={(e) => setSize(e.target.value)}
															>
																<option value="">Select size</option>
																{detailProduct.data.product_sizes.map(
																	(size) => (
																		<option
																			key={size.id}
																			value={
																				size.size === 1
																					? "XS"
																					: size.size === 2
																						? "S"
																						: size.size === 3
																							? "M"
																							: size.size === 4
																								? "L"
																								: size.size === 5
																									? "XL"
																									: "Other"
																			}
																		>
																			{size.size === 1
																				? "XS"
																				: size.size === 2
																					? "S"
																					: size.size === 3
																						? "M"
																						: size.size === 4
																							? "L"
																							: size.size === 5
																								? "XL"
																								: "Other"}
																		</option>
																	)
																)}
															</select>
														</div>
													</div>

													<div
														style={{
															margin: "20px",
															marginBottom: "40px",
															height: "80px",
														}}
													>
														<p
															style={{
																margin: "10px",
																fontWeight: "600",
																marginBottom: "15px",
																fontSize: "16px",
																height: "20px",
															}}
														>
                              Jumlah
														</p>
														<div
															style={{
																fontWeight: "600",
																marginBottom: "15px",
																fontSize: "16px",
																height: "40px",
																display: "flex",
																alignItems: "center",
															}}
														>
															<button
																style={{
																	height: "36px",
																	width: "36px",
																	color: "#FFFFFF",
																	border: "none",
																	borderRadius: "50%",
																	fontSize: "20px",
																	backgroundColor: "#D4D4D4",
																	margin: "5px",
																}}
																onClick={() => changeQty("minus")}
															>
																<FontAwesomeIcon icon={faMinus} />
															</button>
															<p
																style={{
																	fontWeight: "600",
																	fontSize: "16px",
																	width: "20px",
																	textAlign: "center",
																	margin: "0px 5px 5px 5px",
																}}
															>
																{quantity}
															</p>
															<button
																style={{
																	height: "36px",
																	width: "36px",
																	color: "#000000",
																	border: "2px solid #D4D4D4",
																	borderRadius: "50%",
																	fontSize: "20px",
																	backgroundColor: "#FFFFFF",
																	margin: "5px",
																}}
																onClick={() => changeQty("plus")}
															>
																<FontAwesomeIcon icon={faPlus} />
															</button>
														</div>
													</div>
												</div>
												<div
													className="row"
													style={{
														height: "50px",
													}}
												>
													<button
														className="col-xl-3 col-lg-3 col-md-6 col-sm-5"
														style={{
															height: "50px",
															border: "1px solid #000000",
															borderRadius: "25px",
															fontSize: "20px",
															backgroundColor: "#FFFFFF",
															margin: "5px",
														}}
														data-bs-toggle="modal"
														data-bs-target="#chatModal"
														onClick={() =>
															setChat(
																`Halo ${detailProduct.data.store_name}, saya ingin bertanya mengenai produk ${detailProduct.data.product_name}.`
															)
														}
													>
                            Chat
													</button>

													{/* Chat Modal */}
													<div
														className="modal fade"
														id="chatModal"
														tabIndex="-1"
														aria-labelledby="chatModalLabel"
														aria-hidden="true"
													>
														<div className="modal-dialog modal-lg">
															<div className="modal-content">
																<div className="modal-header">
																	<h5
																		className="modal-title"
																		id="chatModalLabel"
																	>
                                    Send Chat
																	</h5>
																	<button
																		type="button"
																		className="btn-close"
																		data-bs-dismiss="modal"
																		aria-label="Close"
																		id="close"
																	></button>
																</div>
																<div className="modal-body">
																	<form>
																		<div className="mb-3">
																			<label
																				htmlFor="chatInput"
																				className="form-label"
																			>
                                      Chat
																			</label>
																			<input
																				type="text"
																				className="form-control"
																				value={chat}
																				onChange={(e) => setChat(e.target.value)}
																				id="chatInput"
																				placeholder="Type message"
																			/>
																		</div>
																	</form>
																</div>
																<div className="modal-footer">
																	<button
																		type="button"
																		className="btn btn-secondary"
																		data-bs-dismiss="modal"
																	>
                                    Close
																	</button>
																	<button
																		type="button"
																		className="btn btn-success"
																		onClick={createInitialChat}
																	>
                                    Send
																	</button>
																</div>
															</div>
														</div>
													</div>
													{/* Chat Modal */}

													<button
														className="col-xl-3 col-lg-3 col-md-5 col-sm-6 mb-6"
														style={{
															height: "50px",
															border: "1px solid #000000",
															borderRadius: "25px",
															fontSize: "20px",
															backgroundColor: "#FFFFFF",
															margin: "5px",
															marginBottom: "0px !important",
														}}
														onClick={addToBag}
													>
                            Add Bag
													</button>
													<button
														className="col-xl-5 col-lg-4 col-md-12 col-sm-12 mb-12"
														style={{
															height: "50px",
															border: "none",
															borderRadius: "25px",
															fontSize: "20px",
															backgroundColor: "#42D86C",
															color: "#FFFFFF",
															margin: "5px",
														}}
														onClick={() => navigate(`/checkout/${detailProduct.data.id}`)}
													>
                            Buy Now
													</button>
												</div>
											</div>
										</>
									) : (
										<div className="spinner-border" role="status">
											<span className="visually-hidden">Loading...</span>
										</div>
									)}
								</section>

								<section
									className="description"
									style={{
										width: "80%",
										marginBottom: "30px",
										marginTop: "60px",
									}}
								>
									<h2 style={{ marginBottom: "30px" }}>Informasi Produk</h2>
									{detailProduct.data.id ? (
										<>
											<h5 style={{ marginBottom: "5px" }}>Condition</h5>
											<h5
												style={{
													marginBottom: "30px",
													color: `${
														detailProduct.data.is_new ? "green" : "red"
													}`,
												}}
											>
												{detailProduct.data.is_new ? "New" : "Used"}
											</h5>
											<h5 style={{ marginBottom: "5px" }}>Description</h5>
											<div
												style={{
													color: "#9B9B9B",
													fontSize: "14px",
													fontWeight: "500",
												}}
											>
												<p>{detailProduct.data.description}</p>
											</div>
										</>
									) : (
										<div className="spinner-border" role="status">
											<span className="visually-hidden">Loading...</span>
										</div>
									)}
								</section>

								<section className="review">
									<h2 style={{ marginBottom: "10px" }}>Product Review</h2>
									<div
										className="rating d-flex w-100"
										style={{
											margin: "0px 6px",
											alignItems: "flex-start",
										}}
									>
										<div
											style={{
												margin: "10px 30px 30px 0px",
											}}
										>
											<div
												style={{
													fontSize: "42px",
													fontWeight: "500",
													display: "flex",
													alignItems: "flex-end",
													margin: "10px 0px 10px 0px",
												}}
											>
                        5.0
												<div
													style={{
														display: "inline-block",
														color: "#9B9B9B",
														fontSize: "16px",
														fontWeight: "400",
													}}
												>
                          /10
												</div>
											</div>
											<div className="d-flex">
												<img
													src={starIcon}
													style={{
														height: "20px",
														width: "20px",
														margin: "0px 6px",
													}}
												/>
												<img
													src={starIcon}
													style={{
														height: "20px",
														width: "20px",
														margin: "0px 6px",
													}}
												/>
												<img
													src={starIcon}
													style={{
														height: "20px",
														width: "20px",
														margin: "0px 6px",
													}}
												/>
												<img
													src={starIcon}
													style={{
														height: "20px",
														width: "20px",
														margin: "0px 6px",
													}}
												/>
												<img
													src={starIcon}
													style={{
														height: "20px",
														width: "20px",
														margin: "0px 6px",
													}}
												/>
											</div>
										</div>
										<div className="d-flex flex-column">
											<label
												className="d-flex"
												style={{
													alignItems: "center",
													justifyContent: "center",
												}}
											>
												<img
													src={starIcon}
													style={{
														height: "20px",
														width: "20px",
														margin: "0px 6px",
													}}
												/>
												<p
													style={{
														color: "#9B9B9B",
														height: "12px",
														marginRight: "10px",
														marginLeft: "10px",
													}}
												>
                          5
												</p>
												<div
													className="red-line"
													style={{
														width: "120px",
														backgroundColor: "red",
														height: "10px",
														borderRadius: "25px",
													}}
												></div>
												<p
													style={{
														color: "#9B9B9B",
														height: "12px",
														marginRight: "10px",
														marginLeft: "10px",
													}}
												>
                          4
												</p>
											</label>
											<label
												className="d-flex"
												style={{ alignItems: "center" }}
											>
												<img
													src={starIcon}
													style={{
														height: "20px",
														width: "20px",
														margin: "0px 6px",
													}}
												/>
												<p
													style={{
														color: "#9B9B9B",
														height: "12px",
														marginRight: "10px",
														marginLeft: "10px",
													}}
												>
                          4
												</p>
												<div
													className="red-line"
													style={{
														width: "120px",
													}}
												></div>
												<p
													style={{
														color: "#9B9B9B",
														height: "12px",
														marginRight: "10px",
														marginLeft: "10px",
													}}
												>
                          0
												</p>
											</label>
											<label
												className="d-flex"
												style={{ alignItems: "center" }}
											>
												<img
													src={starIcon}
													style={{
														height: "20px",
														width: "20px",
														margin: "0px 6px",
													}}
												/>
												<p
													style={{
														color: "#9B9B9B",
														height: "12px",
														marginRight: "10px",
														marginLeft: "10px",
													}}
												>
                          3
												</p>
												<div
													className="red-line"
													style={{
														width: "120px",
													}}
												></div>
												<p
													style={{
														color: "#9B9B9B",
														height: "12px",
														marginRight: "10px",
														marginLeft: "10px",
													}}
												>
                          0
												</p>
											</label>
											<label
												className="d-flex"
												style={{ alignItems: "center" }}
											>
												<img
													src={starIcon}
													style={{
														height: "20px",
														width: "20px",
														margin: "0px 6px",
													}}
												/>
												<p
													style={{
														color: "#9B9B9B",
														height: "12px",
														marginRight: "10px",
														marginLeft: "10px",
													}}
												>
                          2
												</p>
												<div
													className="red-line"
													style={{
														width: "120px",
													}}
												></div>
												<p
													style={{
														color: "#9B9B9B",
														height: "12px",
														marginRight: "10px",
														marginLeft: "10px",
													}}
												>
                          0
												</p>
											</label>
											<label
												className="d-flex"
												style={{ alignItems: "center" }}
											>
												<img
													src={starIcon}
													style={{
														height: "20px",
														width: "20px",
														margin: "0px 6px",
													}}
												/>
												<p
													style={{
														color: "#9B9B9B",
														height: "12px",
														marginRight: "10px",
														marginLeft: "10px",
													}}
												>
                          1
												</p>
												<div
													className="red-line"
													style={{
														width: "120px",
													}}
												></div>
												<p
													style={{
														color: "#9B9B9B",
														height: "12px",
														marginRight: "10px",
														marginLeft: "10px",
													}}
												>
                          0
												</p>
											</label>
										</div>
									</div>
								</section>

								<hr
									style={{
										border: "1px solid #9B9B9B",
										height: "1px",
										backgroundColor: "#9B9B9B",
										width: "80%",
										margin: "50px 0px",
									}}
								/>

								<div
									className="d-flex flex-column mb-5"
									style={{ width: "80%" }}
								>
									<h2>You can also like this</h2>
									<small style={{ color: "#9B9B9B", marginBottom: "25px" }}>
                    You’ve never seen it before!
									</small>
									{listProductByCategory.isLoading ? (
										<div className="spinner-border" role="status">
											<span className="visually-hidden">Loading...</span>
										</div>
									) : (
										<ProductList listProduct={listProductByCategory.data} />
									)}
								</div>
							</>
						)}
					</>
				)}
			</div>
		</>
	);
}
