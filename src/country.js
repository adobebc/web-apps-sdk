(function($) {
    "use strict";

    BCAPI.Models.Country = BCAPI.Models.Model.extend({
        /**
         * This method returns the correct endpoint for the web app countries.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.Country
         */
        endpoint: function() {
            return "/api/v2/admin/system/countries";
        }
    });

    /**
     * This class provides a collection of the countries available in BC. For more information regarding how to interact
     * with the countries {@link BCAPI.Models.Country}.
     *
     * @name CountryCollection
     * @class
     * @constructor
     * @memberOf BCAPI.Models
     * @example
     * var itemCollection = new BCAPI.Models.CountryCollection();
     */
    BCAPI.Models.CountryCollection = BCAPI.Models.Collection.extend({
        model: BCAPI.Models.Country
    });

})(jQuery);