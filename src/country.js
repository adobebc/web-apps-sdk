(function($) {
	"use strict";
	
    BCAPI.Country = function(attributes) {
        this.setAttributes(attributes);
    };

    $.extend(BCAPI.Country, {
        uri: function() { return '/api/v2/admin/system/countries'; },

        list: BCAPI.FactoryCRUD.list,
        listForIp: function(ip) {
            return fetchList(this.uri() + '?ip=' + (ip || 'current'), new BCAPI.Paginator(Country));
        }
    });

    $.extend(Country.prototype, EntityBase);
	
})(jQuery);