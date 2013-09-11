(function($) {
	"use strict";

	/**
	 * This namespace provides the models and collections for working with BC web applications and their items.
	 *  
	 * @namespace BCAPI.Models.WebApp
	 * @memberOf BCAPI.Models
	 */	
	BCAPI.Models.WebApp = {};
	
    /**
     * This class provides the model for interacting with web apps.
     *
     * ## Load webapps list
     *
     * ```javascript
     * var apps = new BCAPI.Models.WebApp.AppCollection();
     * apps.fetch({
     *		success: function(webAppItems) {
	 * 			// handle success
	 * 		},
	 * 		error: function(webAppItems, xhr) {
	 * 			// handle errors
	 * 		}
	 * });
     *
     * apps.each(function(webApp) {
	 * 		// display logic
	 * });
     * ```
     *
     * ## Create webapp
     *
     * ```javascript
     * var app = new BCAPI.Models.WebApp.App({
	 * 		"name": "Test app"
	 * });
     *
     * var response = app.save({
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
     * ## Remove app
     *
     * ```javascript
     * var app = new BCAPI.Models.WebApp.Item({name: "Test app"});
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
     * ## Supported attributes
     *
     * var app = new BCAPI.Models.WebApp.Item({
	 *	templateId: -1,
     *  uploadFolder: "images",
     *  requiresApproval: true,
     *  allowFileUpload: true,
     *  customerCanAdd: false,
     *  customerCanDelete: false,
     *  customerCanEdit: false,
     *  anyoneCanEdit: false,
     *  requiresPayment: false,
     *  validDays: -1, // never expire
     *  roleId: 0,
     *  hasAddress: false,
     *  disableDetailPages: false,
     *  locationEnabled: false
     * });
     *
     * @class
     */
	BCAPI.Models.WebApp.App = BCAPI.Models.Model.extend({
        idAttribute: 'name',

        /**
         * Set tot true if you want to save or delete an existing item before fetching it
         *
         * @type {boolean}
         * @memberOf WebApp
         */
        isNotNew: null,

        defaults: {
            templateId: -1,
            uploadFolder: -1,
            requiresApproval: true,
            allowFileUpload: false,
            customerCanAdd: false,
            customerCanDelete: false,
            customerCanEdit: false,
            anyoneCanEdit: false,
            requiresPayment: false,
            validDays: -1, // never expire
            roleId: 0,
            hasAddress: false,
            disableDetailPages: false,
            locationEnabled: false
        },

        isNew: function() {
            return this.isNotNew ? false : !this.get('id');
        },

        endpoint: function() {
            return '/api/v2/admin/sites/current/webapps';
        },

        fetch: function() {
            this.isNotNew = true;
            return Backbone.Model.prototype.fetch.apply(this, arguments);
        },

        destroy: function() {
            this.isNotNew = true;
            return Backbone.Model.prototype.destroy.apply(this, arguments);
        }
    });

    /**
     *
     * @class
     */
    BCAPI.Models.WebApp.AppCollection = BCAPI.Models.Collection.extend({
        model: BCAPI.Models.WebApp.App
    });
})(jQuery);