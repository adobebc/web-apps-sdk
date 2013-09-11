(function($) {
    "use strict";

    BCAPI.Models.ItemCategory = BCAPI.Models.Model.extend({
        defaults: {
            items: []
        },

        constructor: function(webappName, webappItemId, attributes, options) {
            BCAPI.Models.Model.call(this, attributes, options);
            this._webappName = webappName;
            this._webappItemId = webappItemId;
        },

        endpoint: function() {
            var url = ["/api/v2/admin/sites/current/webapps/"];
            url.push(this._webappName);
            url.push("/items/");
            url.push(this._webappItemId);
            url.push("/categories");
            return url.join("");
        },

        toJSON: function(){
            return this.get('items');
        },

        save: function(options) {
            options = options || {};
            options.type = "PUT";
            options.dataType = "text";

            return Backbone.Model.prototype.save.call(this, this.attributes, options);
        }
    });
})(jQuery);