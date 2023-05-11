import axios from "axios";
import {
	GET_LIST_NEW_PRODUCT_PENDING,
	GET_LIST_NEW_PRODUCT_SUCCESS,
	GET_LIST_NEW_PRODUCT_FAILED,
	GET_LIST_PRODUCT_PENDING,
	GET_LIST_PRODUCT_SUCCESS,
	GET_LIST_PRODUCT_FAILED,
	GET_LIST_PRODUCT_BY_CATEGORY_PENDING,
	GET_LIST_PRODUCT_BY_CATEGORY_SUCCESS,
	GET_LIST_PRODUCT_BY_CATEGORY_FAILED,
	GET_DETAIL_PRODUCT_PENDING,
	GET_DETAIL_PRODUCT_SUCCESS,
	GET_DETAIL_PRODUCT_FAILED,
} from "./types";

export const getListProduct = (url) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: GET_LIST_PRODUCT_PENDING,
				payload: null,
			});

			const res = await axios.get(url);

			dispatch({
				type: GET_LIST_PRODUCT_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			console.log(error.message);
			if (error.response) {
				error.message = error.response.data.error;
			}

			dispatch({
				type: GET_LIST_PRODUCT_FAILED,
				payload: error.message,
			});
		}
	};
};

export const getListNewProduct = () => {
	return async (dispatch) => {
		try {
			dispatch({
				type: GET_LIST_NEW_PRODUCT_PENDING,
				payload: null,
			});

			const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/new`);

			dispatch({
				type: GET_LIST_NEW_PRODUCT_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			console.log(error.message);
			if (error.response) {
				error.message = error.response.data.error;
			}

			dispatch({
				type: GET_LIST_NEW_PRODUCT_FAILED,
				payload: error.message,
			});
		}
	};
};

export const getListProductByCategory = (categoryId, page = 1) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem("token");

			dispatch({
				type: GET_LIST_PRODUCT_BY_CATEGORY_PENDING,
				payload: null,
			});

			const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/${categoryId}/category?limit=24&page=${page}`, {
				headers: {
					token
				}
			});

			dispatch({
				type: GET_LIST_PRODUCT_BY_CATEGORY_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			console.log(error.message);
			if (error.response) {
				error.message = error.response.data.error;
			}

			dispatch({
				type: GET_LIST_PRODUCT_BY_CATEGORY_FAILED,
				payload: error.message,
			});
		}
	};
};

export const getDetailProduct = (productId) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem("token");

			dispatch({
				type: GET_DETAIL_PRODUCT_PENDING,
				payload: null,
			});

			const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/${productId}`, {
				headers: {
					token,
				}
			});

			dispatch({
				type: GET_DETAIL_PRODUCT_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			console.log(error.message);
			if (error.response) {
				error.message = error.response.data.error;
			}

			dispatch({
				type: GET_DETAIL_PRODUCT_FAILED,
				payload: error.message,
			});
		}
	};
};

export const addProduct = async (formData) => {
	return new Promise((resolve, reject) => {
		const token = localStorage.getItem("token");

		axios
			.post(`${process.env.REACT_APP_API_URL}/product`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					token: token,
				},
			})
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};