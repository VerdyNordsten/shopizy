import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getListCategory } from "../../redux/action/category";
import { getListNewProduct, getListProduct } from "../../redux/action/product";
import Pagination from "../../components/Pagination";

import Navbar from "../../components/Navbar";
import ProductList from "../../components/Section/ProductList";
import Category from "../../components/Carousel/Category";
import Promo from "../../components/Carousel/Promo";

export default function Home() {
	const token = localStorage.getItem("token");
	const dispatch = useDispatch();
	const { listCategory, listNewProduct, listProduct } = useSelector(
		(state) => state
	);
	const [queryParams] = useSearchParams();
	const navigate = useNavigate();

	const [search, setSearch] = useState("");
	const [colorFilter, setColorFilter] = useState("");
	const [sizeFilter, setSizeFilter] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("");

	useEffect(() => {
		document.title = "SHOPIZY - Home";
	}, []);

	useEffect(() => {
		dispatch(getListCategory());
		dispatch(getListNewProduct());
	}, []);

	useEffect(() => {
		let url = `${process.env.REACT_APP_API_URL}/product?limit=24`;

		setSearch("");
		if (queryParams.get("search")) {
			setSearch(queryParams.get("search"));
			url += `&search=${queryParams.get("search")}`;
		}

		setColorFilter("");
		if (queryParams.get("color")) {
			setColorFilter(queryParams.get("color"));
			url += `&colorFilter=${queryParams.get("color")}`;
		}

		setSizeFilter("");
		if (queryParams.get("size")) {
			setSizeFilter(queryParams.get("size"));
			url += `&sizeFilter=${queryParams.get("size")}`;
		}
		
		setCategoryFilter("");
		if (queryParams.get("category")) {
			setCategoryFilter(queryParams.get("category"));
			url += `&categoryFilter=${queryParams.get("category")}`;
		}

		if (queryParams.get("page")) {
			url += `&page=${queryParams.get("page")}`;
		}

		dispatch(getListProduct(url));
	}, [dispatch, navigate, queryParams]);

	const applyFilter = (page = "") => {
		let url = "/?";

		if (search) {
			url += `&search=${search}`;
		}

		if (colorFilter) {
			url += `&color=${colorFilter}`;
		}

		if (sizeFilter) {
			url += `&size=${sizeFilter}`;
		}

		if (categoryFilter) {
			url += `&category=${categoryFilter}`;
		}

		if (page) {
			url += `&page=${page}`;
		}
		return navigate(url);
	};

	return (
		<>
			<div
				className="d-flex flex-column container-fluid align-items-center"
				style={{ padding: "0px" }}
			>
				<Navbar login={token} />
				<Promo />
				<Category listCategory={listCategory} />
				<div className="d-flex flex-column mb-5" style={{ width: "80%" }}>
					<h2>New</h2>
					<small style={{ color: "#9B9B9B", marginBottom: "25px" }}>
            Find clothes that are trending recently
					</small>
					{listNewProduct.isLoading ? (
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					) : (
						<>
							{listNewProduct.data.length ? (
								<ProductList listProduct={listNewProduct.data} />
							) : (
								<h4>Data not found</h4>
							)}
						</>
					)}
				</div>
				<div id="allProduct" className="d-flex flex-column mb-5" style={{ width: "80%" }}>
					<h2>All Product</h2>
					<small style={{ color: "#9B9B9B", marginBottom: "25px" }}>
            You’ve never seen it before!
					</small>
					{listProduct.isLoading ? (
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					) : (
						<>
							{listProduct.data.length ? (
								<>
									<ProductList listProduct={listProduct.data} />
									<Pagination
										pagination={listProduct.pagination}
										applyFilter={applyFilter}
									/>
								</>
							) : (
								<h4>Data not found</h4>
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
}
