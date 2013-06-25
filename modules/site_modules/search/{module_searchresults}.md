#{module_searchresults,targetFrame,resultsPerPage}

Displays site-wide search results. This module can be placed on the same web page/template as the search box or on a different page. In the second case the action URL of the search box needs to be altered so that it redirects the visitor to the page this module is inserted on.

**Parameters**

* targetFrame - specifies in which frame the the results need to be opened
* resultsPerPage - specifies the number of results the search will display per page. Default is 10 results per page.

**Templates**

* Online Shop Layouts > Site Search Layout

**Examples**

`{module_searchresults,_blank,12}`

Renders 12 results per page in the new window.