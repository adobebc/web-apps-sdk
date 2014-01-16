## {module_webappsresults,notUsed,target,bkp,resultsPerPage,hideEmptyMessage,rowLength,sort}

Renders web app search results.

### Parameters

* `notUsed` - RESERVED (please do not use this space)
* `target` - e.g. _blank. Specify the frame you want the item to open in
* `bkp`- specify True if you want to use the backup list template or leave empty
* `resultsPerPage` - total number of items per page before pagination is used
* `hideEmptyMessage` - specify True if you don't want the No Items Found message to be displayed.
* `rowLength` - will limit the number of items per row when items are displayed as a list. Default is 1 item per row.
* `sort`
  * `ALPHABETICAL` (default) - items are sorted in alphabetical order form A-Z
	* `DATE` - items are sorted from newest to oldest. The most recent item is displayed first.
	* `DATEREVERSE` - will display the web app items oldest to newest
	* `weightreverse` - allows you to display the web apps by weight but in reverse, that is the item with the smallest weight is displayed first.

### Templates

* [Web App Layouts > List Layout](/content/tag-reference/web-apps/web-app-list-layout.html)
* This module also supports custom templates

### Examples

`{module_webappsresults template="/layouts/custom/walist.html"}` - This module will display the web app search results using the walist.html custom template
