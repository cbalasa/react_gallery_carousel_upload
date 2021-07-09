import React from "react";

const Card = (props) => {
	return (
		<div
			className={"shadow-lg p-5 rounded-lg m-2 w-full bg-white overflow-hidden"}
		>
			{props.children}
		</div>
	);
};

export default Card;
