<div class="description">
<h3 class="skiptoc">Description</h3>
<p>You can add additional parameters to the Photo Gallery module to customize it further:</p>
<p>{<span>module_photogallery,ID,rowLength,targetFrame,resultsPerPage,Width,Height,UseStandardMethod</span>}</p>
</div>
<div id="syntax">
<h3>Syntax</h3>
<p>{<span>module_photogallery,ID,rowLength,targetFrame,resultsPerPage,Width,Height,UseStandardMethod</span>}</p>
</div>
<div id="parameters">
<h3>Parameters</h3>
<ul>
    <li>ID - System generated ID (Do not change this number.)</li>
    <li>rowLength - Set the number of photos displayed per row</li>
    <li>targetFrame - Set the destination frame where the photos will open (such as _blank)</li>
    <li>resultsPerPage - Set the number of photos displayed per page</li>
    <li>Width/Height - Set the width and height of the  						thumbnail images. The default value is 80 pixels wide by 80 pixels high.</li>
    <li>UseStandardMethod - Use the standard Thumbnail Generation.  Set to False for better thumbnail quality (with increased file size).</li>
</ul>
</div>
<div id="layouts">
<h3>This module is rendered with these layouts</h3>
<ul>
    <li>This module does not use any layouts, it outputs the images in a table like so:<img alt="" src="/kb_resources/screenshots/2013-04-01_1552.png" style="border:0px;  border-image: initial;" /></li>
</ul>
</div>
<div id="Examples">
<h3>Examples</h3>
<li>{<span>module_photogallery,26800,4,,12,120,120,true</span>} - this displays 4 photos per line and a maximum of 12 photos per page. The thumbnail size has also been set to 120x120 pixels</li>
<p>
Note: If an image is 640 pixels wide x 400 pixels high and you set the thumbnail size to 120 x 120 pixels the thumbnail image will have a maximum width of 120 and a smaller height. Proportions are respected when creating the thumbnail image. Alternatively if the image dimensions are 400 pixels wide x 640 pixels high then the height will be 120 pixels and the width smaller. The thumbnail size dictates the maximum width or the maximum height of the image.
</p>
</div>
