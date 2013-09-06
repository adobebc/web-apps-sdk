## {module\_facebookcomments, moduleTemplateGroup="", language="en\_US", url="", posts="", width="450", colorScheme=""}

Renders the Facebook Comments Field.

### Parameters

* `moduleTemplateGroup` - This will specify a module template group, which is a folder located in FTP under/ModuleTemplates/SocialMedia/FacebookComments/
* `language` – Can be any Facebook locales ISO language and country codes combined by an underscore (e.g en_US). If the parameter is not present, this will default to en_US
* `url` – If the parameter is not present, this will default to the current page URL. This must be a valid URL otherwise the Facebook plugin returns error when the button is pressed
* `posts` – Any positive integers. This is used to set the maximum number of posts to display. If the parameter is not present, this will default to 10
* `width` – Any positive integers. If the parameter is not present, the default value will be 450
* `colorScheme` – light, dark. If the parameter is not present, the default value will be light

### Templates

* Module templates > SocialMedia > FacebookComments > Default > container.html 

### Examples

`{module_facebookcomments, url="{tag_itemurl_withhost}"}` Enables Facebook comments and will use the full URL of the module item, for example http://mysite.com/module-url.
