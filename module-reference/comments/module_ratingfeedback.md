<div class="description">
<h3 class="skiptoc">Description</h3>
<p>Displays user comments on an item.</p>
</div>
<div id="syntax">
<h3>Syntax</h3>
<p>{<span>module_ratingfeedback,date</span>}</p>
</div>
<div id="parameters">
<h3>Parameters</h3>
<ul>
    <li>date- if this parameter is present the comments are ordered newest first</li>
</ul>
</div>
<div id="layouts">
<h3>This module is rendered with these layouts</h3>
<ul>
    <li><a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/Comments/comment-layout" title="Comment layout">Comment layout</a></li>
    <li>This module also supports <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/custom-templates">custom templates</a></li>
</ul>
</div>
<div id="Examples">
<h3>Examples</h3>
<ul>
    <li>{<span>module_ratingfeedback,date</span>} - displays the comments newest first</li>
    <li>{<span>module_ratingfeedback template="/layouts/custom/comments.tpl"</span>} - displays the comments using the comments.tpl custom template</li>
</ul>
</div>
