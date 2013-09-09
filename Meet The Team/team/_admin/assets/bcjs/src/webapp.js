(function($) {
	"use strict";

    /**
     * @constructor
     */
	BCAPI.Models.WebApp = BCAPI.Models.Model.extend({
        idAttribute: 'name',

        endpoint: function() {
            return 'webapps';
        }
    });
})(jQuery);