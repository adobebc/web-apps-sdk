(function($) {
	"use strict";

	/**
	 * This class provides support for custom fields description belonging to {@link BCAPI.Models.WebApp.App}
	 * 
	 * ## Create a new custom field
	 * 
	 * ```javascript
	 * var customField = new BCAPI.Models.WebApp.CustomField("Test webapp", {
     *	"name": "Part code",
     *	"type": "DataSource",
     *	"listItems": null,
     *	"dataSourceName": "Part Codes",
     *	"required": false,
     *	"order": 1
	 * });
	 * 
	 * customField.save({
	 * 	success: function(fieldModel) {
	 * 		// do something on success.
	 * 	}
	 * });
	 * ```
	 * 
	 * @name CustomField
	 * @class
	 * @constructor
	 * @memberOf BCAPI.Models.WebApp
	 */
	BCAPI.Models.WebApp.CustomField = BCAPI.Models.Model.extend({
		constructor: function(webappName, attributes, options) {
			BCAPI.Models.Model.call(this, attributes, options);
			
			this._webappName = webappName;
			this.set({webapp: new BCAPI.Models.WebApp.App({name: webappName})});			
		},
		/**
		 * This method returns the endpoint for custom fields api.
		 * 
		 * @method
		 * @instance
		 * @memberOf BCAPI.Models.WebApp.CustomField
		 */
		endpoint: function() {
			return "/api/v2/admin/sites/current/webapps/" + this._webappName + "/fields";
		}
	});
	
	/**
     * This class provides a collection for working with web app custom fields. In order to use this collection you must provide 
     * a webapp name. For more information regarding custom fields read {@link BCAPI.Models.WebApp.Item}. 
     * 
     * @name CustomFieldCollection
     * @class
     * @constructor
     * @memberOf BCAPI.Models.WebApp
     * @example
     * var fieldsCollection = new BCAPI.Models.WebApp.CustomFieldCollection("Sample webapp");  
	 */
	BCAPI.Models.WebApp.CustomFieldCollection = BCAPI.Models.Collection.extend({
		constructor: function(webappName, attributes, options) {
			BCAPI.Models.Collection.call(this, attributes, options);
			
			this.webappName = webappName;
		},
		model: BCAPI.Models.WebApp.CustomField,
    	/**
    	 * This method returns custom field collection api entry point absolute url.
    	 * 
    	 * @method
    	 * @instance
    	 * @memberOf BCAPI.Models.WebApp.CustomFieldCollection
    	 * @returns API entry point url.
    	 */
    	url: function() {
    		var model = new this.model(this.webappName);
    		
    		return BCAPI.Models.Collection.prototype.url.call(this, model);
    	},
    	/**
    	 * We override this method in order to transform each returned item into a strong typed 
    	 * {@link BCAPI.Models.WebApp.CustomField} models.
    	 * 
    	 * @method
    	 * @instance
    	 * @param {Object} response The JSON response received from CustomField api.
    	 * @returns A list of web app custom fields.
    	 * @memberOf BCAPI.Models.WebApp.CustomField 
    	 */
    	parse: function(response) {
    		response = BCAPI.Models.Collection.prototype.parse.call(this, response);
    		
    		var fields = [],
    			self = this;
    		
    		_.each(response, function(field) {
    			fields.push(new self.model(self.webappName, field));
    		});
    		
    		return fields;
    	}
	});
})(jQuery);