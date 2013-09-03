(function($) {
	"use strict";
	
    BCAPI.EntityCRUD = $.extend({
        uri: function() {
            $.error('EntityCRUD.uri() not implemented');
        },
        request: function(verb, data, rawData) {
            return requestEntity(this, verb, this.uri(), data, rawData);
        },

        // Asynchronously refreshes the attributes.
        fetch: function() {
            return this.request('GET');
        },

        // PUTs changes on the server.
        save: function() {
            return this.request('PUT', this.attributes);
        },

        // DELETEs the entity from the server.
        remove: function() {
            return this.request('DELETE');
        }
    }, BCAPI.EntityBase);
})(jQuery);