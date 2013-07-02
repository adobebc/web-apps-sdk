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
  * Web Apps
     * {module_webapps}

The build tool will automatically strip `{` or `}` characters, and convert `-` to white space. Section, category and article names will be automatically generated from the file name then capitalized, and articles will be hyperlinked to their corresponding pages.
