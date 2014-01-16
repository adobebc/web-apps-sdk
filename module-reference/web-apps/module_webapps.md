##{module_webapps,ID,filter,itemID,notUsed,target,bkp,results,hideEmpty,rowLength,Sort}

Renders an individual or list of Web App items, as per parameters.

### Parameters

* `ID` or `Name` - system generated web app id or replace with the web app name
* `filter` - filtering criteria for display and can be one of the following:
  * `i` - individual item
	* `a` - all items
	* `l` - latest items
	* `r` - random item
	* `cl` - latest items in a particular category
	* `cr` - displays a random item in a particular category
* `itemID` - system generated individual item id (do not change)
* `notUsed` - leave empty
* `target` - e.g. _blank. Specify the frame you want the item to open in
* `bkp` - specify True if you want to use the backup list template or leave empty
* `results` - total number of items per page before pagination is used (limit of 500 items per page)
* `hideEmpty` - specify True if you don't want the No Items Found message to be displayed.
* `rowLength` - will limit the number of items per row when items are displayed as a list. Default is 1 item per row.
* `Sort` - will sort the web apps in specified order
	* `alphabetical` (default) - items are sorted in alphabetical order form A-Z
	* `date` - will display the web app items newest to oldest
	* `datereverse` - will display the web app items oldest to newest
	* `weightreverse` - allows you to display the web apps by weight but in reverse, that is the item with the smallest weight is displayed first.
	* `comments` - display the items with the largest number of Comments first (can be used for a 'highest votes' type display).

The previous and next links used in pagination can be customized using CSS. Each link has its own custom CSS class. To see the CSS class assigned to these links view the web page source where these links appear. The CSS class name format is: WebAppIDPrev and WebAppIDNext where ID is the internal ID assigned to your Web App. You can easily find the ID by inspecting the source of the live page. 

### Templates

* [Web App Layouts > List Layout](/content/tag-reference/web-apps/web-app-list-layout.html)
* This module also supports custom templates

### Examples

`{module_webapps,56,a,,,_blank,true,12,true,3}`

Renders 12 web app items according in the list view in the new window in three items per row way and the web app will use the backup layout.

***

`{module_webapps,123,a,,,,,12}`  

Renders 12 items per page

***

`{module_webapps,123,l,5}`  

Renders the latest 5 items (by date) on the page

***

`{module_webapps,56,a,,,,,10,,1 template="/layouts/custom/walist.html"}`

Renders 10 items using the walist.html custom template

