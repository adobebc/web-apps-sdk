## {module_webappscustomer,ID,filter,itemID,,target,bkp,resultsPerPage,hideEmptyMessage,rowLength}

*Visitor must be logged in to a Secure Zone.*

Displays the list of Web App Items submitted by a customer.

### Parameters

* `ID` - system generated web app id (do not change)
* `filter` - filtering criteria for display and can be one of the following:
  * `i` - individual item
	* `a` - all items
	* `l` - latest items
	* `r` - random item
	* `cl` - latest items in a particular category
	* `cr` - displays a random item in a particular category
* `itemID` - system generated individual item id (do not change)
* `target` - e.g. _blank. Specify the frame you want the item to open in
* `bkp` - specify True if you want to use the backup list template or leave empty
* `resultsPerPage` - total number of items per page before pagination is used (limit of 500 items per page)
* `hideEmptyMessage` - specify True if you don't want the No Items Found message to be displayed.
* `rowLength` - will limit the number of items per row when items are displayed as a list. Default is 1 item per row.

### Templates

* [Web App Layouts > List Layout](/content/tag-reference/web-apps/web-app-list-layout.html)
* This module also supports custom templates

### Examples

`{module_webappscustomer,54321,a,}` Renders all web app items that belong to the customer that's logged in for a web app with ID 54321

***

`{module_webappscustomer,54321,c,12345,,_blank,,13 template="/layouts/custom/walist.html"}` Renders the webapp items in the category with the ID 12345 using the walist.html custom template, 13 items per page
