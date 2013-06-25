## {module_menu, version="2", menuId="5475", moduleTemplateGroup="Default"}

Rebders a single dynamic menu when placed on the page or a template. menuID is the ID of the particular dynamic menu and should not be changed. The ID is set by module manager when menu is inserted into the page.

### Parameters

* `version` - system generated (do not change)
* `menuID` - system generated menu id (do not change)
* `moduleTemplateGroup` - this is the path the menu layouts are located at - /ModuleTemplates/moduleTemplateGroup_folder_name

### Templates

* ModuleTemplates > container.html
* ModuleTemplates > children.html
* ModuleTemplates > group.html

### Examples

`{module_menu, version="2", menuId="5475", moduleTemplateGroup="MyCustomMenu1"}`

This module renders the menu with the ID 5475 using the layouts found at this path: /ModuleTemplates/MyCustomMenu1
