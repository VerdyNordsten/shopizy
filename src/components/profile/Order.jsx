/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Nav, NavItem, NavLink, TabPane, TabContent } from "reactstrap";

export default function Order(props) {
	const [activeTab, setActiveTab] = useState("1");
	const idr = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	});
	const order = props.data;
	useEffect(() => {
		console.log(order);
	}, []);
	return (
		<div className="content" hidden={props.hidden ? "" : "hidden"}>
			<div className="order">
				<h2>My Order</h2>
				<Nav tabs>
					<NavItem>
						<NavLink
							style={
								activeTab == "1"
									? {
											alignItems: "center",
											height: "40px",
											fontSize: "16px",
											fontWeight: "500",
											color: "#DB3022",
											border: "none",
											borderBottom: "3px solid #DB3022",
											width: "100px",
											textAlign: "center",
									  }
									: {
											alignItems: "center",
											height: "40px",
											fontSize: "16px",
											fontWeight: "500",
											color: "#9B9B9B",
											border: "none",
											width: "100px",
											textAlign: "center",
									  }
							}
							onClick={() => setActiveTab("1")}
						>
							New
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							style={
								activeTab == "2"
									? {
											alignItems: "center",
											height: "40px",
											fontSize: "16px",
											fontWeight: "500",
											color: "#DB3022",
											border: "none",
											borderBottom: "3px solid #DB3022",
											width: "100px",
											textAlign: "center",
									  }
									: {
											alignItems: "center",
											height: "40px",
											fontSize: "16px",
											fontWeight: "500",
											color: "#9B9B9B",
											border: "none",
											width: "100px",
											textAlign: "center",
									  }
							}
							onClick={() => setActiveTab("2")}
						>
							Packed
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							style={
								activeTab == "3"
									? {
											alignItems: "center",
											height: "40px",
											fontSize: "16px",
											fontWeight: "500",
											color: "#DB3022",
											border: "none",
											borderBottom: "3px solid #DB3022",
											width: "100px",
											textAlign: "center",
									  }
									: {
											alignItems: "center",
											height: "40px",
											fontSize: "16px",
											fontWeight: "500",
											color: "#9B9B9B",
											border: "none",
											width: "100px",
											textAlign: "center",
									  }
							}
							onClick={() => setActiveTab("3")}
						>
							Sent
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							style={
								activeTab == "4"
									? {
											alignItems: "center",
											height: "40px",
											fontSize: "16px",
											fontWeight: "500",
											color: "#DB3022",
											border: "none",
											borderBottom: "3px solid #DB3022",
											width: "100px",
											textAlign: "center",
									  }
									: {
											alignItems: "center",
											height: "40px",
											fontSize: "16px",
											fontWeight: "500",
											color: "#9B9B9B",
											border: "none",
											width: "100px",
											textAlign: "center",
									  }
							}
							onClick={() => setActiveTab("4")}
						>
							Completed
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							style={
								activeTab == "5"
									? {
											alignItems: "center",
											height: "40px",
											fontSize: "16px",
											fontWeight: "500",
											color: "#DB3022",
											border: "none",
											borderBottom: "3px solid #DB3022",
											width: "130px",
											textAlign: "center",
									  }
									: {
											alignItems: "center",
											height: "40px",
											fontSize: "16px",
											fontWeight: "500",
											color: "#9B9B9B",
											border: "none",
											width: "130px",
											textAlign: "center",
									  }
							}
							onClick={() => setActiveTab("5")}
						>
							Cancel Order
						</NavLink>
					</NavItem>
				</Nav>
				<hr
					style={{
						border: "1px solid #9B9B9B",
						height: "1px",
						backgroundColor: "#9B9B9B",
						width: "100%",
						marginTop: "0px",
					}}
				/>
				<TabContent activeTab={activeTab}>
					<TabPane tabId="1" style={{ minHeight: "400px" }}>
						<table
							style={{
								borderCollapse: "collapse",
								width: "100%",
							}}
							className="table-order"
						>
							<tr style={{ backgroundColor: "#e5e5e5", color: "#9B9B9B" }}>
								<th style={{ width: "300px" }}>Invoice</th>
								<th style={{ width: "100px" }}>Status</th>
								<th style={{ width: "100px" }}>Payment</th>
								<th style={{ width: "150px" }}>Total Price:</th>
								<th style={{ width: "300px" }}>Created at</th>
								<th style={{ width: "100px" }}>Action</th>
							</tr>
							{/*new*/}
							{order
								? order?.data?.data?.map((item, i) =>
										item.status == 1 ? (
											<tr key={i}>
												<td>{item.invoice}</td>
												<td>New</td>
												<td>{item.payment_method}</td>
												<td>{idr.format(item.total)}</td>
												<td>{moment(item.date).format("DD MMMM YYYY")}</td>
												<td>
													<button
														style={{
															border: "1px solid #e5e5e5",
															borderRadius: "10px",
															backgroundColor: "#FFFFFF",
															color: "#9B9B9B",
															width: "100%",
															padding: "5px 10px",
														}}
														onClick={() => {
															props.setOrder(item.id);
														}}
													>
														view
													</button>
												</td>
											</tr>
										) : null
								  )
								: null}
						</table>
					</TabPane>
					<TabPane tabId="2" style={{ minHeight: "400px" }}>
						<table
							style={{
								borderCollapse: "collapse",
								width: "100%",
							}}
							className="table-order"
						>
							<tr style={{ backgroundColor: "#e5e5e5", color: "#9B9B9B" }}>
								<th style={{ width: "300px" }}>Invoice</th>
								<th style={{ width: "100px" }}>Status</th>
								<th style={{ width: "100px" }}>Payment</th>
								<th style={{ width: "150px" }}>Total Price:</th>
								<th style={{ width: "300px" }}>Created at</th>
								<th style={{ width: "100px" }}>Action</th>
							</tr>
							{/*packed*/}
							{order
								? order?.data?.data?.map((item, i) =>
										item.status == 2 ? (
											<tr key={i}>
												<td>{item.invoice}</td>
												<td>Packed</td>
												<td>{item.payment_method}</td>
												<td>{idr.format(item.total)}</td>
												<td>{moment(item.date).format("DD MMMM YYYY")}</td>
												<td>
													<button
														style={{
															border: "1px solid #e5e5e5",
															borderRadius: "10px",
															backgroundColor: "#FFFFFF",
															color: "#9B9B9B",
															width: "100%",
															padding: "5px 10px",
														}}
														onClick={() => {
															props.setOrder(item.id);
														}}
													>
														view
													</button>
												</td>
											</tr>
										) : null
								  )
								: null}
						</table>
					</TabPane>
					<TabPane tabId="3" style={{ minHeight: "400px" }}>
						<table
							style={{
								borderCollapse: "collapse",
								width: "100%",
							}}
							className="table-order"
						>
							<tr style={{ backgroundColor: "#e5e5e5", color: "#9B9B9B" }}>
								<th style={{ width: "300px" }}>Invoice</th>
								<th style={{ width: "100px" }}>Status</th>
								<th style={{ width: "100px" }}>Payment</th>
								<th style={{ width: "150px" }}>Total Price:</th>
								<th style={{ width: "300px" }}>Created at</th>
								<th style={{ width: "100px" }}>Action</th>
							</tr>
							{/*sent*/}
							{order
								? order?.data?.data?.map((item, i) =>
										item.status == 3 ? (
											<tr key={i}>
												<td>{item.invoice}</td>
												<td>Sent</td>
												<td>{item.payment_method}</td>
												<td>{idr.format(item.total)}</td>
												<td>{moment(item.date).format("DD MMMM YYYY")}</td>
												<td>
													<button
														style={{
															border: "1px solid #e5e5e5",
															borderRadius: "10px",
															backgroundColor: "#FFFFFF",
															color: "#9B9B9B",
															width: "100%",
															padding: "5px 10px",
														}}
														onClick={() => {
															props.setOrder(item.id);
														}}
													>
														view
													</button>
												</td>
											</tr>
										) : null
								  )
								: null}
						</table>
					</TabPane>
					<TabPane tabId="4" style={{ minHeight: "400px" }}>
						<table
							style={{
								borderCollapse: "collapse",
								width: "100%",
							}}
							className="table-order"
						>
							<tr style={{ backgroundColor: "#e5e5e5", color: "#9B9B9B" }}>
								<th style={{ width: "300px" }}>Invoice</th>
								<th style={{ width: "100px" }}>Status</th>
								<th style={{ width: "100px" }}>Payment</th>
								<th style={{ width: "150px" }}>Total Price:</th>
								<th style={{ width: "300px" }}>Created at</th>
								<th style={{ width: "100px" }}>Action</th>
							</tr>
							{/*completed*/}
							{order
								? order?.data?.data?.map((item, i) =>
										item.status == 4 ? (
											<tr key={i}>
												<td>{item.invoice}</td>
												<td>Completed</td>
												<td>{item.payment_method}</td>
												<td>{idr.format(item.total)}</td>
												<td>{moment(item.date).format("DD MMMM YYYY")}</td>
												<td>
													<button
														style={{
															border: "1px solid #e5e5e5",
															borderRadius: "10px",
															backgroundColor: "#FFFFFF",
															color: "#9B9B9B",
															width: "100%",
															padding: "5px 10px",
														}}
														onClick={() => {
															props.setOrder(item.id);
														}}
													>
														view
													</button>
												</td>
											</tr>
										) : null
								  )
								: null}
						</table>
					</TabPane>
					<TabPane tabId="5" style={{ minHeight: "400px" }}>
						<table
							style={{
								borderCollapse: "collapse",
								width: "100%",
							}}
							className="table-order"
						>
							<tr style={{ backgroundColor: "#e5e5e5", color: "#9B9B9B" }}>
								<th style={{ width: "300px" }}>Invoice</th>
								<th style={{ width: "100px" }}>Status</th>
								<th style={{ width: "100px" }}>Payment</th>
								<th style={{ width: "150px" }}>Total Price:</th>
								<th style={{ width: "300px" }}>Created at</th>
								<th style={{ width: "100px" }}>Action</th>
							</tr>
							{/*cancelled*/}
							{order
								? order?.data?.data?.map((item, i) =>
										item.status == 0 ? (
											<tr key={i}>
												<td>{item.invoice}</td>
												<td>Cancelled</td>
												<td>{item.payment_method}</td>
												<td>{idr.format(item.total)}</td>
												<td>{moment(item.date).format("DD MMMM YYYY")}</td>
												<td>
													<button
														style={{
															border: "1px solid #e5e5e5",
															borderRadius: "10px",
															backgroundColor: "#FFFFFF",
															color: "#9B9B9B",
															width: "100%",
															padding: "5px 10px",
														}}
														onClick={() => {
															props.setOrder(item.id);
														}}
													>
														view
													</button>
												</td>
											</tr>
										) : null
								  )
								: null}
						</table>
					</TabPane>
				</TabContent>
			</div>
		</div>
	);
}
