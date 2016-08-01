/* 
* 
* Copyright © 2016 Adobe. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
* 
*/
(function($) {
    "use strict";

    /**
     * This class provides a way of retrieving and assigning categories to items
     * As an array of category ids that can be retrieved via the {@link BCAPI.Models.CategoryCollection}
     * 
     * @name ItemCategory
     * @class
     * @constructor
     * @memberOf BCAPI.Models.WebApp
     * @augments BCAPI.Models.Model
     * To get the categories assigned to an item
     * @example
     * var itemCategories = new BCAPI.Models.WebApp.ItemCategory(WEBAPP_NAME, ITEM_ID);
     * itemCategories.fetch({
     *                         success: function(data) {
     *                             _.each(data.get("items"), function(categoryId) {
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
     * var itemCategories = new BCAPI.Models.WebApp.ItemCategory(WEBAPP_NAME, ITEM_ID);
     * itemCategories.set('items', [1,2,3,4]);
     * itemCategories.save({success: onSaveOK, error: onSaveFailed})
     */

    BCAPI.Models.WebApp.ItemCategory = BCAPI.Models.Model.extend({
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
         * @memberOf BCAPI.Models.WebApp.ItemCategory
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
         * @memberOf BCAPI.Models.WebApp.ItemCategory
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
         * @memberOf BCAPI.Models.WebApp.ItemCategory
         */
        save: function(options) {
            options = options || {};
            options.type = "PUT";
            return  BCAPI.Models.Model.prototype.save.call(this, options);
        }
    });
})(jQuery);
