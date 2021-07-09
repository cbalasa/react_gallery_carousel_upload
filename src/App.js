import "./App.css";
import { withRouter } from "react-router-dom";
import ImageGallery from "./react-gallery/ImageGallery";
function App() {
	return (
		<div className="App">
			<ImageGallery />
		</div>
	);
}

export default withRouter(App);
