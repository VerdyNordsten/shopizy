import React from "react";

export default function Color(props) {
	return (
		<div
			onClick={() => props.setColorForm(props.colorName)}
			style={
				props.color === props.cekColor
					? {
						height: "45px",
						width: "45px",
						borderRadius: "50%",
						margin: "10px 6px",
						border: "1px solid red",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}
					: {
						height: "41px",
						width: "41px",
						borderRadius: "50%",
						margin: "10px 6px",
						border: "1px solid white",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}
			}
		>
			<div
				className="bg-#4290D8"
				style={{
					height: "36px",
					width: "36px",
					borderRadius: "50%",
					backgroundColor: props.color,
				}}
				onClick={() => props.setColor()}
			></div>
		</div>
	);
}
