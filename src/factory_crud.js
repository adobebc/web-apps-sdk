(function($) {
	"use strict";
	
    BCAPI.FactoryCRUD = {
        uri: function() {
            $.error('FactoryCRUD.uri() not implemented');
        },

        // Makes a POST to persist a new entity on the server.
        // Returns an entity object. The entity attributes will be incomplete at the moment of return.
        // Use onSuccess if you need to work with the returned value.
        create: function(attributes) {
            return BCAPI._requestEntity(new this(attributes), 'POST', this.uri(), attributes);
        },

        // GETs all the entities of particular type from the server.
        // Returns an list, (later) populated asynchronously.
        // Use onSuccess if you need to work with the returned value.
        // In some cases, the entities in the list will be incomplete even after onSuccess fires.
        // Use entity.fetch() is an it does not contain all the attributes you need.
        list: function() {
            return BCAPI._fetchList(this.uri(), new BCAPI.Paginator(this));
        },

        // Returns an entity object. The entity attributes will be incomplete at the moment of return.
        // Use onSuccess if you need to work with the returned value.
        get: function(id) {
            return new this({id: id}).fetch();
        }
    };

})(jQuery);