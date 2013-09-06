## {module_webappsmap,Google key,,width,height,resultsPerPage}

Renders the webapp items as pointers on a Google map.

### Parameters

* `Google key` - enter the Google Maps key here. To get a key please follow the steps described in this article.
* `width` - the width in pixels of the Google Maps canvas
* `height` - the height in pixels of the Google Maps canvas
* `resultsPerPage` - total number of items that will be rendered, enter "-1" to render all the items

### Templates

This module does not use any layouts. The webapp items are plotted as pins on a Google map, 

### Examples

`{module_webappsmap,56,a,,MY_GOOGLE_KEY,400,400,-1}` - Renders all the webapp items on a 400px x 400px Google map
