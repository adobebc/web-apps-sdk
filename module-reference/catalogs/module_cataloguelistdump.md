<div class="description>">
<h3 class="skiptoc">Description</h3>
<p>Displays the List of all Catalogues as names that are links to those catalogues</p>
</div>
<div id="syntax">
<h3>Syntax</h3>
<p>{<span><span>module_cataloguelistdump,-1,rowLength,targetFrame,sortBy</span></span>}</p>
</div>
<div id="parameters">
<h3>Parameters</h3>
<ul>
<li>1 - Use -1 to display parent catalogs, use -2 to display all catalogs including sub-catalogs</li>
<li>rowLength - will limit the number of items per row when items are displayed as a list. Default is 1 item per row</li>
<li>targetFrame - e.g. _blank. Specify the frame you want the item to open in</li>

<li>sortBy - will sort the web apps in specified order
<ul>
<li>Alphabetical - sorts items alphabetically</li>
<li>Weight - sorts items by weight</li>
</ul>
</li>
</ul>

</div>
<div id="layouts">
<h3>This module is rendered with these layouts</h3>
<ul>
<li></li>
</ul>
</div>
<div id="Examples">
<h3>Examples</h3>
<ul>
<li>{<span><span>module_cataloguelistdump,-1,1,_blank,Alphabetical</span></span>} - this module will display the catalogue list in the new window, alphabetically and all in one column</li>
</ul>
</div>
</div>
