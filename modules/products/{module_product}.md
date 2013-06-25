##{module_product,catID,prodID,targetFrame}

Displays an individual product from a given catalogue on a web page according to the Individual Product - Small layout.

### Parameters

* `catID` - system generated catalogue id (do not change)
* `prodID` - system generated product id (do not change)
* `targetFrame` - possible values are _blank, _self and _top. This parameter is used to specify the frame you want the item to open in.

### Templates

* Online Shop Layouts > Individual Product - Small
* Online Shop Layouts > Individual Product - Small {Backup)
* This module also supports custom templates

### Examples

`{module_product,591,166845,_blank}`

Renders a single product according to the Individual Product - Small template. If one clicks the product link the product detail window will open in a new tab.

***

`{module_product,63882,5450055,_top template="/layouts/custom/productfeaturelist.tpl"}`

Renders an individual product using a custom module template.
