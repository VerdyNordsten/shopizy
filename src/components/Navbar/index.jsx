import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Dropdown,
	DropdownItem,
	DropdownToggle,
	DropdownMenu,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/images/logo.svg";
import logoOnly from "../../assets/images/logo-only.svg";
import searchIcon from "../../assets/images/magnifyingGlass.svg";
import cartIcon from "../../assets/images/cart.svg";
import mailIcon from "../../assets/images/mail.svg";
import filterIcon from "../../assets/images/filter.svg";
import Style from "../../assets/styles/Home.module.css";
import { getListCategory } from "../../redux/action/category";
import { getDetailUser } from "../../redux/action/users";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";

export default function Navbar(props) {
	const [search, setSearch] = useState("");
	const [color, setColor] = useState("");
	const [size, setSize] = useState("");
	const [category, setCategory] = useState("");

	const dispatch = useDispatch();
	const { listCategory, detailUser } = useSelector((state) => state);

	const navigate = useNavigate();
	const login = props.login;
	const [modalOpen, setModalOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownToggler = () => setDropdownOpen(!dropdownOpen);
	const [queryParams] = useSearchParams();
	const modalToggler = () => {
		setModalOpen(!modalOpen);
	};
	const decode = (token) => {
		return jwtDecode(token);
	};
	useEffect(() => {
		dispatch(getListCategory());
		if (login) {
			dispatch(getDetailUser());
		}
	}, []);
	useEffect(() => {
		setSearch("");
		if (queryParams.get("search")) {
			setSearch(queryParams.get("search"));
		}

		setColor("");
		if (queryParams.get("color")) {
			setColor(queryParams.get("color"));
		}

		setSize("");
		if (queryParams.get("size")) {
			setSize(queryParams.get("size"));
		}

		setCategory("");
		if (queryParams.get("category")) {
			setCategory(queryParams.get("category"));
		}
	}, [navigate, queryParams]);

	const filter = () => {
		let url = "/?";
		if (color) {
			url += `&color=${color}`;
		}
		if (size) {
			url += `&size=${size}`;
		}
		if (category) {
			url += `&category=${category}`;
		}

		window.location.href = "#allProduct";

		setTimeout(() => {
			return navigate(url);
		}, 500);
	};

	const logout = () => {
		localStorage.clear();
		navigate("/login");
	};

	return (
		<div
			className="d-flex align-items-center justify-content-center w-100"
			style={{
				paddingTop: "30px",
				paddingBottom: "30px",
				boxShadow: "0px 6px 40px rgba(173, 173, 173, 0.25)",
				marginBottom: "50px",
			}}
		>
			<div className="d-flex align-items-center" style={{ width: "80%" }}>
				<Link to="/">
					<img src={logoOnly} className={Style.logoOnly} />
					<img src={logo} className={Style.logo} />
				</Link>
				<form
					onSubmit={(e) => {
						e.preventDefault();

						window.location.href = "#allProduct";

						setTimeout(() => {
							return navigate(`/?search=${search}`);
						}, 500);
					}}
					className="d-flex align-items-center"
					style={{
						width: "50%",
						border: "1px solid #8E8E93",
						borderRadius: "25px",
						paddingLeft: "10px",
						paddingRight: "20px",
						marginRight: "10px",
					}}
				>
					<input
						className={Style.searchInput}
						type="text"
						placeholder="Search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<img src={searchIcon} />
				</form>
				{login ? (
					<>
						<div
							className={Style.filterDiv}
							onClick={() => {
								modalToggler();
							}}
						>
							<img src={filterIcon} />
						</div>
						{decode(login).level !== 3 ?
							(<Link to="/cart" className={Style.cartIcon}>
							</Link>) : 
							(<Link to="/cart" className={Style.cartIcon}>
								<img src={cartIcon} />
							</Link>)
						}
						<Link to="/chat" className={Style.mailIcon}>
							<img src={mailIcon} />
						</Link>
						{detailUser.isLoading ? 
							(<div>Loading...</div>) : 
							detailUser.isError ? 
								(<div>{detailUser.error}</div>) :
								detailUser.data ? 
									(<Dropdown isOpen={dropdownOpen} toggle={dropdownToggler}>
										<DropdownToggle
											style={{ border: "none", backgroundColor: "#FFF" }}
										>
											<div
												style={{
													width: "35px",
													height: "35px",
													backgroundSize: "cover",
													backgroundPosition: "center",
													backgroundRepeat: "no-repeat",
													backgroundImage: `url(${
														detailUser.data.photo
															? `https://drive.google.com/uc?export=view&id=${detailUser.data.photo}`
															: "https://images227.netlify.app/mernuas/default.jpg"
													})`,
													borderRadius: "99px",
												}}
											/>
										</DropdownToggle>
										<DropdownMenu>
											<Link to="/profile/buyer" style={{ textDecoration: "none" }}>
												<DropdownItem>
													<FontAwesomeIcon icon={faUser} /> My Profile
												</DropdownItem>
											</Link>
											<Link to="/chat" className={Style.chatMenu} style={{ textDecoration: "none" }}>
												<DropdownItem>
													<FontAwesomeIcon icon={faRocketchat} /> Chat Page
												</DropdownItem>
											</Link>
											<DropdownItem
												onClick={() => {
													logout();
												}}
												style={{ color: "red" }}
											>
												<FontAwesomeIcon icon={faRightFromBracket} /> Logout
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>) : 
									(<div>Error</div>)
						}
					</>
				) : (
					<>
						<Link to="/cart" className={Style.iconCart}>
							<img src={cartIcon} />
						</Link>
						<Link to="/login">
							<button className={Style.signinButton}>Login</button>
						</Link>
						<Link to="/register">
							<button className={Style.signupButton}>Signup</button>
						</Link>
					</>
				)}
			</div>
			<Modal toggle={modalToggler} isOpen={modalOpen}>
				<ModalHeader toggle={modalToggler}>Filter</ModalHeader>
				<ModalBody>
					<h6 style={{ marginBottom: "30px" }}>Colors</h6>
					<div className="d-flex align-items-center mb-4">
						<div
							onClick={() => setColor("purple")}
							className="d-flex align-items-center justify-content-center pointer"
							style={{
								height: "45px",
								width: "45px",
								borderRadius: "99px",
								border: color === "purple" ? "1px solid #DB3022" : "none",
								marginRight: "15px",
							}}
						>
							<div
								style={{
									height: "35px",
									width: "35px",
									backgroundColor: "purple",
									borderRadius: "100%",
								}}
							/>
						</div>
						<div
							onClick={() => setColor("red")}
							className="d-flex align-items-center justify-content-center pointer"
							style={{
								height: "45px",
								width: "45px",
								borderRadius: "99px",
								border: color === "red" ? "1px solid #DB3022" : "none",
								marginRight: "15px",
								filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
							}}
						>
							<div
								style={{
									height: "35px",
									width: "35px",
									backgroundColor: "red",
									borderRadius: "100%",
								}}
							/>
						</div>
						<div
							onClick={() => setColor("black")}
							className="d-flex align-items-center justify-content-center pointer"
							style={{
								height: "45px",
								width: "45px",
								borderRadius: "99px",
								border: color === "black" ? "1px solid #DB3022" : "none",
								marginRight: "15px",
							}}
						>
							<div
								style={{
									height: "35px",
									width: "35px",
									backgroundColor: "black",
									borderRadius: "100%",
								}}
							/>
						</div>
						<div
							onClick={() => setColor("blue")}
							className="d-flex align-items-center justify-content-center pointer"
							style={{
								height: "45px",
								width: "45px",
								borderRadius: "99px",
								border: color === "blue" ? "1px solid #DB3022" : "none",
								marginRight: "15px",
							}}
						>
							<div
								style={{
									height: "35px",
									width: "35px",
									backgroundColor: "blue",
									borderRadius: "100%",
								}}
							/>
						</div>
						<div
							onClick={() => setColor("green")}
							className="d-flex align-items-center justify-content-center pointer"
							style={{
								height: "45px",
								width: "45px",
								borderRadius: "99px",
								border: color === "green" ? "1px solid #DB3022" : "none",
								marginRight: "15px",
							}}
						>
							<div
								style={{
									height: "35px",
									width: "35px",
									backgroundColor: "green",
									borderRadius: "100%",
								}}
							/>
						</div>
						<div
							onClick={() => setColor("yellow")}
							className="d-flex align-items-center justify-content-center pointer"
							style={{
								height: "45px",
								width: "45px",
								borderRadius: "99px",
								border: color === "yellow" ? "1px solid #DB3022" : "none",
								marginRight: "15px",
							}}
						>
							<div
								style={{
									height: "35px",
									width: "35px",
									backgroundColor: "yellow",
									borderRadius: "100%",
								}}
							/>
						</div>
					</div>
					<h6 style={{ marginBottom: "30px" }}>Sizes</h6>
					<div className="d-flex align-items-center mb-4">
						<input
							type="checkbox"
							name="size"
							value="xs"
							id="xs"
							style={{ display: "none" }}
							onClick={() => setSize("1")}
						/>
						<label
							htmlFor="xs"
							className="pointer"
							style={{
								height: "40px",
								width: "40px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								border:
                  size === "1" ? "0.4px solid #DB3022" : "0.4px solid #9B9B9B",
								borderRadius: "10px",
								marginRight: "15px",
							}}
						>
              XS
						</label>
						<input
							type="checkbox"
							name="size"
							value="s"
							id="s"
							style={{ display: "none" }}
							onClick={() => setSize("2")}
						/>
						<label
							htmlFor="s"
							className="pointer"
							style={{
								height: "40px",
								width: "40px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								border:
                  size === "2" ? "0.4px solid #DB3022" : "0.4px solid #9B9B9B",
								borderRadius: "10px",
								marginRight: "15px",
							}}
						>
              S
						</label>
						<input
							type="checkbox"
							name="size"
							value="m"
							id="m"
							style={{ display: "none" }}
							onClick={() => setSize("3")}
						/>
						<label
							htmlFor="m"
							className="pointer"
							style={{
								height: "40px",
								width: "40px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								border:
                  size === "3" ? "0.4px solid #DB3022" : "0.4px solid #9B9B9B",
								borderRadius: "10px",
								marginRight: "15px",
							}}
						>
              M
						</label>
						<input
							type="checkbox"
							name="size"
							value="l"
							id="l"
							style={{ display: "none" }}
							onClick={() => setSize("4")}
						/>
						<label
							htmlFor="l"
							className="pointer"
							style={{
								height: "40px",
								width: "40px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								border:
                  size === "4" ? "0.4px solid #DB3022" : "0.4px solid #9B9B9B",
								borderRadius: "10px",
								marginRight: "15px",
							}}
						>
              L
						</label>
						<input
							type="checkbox"
							name="size"
							value="xl"
							id="xl"
							style={{ display: "none" }}
							onClick={() => setSize("5")}
						/>
						<label
							htmlFor="xl"
							className="pointer"
							style={{
								height: "40px",
								width: "40px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								border:
                  size === "5" ? "0.4px solid #DB3022" : "0.4px solid #9B9B9B",
								borderRadius: "10px",
								marginRight: "15px",
							}}
						>
              XL
						</label>
					</div>
					<h6 style={{ marginBottom: "30px" }}>Category</h6>
					<div className="row mb-4" style={{ marginLeft: "2px" }}>
						{listCategory.data.map((item) => (
							<div
								key={item.id}
								className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex justify-content-center align-items-center pointer"
								style={{
									backgroundColor:
                    item.category_name === category ? "#32C33B" : "#FFF",
									color: item.category_name === category ? "#FFF" : "#000",
									borderRadius: "10px",
									paddingTop: "10px",
									paddingBottom: "10px",
									border: "0.4px solid #9B9B9B",
									marginRight: "20px",
								}}
								onClick={() => setCategory(item.category_name)}
							>
								{item.category_name}
							</div>
						))}
					</div>
					<button
						className="btn text-white"
						style={{ backgroundColor: "#32C33B" }}
						onClick={() => {
							setCategory("");
							setColor("");
							setSize("");
						}}
					>
            Reset Filter
					</button>
				</ModalBody>
				<ModalFooter style={{ justifyContent: "center" }}>
					<button
						onClick={() => {
							modalToggler();
						}}
						style={{
							padding: "8px 30px",
							border: "1px solid #222222",
							color: "#222222",
							backgroundColor: "#FFF",
							borderRadius: "25px",
						}}
					>
            Discard
					</button>
					<button
						onClick={() => {
							filter();
							modalToggler();
						}}
						style={{
							padding: "8px 30px",
							border: "none",
							color: "#FFF",
							backgroundColor: "#32C33B",
							borderRadius: "25px",
						}}
					>
            Apply
					</button>
				</ModalFooter>
			</Modal>
		</div>
	);
}
