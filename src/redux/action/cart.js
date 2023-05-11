import axios from "axios";
import {
	GET_MY_CART_PENDING,
	GET_MY_CART_SUCCESS,
	GET_MY_CART_FAILED
} from "./types";

export const getMyCart = (token) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: GET_MY_CART_PENDING,
				payload: null,
			});

			const res = await axios.get(`${process.env.REACT_APP_API_URL}/my-cart`, {
				headers: {
					token
				}
			});

			dispatch({
				type: GET_MY_CART_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			console.log(error.message);
			if (error.response) {
				error.message = error.response.data.error;
			}

			dispatch({
				type: GET_MY_CART_FAILED,
				payload: error.response.data,
			});
		}
	};
};

export const deleteCart = (cartId, token) => {
	return new Promise((resolve, reject) => {
		axios.delete(`${process.env.REACT_APP_API_URL}/cart/${cartId}`, {
			headers: {
				token
			}
		})
			.then((response) => {
				resolve(response.data);
			})
			.catch((err) => {
				console.log(err);
				reject(err.response.data);
			});
	});
};