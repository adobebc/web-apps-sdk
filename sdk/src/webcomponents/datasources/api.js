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
    }
};

var baseDataSource = Object.create(BCAPI.Components.DataSources.DataSource.prototype);
$.extend(webComponent, baseDataSource);
webComponent.__baseDataSource = baseDataSource;

$.extend(webComponent, {
    /**
     * This method is invoked automatically in order to attach the current datasource to its parent component
     * if necessary.
     *
     * @public
     * @method
     * @name attached
     * @memberof BCAPI.Components.DataSources
     * @returns {undefined}
     */
    attached: function() {
        this.__baseDataSource.attached.apply(this);
    },
    ready: function() {
        var parentNode = this.parentNode,
            self = this;

        while (parentNode && !parentNode._supportsDataSource) {
            parentNode = parentNode.parentNode;
        }

        if (parentNode && parentNode._supportsDataSource) {
            parentNode._dataSource = this;
        }
    },
    configure: function(opts) {
        this.apiName = opts.apiName || this.apiName;
        this.apiVersion = opts.apiVersion || this.apiVersion;
        this.fields = opts.fields || this.fields;
        this.where = opts.where || this.where;
        this.resourceId = opts.resourceId;
    },
    list: function(opts) {
        var data = [],
            loader = $.Deferred(),
            bcConfig = BCAPI.Security.securityCfg;

        opts = opts || {};

        opts.fields = opts.fields || this.fields;
        opts.where = opts.where || this.where;
        opts.resourceId = opts.resourceId || this.resourceId;

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
            "url": this._getApiUrl(this.apiName, this.apiVersion, opts.resourceId, bcConfig),
            "data": data.join("&"),
            "headers": {
                "Authorization": bcConfig.accessToken
            }
        });

        response.done(function(data) {
            loader.resolve(data);
        });

        return loader.promise();
    },
    _getApiUrl: function(apiName, apiVersion, resourceId, bcConfig) {
        return [bcConfig.siteUrl, "/webresources/api/", apiVersion, "/sites/current/",
            apiName, resourceId ? "/" + resourceId : ""
        ].join("");
    }
});
