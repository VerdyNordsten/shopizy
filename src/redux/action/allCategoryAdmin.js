import axios from "axios";
import {
	GET_ALL_CATEGORIES_ADMIN_PENDING,
	GET_ALL_CATEGORIES_ADMIN_SUCCESS,
	GET_ALL_CATEGORIES_ADMIN_FAILED,
	GET_DETAIL_CATEGORIES_ADMIN_PENDING,
	GET_DETAIL_CATEGORIES_ADMIN_SUCCESS,
	GET_DETAIL_CATEGORIES_ADMIN_FAILED
} from "./types";


export const getAllCategoriesAdmin = (url) => {
	const token = localStorage.getItem("token");
	return async (dispatch) => {
		try {
			dispatch({
				type: GET_ALL_CATEGORIES_ADMIN_PENDING,
				payload: null,
			});
			const res = await axios.get(url, {
				headers: {
					token
				}
			});
			dispatch({
				type: GET_ALL_CATEGORIES_ADMIN_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			if (error.response) {
				error.message = error.response.data.message;
			}
			dispatch({
				type: GET_ALL_CATEGORIES_ADMIN_FAILED,
				payload: error.message,
			});
		}
	};
};
export const getDetailCategoriesAdmin = (id) => {
	const token = localStorage.getItem("token");
	return async (dispatch) => {
		try {
			dispatch({
				type: GET_DETAIL_CATEGORIES_ADMIN_PENDING,
				payload: null,
			});
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/${id}`, {
				headers: {
					token
				}
			});
			dispatch({
				type: GET_DETAIL_CATEGORIES_ADMIN_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			if (error.response) {
				error.message = error.response.data.message;
			}
			dispatch({
				type: GET_DETAIL_CATEGORIES_ADMIN_FAILED,
				payload: error.message,
			});
		}
	};
};