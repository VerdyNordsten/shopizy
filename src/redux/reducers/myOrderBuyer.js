/* eslint-disable indent */
import {
	GET_MY_ORDER_PENDING,
	GET_MY_ORDER_SUCCESS,
	GET_MY_ORDER_FAILED,
} from "../action/typesMyOrderBuyer";

const initialState = {
	isLoading: false,
	isError: false,
	data: [],
	error: null,
};

const myOrderBuyerReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_MY_ORDER_PENDING:
			return {
				...state,
				isLoading: true,
				isError: false,
				data: [],
				error: null,
			};
		case GET_MY_ORDER_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload.data,
				error: null,
			};
		case GET_MY_ORDER_FAILED:
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

export default myOrderBuyerReducer;
