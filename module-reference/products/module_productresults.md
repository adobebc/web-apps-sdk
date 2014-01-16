## {module_productresults, rowLength, targetFrame, resultsPerPage, sortType, hideEmptyMessage, useLi}

This module can only be used in conjuction with a product search form. Whenever you insert a product search form into a page the system also adds the {module_productresults} module right after the form. When viewed in the front end this module does not render anything until the form's "Search" button is presed and a search is triggered. This module and the product search form can also be placed on different pages, take a look at this article for more details on this particular setup.

### Parameters

* `rowLength` - will limit the number of items per row when items are displayed as a list. Default is 1 item per row.
* `targetFrame` - possible values are _blank, _self and _top. This parameter is used to specify the frame you want the item to open in.
* `resultsPerPage` - specifies the number of results the search will display per page.
* `sortType` - sortType can be alphabetical, price, date, or weight. Do note the sortType is ignored if the "Sort By" field is present in the product search form.
* `hideEmptyMessage` - specify True if you don't want the No Items Found message to be displayed
* `UseLi` - specify True to render the output in Li's instead of tables

### Templates

* [Online Shop Layouts > Individual Product - Small](/content/tag-reference/online-shop/individual-product-small-layout.html)
* This module also supports custom templates

### Examples

`{module_productresults,4,_blank,10,,true}`

Renders the products that match the search criteria 4 per rotw, 10 per page and hides the "No products found matching your query." if no products are found. The structure rendered is a table. When clicking the product name the detail view (rendered using theIndividual Product - Large layout) opens up in a new tab.

***

`{module_productresults,,_self,2,,,true}`

Renders the products that match the search criteria 2 per page and renders "No products found matching your query." if no products are found. The structure rendered is an unordered list. When clicking the product name the detail view (rendered using the Individual Product - Largelayout) opens up in the same tab.

***

`{module_productresults,2,_self,2,,,true template="/layouts/custom/moduleproductresults.tpl"}`

Renders the products that match the search criteria 2 per page and renders "No products found matching your query." if no products are found. The structure is no longer an unordered list as it is in the example above, thecustom template is used instead.
