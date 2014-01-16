## {module_literature,filter,id,targetFrame}

When inserted into a page it will display the literature item(s). After adding the Literature module to a web page, you can make changes to it to slightly to alter its behavior.

### Parameters

* `filter` - filtering criteria for display and can be one of the following:
  * `i` - individual item
	* `a` - all items
	* `l` - latest items
	* `r` - random item
	* `cr` - displays a random item in a particular category
* `id` - system generated (do not change)
* `targetFrame` - the frame in which to open the item in

### Templates

* [Media downloads > List Layout](/content/tag-reference/media-downloads/media-download-list-layout.html)
* This module also supports custom templates

### Examples

`{module_literature,i,54321,_blank}`

This will display the link to individual literature item which when clicked will open in the new window

`{module_literature,a,,_blank}` 

This module will display links to all literature items which when clicked will open in the new window

`{module_literature,l,}`

This module will display the latest items (default is 10 items)

`{module_literature,r,}`

This module will display 1 random literature item

`{module_literature,cr,54321,}`

This module will display 1 random literature item, from the category called "Company", identified through id `54321`
