(function($) {
	"use strict";
	
	BCAPI.EntityBase = {
        attributes: undefined,
        links: undefined,

        linkUri: function(name) {
            if (!this.links) return null;
            for (var i = 0; i < this.links.length; i++) {
                if (this.links[i].rel === name) return this.links[i].uri;
            }
            return null;
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