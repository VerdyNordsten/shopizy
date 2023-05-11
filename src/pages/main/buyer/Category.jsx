import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

import Navbar from "../../../components/Navbar";
import Pagination from "../../../components/Pagination";
import ProductList from "../../../components/Section/ProductList";
import { getListProductByCategory } from "../../../redux/action/product";

export default function Category() {
	const token = localStorage.getItem("token");
	const dispatch = useDispatch();
	const { listProductByCategory } = useSelector((state) => state);
	const [category, setCategory] = useState(null);
	const [queryParams] = useSearchParams();
	const urlParams = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "SHOPIZY - Category";
	}, []);

	useEffect(() => {
		dispatch(getListProductByCategory(urlParams.id, queryParams.get("page")));
		axios.get(`${process.env.REACT_APP_API_URL}/category/${urlParams.id}`).then((res) => {
			setCategory(res.data.data);
		}).catch((error) => {
			console.log(error);
		});
	}, [dispatch, navigate, queryParams]);

	const applyFilter = (page = "") => {
		let url = `/category/${urlParams.id}?`;

		if (page) {
			url += `&page=${page}`;
		}
		return navigate(url);
	};

	return (<>
		<div className="d-flex flex-column container-fluid align-items-center" style={{padding: "0px"}}>
			<Navbar login={token} />
			<div className="d-flex flex-column mb-5" style={{ width: "80%" }}>
				<small style={{ color: "#9B9B9B", marginBottom: "25px" }} >Home &gt; Category &gt; {category && category.category_name}</small>
				<h2 className="mb-4">{category && category.category_name}</h2>
				{listProductByCategory.isLoading ? (
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				) : (
					<>
						{
							listProductByCategory.data.length ? <>
								<ProductList listProduct={listProductByCategory.data} />
								<Pagination
									pagination={listProductByCategory.pagination}
									applyFilter={applyFilter}
								/>
							</> : <h4>Data not found</h4>
						}
					</>
				)}
			</div>
		</div>
	</>);
}
