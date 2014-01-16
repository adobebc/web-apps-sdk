<div class="description">
<h3 class="skiptoc">Description</h3>
<p>Displays a hyperlink that points to the referring page.</p>
</div>
<div id="syntax">
<h3>Syntax</h3>
<p>{<span>module_referreraddress,target,text</span>}</p>
</div>
<div id="parameters">
<h3>Parameters</h3>
<ul>
    <li>target - this is the hyperlink's target</li>
    <li>text - this is the hyperlink's text</li>
</ul>
</div>
<div id="Examples">
<h3>Examples</h3>
<ul>
    <li>{<span>module_referreraddress,_top,Previous link</span>} - this will output a hyperlink that points to the previous page the site visitor was visiting. For example if one goes to the mysite.com/page1 and on that page clicks a link and navigates to mysite.com/page2 the module will output this link - &lt;a href="http://mysite.com/page1" target="_top"&gt;Previous link&lt;/a&gt;</li>
</ul>
</div>
