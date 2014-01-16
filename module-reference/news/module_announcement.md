<div class="description">
<h3 class="skiptoc">Description</h3>
<p>This module displays a list of news items to a page.
</p>
</div>
<div id="syntax">
<h3>Syntax</h3>
<p>{<span>module_announcement, filter, id, noTemplate, effect, target, reserved, reserved, reserved, length, sort</span>}</p>
</div>
<div id="parameters">
<h3>Parameters</h3>
<ul>
    <li>filter - filtering criteria for display and can be one of the following:
    <ul>
        <li>i - individual item</li>
        <li>a - all items</li>
        <li>c - all items in some category</li>
        <li>cl - latest items in some category</li>
        <li>l - latest items</li>
        <li>r - random item</li>
        <li>cr - displays a random item in a particular category</li>
    </ul>
    </li>
    <li>id &ndash; system generated (do not change)</li>
    <li>noTemplate &ndash; if you want to force the item not to use a site-level template when displayed pass in true, otherwise leave empty</li>
    <li>effect &ndash; enter "ajax" (see the examples below) if you want to take advantage of the latest web technologies for a better customer experience</li>
    <li>target &ndash; the frame in which to open the item in</li>
    <li>reserved - for use in a future release</li>
    <li>length - this parameter is only used when the filter is either "l" or "cl" and dictates how many items are rendered per row</li>
    <li>sort - if you leave this parameter blank, by default announcements will be sorted from the latest to the oldest where the latest is displayed first
    <ul>
        <li>alphabetical - will sort announcements alphabetically</li>
        <li>datereverse - will sort announcements in the reverse order, that is from the oldest to the latest</li>
    </ul>
    </li>
</ul>
</div>
<div id="layouts">
<h3>This module is rendered with these layouts</h3>
<ul>
    <li>News Layouts &gt;&nbsp;<a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/News/news-list-layout" title="News List Layout">News List Layout</a></li>
    <li>This module also supports <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/custom-templates">custom templates</a></li>
</ul>
</div>
<div id="Examples">
<h3>Examples</h3>
<ul>
    <li>{<span>module_announcement,a,,,,_parent</span>} - will display all news items and open them in parent frame </li>
    <li>{<span>module_announcement,l,5</span>} - will display the latest 5 news</li>
    <li>{<span>module_announcement,r,,true,ajax,_blank,,,,,datereverse</span>} - will open a random item in a new window and will not apply the template and will use the Ajax effect where the detail content opens right underneath the news name and all the news items will be displayed from the oldest to the latest </li>
    <li>{<span>module_announcement,cl,34392,,ajax,,,,,5</span>} - will display the 5 latest news items in the category with the ID 34392</li>
    <li>{<span>module_announcement,a,,,ajax,_blank template="/Layouts/Custom/news.tpl"</span>} - will display all the news items using the "ajax" effect using the news.tpl <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/custom-templates">custom template</a> </li>
</ul>
</div>
