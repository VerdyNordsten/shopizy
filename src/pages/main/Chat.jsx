import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar";

import Style from "../../assets/styles/Chat.module.css";
import {
	getDetailReceiver,
	getDetailUser,
	getListUserChat,
} from "../../redux/action/users";

export default function Chat() {
	const dispatch = useDispatch();
	const token = localStorage.getItem("token");
	const { listUserChat, detailUser, detailReceiver } = useSelector(
		(state) => state
	);
	const [chatWindow, setChatWindow] = useState(false);

	const [socketio, setSocketio] = useState(null);
	const [message, setMessage] = useState("");
	const [listChat, setListChat] = useState([]);
	const [activeReceiver, setActiveReceiver] = useState("");

	useEffect(() => {
		document.title = "SHOPIZY - Chat Page";

		const decoded = jwt_decode(localStorage.getItem("token"));
		dispatch(getListUserChat(decoded.level));
		dispatch(getDetailUser());
	}, []);

	useEffect(() => {
		const socket = io(process.env.REACT_APP_API_URL);
		socket.on("send-message-response", (response) => {
			const receiver = localStorage.getItem("receiver");

			if (response.length) {
				if (
					receiver === response[0].sender_id ||
          receiver === response[0].receiver_id
				) {
					setListChat(response);

					setTimeout(() => {
						const elem = document.getElementById("chatMenuMessage");
						elem.scrollTop = elem.scrollHeight;
					}, 500);
				}
			}
		});
		setSocketio(socket);
	}, []);

	const selectReceiver = (receiverId) => {
		setListChat([]);
		dispatch(getDetailReceiver(receiverId));
		setActiveReceiver(receiverId);
		localStorage.setItem("receiver", receiverId);
		socketio.emit("join-room", localStorage.getItem("userId"));
		socketio.emit("chat-history", {
			sender: localStorage.getItem("userId"),
			receiver: receiverId,
		});
	};

	const onSendMessage = (e) => {
		e.preventDefault();

		const data = {
			sender_id: localStorage.getItem("userId"),
			receiver_id: activeReceiver,
			date: new Date(),
			message,
		};
		socketio.emit("send-message", data);

		const payload = {
			sender_id: localStorage.getItem("userId"),
			receiver_id: activeReceiver,
			photo: detailUser.data.photo,
			date: new Date(),
			message,
			id: new Date(),
		};
		setListChat([...listChat, payload]);

		setMessage("");

		setTimeout(() => {
			const elem = document.getElementById("chatMenuMessage");
			elem.scrollTop = elem.scrollHeight;
		}, 100);
	};

	const onDeleteMessage = (chat) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				const data = {
					sender: chat.sender_id,
					receiver: chat.receiver_id,
					idmessage: chat.id,
				};
				socketio.emit("delete-message", data);
			}
		});
	};

	return (
		<>
			<div
				className="d-flex flex-column container-fluid align-items-center mb-4"
				style={{ padding: "0px", height: "100vh" }}
			>
				<Navbar login={token} />
				<div className="d-flex flex-column mb-5 h-100" style={{ width: "80%" }}>
					<div className="row h-100">
						<div className="col-4 h-100">
							<div
								className="d-flex flex-column h-100"
								style={{
									width: "95%",
									border: "1px solid #8E8E93",
									borderRadius: "5px",
								}}
							>
								<div
									className="d-flex w-100"
									style={{
										padding: "20px",
										borderRadius: "5px 5px 0px 0px",
										borderBottom: "1px solid #8E8E93",
									}}
								>
									<h6 style={{ margin: "0px" }}>Chat</h6>
								</div>
								{listUserChat.data.length ? (
									<div
										className="d-flex flex-column h-100 w-100"
										style={{ padding: "20px" }}
										onClick={() => {
											setChatWindow(true);
										}}
									>
										{listUserChat.data.map((user) => {
											if (user.already_chat) {
												return (
													<div
														onClick={() => selectReceiver(user.id)}
														key={user.id}
														className="d-flex align-items-center w-100 mb-4 pointer"
													>
														<div
															style={{
																width: "40px",
																height: "40px",
																marginRight: "20px",
																borderRadius: "50%",
																backgroundPosition: "center",
																backgroundSize: "cover",
																backgroundRepeat: "no-repeat",
																backgroundImage: `url(${
																	user.photo
																		? `https://drive.google.com/uc?export=view&id=${user.photo}`
																		: "https://images227.netlify.app/mernuas/default.jpg"
																})`,
															}}
														/>

														<div
															className="d-flex flex-column"
															style={{ width: "80%" }}
														>
															<h6
																style={{
																	marginTop: "auto",
																	marginBottom: "0px",
																}}
															>
																{user.level === 2 ? user.store_name : user.name}
															</h6>
															<p
																style={{
																	marginBottom: "auto",
																	color: "#9B9B9B",
																}}
															>
                                Permisi kak, mau tanya...
															</p>
														</div>
													</div>
												);
											}
										})}
									</div>
								) : (
									<div
										className="d-flex flex-column justify-content-center align-items-center h-100 w-100"
										style={{ padding: "20px" }}
									>
										<h6>No chat history yet</h6>
									</div>
								)}
							</div>
						</div>
						<div className="col-8 h-100">
							<div
								className="d-flex flex-column w-100 h-100"
								style={{ border: "1px solid #8E8E93", borderRadius: "5px" }}
							>
								{chatWindow ? (
									<>
										<div
											className="d-flex w-100 align-items-center"
											style={{
												padding: "10px 20px",
												borderRadius: "5px 5px 0px 0px",
												borderBottom: "1px solid #8E8E93",
											}}
										>
											{detailReceiver.isLoading ? (
												<div className="spinner-border" role="status">
													<span className="visually-hidden">Loading...</span>
												</div>
											) : (
												<>
													<div
														style={{
															width: "40px",
															height: "40px",
															marginRight: "15px",
															borderRadius: "50%",
															backgroundPosition: "center",
															backgroundSize: "cover",
															backgroundRepeat: "no-repeat",
															backgroundImage: `url(${
																detailReceiver.data.photo
																	? `https://drive.google.com/uc?export=view&id=${detailReceiver.data.photo}`
																	: "https://images227.netlify.app/mernuas/default.jpg"
															})`,
														}}
													/>
													<h6
														style={{ marginTop: "auto", marginBottom: "auto" }}
													>
														{detailReceiver.data.level === 2
															? `${detailReceiver.data.store_name} | ${detailReceiver.data.name}`
															: `${detailReceiver.data.name}`}
													</h6>
												</>
											)}
										</div>
									</>
								) : (
									<>
										<div
											className="d-flex w-100 align-items-center"
											style={{
												padding: "29px",
												borderRadius: "5px 5px 0px 0px",
												borderBottom: "1px solid #8E8E93",
											}}
										/>
									</>
								)}
								<div
									className="d-flex flex-column w-100 align-items-center"
									id="chatMenuMessage"
									style={{ padding: "20px", height: "65vh", overflow: "auto" }}
								>
									{chatWindow ? (
										<>
											{listChat.map((chat) => (
												<Fragment key={chat.id}>
													{chat.sender_id === localStorage.getItem("userId") ? (
														<>
															{/* sender message */}
															<div className="d-flex flex-column w-100">
																<div className="d-flex w-100 justify-content-end align-items-center">
																	<p
																		style={{
																			backgroundColor: "#32C33B",
																			marginRight: "15px",
																			color: "#FFF",
																			padding: "15px",
																			borderRadius: "35px 35px 10px 35px",
																			maxWidth: "50%",
																		}}
																	>
																		{chat.message}
																	</p>
																	<div
																		style={{
																			width: "40px",
																			height: "40px",
																			borderRadius: "50%",
																			backgroundPosition: "center",
																			backgroundSize: "cover",
																			backgroundRepeat: "no-repeat",
																			backgroundImage: `url(${
																				detailUser.data.photo
																					? `https://drive.google.com/uc?export=view&id=${detailUser.data.photo}`
																					: "https://images227.netlify.app/mernuas/default.jpg"
																			})`,
																		}}
																	/>
																</div>
															</div>
															<div
																className="d-flex justify-content-end w-100"
																style={{ marginTop: "-12px" }}
															>
																{/* <span className="text-primary pointer mb-2 me-2">
                                  Edit
																</span> */}
																<span onClick={() => onDeleteMessage(chat)} className="text-danger pointer mb-2" style={{marginRight: "60px"}}>
                                  Delete
																</span>
															</div>
														</>
													) : (
														<>
															{/* receiver message */}
															<div className="d-flex flex-column w-100">
																<div className="d-flex w-100 justify-content-start align-items-center">
																	<div
																		style={{
																			width: "40px",
																			height: "40px",
																			marginRight: "15px",
																			borderRadius: "50%",
																			backgroundPosition: "center",
																			backgroundSize: "cover",
																			backgroundRepeat: "no-repeat",
																			backgroundImage: `url(${
																				detailReceiver.data.photo
																					? `https://drive.google.com/uc?export=view&id=${detailReceiver.data.photo}`
																					: "https://images227.netlify.app/mernuas/default.jpg"
																			})`,
																		}}
																	/>
																	<p
																		style={{
																			backgroundColor: "#32C33B",
																			color: "#FFF",
																			padding: "15px",
																			borderRadius: "35px 35px 35px 10px",
																			maxWidth: "50%",
																		}}
																	>
																		{chat.message}
																	</p>
																</div>
															</div>
														</>
													)}
												</Fragment>
											))}
										</>
									) : (
										<>
											<div className="d-flex justify-content-center align-items-center w-100 h-100">
												<p>No Chat Selected</p>
											</div>
										</>
									)}
								</div>
								{chatWindow ? (
									<>
										<form
											style={{ width: "100%", padding: "20px " }}
											onSubmit={onSendMessage}
										>
											<input
												type="text"
												className={Style.inputChat}
												placeholder="Type message..."
												value={message}
												onChange={(e) => setMessage(e.target.value)}
											/>
											<input type="submit" style={{ display: "none" }} />
										</form>
									</>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
