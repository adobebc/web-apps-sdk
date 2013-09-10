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

        /**
         * Set tot true if you want to save or delete an existing item before fetching it
         *
         * @type {boolean}
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
//        },
//
//        save: function() {
//            return this.__super__.save();
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