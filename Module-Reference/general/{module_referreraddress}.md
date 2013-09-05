## {module_referreraddress,target,text}

Renders a hyperlink that points to the referring page.

### Parameters

* `target` - this is the hyperlink's target
* `text` - this is the hyperlink's text

### Examples

`{module_referreraddress,_top,Previous link}`- this will output a hyperlink that points to the previous page the site visitor was visiting. For example if one goes to the mysite.com/page1 and on that page clicks a link and navigates to mysite.com/page2 the module will output this link:

`<a href="http://mysite.com/page1" target="_top">Previous link</a>`
