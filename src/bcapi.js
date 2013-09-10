(function($) {
    'use strict';

    /**
     * @namespace BCAPI
     */
    window.BCAPI = {};

    var sync = Backbone.sync;

    Backbone.sync = function(method, model, options) {

        // Prevent jQuery from failing on empty response
        options.dataType = null;
        options.contentType = 'application/json';

        return sync.apply(this, arguments);
    };

})(jQuery);