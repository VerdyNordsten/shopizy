import {
	GET_ALL_TRANSACTION_ADMIN_PENDING,
	GET_ALL_TRANSACTION_ADMIN_SUCCESS,
	GET_ALL_TRANSACTION_ADMIN_FAILED
} from "../action/types";

const initialState = {
	isLoading: false,
	isError: false,
	data: [],
	pagination: [],
	error: null,
};

const allTransactionAdmin = (state = initialState, action) => {
	switch (action.type) {
	case GET_ALL_TRANSACTION_ADMIN_PENDING:
		return { ...state, isLoading: true, isError: false, data: [], pagination: [], error: null };
	case GET_ALL_TRANSACTION_ADMIN_SUCCESS:
		return {
			...state,
			isLoading: false,
			isError: false,
			data: action.payload.data,
			pagination: action.payload.pagination,
			error: null
		};
	case GET_ALL_TRANSACTION_ADMIN_FAILED:
		return {
			...state,
			isLoading: false,
			isError: true,
			data: [],
			pagination: [],
			error: action.payload,
		};
	default:
		return state;
	}
};

export default allTransactionAdmin;
