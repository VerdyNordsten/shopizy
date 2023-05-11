import axios from "axios";

export const registerBuyer = (form) => {
	return new Promise((resolve, reject) => {
		axios
		// eslint-disable-next-line no-undef
			.post(`${process.env.REACT_APP_API_URL}/auth/register/buyer`, form)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
export const registerSeller = (form) => {
	return new Promise((resolve, reject) => {
		axios
		// eslint-disable-next-line no-undef
			.post(`${process.env.REACT_APP_API_URL}/auth/register/seller`, form)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
export const login = (form) => {
	return new Promise((resolve, reject) => {
		axios
		// eslint-disable-next-line no-undef
			.post(`${process.env.REACT_APP_API_URL}/auth/login`, form)
			.then((res) => {
				// local storage set token
				localStorage.setItem("token", res.data.token.jwt);
				// local storage set user id
				localStorage.setItem("userId", res.data.token.id);
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const forgotPassword = (form) => {
	return new Promise((resolve, reject) => {
		axios
		// eslint-disable-next-line no-undef
			.post(`${process.env.REACT_APP_API_URL}/auth/forgot`, form)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const resetPassword = (token, form) => {
	return new Promise((resolve, reject) => {
		axios
		// eslint-disable-next-line no-undef
			.post(`${process.env.REACT_APP_API_URL}/auth/reset/${token}`, form)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
