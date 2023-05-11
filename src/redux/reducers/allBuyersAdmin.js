import {
	GET_ALL_BUYERS_ADMIN_PENDING,
	GET_ALL_BUYERS_ADMIN_SUCCESS,
	GET_ALL_BUYERS_ADMIN_FAILED
} from "../action/types";

const initialState = {
	isLoading: false,
	isError: false,
	data: [],
	error: null,
};

const allBuyersAdmin = (state = initialState, action) => {
	switch (action.type) {
	case GET_ALL_BUYERS_ADMIN_PENDING:
		return { ...state, isLoading: true, isError: false, data: [], error: null };
	case GET_ALL_BUYERS_ADMIN_SUCCESS:
		return {
			...state,
			isLoading: false,
			isError: false,
			data: action.payload.data,
			error: null
		};
	case GET_ALL_BUYERS_ADMIN_FAILED:
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

export default allBuyersAdmin;
