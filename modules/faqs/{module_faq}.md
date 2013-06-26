## {module_faq,filter,id,noTemplate,effect,targetFrame}

Renders a list of FAQ items.

### Parameters

* `filter` - filtering criteria for display and can be one of the following:
  * `i` - individual item
	* `a` - all items
	* `l` - latest items
	* `r` - random item
	* `cr` - displays a random item in a particular category
* `id` – system generated (do not change)
* `noTemplate` – if you want to force the item not to use a site-level template when displayed pass in true, otherwise leave empty
* `effect` – Enter ajax if you want to take advantage of the latest web technologies for a better customer experience
* `targetFrame` – the frame in which to open the item in

### Templates

* FAQ list layout
* This module also supports custom templates

### Examples

`{module_faq,a,,,,_parent}` - Renders all FAQs and open them in parent frame.

***

`{module_faq,a, template="/layouts/custom/faq.tpl"}` - Renders all FAQs using the faq.tpl custom template.

***

`{module_faq,l,5}` - Renders the latest 5 FAQs.

***

`{module_faq,r,,true,ajax,_blank}` - Opens a random item in a new window and will not apply the template and will use the Ajax effect where the detailed content opens right underneath the FAQ name.
