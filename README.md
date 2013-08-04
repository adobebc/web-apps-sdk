BC Reference (In Development)
============

Markdown-based reference docs for:

* Modules
* Tags
* APIs
* OpenAdmin

### Structure requirements

File structure must follow this pattern:

`/[section]/[category]/[item].md`

For example: 

`/modules/web-apps/{module_webapps}.md`

When processed, this will become:

* Modules
  * Web apps
     * {module_webapps}

Additionally, each top-level section supports an `index.md` file that will act as the landing page for that particular platform section.

For example, `/modules/index.md` is rendered to `/modules/index.html` 

### The build tool

* Strips invalid characters from article slugs
* Generates an article name based off the file name, converting `-` to white space. 
* The first character of each section, category and article name will be capitalized for presentation
* HTML pages will be generated and automatically linked to the from the sidebar / search

Currently builds to [docs.businesscatalyst.com](http://docs.businesscatalyst.com). Contact japalmer@adobe.com and dgundi@adobe.com to rebuild from the master repository. 
