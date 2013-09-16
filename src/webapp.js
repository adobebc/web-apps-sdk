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
     * This class provides a collection that can be used to list all webapps from a site. For
     * more information about a webapp see {@link BCAPI.Models.WebApp.App}.
     *
     * @name AppCollection
     * @class
     * @constructor
     * @memberOf BCAPI.Models.WebApp
     * @example
     * // fetch all available webapps with custom fields structure in place.
     * var appCollection = new BCAPI.Models.WebApp.AppCollection();
     * 
     * appCollection.fetch({fetchFields: true,
     *  success: function(webapps) {
     *  	webapps.each(function(webapp) {
     *  		// here you also have access to webapp.fields.
     *  	});
     *  },
     *  error: function(webapps, response) {
     *  	// this handler might be invoked multiple times if fetchFields option is given and mutiple
     *  	// requests are failing. You can find in the error message the relation for which fetching failed.
     *  }
     * });
     * 
     * @example
     * // fetch all available webapps without custom fields structure in place.  
     * var appCollection = new BCAPI.Models.WebApp.AppCollection();
     * 
     * appCollection.fetch({fetchFields: false,
     *  success: function(webapps) {
     *  	webapps.each(function(webapp) {
     *  		// here webapp.fields is an empty array.
     *  	});
     *  }
     */
    BCAPI.Models.WebApp.AppCollection = BCAPI.Models.Collection.extend({
        model: BCAPI.Models.WebApp.App,
        fetch: function(options) {
        	options = options || {};

       		var eagerFetch = options.fetchFields;
        	
        	function itemsBuilder(webapp) {
        		return new BCAPI.Models.WebApp.CustomFieldCollection(webapp.get("name"));
        	}
        	
        	return this._fetchRelation("fields", itemsBuilder, eagerFetch, options);
        },
    	/**
    	 * We override this method in order to transform each returned item into a strong typed 
    	 * {@link BCAPI.Models.WebApp.App} models.
    	 * 
    	 * @method
    	 * @instance
    	 * @param {Object} response The JSON response received from Web apps api.
    	 * @returns A list of web app items.
    	 * @memberOf BCAPI.Models.WebApp.AppCollection 
         */
        parse: function(response) {
        	var webapps = [],
        		self = this;
        	
        	response = BCAPI.Models.Collection.prototype.parse.call(this, response);
        	
        	_.each(response, function(webapp) {        		
        		webapps.push(self.model(webapp));
        	});
        	
        	return webapps;
        }
    });
})(jQuery);