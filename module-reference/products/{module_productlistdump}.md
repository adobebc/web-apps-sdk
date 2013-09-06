## {module_productlistdump,catID,rowLength,targetFrame,sortBy}

Renders a list of products (in a given catalog or all the products on the site). This module does not use a layout, its output is an unordered list.

### Parameters

* `catID` - the catalogID, the productlistdump will list the products inside that catalog. This can also be "-1" - this will list all the products in the site.
* `rowLength` - will limit the number of items per row when items are displayed as a list. Default is 1 item per row
* `targetFrame` - possible values are _blank, _self and _top. This parameter is used to specify the frame you want the item to open in.
* `sortBy` - will sort the item in specified order
* `Alphabetical` - sorts items alphabetically
* `Weight` - sorts items by weight

### Examples

`{module_productlistdump,-1}`

The list of catalogs is rendered as an unordered list:

~~~
<ul class="catalouelistdump">

<li><a href="/catalog1/product1">This is my first product</a></li>

<li><a href="/catalog1/product2">This is my secondproduct</a></li>

</ul>
~~~

***

`{module_productlistdump,63858,,_blank,Alphabetical}`

Renders all the products in the catalog with the ID 63858 ordered alphabetically. Clicking a product will open its detail view (rendered using the Individual Product - Large layout) in a new tab.

***

`{module_productlistdump,-1,,_self,weight}`

Renders all the products regardless of the catalog they are in ordered by weight. Clicking a product will open its detail view (rendered using the Individual Product - Large layout) in the same tab.
