import axios from "axios";

export const packedStatusTransaction = (idOrder) => {
	const token = localStorage.getItem("token");
	return new Promise((resolve, reject) => {
		axios
			.put(
				`${process.env.REACT_APP_API_URL}/transaction/${idOrder}/packed`,
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
export const sentStatusTransaction = (idOrder) => {
	const token = localStorage.getItem("token");
	return new Promise((resolve, reject) => {
		axios
			.put(
				`${process.env.REACT_APP_API_URL}/transaction/${idOrder}/sent`,
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
