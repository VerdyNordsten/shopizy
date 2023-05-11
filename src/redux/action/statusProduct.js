/* eslint-disable no-undef */
import axios from "axios";

export const changedStatusProduct = (idProduct) => {
	const token = localStorage.getItem("token");
	return new Promise((resolve, reject) => {
		axios
			.put(
				`${process.env.REACT_APP_API_URL}/product/${idProduct}/disable`,
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
