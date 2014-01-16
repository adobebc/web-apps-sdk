<div class="description">
<h3 class="skiptoc">Description</h3>
<p>Display all tags for specific blog</p>
</div>
<div id="syntax">
<h3>Syntax</h3>
<p>{<span>module_blogtaglist</span>}</p>
</div>
<div id="parameters">
<h3>Parameters</h3>
<ul>
    <li>blogId - ID of the targeted blog</li>
    <li>rowCount - number of rows to be generated (each tag is listed on a separate row, so if the row count is limited to 2, only the first 2 tags will  be generated)</li>
</ul>
</div>
<div id="layouts">
<h3>This module is rendered with these layouts</h3>
<ul>
    <li>-</li>
    <li>*The module outputs a generic list: </li>
    <li><img alt="module_blogtaglist_output" style="border: 0px none;" src="/kb_resources/screenshots/module_blogtaglist_output.png" /></li>
</ul>
</div>
<div id="Examples">
<h3>Examples</h3>
<p>{<span>module_blogtaglist,4168,3</span>} will output:</p>
<ul>
    <li> Tag 1 (1)</li>
    <li> Tag 2 (2)</li>
    <li> Tag 3 (1)</li>
</ul>
</div>
