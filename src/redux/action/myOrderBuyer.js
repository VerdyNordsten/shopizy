import axios from "axios";

import {
	GET_MY_ORDER_PENDING,
	GET_MY_ORDER_SUCCESS,
	GET_MY_ORDER_FAILED,
} from "./typesMyOrderBuyer";

export const getMyOrderBuyer = () => {
	return async (dispatch) => {
		const token = localStorage.getItem("token");
		try {
			dispatch({
				type: GET_MY_ORDER_PENDING,
				payload: null,
			});

			const res = await axios({
				// eslint-disable-next-line no-undef
				url: `${process.env.REACT_APP_API_URL}/transaction?limit=999`,
				method: "GET",
				headers: { token },
			});

			dispatch({
				type: GET_MY_ORDER_SUCCESS,
				payload: res,
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: GET_MY_ORDER_FAILED,
				payload: error.message,
			});
		}
	};
};
