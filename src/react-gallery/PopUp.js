import React from "react";
const PopUp = (props) => {
	return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex justify-center align-middle items-center min-h-screen">
				{props.children}
			</div>
		</div>
	);
};

export default PopUp;
