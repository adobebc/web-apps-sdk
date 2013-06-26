## {module_webappsresultsmap,Google key,width,height,resultsPerPage,sort type}

Renders the webapp search results as pointers on a Google map. This module can be used together with {module_webappsresults}

### Parameters

* `Google key` - enter the Google Maps key here. To get a key please follow the steps described in this article.
* `width` - the width in pixels of the Google Maps canvas
* `height` - the height in pixels of the Google Maps canvas
* `resultsPerPage` - total number of items that will be rendered, enter "-1" to render all the items
* `sort type`
  * `ALPHABETICAL (default)` - items are sorted in alphabetical order form A-Z
	* `DATE` - items are sorted from newest to oldest. The most recent item is displayed first.
	* `DATEREVERSE` - will display the web app items oldest to newest
	* `weightreverse` - allows you to display the web apps by weight but in reverse, that is the item with the smallest weight is displayed first.

### Templates

This module does not use any layouts. The webapp search result items are plotted as pins on a Google map.

### Examples

`{module_webappsresultsmap,MY_GOOGLE_MAPS_KEY,400,400,-1,default}` Renders all the search result webapp items ordered alphabetically on a 400px x 400px Google map.
