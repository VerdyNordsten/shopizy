/* eslint-disable no-unused-vars */
import axios from "axios";
import {
	GET_MY_PRODUCT_PENDING,
	GET_MY_PRODUCT_SUCCESS,
	GET_MY_PRODUCT_FAILED,
} from "./typesMyproduct";

export const getMyProduct = () => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem("token");
			dispatch({
				type: GET_MY_PRODUCT_PENDING,
				payload: null,
			});

			const res = await axios({
				// eslint-disable-next-line no-undef
				url: `${process.env.REACT_APP_API_URL}/product/my`,
				method: "GET",
				headers: { token },
			});

			dispatch({
				type: GET_MY_PRODUCT_SUCCESS,
				payload: res,
			});
		} catch (error) {
			dispatch({
				type: GET_MY_PRODUCT_FAILED,
				payload: error.message,
			});
		}
	};
};
