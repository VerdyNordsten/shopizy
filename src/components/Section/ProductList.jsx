import React from "react";
import { Link } from "react-router-dom";
import starIcon from "../../assets/images/star.svg";

export default function ProductList({ listProduct = [] }) {
	return (
		<div className="row" style={{ marginLeft: "2px" }}>
			{listProduct.map((product) => (
				<div
					key={product.id}
					className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-4"
				>
					<Link to={`/product/${product.id}`}>
						<div
							className="d-flex flex-column"
							style={{
								boxShadow: "0px 0px 14px rgba(173, 173, 173, 0.25)",
								borderRadius: "10px",
								padding: "0px",
								width: "90%",
							}}
						>
							<div
								style={{
									width: "100%",
									height: "140px",
									backgroundSize: "cover",
									backgroundPosition: "center",
									backgroundRepeat: "no-repeat",
									backgroundImage: `url(${
										product.product_images.length
											? `https://drive.google.com/uc?export=view&id=${product.product_images[0].photo}`
											: "/category.webp"
									})`,
									borderRadius: "10px 10px 0px 0px",
								}}
							/>
							<div
								className="d-flex flex-column w-100"
								style={{ padding: "15px" }}
							>
								<h6 style={{ width: "70%", lineHeight: "24px" }}>
									{product.product_name}
								</h6>
								<h5
									style={{ width: "70%", lineHeight: "16px", color: "#DB3022" }}
								>
									{new Intl.NumberFormat("id-ID", {
										style: "currency",
										currency: "IDR",
										minimumFractionDigits: 0,
									}).format(product.price)}
								</h5>
								<small style={{ color: "#9B9B9B" }}>
									{product.store_name || "Toko Saya"}
								</small>
								<div className="d-flex w-100">
									<img src={starIcon} />
									<img src={starIcon} />
									<img src={starIcon} />
									<img src={starIcon} />
									<img src={starIcon} />
									<small>(10)</small>
								</div>
							</div>
						</div>
					</Link>
				</div>
			))}
		</div>
	);
}
