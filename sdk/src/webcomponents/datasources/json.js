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
/**
 * This class provides a json datasource responsible for loading a given json file and wrap it as a data source.
 *
 * ## Properties
 *
 * Below you can find a complete list of properties which can be configured for this component:
 *
 * | Property name | Property description |
 * | ------------------- | -------------------------- |
 * | url | This is the absolute / relative url location the data which must be loaded as json. |
 *
 * ## Usage
 *
 * ### Html nested in component
 *
 * ```html
 * <bc-select id="ddCustomers" value-prop="id" text-prop="firstName">
 *     <bc-json url="/_System/apps/bc-crm-next/assets/datasource/customers.json" rel="datasource"></bc-json>
 * </bc-select>
 * ```
 *
 * ### Html standalone datasource
 *
 * ```html
 * <bc-json url="/_System/apps/bc-crm-next/assets/datasource/customers.json" id="jsonDs"></bc-json>
 * ```
 *
 * ### Javascript
 *
 * ```javascript
 * var jsonDataSource = document.createElement("bc-json");
 * jsonDataSource.setAttribute("url", "/_System/apps/bc-crm-next/assets/datasource/customers.json");
 * ```
 *
 * @class  JsonDataSource
 * @memberof BCAPI.Components.DataSources
 * @augments BCAPI.Components.DataSources.DataSource
 */
var webComponent = {
    is: "bc-json",
    properties: {
        url: String
    },
    /**
     * This method is invoked automatically when the datasource is ready. At this point. the datasource has not been
     * attached to main.
     * @return {undefined} No result.
     */
    ready: function() {
        var parentNode = this.parentNode;

        while (parentNode && !parentNode._supportsDataSource) {
            parentNode = parentNode.parentNode;
        }

        if (parentNode && parentNode._supportsDataSource) {
            parentNode._dataSource = this;
        }
    },
    /**
     * This method fetches the json data from the configured **url**.
     *
     * @public
     * @instance
     * @method  fetch
     * @param  {Object} opts The options which are passed to the underlining ajax request.
     * @param {Object} opts.headers An object holding all custom headers relevant for the current request.
     * @return {Promise} a promise which is resolved with the actual data.
     * @memberof BCAPI.Components.DataSources.JsonDataSource
     */
    fetch: function(opts) {
        var loader = $.Deferred();

        var response = $.ajax({
            type: "GET",
            dataType: "json",
            url: this.url
        });

        response.done(function(data) {
            loader.resolve(data);
        });

        return loader.promise();
    }
};

webComponent = BCAPI.Components.ComponentsFactory.get(webComponent);