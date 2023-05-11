import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../assets/styles/swiper.css";
import { Link } from "react-router-dom";

export default function Category({ listCategory }) {
	return (
		<>
			<div className="d-flex flex-column mb-5" style={{ width: "80%" }}>
				<h2>Category</h2>
				<small style={{ color: "#9B9B9B", marginBottom: "25px" }}>
          What are you currently looking for
				</small>
				{listCategory.isLoading ? (
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				) : (
					<Swiper
						slidesPerView={2}
						spaceBetween={10}
						breakpoints={{
							576: {
								slidesPerView: 5,
								spaceBetween: 10,
							},
						}}
						slidesPerGroup={1}
						loop={true}
						loopFillGroupWithBlank={true}
						pagination={{
							clickable: true,
						}}
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
						navigation={true}
						modules={[Autoplay, Pagination, Navigation]}
						className="mySwiper"
					>
						{listCategory.data.map((category) => (
							<SwiperSlide key={category.id}>
								<Link to={`/category/${category.id}`}>
									<div
										className="d-flex align-items-center justify-content-center"
										style={{
											height: "220px",
											width: "210px",
											backgroundSize: "cover",
											backgroundPosition: "center",
											backgroundRepeat: "no-repeat",
											backgroundImage: `url(${
												category.photo
													? `https://drive.google.com/uc?export=view&id=${category.photo}`
													: "/category.webp"
											})`,
											borderRadius: "10px",
										}}
									>
										<h4 style={{ color: "#FFF" }}>{category.category_name}</h4>
									</div>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				)}
			</div>
		</>
	);
}
