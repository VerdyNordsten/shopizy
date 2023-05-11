import {
	GET_MY_CART_PENDING,
	GET_MY_CART_SUCCESS,
	GET_MY_CART_FAILED
} from "../action/types";

const initialState = {
	isLoading: false,
	isError: false,
	data: [],
	error: null,
};

const myCartReducers = (state = initialState, action) => {
	switch (action.type) {
	case GET_MY_CART_PENDING:
		return { ...state, isLoading: true, isError: false, data: [], error: null };
	case GET_MY_CART_SUCCESS:
		return {
			...state,
			isLoading: false,
			isError: false,
			data: action.payload.data,
			error: null
		};
	case GET_MY_CART_FAILED:
		return {
			...state,
			isLoading: false,
			isError: true,
			data: [],
			error: action.payload.message,
		};
	default:
		return state;
	}
};

export default myCartReducers;
