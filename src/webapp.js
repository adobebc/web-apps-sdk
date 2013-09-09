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
     * @name App
     * @class
     * @constructor
     * @memberOf BCAPI.Models.WebApp
     */
	BCAPI.Models.WebApp.App = BCAPI.Models.Model.extend({
        idAttribute: 'name',

        isNew: function() {
            return !this.get('id');
        },

        endpoint: function() {
            return '/api/v2/admin/sites/current/webapps';
        }
    });
})(jQuery);