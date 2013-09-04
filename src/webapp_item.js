(function($) {
	"use strict";
	
	/**
	 * This class provides useful operations for interacting with web app items. You can find various examples of how to
	 * use it.
	 *
	 * ## Load items paginated
	 * 
	 * ```javascript
	 * var items = new BCAPI.WebApp.ItemCollection("Test webapp");
	 * items.fetch({
	 * 		skip: 10, limit: 100,
     *		success: function(webAppItems) {
	 * 			// handle success
	 * 		},
	 * 		error: function(webAppItems, xhr) {
	 * 			// handle errors
	 * 		}
	 * });
	 * 
	 * itemsCollection.each(function(webAppItem) {
	 * 		// display logic
	 * });
	 * ```
	 *
	 * ## Filtering items
	 *
	 * ```javascript 
	 * var items = new BCAPI.WebApp.ItemCollection("Test webapp");
	 * items.fetch({ 	
	 * 		where: {"name": ""Web app item new"},
     *		success: function(webAppItems) {
	 * 			// handle success
	 * 		},
	 * 		error: function(webAppItems, xhr) {
	 * 			// handle errors
	 * 		}
	 * });
	 * ```
	 * 
	 * ## Ordering items
	 * 
	 * ```javascript 
	 * var items = new BCAPI.WebApp.ItemCollection("Test webapp");
	 * items.fetch({
	 * 		order: "-name",
     *		success: function(webAppItems) {
	 * 			// handle success
	 * 		},
	 * 		error: function(webAppItems, xhr) {
	 * 			// handle errors
	 * 		}
	 * });
	 * ```
	 * 
	 * ## All in one usage
	 * 
	 * ```javascript 
	 * var items = new BCAPI.WebApp.ItemCollection("Test webapp");
	 * items.fetch({
	 * 		skip: 10, limit: 100,
	 * 		where: {"name": ""Web app item new"},
	 * 		order: "-name",
     *		success: function(webAppItems) {
	 * 			webAppItems.each(function(webAppItem) {
	 *		 		// display logic
	 * 			});
	 * 		},
	 * 		error: function(webAppItems, xhr) {
	 * 			// handle errors
	 * 		}
	 * });
	 * ``` 
	 *  
	 * ## Create item
	 * 
	 * ```javascript
	 * var item = new BCAPI.WebApp.Item({
	 * 		"name": "Test item"
	 * });
	 * 
	 * var response = item.save({
	 * 		success: function(webAppItem) {
	 * 			// handle success
	 * 		},
	 * 		error: function(webAppItem, xhr) {
	 * 			// handle errors
	 * 		}
	 * });
	 * ```
	 * 
	 * If you want to refresh collections which rely on Item model please refresh those collections.
	 * 
	 * ## Remove item
	 * 
	 * ```javascript
	 * var items = new BCAPI.WebApp.Item({id: 1}); 
	 * item.destroy();
	 * ```
	 * 
	 * @namespace BCAPI.WebApp
	 * 
	 */
	BCAPI.WebApp = {};
	
	 /**
	  * @constructor
	  * @memberOf BCAPI.WebApp
	  */
	function Item() {}
})(jQuery);