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
     * @class
     */
	BCAPI.Models.WebApp.App = BCAPI.Models.Model.extend({
        idAttribute: 'name',
        isNotNew: null,

        defaults: {
            name: "",
            weight: 0,
            releaseDate: (new Date()).toISOString().substring(0, 10),
            expiryDate: BCAPI.Config.MAX_DATE,
            enabled: true,
            slug: "",
            description: "",
            roleId: undefined,
            submittedBy: -1,
            templateId: undefined,
            address: undefined,
            city: undefined,
            state: undefined,
            zipCode: undefined,
            country: undefined,
            fields: {}
        },

        isNew: function() {
            return this.isNotNew ? false : !this.get('id');
        },

        endpoint: function() {
            return '/api/v2/admin/sites/current/webapps';
        }
    });

    /**
     *
     * @class
     */
    BCAPI.Models.WebApp.AppCollection = BCAPI.Models.Collection.extend({
        model: BCAPI.Models.WebApp
    });
})(jQuery);