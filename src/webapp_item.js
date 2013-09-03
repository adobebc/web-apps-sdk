(function($) {
	"use strict";
	
    BCAPI.WebAppItem = function(webApp, attributes) {
        this.webApp = webApp;
        this.setAttributes(attributes);
    };

    $.extend(BCAPI.WebAppItem, {
        uri: function(webApp) {
            return webApp.uri() + "/items";
        },

        create: BCAPI.WebAppField.create,
        get: BCAPI.WebAppField.get,

        // Find items corresponding to the criteria specified in the <query> parameter.
        // The <query> can be either an URL query string or a key-value object.
        list: function(webApp, query) {
            var uri = this.uri(webApp);
            if (query) uri += '?' + (typeof query === "object" ? $.param(query) : query);
            
            return fetchList(uri, new BCAPI.Paginator(this, webApp));
        }
    });

    $.extend(BCAPI.WebAppItem.prototype, BCAPI.EntityCRUD, {
        uri: function() {
            return BCAPI.WebAppItem.uri(this.webApp) + "/" + this.attributes.id;
        },
        categoriesUri: function() {
            return this.uri() + "/categories";
        },

        getCategories: function() {
            return fetchList(this.categoriesUri());
        },
        saveCategories: function(categories) {
            return request('PUT', this.categoriesUri(), categories);
        }
    });
	
})(jQuery);