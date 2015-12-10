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
 * This class provides a datasource which can seamlessly integrate BC APIs v3 with the components provided by the sdk.
 * As functionality it is similar with **module_data** from listing perspective, but it also supports create / update and delete
 * operations.
 *
 * @class ApiDataSource
 * @memberof BCAPI.Components.DataSources
 */
var webComponent = {
    is: "bc-api",
    properties: {
        apiName: String,
        apiVersion: String,
        fields: String,
        where: String
    },
    customEvents: [
        "postFetch"
    ]
};

var baseDataSource = Object.create(BCAPI.Components.DataSources.DataSource.prototype);
$.extend(webComponent, baseDataSource);
webComponent.__baseDataSource = baseDataSource;

$.extend(webComponent, {
    /**
     * This method can be used by developers to programmatically configure data source behavior.
     *
     * @public
     * @method
     * @instance
     * @param {Object} opts The options object used to configure the api datasource.
     * @param {String} opts.apiName The bc api name we want to bind this datasource to.
     * @param {String} opts.apiVersion The bc api version we want to use.
     * @param {String} opts.fields (optional) A comma separated list of fields we want to obtain during list / fetch operations.
     * @param {Object} opts.where (optional) A json object we want to use for filtering api records on server side.
     * @param {Object} opts.resourceId (optional) A specific resource identifier we want to fetch using this data source.
     * @memberof BCAPI.Components.DataSources.ApiDataSource
     * @returns {undefined}
     */
    configure: function(opts) {
        this.apiName = opts.apiName || this.apiName;
        this.apiVersion = opts.apiVersion || this.apiVersion;
        this.fields = opts.fields || this.fields;
        
        var where = opts.where || this.where;
        if (where && typeof where === "string") {
            where = JSON.parse(where);
        }

        this.where = where;
        this.resourceId = opts.resourceId;
    },
    /**
     * This method is used for list / fetch operations on the binded api name / version. It supports temporary overriding
     * datasource parameters (where, fields, resourceId) through opts parameter.
     *
     * @public
     * @instance
     * @method
     * @param {Object} opts Options used to override datasource parameters. In addition it can be used override other parameters passed to api (e.g order).
     * @param {String} opts.fields (optional) A comma separated list of fields we want to fetch from api.
     * @param {Object} opts.where (optional) A json object describing the filter which must be applied server side for the current list / fetch operation.
     * @param {String} opts.resourceId (optional) A resource identifier we attempt to fetch from server.
     * @memberof BCAPI.Components.DataSources.ApiDataSource
     * @returns {Promise} A promise which can be used in order to react when the list operation finished. At the moment it is a jquery compatible promise.
     */
    list: function(opts) {
        var data = [],
            loader = $.Deferred(),
            bcConfig = BCAPI.Security.getBcConfig();

        opts = opts || {};

        opts.fields = opts.fields || this.fields;
        opts.where = opts.where || this.where;
        
        var resourceId = opts.resourceId || this.resourceId;
        delete opts.resourceId;

        if (!bcConfig) {
            return;
        }

        for (var key in opts) {
            var optData = opts[key];

            if (!optData) {
                continue;
            }

            if (typeof optData !== "string") {
                optData = JSON.stringify(optData);
            }

            data.push(key + "=" + encodeURIComponent(optData));
        }

        var response = $.ajax({
            "url": this._getApiUrl(this.apiName, this.apiVersion, resourceId, bcConfig),
            "data": data.join("&"),
            "headers": {
                "Authorization": bcConfig.accessToken
            }
        });

        var self = this;
        response.done(function(data) {
            var evtCtx = {result: data};
            self.trigger("post-fetch", evtCtx);
            data = evtCtx.result;

            loader.resolve(data);
        });

        return loader.promise();
    },
    /**
     * This method calculates the absolute api url based on the specified parameters.
     *
     * @private
     * @method
     * @instance
     * @param {String} apiName The api we want to use.
     * @param {String} apiVersion The api version we want to use.
     * @param {String} resourceId The resource unique identifier we want to fetch.
     * @param {Object} bcConfig The bc configuration to use. See {@link BCAPI.Security.configure} for more details.
     * @memberof BCAPI.Components.DataSources.ApiDataSource
     * @returns {String} The api absolute url.
     */
    _getApiUrl: function(apiName, apiVersion, resourceId, bcConfig) {
        return [bcConfig.siteUrl, "/webresources/api/", apiVersion, "/sites/current/",
            apiName, resourceId ? "/" + resourceId : ""
        ].join("");
    }
});
