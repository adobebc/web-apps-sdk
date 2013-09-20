(function($) {
    "use strict";

    /**
     * This class provides an array of countries available for a certain webapp. In order to use this collection you must provide
     * a webapp name. For more information regarding how to interact with the countries of a web app read {@link BCAPI.Models.WebApp.Country}.
     *
     * @name Country
     * @class
     * @constructor
     * @memberOf BCAPI.Models.WebApp
     * @example
     * // assign GB and US countries to Sample webapp.
     * var countries = new BCAPI.Models.WebApp.Country("Sample webapp", {"items": ["GB", "US"]});
     * countries.save();
     */
    BCAPI.Models.WebApp.Country = BCAPI.Models.Model.extend({

        constructor: function(webappName, attributes, options) {
            BCAPI.Models.Model.call(this, attributes, options);
            this._webappName = webappName;
        },
        /**
         * This method returns the correct endpoint
         * for the webapp countries
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.Country
         */
        endpoint: function() {
            var url = ["/api/v2/admin/sites/current/webapps/"];
            url.push(this._webappName);
            url.push("/countries");
            return url.join("");
        },
        /**
         * This method returns the data to be json-ified when saving
         * The API only recieves an array of strings, so we have to extract it
         * from the items field.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.Country
         */
        toJSON: function(){
            return this.get('items');
        },

        /**
         * This method performs the save to the server
         * It is overwritten here to always force a PUT operation on the endpoint
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.Country
         */
        save: function(options) {
            options = options || {};
            options.type = "PUT";
            return  BCAPI.Models.Model.prototype.save.call(this, options);
        }
    });
})(jQuery);