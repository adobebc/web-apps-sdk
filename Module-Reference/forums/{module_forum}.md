## {module_forum,filter,ID,targetFrame}

Renders a list of forums.

### Parameters

* `filter` - filtering criteria for display and can be one of the following:
  * `i` - individual item
	* `a` - all items
	* `l` - latest items
	* `r` - random item
	* `cr` - displays a random item in a particular category
* `ID` - system generated (do not change)
* `targetFrame` - the frame in which to open the item in

### Templates

* Forum Layouts > Individual Forum Layout
* This module also supports custom templates

### Examples

`{module_forum,i,317,true}` - Renders an individual forum with an id of 317 and it will display it in the new frame

***

`{module_forum,a, template="/layouts/custom/individual_forum.tpl"}` - Renders all the forums on the site using the individual_forum.tpl custom template
