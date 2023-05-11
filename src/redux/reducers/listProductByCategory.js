import {
	GET_LIST_PRODUCT_BY_CATEGORY_PENDING,
	GET_LIST_PRODUCT_BY_CATEGORY_SUCCESS,
	GET_LIST_PRODUCT_BY_CATEGORY_FAILED,
} from "../action/types";

const initialState = {
	isLoading: false,
	isError: false,
	data: [],
	error: null,
	pagination: [],
};

const listProductByCategoryReducer = (state = initialState, action) => {
	switch (action.type) {
	case GET_LIST_PRODUCT_BY_CATEGORY_PENDING:
		return { ...state, isLoading: true };
	case GET_LIST_PRODUCT_BY_CATEGORY_SUCCESS:
		return {
			...state,
			isLoading: false,
			isError: false,
			data: action.payload.data,
			pagination: action.payload.pagination,
		};
	case GET_LIST_PRODUCT_BY_CATEGORY_FAILED:
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

export default listProductByCategoryReducer;
