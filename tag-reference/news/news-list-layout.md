## News List Layout

### Location
* **Admin Console:** Site Manager > Module Templates > News Layouts > List Layout
* **SFTP & Develop Mode:** /layouts/announcement/list.html

### Tags

Tag | Description
-------------- | -------------
`{tag_addtofavorites,addtoImage,removefromImage}` | dd news item to favorites list. Optionally customize to display your own custom image for adding and removing.
`{tag_announcementid}` | Renders the news item ID.
`{tag_announcementurl_value}` | This tag renders the news item URL value. For example, /announcement-prefix-url/new-announcement. If customizable URLs are not enabled, this tag renders/AnnouncementRetrieve.aspx?Id=123
`{tag_body,numberofcharacters}` | Displays the news item description (editor content). Optionally limit the number of characters to display, e.g {tag_body,100) to display first 100 characters.
`{tag_button,Your Text}` | Replace Your Text with your own text; for example, "Click for more information"
`{tag_counter}` | Incremental count of the news item on the page
`{tag_eventfromdate}` | Start date of the event (if applicable)
`{tag_eventtodate}` | End date of the event (if applicable)
`{tag_expirydate}` | Expiration date of news item
`{tag_lastupdatedate}` | Last update date of news item
`{tag_releasedate}` | Release date of item
`{tag_subject_nolink}` | Subject of news item (does not have hyperlink)
`{tag_subject}` | Subject of news item (does have hyperlink)
`{tag_tellafriend}` | Tell a friend about this news item
