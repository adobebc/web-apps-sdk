## Web App List Backup Layout

### Location
* **Admin Console:** Site Manager > Module Templates > [Select Web App] > List Layout (Backup)
* **SFTP & Develop Mode:** /Layouts/WebApps/[Web App]/list_backup.html

### Tags

Tag | Description
-------------- | -------------
`{tag_address1}` |  Address 1
`{tag_address2}` |	Address 2
`{tag_addresscity}` |	City
`{tag_addresscountry}` |	Country
`{tag_addressglatlng}` |	This tag provides a shortcut to generate GLatLng objects for use with the Google Maps API.
`{tag_addresslatitude}` |	Latitutde of web app item address
`{tag_addresslongitude}` |	Longitude of web app item address
`{tag_addressstate}` |	State
`{tag_addresszipcode}` |	ZIP code
`{tag_addtofavorites,addtoImage,removefromImage}` |	Add web app item to favorites list. Optionally customize to display your own custom image for adding and removing.
`{tag_button,Your Text}` |	`{tag_button,Your Text}` | replace Your Text with your own text; for example, "Click for more information"
`{tag_commentcount}` |	Number of comments for current post
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
`{tag_rowcss,myclass}` |	Replate myclass with your own CSS class. Alternates between classes, such as "myclass" and "myclass_alternate"
`{tag_tellafriend}` |	Tell a friend about this item
`{tag_weight}` |	Weighting of item
`{tag_itemid}` |	Item's system ID

**Note:** When using a custom image field type for Web Apps, by default the image tag outputs the full HTML image source and a link. Example:

`<a href="/web-app/detail-web-app"><img src="/folder/imagename.jpg" border="0" alt=""></a>`

You can customize custom image tags, by appending the below parameters to the tags:

* _value (eg. ``{tag_my custom image_value}` |`) - Outputs the file path of the image. For example, /folder/image.jpg
* _nolink (eg. ``{tag_my custom image_nolink}` |`) - Ensures that the image does not link to the detailed view of the web app item
