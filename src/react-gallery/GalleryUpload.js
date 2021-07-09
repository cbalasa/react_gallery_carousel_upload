import React, { useState, useEffect, useRef } from "react";
import Image from "./Image";

import axios from "axios";
import Button from "./Button";
const GalleryUpload = (props) => {
	let galleryUploadRef = useRef(null);
	const [images, setImages] = useState(props.images);
	const [imageSizeError, setImageSizeError] = useState(false);
	useEffect(() => {
		setImages(props.images);
	}, [props.images]);
	const handleImage = (imageUploaded) => {
		// let mbSizeOfPicture = (
		//   imageUploaded.target.files[0].size /
		//   (1024 * 1024)
		// ).toFixed(2);
		// if (mbSizeOfPicture <= 1) {
		//   let image = imageUploaded.target.files[0];
		let imagesUploaded = [];
		if (images !== undefined) {
			imagesUploaded = JSON.parse(JSON.stringify(images));
		}
		imagesUploaded = imagesUploaded.filter((image) => !image.includes("blob"));
		for (let key in imageUploaded.target.files) {
			if (key !== "length" && key !== "item") {
				let image = imageUploaded.target.files[key];
				if (checkImageSize(image)) {
					let urlImage = URL.createObjectURL(image);
					imagesUploaded.push(urlImage);
				} else {
					setImageSizeError(true);
				}
			}
		}
		setImages(imagesUploaded);
	};
	const handleDragAndDropGallery = (event) => {
		event.target.attr("drop-active", true);
		event.preventDefault();

		let div = event.target;
		div.style.backgroundColor = "lightred";
	};

	const checkImageSize = (image) => {
		let imageSize = (image.size / (1024 * 1024)).toFixed(2);
		let hasCorrectSize;
		imageSize <= props.imageSize
			? (hasCorrectSize = true)
			: (hasCorrectSize = false);
		return hasCorrectSize;
	};

	const deleteImage = (index) => {
		let imagesUploaded = JSON.parse(JSON.stringify(images));
		imagesUploaded.splice(index, 1);
		setImages(imagesUploaded);
	};
	const saveGalleryhandler = () => {
		let form = document.getElementById("form");
		let formData = new FormData(form);
		console.log(props.url);

		axios({
			method: "post",
			url: props.url,
			data: formData,
			headers: { "Content-Type": "multipart/form-data" }
		}).catch((err) => console.log(err));
	};
	return (
		<div className="flex">
			<form ref={galleryUploadRef} className="flex w-full flex-col" id="form">
				<div className={"flex w-full"}>
					<div className="w-6/12">
						<div className="flex justify-center self-center align-middle w-full ">
							<input
								className="inputx w-11/12 h-64 flex justify-center items-center left-auto absolute opacity-0 "
								type="file"
								accept="image/png, image/jpeg"
								name="catImage"
								multiple
								onChange={handleImage}
							/>
							<div
								className="bg-gray-200 w-11/12 h-64 justify-center items-center flex rounded-lg"
								onDrop={(e) => handleImage(e)}
								onDragOver={(e) => handleDragAndDropGallery(e)}
							>
								Upload images in gallery...
							</div>
						</div>
						{imageSizeError ? (
							<span
								className={
									"font-bold text-red-500 text-xs pt-4 flex justify-center self-center"
								}
							>
								Please upload an image smaller than {props.imageSize} MB
							</span>
						) : null}
					</div>
					{images !== undefined ? (
						<div className="flex flex-wrap overflow-y-auto h-64 w-6/12">
							{images.map((img, index) => {
								return (
									<div
										className="flex zoom w-3/12 overflow-hidden rounded-lg p-1"
										key={img}
									>
										<div className="inline-block relative overflow-hidden">
											<Button
												icon={"xCircle"}
												type={"wireframe"}
												iconSize={35}
												classes={"right-0 absolute  p-1"}
												click={() => deleteImage(index)}
											/>
											<Image url={img} popUp={true} />
										</div>
									</div>
								);
							})}
							<input
								type="hidden"
								name="imagesLinks"
								value={JSON.stringify(images)}
							/>
						</div>
					) : null}
				</div>
			</form>
			<button
				onClick={saveGalleryhandler}
				className={
					"bg-green-700 flex align-middle self-center rounded-lg text-white font-bold p-2"
				}
			>
				Save Gallery
			</button>
		</div>
	);
};

export default GalleryUpload;
