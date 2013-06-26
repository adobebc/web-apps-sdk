## {module_ratingrank, YourFolderPath}

Renders the rank of an item (number of stars).

### Parameters

* `YourFolderPath` - the path to your directory of custom star images to be used. For instance,{module_ratingrank, /images/stars} would use images located inside the directory /images/stars instead of the default image files. When using this parameter, ensure that your custom images use these exact names:
  * 1stars.gif
	* 15stars.gif
	* 2stars.gif
	* 25stars.gif
	* 3stars.gif
	* 35stars.gif
	* 4stars.gif
	* 45stars.gif
	* 5stars.gif

### Examples

`{module_ratingrank,/images/stars}` - Renders the rating for the current item using the custom images from the /images
