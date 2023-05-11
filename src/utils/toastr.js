import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const toastr = (message, type = "error") => {
	const config = {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
	};

	if (type === "error") {
		toast.error(message, config);
	}

	if (type === "success") {
		toast.success(message, config);
	}
};
