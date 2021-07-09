import React, { useEffect, useState } from "react";

//importing components
import Carousel from "./Carousel";
import GalleryUpload from "./GalleryUpload";
import Card from "./Card";
const ImageGallery = (props) => {
	const [images, setImages] = useState([]);

	useEffect(async () => {
		let imgProps = props.images;

		setImages(imgProps);
	}, [props.images]);

	return (
		<Card>
			{props.upload !== undefined && props.upload ? (
				<GalleryUpload
					images={images}
					url={props.url}
					imageSize={props.imageSize}
				/>
			) : (
				<Carousel images={images} height={props.height} />
			)}
		</Card>
	);
};

export default ImageGallery;
