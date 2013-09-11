(function($) {
    "use strict";

    BCAPI.Models.ItemCategory = BCAPI.Models.Model.extend({
        constructor: function(webappName, webappItemId, attributes, options) {
            BCAPI.Models.Model.call(this, attributes, options);
            this._webappName = webappName;
            this._webappItemId = webappItemId;
            this.set({webapp: new BCAPI.Models.WebApp.App({name: webappName})});
        },

        endpoint: function() {
            var url = ["/api/v2/admin/sites/current/webapps/"];
            url.push(this._webappName);
            url.push("/items/");
            url.push(this._webappItemId);
            url.push("/categories");
            return url.join("");
        }
    });
})(jQuery);