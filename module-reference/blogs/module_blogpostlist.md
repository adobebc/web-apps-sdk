## {module_blogpostlist,ID,count,tag}

Displays latest posts across a single blog/tag.

### Parameters

* `ID` - system generated (do not change)
* `count` - how many posts to display - the default is 10
* `tag` - name of the single tag you want ot display the posts for

### Examples

`{module_blogpostlist,419,1,business}` 

Renders the latest posts in the blog with ID `419`, tagged with the word `business`

`{module_blogpostlist,419,1,}` 
Renders the latest posts in the blog with ID `419`, with the tag left blank it will render just the latest of all tags.
