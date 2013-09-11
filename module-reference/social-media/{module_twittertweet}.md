## {module_twittertweet, moduleTemplateGroup="", language="en", url="", count="horizontal", text="", via="", related="", countUrl=""}

Renders the Twitter Tweet button.

### Parameters

* `moduleTemplateGroup` - This will specify a module template group, which is a folder located in FTP under/ModuleTemplates/SocialMedia/TwitterTweet/
* `language` – en, fr, de, it, es, ko, ja
* `url` – if the parameter is not present, this will default to the current page URL. This must be a valid URL.
* `count` – horizontal, vertical, none. If the parameter is not present, the default value will be horizontal
* `text` – this can have any text value. If the parameter is not present, this will default to the title of the page the button is on
* `via` – this should be a valid Twitter username
* `related` – this should be a valid Twitter username
* `counturl` – must be a valid URL

### Templates

* [Module templates > SocialMedia > TweeterTweet > Default > container.html](/content/tag-reference/social-media/twitter-tweet-template.html)

### Examples

`{module_twittertweet, url="{tag_itemurl_withhost}"}` - This will generate the Tweeter Tweet button, using the full URL of the module item, for example http://mysite.com/module-url.
