import React, { useState, useEffect } from "react";
import { Play } from "react-feather";
import PopUp from "./PopUp";
import ModalBackground from "./ModalBackground";
import Button from "./Button";

/*========================================================
      OPTIONS -
=========================================================*/
// url = TYPE: STRING / video url
// popUp = TYPE: BOOLEAN / if on click video will appear in a popup

const Image = (props) => {
	const [showPopUp, setShowPopUp] = useState(false);
	let imageSmallRef;
	let imagePopUpRef;
	const [imgRatio, setImgRation] = useState(0);
	useEffect(() => {
		if (imageSmallRef !== undefined) {
			setImgRation(imageSmallRef.width / imageSmallRef.height);
		}
	}, [imageSmallRef]);
	// const [imgWidth, setImgWidth] = useState("");
	return (
		<div>
			<img
				ref={(ref) => (imageSmallRef = ref)}
				className="rounded-lg h-32 cursor-pointer w-full"
				onClick={() =>
					props.popUp !== undefined && props.popUp ? setShowPopUp(true) : null
				}
				src={props.url}
			/>
			{showPopUp ? (
				<PopUp>
					<div
						className="relative rounded-lg overflow-hidden cursor-pointer videoWrapper z-50 m-auto items-center justify-center align-middle self-center w-9/12"
						style={{ maxWidth: 750 + "px" }}
					>
						<div style={{ maxHeight: 79 + "vh" }} className="overflow-hidden">
							<Button
								icon={"xCircle"}
								type={"wireframe"}
								iconSize={35}
								classes={"right-0 absolute z-50"}
								click={() => setShowPopUp(false)}
							/>
							<img
								ref={(ref) => (imagePopUpRef = ref)}
								className="videoMoonshot m-auto w-full"
								style={{ maxHeight: 70 + "vh" }}
								src={props.url}
							/>
						</div>
					</div>
					<ModalBackground />
				</PopUp>
			) : null}
		</div>
	);
};

export default Image;
