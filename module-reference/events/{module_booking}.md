## {module_booking,filter,ID or numberOfBookings}

Renders the rank of an item (number of stars).

### Parameters

* `filter` - filtering criteria for display and can be one of the following:
	* `i` - individual item
	* `a` - all items
	* `l` - latest items
	* `r` - random item
	* `cr` - displays a random item in a particular category
* `ID` or `numberOfBookings`
	* `id` - the ID of the booking module. This is system generated and does not need to be changed
	* `numberOfBookings` - can be used in conjunction with l parameter to limit the number of bookings displayed

### Templates

* [Event Layouts > List Layout](/content/tag-reference/events/event-list-layout.html)
* This module also supports custom templates

### Examples

`{module_booking,a}` - Renders all bookings

***

`{module_booking,i,54321}` - Renders an individual event item with the ID 54321

***

`{module_booking,l,5}` - Renders 5 latest events

***

`{module_booking,r}` - Renders a single random item

***

`{module_booking,c,54321}` - Renders all items classified in the category with the ID 54321

***

`{module_booking,cr,54321}` - Renders a random item classified in the category with the ID 54321

***
`{module_booking,i,63522 template="/layouts/custom/bookings.tpl"}` - Renders an individual item using a custom template
