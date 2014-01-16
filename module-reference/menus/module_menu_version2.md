<div class="description">
<h3 class="skiptoc">Description</h3>
<p>Displays a single dynamic menu when placed on the page or a template. menuID is the ID of the particular dynamic menu and should not be changed. The ID is set by module manager when menu is inserted into the page.</p>
</div>
<div id="syntax">
<h3>Syntax</h3>
<p>{<span>module_menu, version="2", menuId="5475", moduleTemplateGroup="Default"</span>}</p>
</div>
<div id="parameters">
<h3>Parameters</h3>
<ul>
    <li>version - system generated (do not change)</li>
    <li>menuID - system generated menu id (do not change)</li>
    <li>moduleTemplateGroup - this is the path the menu layouts are located at - /ModuleTemplates/moduleTemplateGroup_folder_name</li>
</ul>
</div>
<div id="layouts">
<h3>This module is rendered with these layouts</h3>
<ul>
    <li>ModuleTemplates &gt; <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/MenuV2/container">container.html</a></li>
    <li>ModuleTemplates &gt; <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/MenuV2/children">children.html</a></li>
    <li>ModuleTemplates &gt; <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/MenuV2/group">group.html</a></li>
</ul>
</div>
<div id="Examples">
<h3>Examples</h3>
<ul>
    <li>{<span>module_menu, version="2", menuId="5475", moduleTemplateGroup="MyCustomMenu1"</span>} - this renders the menu with the ID 5475 using the layouts found at this path: /ModuleTemplates/MyCustomMenu1</li>
</ul>
</div>
