(function($) {
	"use strict";

    BCAPI.Site = function(attributes) {
        this.setAttributes(attributes);
    };

    $.extend(BCAPI.Site, {
        list: function() {
        	BCAPI._useGenericToken = true;
            var list = BCAPI._fetchList('/api/v2/admin/sites', function(attr) { return new BCAPI.Site(attr); });
            BCAPI._useGenericToken = false;
            return list;
        },
        current: function() {
            BCAPI._requestEntity(new this(), 'GET', '/api/v2/admin/sites/current');
        }
    });

    $.extend(BCAPI.Site.prototype, BCAPI.EntityBase);	
})(jQuery);