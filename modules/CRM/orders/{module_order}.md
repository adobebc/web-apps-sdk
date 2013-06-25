## {module_order,filter,SystemID,SortType,flat}

*Visitor must be logged in to a Secure Zone.* 

Displays Customer's Order History.

### Parameters

* `filter` - filtering criteria for display and can be one of the following:
	* a - all items
	*c - all items in a particular workflow classification
* `SystemID` - system generated, do not change - appears only when selecting "all items in a workflow" as a display criteria (a/c)
* `SortType` - system generated (do not change)
	* Default - Sorts the orders by date
	* Alphabetical - Sorts the orders alphabetically
* `flat` - if added, outputs the tags from the List Layout separately for each product inside the order

### Templtes

* List Layout
* This module also supports custom templates

**Examples**

`{module_order,c,10044,Default}`

Renders all orders that belong to workflow with ID of `10044`, sorting them by date.

***

`{module_order,a,Alphabetically,flat}`
 
Renders all orders, alphabetically, also displaying every product within each order