import axios from "axios";

import {
	GET_DETAIL_SELLER_PENDING,
	GET_DETAIL_SELLER_SUCCESS,
	GET_DETAIL_SELLER_FAILED,
} from "./typesDetailUser";

export const getDetailSeller = () => {
	return async (dispatch) => {
		const token = localStorage.getItem("token");
		const id = localStorage.getItem("userId");
		try {
			dispatch({
				type: GET_DETAIL_SELLER_PENDING,
				payload: null,
			});

			const res = await axios({
				// eslint-disable-next-line no-undef
				url: `${process.env.REACT_APP_API_URL}/user/${id}`,
				method: "GET",
				headers: { token },
			});

			dispatch({
				type: GET_DETAIL_SELLER_SUCCESS,
				payload: res,
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: GET_DETAIL_SELLER_FAILED,
				payload: error.message,
			});
		}
	};
};
