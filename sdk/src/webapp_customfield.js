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

    var endpointGenerator = function(webappName) {
        return "/api/v2/admin/sites/current/webapps/" + webappName + "/fields";
    };

    /**
     * This class provides support for custom fields description belonging to {@link BCAPI.Models.WebApp.App}
     *
     * ## Create a new custom field
     *
     * ```javascript
     * var customField = new BCAPI.Models.WebApp.CustomField("Test webapp", {
     *  "id": 1,
     *  "name": "Part code",
     *  "type": "DataSource",
     *  "listItems": null,
     *  "dataSource": "Part Codes",
     *  "required": false
     * }, true);
     *
     * customField.save({
     *  success: function(fieldModel) {
     *      // do something on success.
     *  }
     * });
     * ```
     *
     * In the attributes, the id must be passed.
     *
     * The last parameter specifies if the custom field is new or exists already. This is used
     * to determine the correct HTTP verb to call since the id is always passed.
     * If omitted, it is assumed that the custom field is new.
     *
     * @name CustomField
     * @class
     * @constructor
     * @memberOf BCAPI.Models.WebApp
     */
    BCAPI.Models.WebApp.CustomField = BCAPI.Models.Model.extend({
        constructor: function(webappName, attributes, isNew, options) {
            BCAPI.Models.Model.call(this, attributes, options);

            this._isNew = _.isBoolean(isNew) ? isNew : true;

            if (this._isNew && (_.isUndefined(attributes) || _.isUndefined(attributes.id))) {
                throw new Error("The id for the custom field must be specified.");
            }

            var id = Number(attributes.id);
            if (!_.isNumber(id) || _.isNaN(id) || id <= 0) {
                throw new Error("The id for the custom field must be a positive number.");
            }

            this._webappName = webappName;
            this.set({
                webapp: new BCAPI.Models.WebApp.App({
                    name: webappName
                })
            });
        },
        /**
         * This method returns the endpoint for custom fields api.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.CustomField
         * @returns {String} The endpoint url for webapp custom fields.
         */
        endpoint: function() {
            return endpointGenerator(this._webappName);
        },
        /**
         * This method is overriden in order to remove *webapp* field from API request.
         * Webapp it's a pseudo attribute used internally by an item collection.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.CustomField
         * @param {Object} options The options which must be passed as parameter to inherited ttoJSON method.
         * @returns {Object} The json representation of the current custom field.
         */
        toJSON: function(options) {
            var result = BCAPI.Models.Model.prototype.toJSON.call(this, options);

            delete result.webapp;

            return result;
        },
        /**
         * This method is overriden in order to use the correct HTTP verb on creation and update
         * since the id of the item is always passed.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.CustomField
         * @returns {Boolean} True if the model is new and false otherwise.
         */
        isNew: function() {
            return this._isNew;
        }
    });

    /**
     * This class provides a collection for working with web app custom fields. In order to use this collection you must provide
     * a webapp name. For more information regarding custom fields read {@link BCAPI.Models.WebApp.Item}.
     *
     * @name CustomFieldCollection
     * @class
     * @constructor
     * @memberOf BCAPI.Models.WebApp
     * @example
     * var fieldsCollection = new BCAPI.Models.WebApp.CustomFieldCollection("Sample webapp");
     */
    BCAPI.Models.WebApp.CustomFieldCollection = BCAPI.Models.Collection.extend({
        constructor: function(webappName, attributes, options) {
            BCAPI.Models.Collection.call(this, attributes, options);

            this._webappName = webappName;
        },

        model: BCAPI.Models.WebApp.CustomField,

        /**
         * This method is overriden because we need access to members in order to create the endpoint.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.WebApp.CustomField
         * @returns {string} An absolute entry point API.
         */
        urlRoot: function() {
            return this.model.prototype.urlRoot(endpointGenerator(this._webappName));
        },
        /**
         * We override this method in order to transform each returned item into a strong typed
         * {@link BCAPI.Models.WebApp.CustomField} models.
         *
         * @method
         * @instance
         * @param {Object} response The JSON response received from CustomField api.
         * @returns {Array} A list of web app custom fields.
         * @memberOf BCAPI.Models.WebApp.CustomField
         */
        parse: function(response) {
            response = BCAPI.Models.Collection.prototype.parse.call(this, response);

            var fields = [],
                self = this,
                Model = self.model;

            _.each(response, function(field) {
                fields.push(new Model(self._webappName, field, false));
            });

            return fields;
        }
    });
})(jQuery);