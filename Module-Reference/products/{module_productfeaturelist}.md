## {module_productfeaturelist,tag,rowLength,sortType,targetFrame,useBackupTemplate}

Renders all products tagged with a specified tag using using the 'Individual Product - Small layout'.

### Parameters

* `tag` - being the product tag
* `rowLength` - e.g. 3
* `sortType` - can be alphabetical, price, date, expirydate or weight
* `targetFrame` - possible values are _blank, _self and _top. This parameter is used to specify the frame you want the item to open in.
* `useBackupTemplate` - can be true or false

### Templates

* Online Shop Layouts > Individual Product - Small
* Online Shop Layouts > Individual Product - Small {Backup)
* This module also supports custom templates

### Examples

`{module_productfeaturelist,special offer}`

lists all the products that are tagged with the "special offer" tag

***

`{module_productfeaturelist,special offer,,price,_blank,true}`

lists the products that are tagged with the "special offer" tag using the backup template. The products are sorted by price (cheapest first) and when clicking the product's name the detail view opens in a new window

***

`{module_productfeaturelist,special offer,3,price,_blank,true template="/layouts/custom/productfeaturelist.tpl"}` - lists the products that are tagged with the "special offer" tag using a custom template (the "true" parameter that states the backup template should be used is ignored). The products are sorted by price (cheapest first) and when clicking the product's name the detail view opens in a new window
