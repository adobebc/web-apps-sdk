(function($) {
	"use strict";
	
    BCAPI.Role = function(attributes) {
        this.setAttributes(attributes);
    };

    $.extend(BCAPI.Role, {
        uri: function() { return 'roles'; },
        list: BCAPI.FactoryCRUD.list
    });

    $.extend(BCAPI.Role.prototype, BCAPI.EntityBase);
	
})(jQuery);