## Getting started with Open Admin

This guide will teach 
, you'll learn how to customize the Admin Console using Open Admin, and see working examples these customizations.
 
The new "Open Admin" concept enables Business Catalyst partners to deliver a unique experience for business clients (admin users) by providing a completely customized Admin Console. Through the Open Admin notion, various areas of the Admin Console can be customized. These areas include the main navigation menu on the left, and the ribbon in the upper section of the Admin Console. Customization capabilities include adding or removing menu items, or updating existing items.
  
### Customizing the Admin Console  menus

The Admin Console menu customization is done all done using files in JSON format. Unlike other site settings, there is no Business Catalyst UI standardization restrictions. This means that  these customized files can be easily copied from one site to another.
 
To customize the menu, first create the following folder:
 
`_config/`
 
This folder can be created in any directory on your site, you can create as many _config/ folders as needed. The next step is to create the below file within _config/ folder:
 
`menu.json`

### Examples

#### 1. Rename an item

This exaxmple renames the "CRM" menu item to "Members".
 
File Location: */_System/my-custom-stuff/_config/menu.json*
 

```
{
 
"menu-customers": {
 
"title": "Members"
}
 
}

```

The file format is a list of key-value entries:

* key: id of the entry, as found by inspecting the menu items DOM (e.g. Right click > Inspect element in Chrome). 
 
* value: object with various properties
 
If the entry id already exists in the menu, your changes will apply to the existing entry. Otherwise, a new entry will be added. 
 
#### 2. Reposition an element

This example moves the  "Reports" tab in the menu to be the 2nd menu item.
 
File location: */_System/financial-vertical-sites/_config/menu.json*

```
{
 
"menu-reports": {
 
"weight": 11000
 
}
 
}

``` 
 
Each menu item has a weight property, and menu items are sorted by weight. The default menu item weights are:
 
* 10000 for Dashboard
* 20000 for Site Manager
	* 10000 for Pages
	* 20000 for Page Templates
	* and so on
* 30000 for Web Apps
* and so on
 
If you want to add a new entry between Dashboard and Site Manager, use a weight between 10001 and 19999. When there are two items with the same weight added, they'll be sorted alphabetically by title.
 
The example above overwrites the default weight for Reports (80000) to 11000.

#### 3. Remove an item

This example removes the Settings > Sitemap entry for all users.

```

{
 
"menu-settings-site-map": {
 
"visible": false
 
}
 
}

```
 
#### 4. Add a multi level menu item

This exmaple adds a "Google Apps" menu entry at the bottom of the menu list with links to Webmail & Drive.
/google/_config/menu.json

```
{
 
"menu-test1_google": {
 
"weight": 500000,
 
"icon": "/google/icons/google.png",
 
"title": "Google Apps"
 
},
 
"menu-test1_google-webmail": {
 
"parent": "menu-test1_google",
 
"weight": 10,
 
"title": "Webmail",
 
"attr": {
 
"href": "https://mail.google.com",
 
"target": "_blank"
 
}
 
},
 
"menu-test1_google-drive": {
 
"parent": "menu-test1_google",
 
"weight": 20,
 
"title": "Drive",
 
"attr": {
 
"href": "https://drive.google.com",
 
"target": "_blank"
 
}
 
}
 
}
 
``` 

For any items you add, we recommend you give this a unique name, such as adding a prefix of your company name. This will avoid any conflicts if you implement files from other partners/users. Example: "acmedesign_google" in place of "google".
 
**Important note:* The menu ids have to start with the following:

* "menu-" (for navigation menu on left)
* "ribbon-" (for navigation ribbon at top)

#### 5. Add localized titles and links

This example displays a localized version of menu items.
 
Depending on the customer's language setting for the Admin Console, you can display different link titles and URLs. The 'title' and 'attr' parameters also accept a key-value object, besides a string: 
 
``` 
{
 
"menu-my_agency_blog-authors": {
 
"parent": "menu-my_agency_blog",
 
"weight": 20,
 
"title": {
 
"en": "Authors",
 
"fr": "Les authors"
 
},
 
"attr": {
 
"href": {
 
"en": "/blog/manageAuthorsEn.html",
 
"fr": "/blog/manageAuthorsFr.html"
 
}
 
}
 
}
 
}

```

Business Catalyst will use the values corresponding to the current users' language, as selected in User > My Details. Accepted language codes:
 
* `en`
* `de`
* `es`
* `fr`
* `se`
* `nl`
* `jp`
 
If the current users' language doesn't match any of the values you provided, the default "en" entry will be used. Therefore, it is required to always define "en". 
 
#### 6. Display an entry only if another item is present
 
This example displays an entry based on a blog created using two webapps, posts and authors. The top-level menu entry is called "Blog", with child entry items of "Posts" and "Authors". In this example, the Web App entries are also hidden.
 
File location: */blog/_config/menu.json*

```
 
{
 
"menu-my_agency_blog": {
 
"weight": 25200,
 
"icon": "/blog/icons/blog.png",
 
"title": "Blog"
 
},
 
"menu-my_agency_blog-posts": {
 
"parent": "menu-my_agency_blog",
 
"weight": 10,
 
"title": "Posts",
 
"attr": {
 
"href": "/blog/managePosts.html"
 
}
 
},
 
"menu-my_agency_blog-authors": {
 
"parent": "menu-my_agency_blog",
 
"weight": 20,
 
"title": "Authors",
 
"attr": {
 
"href": "/blog/manageAuthorsEn.html"
 
}
 
},
 
"menu-webapps-posts": {
 
"visible": false,
 
"applyIf": {
 
"menusExist" : ["menu-webapps-posts"]
 
}
 
},
 
"menu-webapp-authors": {
 
"visible": false,
 
"applyIf": {
 
"menusExist" : ["menu-webapps-authors"]
 
}
 
}
 
}

```
 
**Notes:** 

* The `applyIf:` changes to that menu item will be applied only if the item already exists. This way we prevent creating a new menu entry on sites which don't have this webapp.

* The  ID of the menu item corresponding to webapp "Posts" will be:
  
  `menu-webapp-posts` (a *slug* version of your Web app name)

* You can not have 2 or more Web Apps with the same name. This is currently not supported, however there are plans of having vendor prefixes per webapp to solve duplicate menu IDs and other issues.
 
#### 7. Only display an item if the user is in a certain role
 
In this example, we will update the blog example above, so that the default Web App menus are hidden from business owners, and only visible to the partner.
 
The first step is to create a role, example: "Business Owner" and add your clients to that role. 
 
The next step is to hide the Web App menus for the new Business Owner role.
 
File location: */blog/_config/menu.json*

```
{
 
"menu-webapps-posts": {
 
"visible": false,
 
"applyIf": {
 
"menusExist" : ["menu-webapps-posts"],
 
"userHasRoles" : ["Business Owner"]
 
}
 
},
 
"menu-webapp-authors": {
 
"visible": false,
 
"applyIf": {
 
"menusExist" : ["menu-webapps-authors"],
 
"userHasRoles" : ["Business Owner"]
 
}
 
}
 
}

```
 
#### 8. Using all the features above
 
In this example we will add several localized menu items that have user roles based conditions as well as dependencies (see example 6).
 
The code below will achieve the following:
 
* Add a "Useful links" section with child items that point to various panels in the Admin Console.
* Add a  Blog section that appears only if the "Useful links" section is present.
* The Blog section has  child items that point to 2 external pages.
* If the user has the Admin Console language set to "Francais", the Blog section sub menus will be in French.
* The "Reports" tab is hidden for anyone that is not in the Administrators2 role.
 
File location: */test3/_config/menu.json*

```
 
{
 
"menu-customers": {
 
"title": "Members"
 
},
 
 
 
 
 
"menu-useful_stuff": {
 
"weight": 11000,
 
"icon": "/AdminConsole/static/images/icons/webforms.png",
 
"title": "Useful links"
 
},
 
"menu-useful_pages": {
 
"parent": "menu-useful_stuff",
 
"weight": 10000,
 
"title": "Pages",
 
"attr": {
 
"href": "/Admin/WebPagesv3.aspx"
 
}
 
},
 
"menu-useful_pages": {
 
"parent": "menu-useful_stuff",
 
"weight": 10000,
 
"title": "Pages",
 
"attr": {
 
"href": "/Admin/WebPagesv3.aspx"
 
}
 
},
 
"menu-useful_domain": {
 
"parent": "menu-useful_stuff",
 
"weight": 20000,
 
"title": "Domain settings",
 
"attr": {
 
"href": "/Admin/Websites.aspx"
 
}
 
},
 
"menu-useful_Emails": {
 
"parent": "menu-useful_stuff",
 
"weight": 30000,
 
"title": "Email Users",
 
"attr": {
 
"href": "/AdminConsoleXT/#emailaccounts"
 
}
 
},
 
"menu-useful_Users": {
 
"parent": "menu-useful_stuff",
 
"weight": 30000,
 
"title": "Admin Users",
 
"attr": {
 
"href": "/AdminConsoleXT/#adminusers"
 
}
 
},
 
"menu-useful_Products": {
 
"parent": "menu-useful_stuff",
 
"weight": 40000,
 
"title": "Products",
 
"attr": {
 
"href": "/Admin/Products.aspx"
 
}
 
},
 
"menu-useful_Catalogs": {
 
"parent": "menu-useful_stuff",
 
"weight": 50000,
 
"title": "Catalogs",
 
"attr": {
 
"href": "/Admin/Catalogues.aspx"
 
}
 
},
 
"menu-my_agency_blog": {
 
"weight": 25200,
 
"icon": "/AdminConsole/static/images/icons/webforms.png",
 
"title": "Blog"
 
},
 
"menu-my_agency_blog-posts": {
 
"parent": "menu-my_agency_blog",
 
"weight": 10,
 
"title": {
 
"en": "Posts",
 
"fr": "Billet de blog"
 
},
 
"attr": {
 
"href": {
 
"en": "http://forceful1.bcrb.tk/portfolio-big-layout",
 
"fr": "http://forceful1.bcrb.tk/contact"
 
}
 
}
 
},
 
"menu-my_agency_blog-authors": {
 
"parent": "menu-my_agency_blog",
 
"weight": 20,
 
"title": {
 
"en": "Authors",
 
"fr": "Les authors"
 
},
 
"attr": {
 
"href": {
 
"en": "http://forceful1.bcrb.tk/shop",
 
"fr": "http://forceful1.bcrb.tk/contact"
 
}
 
 
 
}
 
},
 
"menu-webapps-posts": {
 
"visible": false,
 
"applyIf": {
 
"menusExist" : ["menu-useful_stuff"]
 
}
 
},
 
"menu-webapp-authors": {
 
"visible": false,
 
"applyIf": {
 
"menusExist" : ["menu-useful_stuff"]
 
}
 
},
 
 
 
"menu-reports":{
 
"visible":false,
 
"applyIf": {
 
"userHasRoles" : ["Administrators2"]
 
}
 
}
 
}
 
``` 

#### 9. Add a "Training" link in the top navigation ribbon

File location: */test1/_config/menu.json*
 
```

{
 
"ribbon-test1_training": {
 
"weight": 500000,
 
"icon": "/icons/training.png",
 
"title": "Training"
 
}
 
}

```
  
Since there is no "target: _blank" attribute, the content will be opened inside admin console.

