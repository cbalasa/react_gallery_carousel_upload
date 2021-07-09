import React from "react";
import * as Icon from "react-feather";

/*========================================================
      OPTIONS - all strings except iconSize
=========================================================*/
// type = filled / outline / gradient / wireframe
// color = primary / primaryLight / warning / success/ danger / ivy/ surf
// icon = feather Icons with small letters
// iconSize = size of icon; TYPE: number
// textColor = primary / primaryLight/ primarySuperLight / warning / success/ danger / ivy/ surf
// text = text that will be printed inside the button
//click = props for onClick()
// classes = string extra classes
const Button = (props) => {
	let type = props.type !== undefined ? props.type : "filled";
	let color;
	//TEXT COLOR
	let textColor =
		props.textColor !== undefined ? props.textColor : "text-white";
	//button color and UI
	if (type === "filled") {
		color = props.color !== undefined ? props.color + "Bg" : "successBg";
	} else if (type === "outline") {
		color =
			props.color !== undefined ? props.color + "Border" : "successBorder";
	} else if (type === "gradient") {
		color =
			props.color !== undefined ? props.color + "Gradient" : "primaryGradient";
	} else if (type === "wireframe") {
		color = "";
		textColor = props.color !== undefined ? props.color : "text-white";
	}

	//Icon
	let IconPrint = null;
	if (props.icon !== undefined) {
		IconPrint = Icon[props.icon.charAt(0).toUpperCase() + props.icon.slice(1)];
	}

	//SIZE
	let size =
		props.size !== undefined ? "button-" + props.size : "button-default";

	return (
		<div
			className={
				"flex flex-row  rounded-lg cursor-pointer shadowButton  " +
				color +
				" " +
				size +
				" " +
				textColor +
				" " +
				props.classes
			}
			onClick={props.click}
		>
			{props.icon !== undefined ? (
				<IconPrint
					size={
						props.iconSize !== undefined
							? props.iconSize
							: props.size == "small"
							? 15
							: props.size == "default" || props.size == undefined
							? 18
							: 21
					}
					className={
						props.text !== undefined || props.children !== undefined
							? "mr-2"
							: "" + " " + "hover:" + props.color + "Shadow"
					}
				/>
			) : null}
			{props.text !== undefined ? (
				<span
					className={
						"text-center flex h-auto" + " " + "hover:" + props.color + "Shadow"
					}
				>
					{props.text}
				</span>
			) : null}
			{props.children !== undefined ? (
				<span
					className={
						"text-center flex h-auto" + " " + "hover:" + props.color + "Shadow"
					}
				>
					{props.children}
				</span>
			) : null}
		</div>
	);
};

export default Button;
