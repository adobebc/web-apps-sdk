## Getting started with Open Admin

Through step by step instructions and working examples, this guide will teach you how to customize the Business Catalyst Admin Console using the Open Admin method.

The *Open Admin* method enables Business Catalyst partners to deliver a unique experience for business clients (admin users) by providing a completely customized Admin Console. Through the Open Admin concept, various areas of the Admin Console can be customized. These areas include the main navigation menu on the left, and the ribbon in the upper section of the Admin. Customization capabilities include adding/removing menu items, or updating existing items.
  
### Preparing your project files

The Admin Console menu customization is done all done using files in *JSON* format. Unlike other site settings, there is no site specific ids or references. This means that these customized files can be easily copied from one site to another.
 
To start customizing the admin menus, the first step is to create the following folder:
 
`_config/`
 
This folder can be created in any directory on your site, and you can create as many _config/ folders as needed. The next step is to create the below file within _config/ folder:
 
`menu.json`

All the below customizations are added to the new menu.json file.

### Customizing menu items

There are a number of customization options available, these options include:

* Renaming menu items
* Repositioning menu items in the menu tree
* Adding a menu item
* Removing a menu item
* Adding language specific item (localized)
* Displaying an item based on the presence of another menu item
* Adding User Role sepcific menu items

To target a menu item element, use the id of the entry. You can get the id by inspecting the menu items DOM (e.g. Right click > Inspect element in Chrome). The id is in the below format:

`menu-item-name`

When adding or targeting a menu item, ensure that the ids start with the following:

* "menu-" (for navigation menu on left)
* "ribbon-" (for navigation ribbon at top)

For a full list of menu item names, ids and deafult weights, see the [Targeting Menu Elements](/content/developer-guides/open-admin/targeting-menu-elements.html) reference.

**Note:** If you are working with Web Apps, you can not have 2 or more Web Apps with the same name. This is currently not supported, however there are plans of having vendor prefixes per webapp to solve duplicate menu IDs and other issues.

#### Renaming or adding menu items

To rename a menu item, you first need to target the item, and then use the `title` attribute as shown below:


```

{
 
"menu-**Existing menu item name** ": {
 
"title": "**New item name**"
}
 
}

~~~

* Replace the *Existing menu item name* section, with one of the current menu items.
* Replace the *New item name* with your own customized name

If the entry id already exists in the menu, your changes will apply to the existing entry. Otherwise, a new entry will be added. 

**Example**

This exaxmple renames the "CRM" menu item to "Members".
 
File Location: */_System/my-custom-stuff/_config/menu.json*
 
~~~

{
 
"menu-customers": {
 
"title": "Members"
}
 
}

~~~


#### Adding a menu item to the top navigation ribbon

Adding an item to the top navigation ribbon is similar to the above method. You need to use "ribbon-item-name" in place of "menu-item-name. See below example:

**Example**

File location: */test1/_config/menu.json*
 
~~~

{
 
"ribbon-test1_training": {
 
"weight": 500000,
 
"icon": "/icons/training.png",
 
"title": "Training"
 
}
 
}

~~~
  
Since there is no "target: _blank" attribute, the content will be opened inside admin console.


#### Adding sub menu items

To create sub menu items, first target the menu items name you want to create, then use the `parent` attribute to set this as a sub menu item.

This exmaple adds a "Google Apps" menu entry at the bottom of the menu list with links to Webmail & Drive.
/google/_config/menu.json

**Note:** For any items you add, it is recommended you give this a unique name, such as adding a prefix of your company name. This will avoid any conflicts if you implement files from other partners/users. Example: "acmedesign_google" in place of "google".

~~~

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
 
~~~

#### Repositioning menu items in the menu tree

Each menu item has a weight property, and menu items are sorted by weight. To reposition an item in the menu tree, first target the item, and then use the `weight` attribute as shown below:

~~~

{
 
"menu-":**Existing menu item name** {
 
"weight": **weight as a whole number**
 
}
 
}

~~~ 

For a full list of default weights, see the [Targeting Menu Elements](/content/developer-guides/open-admin/targeting-menu-elements.html) reference.

If you want to add a new entry between Dashboard and Site Manager, use a weight between 10001 and 19999. When there are two items with the same weight added, they'll be sorted alphabetically by title.

**Example**

This example overwrites the default weight for Reports (80000) to 11000 which moves the "Reports" tab in the menu to be the 2nd menu item.

File location: /System/financial-vertical-sites/config/menu.json

~~~

{
 
"menu-reports": {
 
"weight": 11000
 
}
 
}

~~~ 

#### Removing an item

To hide a menu item from the tree, first target the item and then set the `visible:` attribute to `false` as below:

~~~

{
 
"menu-**Existing menu item name**": {
 
"visible": false
 
}
 
}

~~~

**Example**


This example removes the Settings > Sitemap entry for all users.

~~~

{
 
"menu-settings-site-map": {
 
"visible": false
 
}
 
}

~~~


#### Adding localized names and links

Depending on the admin users language setting for the Admin Console, you can display different link titles and URLs. 

Business Catalyst will use the values corresponding to the current users' language, as selected in User > My Details. See below accepted language codes:
 
* `en`
* `de`
* `es`
* `fr`
* `se`
* `nl`
* `jp`
 
If the current users' language doesn't match any of the values you provided, the default "en" entry will be used. Therefore, it is required to always define "en". 

The 'title' and 'attr' parameters also accept a key-value object as well as string. See below example.

**Example**

The below example displays a localized version of the "Authors" sub menu items.

~~~

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

~~~


#### Displaying a menu item based on the existence of another item

You can hide/show menu items, based on whether another item is present using the `applyIf:` attribute. See below example.

**Example**

The below example displays an entry based on a blog created using two webapps, posts and authors. The top-level menu entry is called "Blog", with child entry items of "Posts" and "Authors". In this example, the Web App entries are also hidden.

File location: */blog/_config/menu.json*

~~~
 
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

~~~

The  ID of the menu item corresponding to webapp "Posts" will be:
  
  `menu-webapp-posts` (a *slug* version of your Web app name)

#### Displaying a menu item based on the admin user Roles

You can hide/show menu items, based on the Role the logged in user is assigned to. Ensure that the role exists in the admin conosle and then target this role using the `userHasRoles` attribute. See below example.

**Example**

The below example will update the blog example above, so that the default Web App menus are hidden from business owners, and only visible to the partner.
  
File location: */blog/_config/menu.json*

~~~

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

~~~


### Example using all the above methods

In this example we will add several localized menu items that have user roles based conditions as well as dependencies.
 
The code below will achieve the following:
 
* Add a "Useful links" section with child items that point to various panels in the Admin Console.
* Add a  Blog section that appears only if the "Useful links" section is present.
* The Blog section has  child items that point to 2 external pages.
* If the user has the Admin Console language set to "Francais", the Blog section sub menus will be in French.
* The "Reports" tab is hidden for anyone that is not in the Administrators2 role.
 
File location: */test3/_config/menu.json*

~~~
 
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
 
~~~

 
