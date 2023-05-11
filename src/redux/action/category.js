import axios from "axios";
import {
	GET_LIST_CATEGORY_PENDING,
	GET_LIST_CATEGORY_SUCCESS,
	GET_LIST_CATEGORY_FAILED,
} from "./types";

export const getListCategory = () => {
	return async (dispatch) => {
		try {
			dispatch({
				type: GET_LIST_CATEGORY_PENDING,
				payload: null,
			});

			const res = await axios.get(`${process.env.REACT_APP_API_URL}/category-active`);

			dispatch({
				type: GET_LIST_CATEGORY_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			console.log(error.message);
			if (error.response) {
				error.message = error.response.data.error;
			}

			dispatch({
				type: GET_LIST_CATEGORY_FAILED,
				payload: error.message,
			});
		}
	};
};
