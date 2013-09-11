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
		},
		defaults: {
			name: undefined,
			type: "String",
			required: false,
			order: 1,
			dataSourceName: undefined,
			listItems: undefined
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
})(jQuery);