(function($) {
	"use strict";
	
	BCAPI.EntityBase = {
        attributes: undefined,
        links: undefined,

        linkUri: function(name) {
            if (!this.links) return;
            for (var i = 0; i < links.length; i++) {
                if (this.links[i].rel === name) return this.links[i].uri;
            }
        },

        setAttributes: function(attr) {
            attr = attr || {};
            this.links = attr.links;
            delete attr.links;
            this.attributes = attr;
            return this;
        }
    };
})(jQuery);