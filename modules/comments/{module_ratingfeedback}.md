## {module_ratingfeedback,date}

Renders user comments on an item.

### Parameters

* `date` - if this parameter is present the comments are ordered newest first

### Templates

* Comment layout
* This module also supports custom templates

### Examples

`{module_ratingfeedback,date}` - Renders the comments with the latest comment displaying first

***

`{module_ratingfeedback template="/layouts/custom/comments.tpl"}` - Renders the comments using the comments.tpl custom template
