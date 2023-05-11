/* eslint-disable no-undef */
/* eslint-disable indent */
import axios from "axios";
import {
  GET_ALL_BUYERS_ADMIN_PENDING,
  GET_ALL_BUYERS_ADMIN_SUCCESS,
  GET_ALL_BUYERS_ADMIN_FAILED,
  GET_ALL_SELLERS_ADMIN_PENDING,
  GET_ALL_SELLERS_ADMIN_SUCCESS,
  GET_ALL_SELLERS_ADMIN_FAILED,
  GET_DETAIL_USER_PENDING,
  GET_DETAIL_USER_SUCCESS,
  GET_DETAIL_USER_FAILED,
  GET_LIST_USER_CHAT_PENDING,
  GET_LIST_USER_CHAT_SUCCESS,
  GET_LIST_USER_CHAT_FAILED,
  GET_DETAIL_RECEIVER_PENDING,
  GET_DETAIL_RECEIVER_SUCCESS,
  GET_DETAIL_RECEIVER_FAILED,
} from "./types";

export const getDetailUser = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_DETAIL_USER_PENDING,
        payload: null,
      });
      const id = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${id}`,
        {
          headers: { token },
        }
      );

      dispatch({
        type: GET_DETAIL_USER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DETAIL_USER_FAILED,
        payload: error.message,
      });
    }
  };
};

export const getDetailReceiver = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_DETAIL_RECEIVER_PENDING,
        payload: null,
      });
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${id}`,
        {
          headers: { token },
        }
      );

      dispatch({
        type: GET_DETAIL_RECEIVER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DETAIL_RECEIVER_FAILED,
        payload: error.message,
      });
    }
  };
};

export const updateUserBuyer = async (formData) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");

    axios
      .put(`${process.env.REACT_APP_API_URL}/user/${id}/buyer`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getAllBuyers = () => {
	return async (dispatch) => {
		try {
			dispatch({
				type: GET_ALL_BUYERS_ADMIN_PENDING,
				payload: null,
      });
      const token = localStorage.getItem("token");
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/buyer?limit=999`, {
				headers: {
					token
				}
			});
			dispatch({
				type: GET_ALL_BUYERS_ADMIN_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			if (error.response) {
				error.message = error.response.data.message;
			}
			dispatch({
				type: GET_ALL_BUYERS_ADMIN_FAILED,
				payload: error.message,
			});
		}
	};
};

export const getAllSellers = () => {
	return async (dispatch) => {
		try {
			dispatch({
				type: GET_ALL_SELLERS_ADMIN_PENDING,
				payload: null,
      });
      const token = localStorage.getItem("token");
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/seller?limit=999`, {
				headers: {
					token
				}
			});
			dispatch({
				type: GET_ALL_SELLERS_ADMIN_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			if (error.response) {
				error.message = error.response.data.message;
			}
			dispatch({
				type: GET_ALL_SELLERS_ADMIN_FAILED,
				payload: error.message,
			});
		}
	};
};
export const getListUserChat = (level) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");

      dispatch({
        type: GET_LIST_USER_CHAT_PENDING,
        payload: null,
      });

      let res = null;

      if (level === 2) {
        res = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/chat/seller`,
          {
            headers: { token },
          }
        );
      } else {
        res = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/chat/buyer`,
          {
            headers: { token },
          }
        );
      }

      dispatch({
        type: GET_LIST_USER_CHAT_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
      if (error.response) {
        error.message = error.response.data.error;
      }

      dispatch({
        type: GET_LIST_USER_CHAT_FAILED,
        payload: error.message,
      });
    }
  };
};
