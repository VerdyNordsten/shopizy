import axios from "axios";

import {
	GET_LIST_BRAND_PENDING,
	GET_LIST_BRAND_SUCCESS,
	GET_LIST_BRAND_FAILED,
} from "./typeBrandsList";


export const getBrandList = () => {
	return async (dispatch) => {
		try {
			dispatch({
				type: GET_LIST_BRAND_PENDING,
				payload: null,
			});

			const token = localStorage.getItem("token");

			const res = await axios.get(
				`${process.env.REACT_APP_API_URL}/product-brand-active`,
				{
					headers: { token },
				}
			);

			dispatch({
				type: GET_LIST_BRAND_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			dispatch({
				type: GET_LIST_BRAND_FAILED,
				payload: error.message,
			});
		}
	};
};