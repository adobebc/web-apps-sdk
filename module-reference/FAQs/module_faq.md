<div class="description">
<h3 class="skiptoc">Description</h3>
<p>Displays a list of FAQ items.
</p>
</div>
<div id="syntax">
<h3>Syntax</h3>
<p>{<span>module_faq,filter,id,noTemplate,effect,targetFrame</span>}</p>
</div>
<div id="parameters">
<h3>Parameters</h3>
<ul>
    <li>filter - filtering criteria for display and can be one of the following:
    <ul>
        <li>i - individual item</li>
        <li>a - all items</li>
        <li>l - latest items</li>
        <li>r - random item</li>
        <li>cr - displays a random item in a particular category</li>
    </ul>
    </li>
    <li>id &ndash; system generated (do not change)</li>
    <li>noTemplate &ndash; if you want to force the item not to use a site-level template when displayed pass in true, otherwise leave empty</li>
    <li>effect &ndash; Enter ajax if you want to take advantage of the latest web technologies for a better customer experience</li>
    <li>targetFrame &ndash; the frame in which to open the item in</li>
</ul>
</div>
<div id="layouts">
<h3>This module is rendered with this layout</h3>
<ul>
    <li><a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/FAQs/faqs-list-layout">FAQ list layout</a></li>
    <li>This module also supports <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/custom-templates">custom templates</a></li>
</ul>
</div>
<div id="Examples">
<h3>Examples</h3>
<ul>
    <li>{<span>module_faq,a,,,,_parent</span>} - will display all FAQs and open them in parent frame.</li>
    <li>{<span>module_faq,a, template="/layouts/custom/faq.tpl"</span>} - will display all FAQs using the faq.tpl custom template.</li>
    <li>{<span>module_faq,l,5</span>} - will display the latest 5 FAQs.</li>
    <li>{<span>module_faq,r,,true,ajax,_blank</span>} - will open a random item in a new window and will not apply the template and will use the Ajax effect where the detailed content opens right underneath the FAQ name.</li>
</ul>
</div>
