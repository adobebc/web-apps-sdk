<div class="description">
<h3 class="skiptoc">Description</h3>
<p>Displays the webapp search results as pointers on a Google map. This module can be used together with <a href="/kb/modules-and-tags-reference/modules/web-apps/module_webappsresults" title=" module_webappsresults ">{<span>module_webappsresults</span>}</a></p>
</div>
<div id="syntax">
<h3>Syntax</h3>
<p>{<span>module_webappsresultsmap,Google key,width,height,resultsPerPage,sort type</span>}</p>
</div>
<div id="parameters">
<h3>Parameters</h3>
<ul>
    <li>Google key - enter the Google Maps key here. To get a key please follow the steps described in <a href="https://developers.google.com/maps/documentation/javascript/tutorial#api_key">this article</a>.</li>
    <li>width - the width in pixels of the Google Maps canvas</li>
    <li>height - the height in pixels of the Google Maps canvas</li>
    <li>resultsPerPage - total number of items that will be rendered, enter "-1" to render all the items</li>
    <li>sort type
    <ul>
        <li>ALPHABETICAL (default) - items are sorted in alphabetical order form A-Z</li>
        <li>DATE - items are sorted from newest to oldest. The most recent item is displayed first.</li>
        <li>DATEREVERSE - will display the web app items oldest to newest</li>
        <li>weightreverse - allows you to display the web apps by weight but in reverse, that is the item with the smallest weight is displayed first.</li>
    </ul>
    </li>
</ul>
</div>
<div id="layouts">
<h3>This module is rendered with these layouts</h3>
<ul>
    <li>This module does not use any layouts. The webapp search result items are plotted as pins on a Google map, for example:<img alt="" src="/kb_resources/screenshots/2013-03-28_1538.png" style="border:0px;  border-image: initial;" /> </li>
</ul>
</div>
<div id="Examples">
<h3>Examples</h3>
<ul>
    <li>{<span>module_webappsresultsmap,MY_GOOGLE_MAPS_KEY,400,400,-1,default</span>} - displays all the search result webapp items ordered alphabetically on a 400px x 400px Google map</li>
</ul>
</div>
