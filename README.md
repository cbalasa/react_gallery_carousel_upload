# React Image Gallery Carousel and Upload

Ready to use Image Gallery that can be used either as a carousel with popup or an upload for multiple images.

## Limitations
All CSS is based on Tailwind CSS

## How to use

Import ImageGallery.js in your component

### Carousel with popup

Add two props to <ImageGallery/>
1. "images" -  that must be an array
2. "height" - sets the height of the carousel

That simple! :)

### Image Upload

Add props to <ImageGallery/>
Required:
1. upload={true}
2. "url" - of type String. This url contain the endpoint where the images will be sent.
3. imageSize - of type Number. This constraints the size of the uploaded image.

Optional
1. "images" -  that must be an array

