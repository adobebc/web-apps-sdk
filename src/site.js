(function($) {
	"use strict";

    BCAPI.Site = function(attributes) {
        this.setAttributes(attributes);
    };

    $.extend(BCAPI.Site, {
        list: function() {
            useGenericToken = true;
            var list = fetchList('/api/v2/admin/sites', function(attr) { return new BCAPI.Site(attr); });
            useGenericToken = false;
            return list;
        },
        current: function() {
            requestEntity(new this(), 'GET', '/api/v2/admin/sites/current');
        }
    });

    $.extend(Site.prototype, EntityBase);	
})(jQuery);