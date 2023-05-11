import axios from "axios";
import { 
	GET_ALL_TRANSACTION_ADMIN_PENDING,
	GET_ALL_TRANSACTION_ADMIN_SUCCESS,
	GET_ALL_TRANSACTION_ADMIN_FAILED
} from "./types";

export const createTransaction = (form) => {
	const token = localStorage.getItem("token");
	return new Promise((resolve, reject) => {
		axios.post(`${process.env.REACT_APP_API_URL}/transaction`, form, {
			headers: {
				token
			}
		})
			.then((response) => {
				resolve(response.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
export const getAllTransactionAdmin = (url) => {
	const token = localStorage.getItem("token");
	return async (dispatch) => {
		try {
			dispatch({
				type: GET_ALL_TRANSACTION_ADMIN_PENDING,
				payload: null,
			});
			const res = await axios.get(url, {
				headers: {
					token
				}
			});
			dispatch({
				type: GET_ALL_TRANSACTION_ADMIN_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			if (error.response) {
				error.message = error.response.data.message;
			}
			dispatch({
				type: GET_ALL_TRANSACTION_ADMIN_FAILED,
				payload: error.message,
			});
		}
	};
};
