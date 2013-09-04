(function($) {
	"use strict";
	
    BCAPI.WebAppField = function(webApp, attributes) {
        this.webApp = webApp;
        this.setAttributes(attributes);
    };

    $.extend(BCAPI.WebAppField, {
        uri: function(webApp) {
            return webApp.uri() + "/fields";
        },

        create: function(webApp, attributes) {
            return BCAPI._requestEntity(new this(webApp, attributes), 'POST', this.uri(webApp), attributes);
        },
        list: function(webApp) {
            return BCAPI._fetchList(this.uri(webApp), new Paginator(this, webApp));
        },
        get: function(webApp, id) {
            return new this(webApp, {id: id}).fetch();
        }
    });

    $.extend(BCAPI.WebAppField.prototype, BCAPI.EntityCRUD, {
        uri: function() {
            return BCAPI.WebAppField.uri(this.webApp) + "/" + this.attributes.id;
        }
    });	
})(jQuery);