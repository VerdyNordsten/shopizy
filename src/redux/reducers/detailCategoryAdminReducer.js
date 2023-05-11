import {
	GET_DETAIL_CATEGORIES_ADMIN_PENDING,
	GET_DETAIL_CATEGORIES_ADMIN_SUCCESS,
	GET_DETAIL_CATEGORIES_ADMIN_FAILED
} from "../action/types";

const initialState = {
	isLoading: false,
	isError: false,
	data: {},
	error: null,
};

const detailCategoriesAdmin = (state = initialState, action) => {
	switch (action.type) {
	case GET_DETAIL_CATEGORIES_ADMIN_PENDING:
		return { ...state, isLoading: true, isError: false, data: [], error: null };
	case GET_DETAIL_CATEGORIES_ADMIN_SUCCESS:
		return {
			...state,
			isLoading: false,
			isError: false,
			data: action.payload.data,
			error: null
		};
	case GET_DETAIL_CATEGORIES_ADMIN_FAILED:
		return {
			...state,
			isLoading: false,
			isError: true,
			data: [],
			error: action.payload,
		};
	default:
		return state;
	}
};

export default detailCategoriesAdmin;
