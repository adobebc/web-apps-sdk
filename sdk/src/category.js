/*
*
*Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

*Permission is hereby granted, free of charge, to any person obtaining a
*copy of this software and associated documentation files (the "Software"),
*to deal in the Software without restriction, including without limitation
*the rights to use, copy, modify, merge, publish, distribute, sublicense,
*and/or sell copies of the Software, and to permit persons to whom the
*Software is furnished to do so, subject to the following conditions:
*
*The above copyright notice and this permission notice shall be included in
*all copies or substantial portions of the Software.
*
*THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
*FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
*DEALINGS IN THE SOFTWARE.
*
*/
(function($) {
    "use strict";

    /**
     * This class provides a way of working with individual category items. Each category model
     * has the following accessible attributes (through get method):
     *
     * 1. id
     * 1. name
     * 1. parentId
     * 1. publicAccess
     * 1. fullPath
     *
     * ## Create category
     *
     * ```
     * var category = new BCAPI.Models.Category(
     * 	{"name": "Test category",
     *	"publicAccess": true});
     *
     * var response = category.save();
     *
     * response.done(function() {
     * 	console.log("Category Test category has been created.");
     * });
     *
     * response.fail(function(xhrRequest) {
     * 	console.log("Status: " + xhrRequest.status);
     *  console.log("Status text: " + xhrRequest.statusText);
     *  console.log("Error body: " + xhrRequest.responseText);
     * });
     * ```
     *
     * ## Load category details
     *
     * ```
     * var category = new BCAPI.Models.Category({"id": 4556});
     * var response = category.fetch();
     *
     * response.done(function() {
     * 	console.log("id: " + category.get("id"));
     * 	console.log("name: " + category.get("name"));
     * 	console.log("parentId: " + category.get("parentId"));
     * 	console.log("publicAccess: " + category.get("publicAccess"));
     *	console.log("fullPath: " + category.get("fullPath"));
     * });
     *
     * response.fail(function(xhrRequest) {
     * 	console.log("Error status: " + xhrRequest.status);
     * 	console.log("Error text: " + xhrRequest.statusText);
     * 	console.log("Error body: " + xhrRequest.responseText);
     * });
     * ```
     *
     * Update and delete operation per category are not supported.
     *
     * @name Category
     * @class
     * @constructor
     * @memberOf BCAPI.Models
     * @augments BCAPI.Models.Model
     */
    BCAPI.Models.Category = BCAPI.Models.Model.extend({
        /**
         * This method returns the correct endpoint for the category.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.Category
         * @returns {String} Categories endpoint location.
         */
        endpoint: function() {
            return "/api/v2/admin/sites/current/categories";
        }
    });

    /**
     * This class provides a collection for working with categories.
     *
     * ## Load all categories
     *
     * ```
     * var categoriesCollection = new BCAPI.Models.CategoryCollection();
     * var response = categoriesCollection.fetch();
     *
     * response.done(function(categories) {
     * 	categories.each(function(category) {
     *		console.log("id: " + category.get("id"));
     * 		console.log("name: " + category.get("name"));
     * 		console.log("parentId: " + category.get("parentId"));
     * 		console.log("publicAccess: " + category.get("publicAccess"));
     *		console.log("fullPath: " + category.get("fullPath"));
     * 	});
     * });
     *
     * response.fail(function(xhrRequest) {
     * 	console.log("Error status: " + xhrRequest.status);
     * 	console.log("Error text: " + xhrRequest.statusText);
     * 	console.log("Error body: " + xhrRequest.responseText);
     * });
     * ```
     *
     * @name CategoryCollection
     * @class
     * @constructor
     * @memberOf BCAPI.Models
     * @augments BCAPI.Models.Collection
     */
    BCAPI.Models.CategoryCollection = BCAPI.Models.Collection.extend({
        model: BCAPI.Models.Category
    });
})(jQuery);
