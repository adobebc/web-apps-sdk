## Web App Detail Layout

### Location
* **Admin Console:** Site Manager > Module Templates > [Select Web App] > Detail Layout
* **SFTP & Develop Mode:** /Layouts/WebApps/[Web App]/detail.html

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
`{tag_classifications}` |	List of categories that this industry content is classified under
`{tag_commentcount}` |	 
`{tag_description}` |	Description of item (editor content)
`{tag_expirydate}` |	Expiry date of item
`{tag_itemurl_nolink}` |	URL to the item being referred, without host
`{tag_itemurl_withhost}` |	URL to the item being referred, with host
`{tag_lastupdatedate}` |	Last update date of item
`{tag_name}` |	Name of item
`{tag_releasedate}` |	Release date of item
`{tag_tellafriend}` |	Tell a friend about this item
`{tag_weight}` |	Weighting of item

**Note:** When using a custom image field type for Web Apps, by default the image tag outputs the full HTML image source and a link. Example:

`<a href="/web-app/detail-web-app"><img src="/folder/imagename.jpg" border="0" alt=""></a>`

You can customize custom image tags, by appending the below parameters to the tags:

* _value (eg. ``{tag_my custom image_value}` |`) - Outputs the file path of the image. For example, /folder/image.jpg
* _nolink (eg. ``{tag_my custom image_nolink}` |`) - Ensures that the image does not link to the detailed view of the web app item
