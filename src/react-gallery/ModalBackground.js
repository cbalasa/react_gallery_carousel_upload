import React from "react";

const ModalBackground = (props) => {
	return (
		<div
			onClick={props.click}
			className={
				"flex fixed bg-gray-900  min-h-screen w-full inset-0 z-40 " +
				"opacity-" +
				(props.opacity !== undefined ? props.opacity : 50)
			}
		></div>
	);
};

export default ModalBackground;
