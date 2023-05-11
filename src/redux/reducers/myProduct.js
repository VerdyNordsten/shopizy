/* eslint-disable indent */
import {
	GET_MY_PRODUCT_PENDING,
	GET_MY_PRODUCT_SUCCESS,
	GET_MY_PRODUCT_FAILED,
} from "../action/typesMyproduct";

const initialState = {
	isLoading: false,
	isError: false,
	data: [],
	error: null,
};

const myProductReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_MY_PRODUCT_PENDING:
			return {
				...state,
				isLoading: true,
				isError: false,
				data: [],
				error: null,
			};
		case GET_MY_PRODUCT_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload.data,
				error: null,
			};
		case GET_MY_PRODUCT_FAILED:
			return {
				...state,
				isLoading: false,
				isError: true,
				error: action.payload,
				data: [],
			};
		default:
			return state;
	}
};

export default myProductReducer;
