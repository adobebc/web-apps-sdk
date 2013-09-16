## Blog Post List Layout

### Location
* **Admin Console:** Site Manager > Module Templates > Blog Layouts > Blog Post List Layout
* **SFTP:** /layouts/blog/postlist.html

### Tags

Tag | Description
-------------- | -------------
`{tag_blogpostauthor}` |	Author of post
`{tag_blogpostbody}` |	Details of post
`{tag_blogpostbodypreview,Text}` |	Display a preview of the first paragraph of your blog post. Replace "Text" with the relevant words to link to see the entire post.
`{tag_blogpostdate}` |	Date of post
`{tag_blogpostday}` |	Day of post
`{tag_blogpostmonth}` |	Month part of the date the blog post was posted, e.g. 11-Dec-07 will render DEC
`{tag_blogpostmonthnumeric}` |	Month part of the date the blog post was posted as a numeric value, e.g. 11-Dec07 will render 12
`{tag_blogposttitle}` |	The title of post as an anchor linked to the permalink
`{tag_blogposttitle_nolink}` |	The title of post
`{tag_blogpostyear}` |	Year part of the date that the post was submitted. Example: 11-Dec-10 will render as the year only, like this: 2010
`{tag_commentcount}` |	Number of comments for current post
`{tag_commentlist}` |	List of comments associated with this post
`{tag_commentrank}` |	Rank of comments associated with this post
`{tag_permalink}` |	Link for Permalink with anchor
`{tag_permalinkonly}` |	Link for Permalink without anchor
`{tag_trackbackcount}` |	Number of trackbacks for current post
`{tag_trackbacklink}` |	Link for trackback
`{tag_trackbacklist}` |	List of trackbacks associated with this post
`{tag_blogpostauthorbiography}` |	Displays the author's biography
`{tag_blogpostauthorpictureurl}` |	Will render the picture url (relative to site root). e,g /images/profile.jpg
`{tag_blogpostauthorpicture}` |	Will render the full HTML image tag of the authors profile picture. e.g
`{tag_itemurl_nolink}`	| URL to the item being referred, without host
`{tag_itemurl_withhost}` | URL to the item being referred, with host
