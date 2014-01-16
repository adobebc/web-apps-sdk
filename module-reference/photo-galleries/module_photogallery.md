## {module_photogallery,ID,rowLength,targetFrame,resultsPerPage,Width,Height,UseStandardMethod,ThumbnailAlgorithm}

Renders the specified Photo Gallery as thumbnails, with a lightbox effect.

### Parameters

* `ID` - System generated ID (Do not change this number.)
* `rowLength` - Set the number of photos displayed per row
* `targetFrame` - Set the destination frame where the photos will open (such as _blank)
* `resultsPerPage` - Set the number of photos displayed per page
* `Width/Height` - Set the width and height of the thumbnail images. The default value is 80 pixels wide by 80 pixels high.
* `UseStandardMethod` - Use the standard Thumbnail Generation. Set to False for better thumbnail quality (with increased file size).
* `thumbnailAlgorithm` - To avoid squashed images and control image proportion size. Use the following paramaters: proportional,fill, fill_proportional
* 
**Note:** If an image is 640 pixels wide x 400 pixels high and you set the thumbnail size to 120 x 120 pixels, the thumbnail image will have a maximum width of 120 and a smaller height. Proportions are respected when creating the thumbnail image. 

Alternatively if the image dimensions are 400 pixels wide x 640 pixels high, then the height will be 120 pixels and the width smaller. The thumbnail size dictates the maximum width or the maximum height of the image.

### thumbnailAlgorithm option details

proportional: The thumbnail maintains the aspect ratio of the source image and uses the specified width or height of whichever side of the image file is proportionately bigger.

fill: The dimensions of the thumbnail are resized to fill the specified Width and Height settings as defined in the parameters; the aspect ratio of the original source image is not maintained. 

fill_proportional: The dimensions of the thumbnail are resized to fill the specified Width and Height settings as defined in the parameters; the extra pixels from the top/bottom or left/right are cropped on whichever side of the image is proportionally larger, if needed, to maintain the aspect ratio of the original source image and ensure that the thumbnail does not look squashed or squished. 


### Example

`{module_photogallery,26800,4,,12,120,120,true,proportional}`

Renders 4 photos per row at a maximum of 12 photos per page, with a thumbnail size of 120x120 pixels with thumbnails maintaining the source aspect ratio. 
