## {module\_facebooklike, moduleTemplateGroup="", language="en\_US", url="", layout="", showFaces="true", width="450", verb="like", font="", colorScheme=""}

Renders a Facebook like button.

### Parameters

* `moduleTemplateGroup` - This will specify a module template group, which is a folder located in FTP under/ModuleTemplates/SocialMedia/FacebookLike/
* `language` – Can be any Facebook locales ISO language and country codes combined by an underscore (e.g en_US). If the parameter is not present, this will default to en_US
* `url` – If the parameter is not present, this will default to the current page URL. This must be a valid URL otherwise the Facebook plugin returns error when the button is pressed
* `layout` – standard, button_count, box_count. If the parameter is not present, the default value will be standard.
* `show faces` – true, false. If the parameter is not present, the default value will be true
* `width` – Any positive integers. If the parameter is not present, the default value will be 450
* `verb` – like, recommend. If the parameter is not present, the default value will be like
* `font` – arial, lucida grande, segoe ui, tahoma, trebuchet ms, verdana
* `color scheme` – light, dark. If the parameter is not present, the default value will be light

### Templates

* Module templates > SocialMedia > FacebookLike > Default > container.html

### Examples

`{module_facebooklike, url="{tag_itemurl_withhost}"}` Renders the Facebook Like button, using the full URL of the module item, for example http://mysite.com/module-url.
