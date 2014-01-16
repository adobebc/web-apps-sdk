## {module_announcement, filter, id, noTemplate, effect, target, reserved, reserved, reserved, length, sort}

Renders a list of news items.

### Parameters

* `filter` - filtering criteria for display and can be one of the following:
  * `i` - individual item
	* `a` - all items
	* `c` - all items in some category
	* `cl` - latest items in some category
	* `l` - latest items
	* `r` - random item
	* `cr` - displays a random item in a particular category
* `id` – system generated (do not change)
* `noTemplate` – if you want to force the item not to use a site-level template when displayed pass in true, otherwise leave empty
* `effect` – enter "ajax" (see the examples below) if you want to take advantage of the latest web technologies for a better customer experience
* `target` – the frame in which to open the item in
* `reserved` - for use in a future release
* `length` - this parameter is only used when the filter is either "l" or "cl" and dictates how many items are rendered per row
* `sort` - if you leave this parameter blank, by default announcements will be sorted from the latest to the oldest where the latest is displayed first:
	* `alphabetical` - will sort announcements alphabetically
	* `datereverse` - will sort announcements in the reverse order, that is from the oldest to the latest

### Templates

* [News Layouts > News List Layout](/content/tag-reference/news/news-list-layout.html)
* This module also supports custom templates

### Examples

`{module_announcement,a,,,,_parent}` - Renders all news items and open them in parent frame

***

`{module_announcement,l,5}` - Renders the latest 5 news

***

`{module_announcement,r,,true,ajax,_blank,,,,,datereverse}` - will open a random item in a new window and will not apply the template and will use the Ajax effect where the detail content opens right underneath the news name and all the news items will be displayed from the oldest to the latest

***

`{module_announcement,cl,54321,,ajax,,,,,5}` - Renders the 5 latest news items in the category with the ID 54321

***

`{module_announcement,a,,,ajax,_blank template="/Layouts/Custom/news.tpl"}` - will display all the news items using the "ajax" effect using the news.tpl custom template
