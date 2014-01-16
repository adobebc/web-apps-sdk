<div class="description">
<h3 class="skiptoc">Description</h3>
<p>This module can only be used in conjuction with a product search form. Whenever you insert a product search form into a page the system also adds the {<span>module_productresults</span>} module right after the form. When viewed in the front end this module does not render anything until the form's "Search" button is presed and a search is triggered.  This module and the product search form can also be placed on different pages, take a look at <a target="new" href="http://forums.adobe.com/docs/DOC-1775">this article</a> for more details on this particular setup.</p>
</div>
<div id="syntax">
<h3>Syntax</h3>
<p>{<span>module_productresults, rowLength, targetFrame, resultsPerPage, sortType, hideEmptyMessage, useLi</span>}</p>
</div>
<div id="parameters">
<h3>Parameters</h3>
<ul>
    <li>rowLength - will limit the number of items per row when items are displayed as a list. Default is 1 item per row.</li>
    <li>targetFrame - possible values are  _blank, _self and _top. This parameter is used to specify the frame you want the item to open in.</li>
    <li>resultsPerPage - specifies the number of results the search will display per page.</li>
    <li>sortType - sortType can be alphabetical, price, date, or weight. Do note <strong>the sortType is ignored if the "Sort By" field is present</strong> in the product search form.</li>
    <li>hideEmptyMessage - specify True if you don't want the No Items Found message to be displayed</li>
    <li>UseLi - specify True to render the output in Li's instead of tables</li>
</ul>
</div>
<div id="layouts">
<h3>This module is rendered with these layouts</h3>
<ul>
    <li>Online Shop Layouts &gt; <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/e-commerce/individual-product-small">Individual Product - Small</a></li>
    <li>This module also supports <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/custom-templates">custom templates</a></li>
</ul>
</div>
<div id="Examples">
<h3>Examples</h3>
<ul>
    <li>{<span>module_productresults,4,_blank,10,,true</span>} - displays the products that match the search criteria 4 per rotw, 10 per page and hides the "No products found matching your query." if no products are found. The structure rendered is a table. When clicking the product name the detail view (rendered using the <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/e-commerce/individual-product-large">Individual Product - Large</a> layout) opens up in a new tab.</li>
    <li>{<span>module_productresults,,_self,2,,,true</span>} - displays the products that match the search criteria 2 per page and renders "No products found matching your query." if no products are found. The structure rendered is an unordered list. When clicking the product name the detail view (rendered using the <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/e-commerce/individual-product-large">Individual Product - Large</a> layout) opens up in the same tab.</li>
    <li>{<span>module_productresults,2,_self,2,,,true  template="/layouts/custom/moduleproductresults.tpl"</span>} - displays the products that match the search criteria 2 per page and renders "No products found matching your query." if no products are found. The structure is no longer an unordered list as it is in the example above, the <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/custom-templates">custom template</a> is used instead.</li>
</ul>
</div>
