<div class="description">
<h3 class="skiptoc">Description</h3>
<p>Displays customer's case history within a secure zone, so, when customer logs in he/she is identified by the system and this module displays all their previous form submissions, according to the "case list layout" in Admin -&gt; More Customization Options. Customer can view each case and download files attached to the case.
</p>
</div>
<div id="syntax">
<h3>Syntax</h3>
<p>{<span>module_case,filter,workflowID,sortBy,templateId</span>}</p>
</div>
<div id="parameters">
<h3>Parameters</h3>
<ul>
    <li>filter - sets display criteria.
    <ul>
        <li>a - displays all items that belong to that customer</li>
        <li>c - display all cases that have a particular workflow assigned to them. Please note that only if this filter is used is the workflowID used as a next parameter. The best way to set the ID is to use module manager.</li>
    </ul>
    </li>
    <li>sortBy - allows you to select the order in which you want to sort the items.
    <ul>
        <li>Default - default sort here is Date Created</li>
        <li>Subject - sorts items according to the subject name alphabetically</li>
    </ul>
    </li>
    <li>templateId - the sitewide template used to display the case details page</li>
</ul>
</div>
<div id="layouts">
<h3>This module is rendered with these layouts</h3>
<ul>
    <li>This module is rendered with the <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/Cases/cases-detail-layout">Detail Layout</a></li>
    <li>This module also supports <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/custom-templates">custom templates</a></li>
    <li>User must be logged in in order for the module to render </li>
</ul>
</div>
<div id="Examples">
<h3>Examples</h3>
<ul>
    <li>{<span>module_case,a,,Default</span>}- This module will display all the cases that belong to a particular customer and those will be sorted by date</li>
    <li>{<span>module_case,a,,Subject</span>}- This module will display all the cases that belong to a particular customer and those will be sorted by subject which is the web form name if generated automatically and will be displayed alphabetically</li>
    <li>{<span>module_case,c,25261,Default,1440381</span>}- This module will display all cases that have workflow 25261 assigned to them, sort them by date, and assign template id #1440381 to the detail list for each case opened from the generated list </li>
</ul>
</div>
