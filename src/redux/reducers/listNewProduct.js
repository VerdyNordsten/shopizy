import {
	GET_LIST_NEW_PRODUCT_PENDING,
	GET_LIST_NEW_PRODUCT_SUCCESS,
	GET_LIST_NEW_PRODUCT_FAILED,
} from "../action/types";

const initialState = {
	isLoading: false,
	isError: false,
	data: [],
	error: null,
};

const listNewProductReducer = (state = initialState, action) => {
	switch (action.type) {
	case GET_LIST_NEW_PRODUCT_PENDING:
		return { ...state, isLoading: true };
	case GET_LIST_NEW_PRODUCT_SUCCESS:
		return {
			...state,
			isLoading: false,
			isError: false,
			data: action.payload.data,
		};
	case GET_LIST_NEW_PRODUCT_FAILED:
		return {
			...state,
			isLoading: false,
			isError: true,
			error: action.payload,
		};
	default:
		return state;
	}
};

export default listNewProductReducer;
