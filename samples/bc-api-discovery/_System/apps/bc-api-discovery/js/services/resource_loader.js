/* 
 *
 * Copyright (c) 2012-2015 Adobe Systems Incorporated. All rights reserved.

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

(function (app) {
    /**
     * @constructor
     * @description
     * This service provides helper method for loading resources or subresources from the current
     * site.
     */
    function ResourceLoaderService($q, apiFactory) {
        this._$q = $q;
        this._apiFactory = apiFactory;

        console.log("Resource loader service instantiated.");
    };

    /**
     * @public
     * @instance
     * @method
     * @description
     * This method is responsible for loading existing sample resources. It relies on the given parameters in order
     * to fetch real data from the current site. Internally it generates a query which fetches resources which
     * have at least one given subresource name associated with it or if subresource name is null it will fetch
     * all resources for a resourceName.
     */
    ResourceLoaderService.prototype.loadSampleResources = function (resourceName, version, subresourceName) {
        var response = this._$q.defer(),
            self = this;

        this._apiFactory.getProxy(resourceName, version).then(function (proxy) {

            var where = undefined;

            if (subresourceName) {
                where = self._buildResourceHasSubresourcesQuery(proxy, subresourceName);
            }

            proxy.list(where).then(function (itemsResponse) {
                var idFieldName = proxy.getResourceIdFieldName(),
                    sampleResources = [];

                for (var idx = 0; idx < itemsResponse.data.items.length; idx++) {
                    var item = itemsResponse.data.items[idx];
                    sampleResources.push({"id": item[idFieldName]});
                }

                response.resolve(sampleResources);
            });
        });

        return response.promise;
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method builds a where condition which ensures that all included resources have at least one subresource
     * identified by the given subresource name. At the moment it makes a hard assumption that subresources contain
     * only numeric fields in their primary key.
     */
    ResourceLoaderService.prototype._buildResourceHasSubresourcesQuery = function (proxy, subresourceName) {
        var resourceDescriptor = proxy.resourceDescriptor,
            subresourceDescriptor = proxy.getSubresourceDescriptor(subresourceName),
            idName;

        for (var key in subresourceDescriptor.fields.identifier) {
            idName = key;
            break;
        }

        var where = {};
        where[subresourceName + "." + idName] = {"$gt": 0};

        return where;
    };

    app.service("ResourceLoaderService", ["$q", "BcApiFactory", ResourceLoaderService]);
})(DiscoveryApp);