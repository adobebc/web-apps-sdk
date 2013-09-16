(function($) {
	"use strict";

	/**
	 * This class provides useful operations for interacting with web app items. You can find various examples of how to
	 * use it.
	 *
	 * ## Load items paginated
	 * 
	 * ```javascript
	 * var items = new BCAPI.Models.WebApp.ItemCollection("Test webapp");
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
	 * items.each(function(webAppItem) {
	 * 		// display logic
	 * });
	 * ```
	 *
	 * ## Filtering items
	 *
	 * ```javascript 
	 * var items = new BCAPI.Models.WebApp.ItemCollection("Test webapp");
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
	 * var items = new BCAPI.Models.WebApp.ItemCollection("Test webapp");
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
	 * var items = new BCAPI.Models.WebApp.ItemCollection("Test webapp");
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
	 * var item = new BCAPI.Models.WebApp.Item("Test webapp", {
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
	 * var item = new BCAPI.Models.WebApp.Item("Test webapp", {id: 1});
	 * item.destroy({
	 * 	success: function(webAppItem, response) {
	 * 		// handle success here.
	 *  },
	 *  error: function(webAppItem, xhr, options) {
	 * 		// handle error scenario.
	 *  } 
	 * });
	 * ```
     * 
     * @name Item
     * @class
     * @constructor
     * @memberOf BCAPI.Models.WebApp
     * @example
     * 
     * var item = new BCAPI.Models.WebApp.Item({
	 *	"name": "Item7",
	 *	"weight": 7,
	 *	"releaseDate": "2013-01-30",
	 *	"expiryDate": "9999-01-01",
	 *	"enabled": true,
	 *	"slug": "item7",
	 *	"description": "item7 description",
	 *	"roleId": null,
	 *	"submittedBy": -1,
	 *	"templateId": 123,
	 *	"address": "item7_address",
	 *	"city": "item7_city",
	 *	"state": "item7_state",
	 *	"zipCode": "000007",
	 *	"country": "US",
	 *	"fields": {
	 *	    "field_string_required": "item7_field1_value",
	 *	    "field2_string_optional": "item7_field2_value",
	 *	    "field3_number": 7,
	 *	    "field4_dateTime": "2012-01-20",
     *	    "field5_list": "item1"
	 *	}
     * });
     */
    BCAPI.Models.WebApp.Item = BCAPI.Models.Model.extend({
    	constructor: function(webappName, attributes, options) {
    		BCAPI.Models.Model.call(this, attributes, options);
    		
    		this._webappName = webappName;
    		this.set({webapp: new BCAPI.Models.WebApp.App({name: webappName})});
    	},
    	/**
    	 * This method returns the correct endpoint for the web app items.
    	 * 
    	 * @method
    	 * @instance
    	 * @memberOf BCAPI.Models.WebApp.Item
    	 */
    	endpoint: function() {
    		var url = ["/api/v2/admin/sites/current/webapps/"];
    		url.push(this._webappName);
    		url.push("/items");
    		
    		return url.join("");
    	}
    });
    
    /**
     * This class provides a collection for working with web app items. In order to use this collection you must provide 
     * a webapp name. For more information regarding how to interact with web app items read {@link BCAPI.Models.WebApp.Item}. 
     * 
     * @name ItemCollection
     * @class
     * @constructor
     * @memberOf BCAPI.Models.WebApp
     * 
     * @example
     * // only system fields loaded for each item (lazy loading).
     * var itemCollection = new BCAPI.Models.WebApp.ItemCollection("Sample webapp");
     * itemCollection.fetch({
     * 	success: function(items) {
     * 		// handle items (only system fields available in each item).
     * 	}
     * });
     * 
     * @example
     * // progressive loading
     * var itemCollection = new BCAPI.Models.WebApp.ItemCollection("Sample webapp");
     * itemCollection.fetch({
     *  fetchDetails: true,
     * 	success: function(items) {
     * 		// handle items (only system fields available in each item).
     * 	},
     *  itemLoaded: function(itemIndex, item) {
     *  	// item contains all fields
     *  	var url = item.get("fields").url;
     *  
     *  	// item index tells you the index of the item in the collection.
     *  }
     * });
     */
    BCAPI.Models.WebApp.ItemCollection = BCAPI.Models.Collection.extend({
    	constructor: function(webappName, models, options) {
    		BCAPI.Models.Collection.call(this, models, options);
    		
    		this.webappName = webappName;
    	},
    	model: BCAPI.Models.WebApp.Item,
    	/**
    	 * This method returns items collection api entry point absolute url.
    	 * 
    	 * @method
    	 * @instance
    	 * @memberOf BCAPI.Models.WebApp.ItemCollection
    	 * @returns API entry point url.
    	 */
    	url: function() {
    		var model = new this.model(this.webappName);
    		
    		return BCAPI.Models.Collection.prototype.url.call(this, model);
    	},
    	/**
    	 * We override this method in order to transform each returned item into a strong typed 
    	 * {@link BCAPI.Models.WebApp.Item} models.
    	 * 
    	 * @method
    	 * @instance
    	 * @param {Object} response The JSON response received from Items api.
    	 * @returns A list of web app items.
    	 * @memberOf BCAPI.Models.WebApp.ItemCollection 
    	 */
    	parse: function(response) {
    		response = BCAPI.Models.Collection.prototype.parse.call(this, response);
    		
    		var items = [],
    			self = this;
    		
    		_.each(response, function(item) {
    			items.push(new self.model(self.webappName, item));
    		});
    		
    		return items;
    	}
    });
})(jQuery);