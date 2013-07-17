## Using Business Catalyst Modules

Modules are pre-built features that come included with the Business Catalyst Platform. Using either the Admin Console, "Develop" mode, or Adobe Dreamweaver, you can insert these modules inside web pages to add new features to your sites. Examples of module functionality include: forums, blogs, photo galleries, and RSS feeds. 

If your requirements go beyond what a pre-built module offers, you can extend the system using Web Apps.

### Using Modules inside Modules

You have the ability to use modules within modules. This means that for example, within a Content Holder you can place one or more of the below modules within it. There are some important items to note when doing this:

  1. There is a 75 maximum module limit on any page rendered by the system. This includes modules placed within other modules, for example if you have a Content Holder that has a Bookings module rendering within the Content Holder itself, this will count as two modules on the page.
	2. Rendering modules within modules will only render 3 levels deep. For example, if you have a recursive Content Holder that contains itself within the content,  this will render 3 levels before no longer rendering. See below tree-structure for an example of inserting this Content Holder on a page: 

* Content Holder 1
	* Content Holder 2 *- LEVEL 1*
		* Content Holder 3 *- LEVEL 2*
			* Content Holder 4 *- LEVEL 3*
				* Content Holder 5 - *- WILL NOT RENDER*  
