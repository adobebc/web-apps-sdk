(function($) {
    "use strict";

    /**
     * This class provides a way of working with individual category items.
     *
     * @name Category
     * @class
     * @constructor
     * @memberOf BCAPI.Models
     * @augments BCAPI.Models.Model
     * @example
     * var category = new BCAPI.Models.Category({name: 'Test Category'});
     * To save:
     * category.save(options)
     * To get a category by id:
     * var category = new BCAPI.Models.Category({id: 1});
     * category.fetch(options)
     *
     * Update and delete are not supported
     */
    BCAPI.Models.Category = BCAPI.Models.Model.extend({
        /**
         * @field name: mandatory, string
         * @field parentId: optional, defaults to root (-1)
         * @field publicAccess: optional, default to TRUE
         */

        /**
         * This method returns the correct endpoint for the category.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.Category
         */
        endpoint: function() {
            return '/api/v2/admin/sites/current/categories';
        }
    });

    /**
     * This class provides a collection for working with categories.
     *
     * @name CategoryCollection
     * @class
     * @constructor
     * @memberOf BCAPI.Models
     * @augments BCAPI.Models.Collection
     * @example
     * var categories = new BCAPI.Models.CategoryCollection();
     * categories.fetch({
     *     success: onSuccessHandler,
     *     error: onErrorHandler
     * })
     */
    BCAPI.Models.CategoryCollection = BCAPI.Models.Collection.extend({
        model: BCAPI.Models.Category
    });
})(jQuery);