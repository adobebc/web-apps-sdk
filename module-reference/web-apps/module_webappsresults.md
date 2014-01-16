<div class="description">
<h3 class="skiptoc">Description</h3>
<p>Displays web app search results.
</p>
</div>
<div id="syntax">
<h3>Syntax</h3>
<p>{<span>module_webappsresults,notUsed,target,bkp,resultsPerPage,hideEmptyMessage,rowLength,sort</span>}</p>
</div>
<div id="parameters">
<h3>Parameters</h3>
<ul>
    <li>notUsed - RESERVED (please do not use this space)</li>
    <li>target - e.g. _blank. Specify the frame you want the item to open in</li>
    <li>bkp- specify True if you want to use the backup list template or leave empty</li>
    <li>resultsPerPage - total number of items per page before pagination is used</li>
    <li>hideEmptyMessage - specify True if you don't want the No Items Found message to be displayed.</li>
    <li>rowLength - will limit the number of items per row when items are displayed as a list. Default is 1 item per row.</li>
    <li>sort
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
    <li>Web App Layouts &gt;&nbsp;<a href="/kb/modules-and-tags-reference/layouts/WebApps/webapp-list-layout ">List Layout </a></li>
    <li>This module also supports <a href="/kb/modules-and-tags-reference/layouts/custom-templates">custom templates</a></li>
</ul>
</div>
<div id="Examples">
<h3>Examples</h3>
<ul>
    <li>{<span>module_webappsresults,,_blank,true,16,true,3,REVERSEDATE</span>} - This module will display the web app search results</li>
    <li>{<span>module_webappsresults template="/layouts/custom/walist.html"</span>} - This module will display the web app search results using the walist.html <a href="/kb/modules-and-tags-reference/layouts/custom-templates">custom template</a></li>
</ul>
</div>
