<div class="description">
<h3 class="skiptoc">Description</h3>
<p>Displays the summary of the cart on the current catalogue page or web page. It will display "Shopping cart is empty." when the cart is empty and something like this when you have a product in it - "1 item(s), Total: $12.00 View Cart". Pressing "View Cart" will direct the user to the Shopping Cart that renders with <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/modules/e-Commerce/Checkout/module_shoppingcartsummary">this layout</a>.</p>
</div>
<div id="syntax">
<h3>Syntax</h3>
<p>{<span>module_shoppingcartsummary,Vertical,quote</span>}</p>
</div>
<div id="parameters">
<h3>Parameters</h3>
<ul>
    <li>Vertical - renders details vertically. Default is that the output is displayed horizontally</li>
    <li>isQuote</li>
</ul>
</div>
<div id="layouts">
<h3>This module is not rendered with any layouts:</h3>
<ul>
    <li>Its output is always the same: "X item(s), Total: CURRENCY_SYMBOL CART_VALUE View Cart"</li>
</ul>
</div>
<div id="Examples">
<h3>Examples</h3>
<ul>
    <li>{<span>module_shoppingcartsummary,true,false</span>} - this module will display the output vertically.</li>
</ul>
</div>
