(function($) {
    "use strict";

    /*
     * This class provides a way of retrieving and assigning categories to items
     * As an array of category ids that can be retrieved
      * via the @BCAPI.Models.CategoryCollection
     * @name ItemCategory
     * @class
     * @constructor
     * @memberOf BCAPI.Models
     * @augments BCAPI.Models.Model
     * To get the categories assigned to an item
     * @example
     * var itemCategories = new BCAPI.Models.ItemCategory(WEBAPP_NAME, ITEM_ID);
     * itemCategories.fetch({
     *                         success: function(data) {
     *                             //data = {items: [1,2,3]}
     *                             _.each(data.items, function(categoryId) {
     *                                 var category = new BCAPI.Models.Category({id: categoryId});
     *                                 category.fetch({success: doSomethingWithCategName, error: onError})
     *                             })
     *                         },
     *                         error: function(data, xhr){}
     *                      });
     *
     *
     * To assign a set of categories:
     * @example
     * var itemCategories = new BCAPI.Models.ItemCategory(WEBAPP_NAME, ITEM_ID);
     * itemCategories.set(items, [1,2,3,4]);
     * itemCategories.save({success: onSaveOK, error: onSaveFailed})
     */

    BCAPI.Models.ItemCategory = BCAPI.Models.Model.extend({
        defaults: {
            items: []
        },

        constructor: function(webappName, webappItemId, attributes, options) {
            BCAPI.Models.Model.call(this, attributes, options);
            this._webappName = webappName;
            this._webappItemId = webappItemId;
        },

        /**
         * This method returns the correct endpoint
         * for the specific webapp and item id.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.ItemCategory
         */
        endpoint: function() {
            var url = ["/api/v2/admin/sites/current/webapps/"];
            url.push(this._webappName);
            url.push("/items/");
            url.push(this._webappItemId);
            url.push("/categories");
            return url.join("");
        },

        /**
         * This method returns the data to be json-ified when saving
         * The API only recieves an array of ints, so we have to extract it
         * from the items field.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.ItemCategory
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
         * @memberOf BCAPI.Models.ItemCategory
         */
        save: function(options) {
            options = options || {};
            options.type = "PUT";
            return  BCAPI.Models.Model.prototype.save.call(this, options);
        }
    });
})(jQuery);