<div class=""description"">
<h3 class=""skiptoc"">Description</h3>
<p>Displays the webapp items as pointers on a Google map.</p>
</div>
<div id=""syntax"">
<h3>Syntax</h3>
<p>{<span>module_webappsmap,Google key,,width,height,resultsPerPage</span>}</p>
</div>
<div id=""parameters"">
<h3>Parameters</h3>
<ul>
    <li>Google key - enter the Google Maps key here. To get a key please follow the steps described in <a href=""https://developers.google.com/maps/documentation/javascript/tutorial#api_key"">this article</a>.</li>
    <li>width - the width in pixels of the Google Maps canvas</li>
    <li>height - the height in pixels of the Google Maps canvas</li>
    <li>resultsPerPage - total number of items that will be rendered, enter ""-1"" to render all the items</li>
</ul>
</div>
<div id=""layouts"">
<h3>This module is rendered with these layouts</h3>
<ul>
    <li>This module does not use any layouts. The webapp items are plotted as pins on a Google map, for example:<img alt="""" src=""/kb_resources/screenshots/2013-03-28_1538.png"" style=""border:0px;  border-image: initial;"" /> </li>
</ul>
</div>
<div id=""Examples"">
<h3>Examples</h3>
<ul>
    <li>{<span>module_webappsmap,56,a,,MY_GOOGLE_KEY,400,400,-1}</span>} - displays all the webapp items on a 400px x 400px Google map</li>
</ul>
</div>
