/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
* 
*/
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
     * app.save({
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
     * var app = new BCAPI.Models.WebApp.App({name: "Test app"});
     * app.destroy({
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
     * ```javascript
     * var app = new BCAPI.Models.WebApp.App({
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
     * ```
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
     * // fetch all available webapps  
     * var appCollection = new BCAPI.Models.WebApp.AppCollection();
     * 
     * appCollection.fetch({fetchFields: false,
     *  success: function(webapps) {
     *  	webapps.each(function(webapp) {
     *  		// no custom fields are retrieved.
     *  	});
     *  }
     *  
     * @example
     * // extract and fetch webap details from a fetched collection (by webapp id).
     * var webappId = 1,
     *		webapp = appCollection.get(webappId);
     *
     * webapp.fetch({
     * 	success: function(webapp) {
     * 		// webapp is now fully loaded.
     *  }
     * });
     *
     * @example
     * // extract and fetch webapp details from fetched collection (by webapp index)
     * var idx = 1,
     * 	    webapp = appCollection.at(idx);
     * 
     * webapp.fetch({
     * 	success: function(webapp) {
     * 		// webapp is now fully loaded.
     *  }
     * });
     */
    BCAPI.Models.WebApp.AppCollection = BCAPI.Models.Collection.extend({
        model: BCAPI.Models.WebApp.App,
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
