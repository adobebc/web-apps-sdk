## {module_blog,filter,ID}

Renders a list of blogs according to the blog list layout. It is recommended that you link directly to an individual blog rather than use the blog module. Use the Link Manager for Blog URL.

### Parameters

* `filter` -  filtering criteria for display and can be one of the following:
  * `i` - individual item 
	* `a` - all items
	* `l` - latest items
	* `r` - random item
	* `cr` - displays a random item in a particular category

* `ID` - system generated (do not change)

### Templates

* Blog Layouts > Post Details
* This module also supports custom templates

### Example

`{module_blog,i,419}`

Renders an individual blog with the ID of 419.
