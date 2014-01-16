<div class="description">
<h3 class="skiptoc">Description</h3>
<p>Displays Customer's Order History (must be logged in to secure zone).</p>
</div>
<div id="syntax">
<h3>Syntax</h3>
<p>{<span>module_order,filter,SystemID,SortType,flat</span>}</p>
</div>
<div id="parameters">
<h3>Parameters</h3>
<ul>
    <li>filter - filtering criteria for display and can be one of the following:
    <ul>
        <li>a - all items</li>
        <li>c - all items in a particular workflow classification</li>
    </ul>
    </li>
    <li>SystemID - system generated, do not change - appears only when selecting "all items in a workflow" as a display criteria (a/c)</li>
    <li>SortType- system generated (do not change)
    <ul>
        <li>Default - Sorts the orders by date</li>
        <li>Alphabetical - Sorts the orders alphabetically</li>
    </ul>
    </li>
    <li>flat: if added, outputs the tags from the <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/Orders/order-list-layout" title=" module_booking ">List Layout</a> separately for each product inside the order </li>
</ul>
</div>
<div id="layouts">
<h3>This module is rendered with these layouts</h3>
<ul>
    <li><a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/Orders/order-list-layout" title=" module_booking ">List Layout</a></li>
    <li>This module also supports <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/custom-templates">custom templates</a></li>
</ul>
<div id="Examples"><a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/Orders/order-list-layout" title=" module_booking ">
</a>
<h3>Examples</h3>
<ul>
    <li>{<span>module_order,c,10044,Default</span>} - will display all orders that belong to workflow with ID of 10044, sorting them by date</li>
    <li>{<span>module_order,a,Alphabetically,flat</span>} - will display all orders, alphabetically, also displaying every product within each order</li>
</ul>
</div>
</div>
