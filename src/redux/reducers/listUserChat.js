import {
	GET_LIST_USER_CHAT_PENDING,
	GET_LIST_USER_CHAT_SUCCESS,
	GET_LIST_USER_CHAT_FAILED,
} from "../action/types";

const initialState = {
	isLoading: false,
	isError: false,
	data: [],
	error: null,
};

const listUserChatReducer = (state = initialState, action) => {
	switch (action.type) {
	case GET_LIST_USER_CHAT_PENDING:
		return { ...state, isLoading: true };
	case GET_LIST_USER_CHAT_SUCCESS:
		return {
			...state,
			isLoading: false,
			isError: false,
			data: action.payload.data,
		};
	case GET_LIST_USER_CHAT_FAILED:
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

export default listUserChatReducer;
