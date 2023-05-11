import axios from "axios";

export const cancelStatusTransaction = (idOrder) => {
	const token = localStorage.getItem("token");
	return new Promise((resolve, reject) => {
		axios
			.put(
				`${process.env.REACT_APP_API_URL}/transaction/${idOrder}/cancel`,
				null,
				{
					headers: {
						token,
					},
				}
			)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
export const completedStatusTransaction = (idOrder) => {
	const token = localStorage.getItem("token");
	return new Promise((resolve, reject) => {
		axios
			.put(
				`${process.env.REACT_APP_API_URL}/transaction/${idOrder}/completed`,
				null,
				{
					headers: {
						token,
					},
				}
			)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
