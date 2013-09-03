(function($) {
	"use strict";
	
    BCAPI.Template = function(attributes) {
        this.setAttributes(attributes);
    };

    $.extend(BCAPI.Template, {
        uri: function() { return 'templates'; },
        list: BCAPI.FactoryCRUD.list
    });

    $.extend(BCAPI.Template.prototype, BCAPI.EntityBase);
	
})(jQuery);