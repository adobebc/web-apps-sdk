## {module_calendar,what,filter,}

This module renders either the News or the Events modules on a calendar.

### Parameters

* `what` - the type of item to display. This parameter has 3 possible values:
  * `0` - display both News and Events
	* `7` - display only News
	* `48` - display only Events
* `filter` - filtering criteria for display and can be one of the following:
	* `a`- all items
	* `c` - displays an item in a particular category

### Examples

`{module_calendar,7,a,}` - Renders all the news items on the calendar view

***

`{module_calendar,48,a,}` - Renders all the event (booking) items on the calendar view

***

`{module_calendar,0,a,}` - Renders both events and news items on the calendar view
