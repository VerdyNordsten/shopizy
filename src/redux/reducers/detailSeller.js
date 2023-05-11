/* eslint-disable indent */
import {
	GET_DETAIL_SELLER_PENDING,
	GET_DETAIL_SELLER_SUCCESS,
	GET_DETAIL_SELLER_FAILED,
} from "../action/typesDetailUser";

const initialState = {
	isLoading: false,
	isError: false,
	data: [],
	error: null,
};

const detailSellerReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_DETAIL_SELLER_PENDING:
			return {
				...state,
				isLoading: true,
				isError: false,
				data: [],
				error: null,
			};
		case GET_DETAIL_SELLER_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload.data,
				error: null,
			};
		case GET_DETAIL_SELLER_FAILED:
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

export default detailSellerReducer;
