## Web App List Layout

### Location
* **Admin Console:** Site Manager > Module Templates > [Select Web App] > List Layout
* **SFTP & Develop Mode:** /Layouts/WebApps/[Web App]/list.html

### Tags

Tag | Description
-------------- | -------------
`{tag_address1}` |   Item address line 1
`{tag_address2}` |	 Item address line 2
`{tag_addresscity}` |	 Item city
`{tag_addresscountry}` |	 Item country
`{tag_addressglatlng}` |	 Item latitude and longitude values
`{tag_addresslatitude}` |	 Item latitude value
`{tag_addresslongitude}` |	 Item longitude value
`{tag_addressstate}` |	 Item state
`{tag_addresszipcode}` |	 Item zip code
`{tag_addtofavorites,addtoImage,removefromImage}` |	Add web app item to favorites list. Optionally customize to display your own custom image for adding and removing.
`{tag_button,Your Text}` |	replace Your Text with your own text; for example, "Click for more information"
`{tag_commentcount}` |	 Number of item comments
`{tag_counter}` |	Incremental count of the item on the page
`{tag_delete}` |	Allows current customer to delete a web app item they have previously submitted (only available if customer logged in to a secure zone)
`{tag_description}` |	Description of item (editor content)
`{tag_edit}` |	Allows current customer to edit a web app item they have previously submitted (only available if customer logged in to a secure zone)
`{tag_expirydate}` |	Expiry date of item
`{tag_itemurl_nolink}` |	URL to the item being referred, without host
`{tag_itemurl_withhost}` |	URL to the item being referred, with host
`{tag_lastupdatedate}` |	Last update date of item
`{tag_name_nolink}` |	Name of item (without hyperlink)
`{tag_name}` |	Name of item (has hyperlink)
`{tag_releasedate}` |	Release date of item
`{tag_rowcss,myclass}` |	Replace myclass with your own CSS class. Alternates between classes, for example, myclass myclass_alternate
`{tag_tellafriend}` |	Tell a friend about this item
`{tag_weight}` |	Weighting of item

**Note:** When using a custom image field type for Web Apps, by default the image tag outputs the full HTML image source and a link. Example:

`<a href="/web-app/detail-web-app"><img src="/folder/imagename.jpg" border="0" alt=""></a>`

You can customize custom image tags, by appending the below parameters to the tags:

* _value (eg. `{tag_my custom image_value}`) - Outputs the file path of the image. For example, /folder/image.jpg
* _nolink (eg. `{tag_my custom image_nolink}`) - Ensures that the image does not link to the detailed view of the web app item
