import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import PopUp from "./PopUp";
import ModalBackground from "./ModalBackground";
import Button from "./Button";
import "./css/carousel.css";
import { transform } from "lodash";
const Carousel = (props) => {
	const [imgIndex, setImgIndex] = useState(0);
	let height = props.height;
	const [carouselWidth, setCarouselWidth] = useState("fadeOutSlide");
	const [carouselPopUpWidth, setCarouselPopUpWidth] = useState("fadeOutSlide");
	const [showPopUp, setShowPopUp] = useState(false);
	const [setImages, setSetImages] = useState(false);
	let carouselRef = useRef(null);
	let carouselPopUpRef = useRef(null);
	let carouselWrapper = useRef(null);

	const slideLeft = () => {
		if (imgIndex !== 0) {
			setImgIndex(imgIndex - 1);
		}
		if (imgIndex == 0) {
			setImgIndex(props.images.length - 1);
		}
	};
	const slideRight = () => {
		if (imgIndex !== props.images.length - 1) {
			setImgIndex(imgIndex + 1);
		}
		if (imgIndex === props.images.length - 1) {
			setImgIndex(0);
		}
	};

	useEffect(() => {
		if (carouselRef.current.children[imgIndex] !== undefined) {
			let widthOfCarouselImage =
				carouselRef.current.children[imgIndex].clientWidth;

			[].slice.call(carouselRef.current.children).forEach((li, i) => {
				[].slice.call(carouselRef.current.children)[i].style.transform =
					"translateX(" + -(imgIndex * widthOfCarouselImage) + "px)";
			});
		}
		if (
			carouselPopUpRef.current !== null &&
			carouselPopUpRef.current.children[imgIndex] !== undefined
		) {
			let width = carouselWrapper.current.clientWidth;

			[].slice.call(carouselPopUpRef.current.children).forEach((li, i) => {
				[].slice.call(carouselPopUpRef.current.children)[i].style.transform =
					"translateX(" + -(imgIndex * width) + "px)";
			});
		}
	}, [imgIndex]);

	useEffect(() => {
		let carRef = carouselRef;

		Array.from(carRef.current.children).forEach((li, i) => {
			if (i === 0) {
				setCarouselWidth(
					[...[...carRef.current.children][0].children][0].clientWidth *
						carRef.current.children.length
				);
			}
		});
	}, [carouselRef.current]);

	useEffect(() => {
		let carRef = carouselPopUpRef;
		if (carRef.current !== null) {
			Array.from(carRef.current.children).forEach((li, i) => {
				if (i === 0) {
					setCarouselPopUpWidth(
						carouselWrapper.current.clientWidth * carRef.current.children.length
					);
				}
			});
		}
	}, [showPopUp]);
	useEffect(() => {
		setSetImages(props.images);
	}, [props.images]);
	return (
		<div>
			{/* small carousel */}
			<div
				className="flex relative carouselWrapper w-full rounded-lg overflow-hidden"
				style={{ height: height }}
			>
				<ArrowLeft
					className="slideLeft absolute  text-white pl-4 z-10 cursor-pointer"
					style={{ top: 45 + "%" }}
					size={40}
					onClick={slideLeft}
				/>
				<ol
					ref={carouselRef}
					style={{
						minWidth: carouselWidth + "px",
						height: "100%",
						maxWidth: "10000000px",
						display: "-moz-flex",
						display: "-webkit-flex",
						display: "flex",
						flexFlow: "row",
						justifyContent: "space-between"
					}}
				>
					{props.images.map((img, i) => {
						return (
							<li
								className={
									" bg-white w-full rounded-lg   m-auto flex cursor-pointer "
								}
								style={{
									height: height,
									transition: "all 0.6s ease-out",
									width: "100%"
								}}
								key={img}
								onClick={() => setShowPopUp(true)}
							>
								<div
									className={
										"bg-no-repeat bg-center w-full rounded-lg absolute"
									}
									style={{
										backgroundImage: "url(" + img + ")",
										height: height,
										backgroundPosition: "center center",
										backgroundSize: "cover",
										right: 0
									}}
								></div>
							</li>
						);
					})}
				</ol>
				<ArrowRight
					className="slideLeft absolute text-white pr-4 right-0 z-10 cursor-pointer"
					style={{ top: 45 + "%" }}
					size={40}
					onClick={slideRight}
				/>
			</div>

			{/* popup carousel */}

			{showPopUp ? (
				<PopUp>
					<div
						className="relative rounded-lg overflow-hidden cursor-pointer videoWrapper z-50 m-auto items-center justify-center align-middle self-center w-9/12 "
						style={{ maxWidth: 950 + "px" }}
					>
						<div
							style={{ maxHeight: 79 + "vh" }}
							className="overflow-hidden relative"
						>
							<Button
								icon={"xCircle"}
								type={"wireframe"}
								iconSize={35}
								classes={"right-0 absolute z-50 top-2"}
								click={() => setShowPopUp(false)}
							/>
							<div
								ref={carouselWrapper}
								className="flex relative carouselWrapper w-full rounded-lg overflow-hidden"
								style={{ height: 70 + "vh" }}
							>
								<ArrowLeft
									className="slideLeft absolute  text-white pl-4 z-10 cursor-pointer"
									style={{ top: 45 + "%" }}
									size={40}
									onClick={slideLeft}
								/>
								<ol
									ref={carouselPopUpRef}
									style={{
										minWidth: carouselPopUpWidth + "px",
										height: "100%",
										maxWidth: "10000000px",
										display: "-moz-flex",
										display: "-webkit-flex",
										display: "flex",
										flexFlow: "row",
										justifyContent: "space-between"
									}}
								>
									{props.images.map((img, i) => {
										return (
											<li
												className={
													" bg-white w-full rounded-lg   m-auto flex cursor-pointer "
												}
												style={{
													height: height,
													transition: "all 0.6s ease-out",
													width: "100%"
												}}
												key={img}
												onClick={() => setShowPopUp(true)}
											>
												<div
													className={
														"bg-no-repeat bg-center w-full rounded-lg absolute"
													}
													style={{
														backgroundImage: "url(" + img + ")",
														height: height,
														backgroundPosition: "center center",
														backgroundSize: "cover",
														right: 0
													}}
												></div>
											</li>
										);
									})}
								</ol>
								<ArrowRight
									className="slideLeft absolute text-white pr-4 right-0 z-10 cursor-pointer"
									style={{ top: 45 + "%" }}
									size={40}
									onClick={slideRight}
								/>
							</div>
						</div>
					</div>
					<ModalBackground opacity={90} click={() => setShowPopUp(false)} />
				</PopUp>
			) : null}
		</div>
	);
};

export default Carousel;
