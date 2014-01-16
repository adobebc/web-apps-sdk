## {module_pageaddress}

Renders the full current url of the page

If this module is used on a secure URL, then the module will output the host of the non-secure URL the user navigated from. For example, if this module is used on https://mysite.worldsecuresystems.com and the customer navigated to this URL from http://mysite.com then this module will output http://mysite.com. If the user started on the secure URL (i.e did not navigate from a non-secure URL of the site), then this module will use the default domain name of the site.

### Examples

IF this module is used on the URL of http://mysite.com/mypage, `{module_pageaddress}` renders `http://mysite.com/mypage`.
