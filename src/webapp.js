(function($) {
	"use strict";

    /**
     * @constructor
     */
	BCAPI.Models.WebApp = BCAPI.Models.Model.extend({
        idAttribute: 'name',

        isNew: function() {
            return !this.get('id');
        },

        endpoint: function() {
            return '/api/v2/admin/sites/current/webapps';
        }
    });
})(jQuery);