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
    var SELECT_FIELDS = "Please select the fields you want to include.";
    var NO_SUBRESOURCES_FOUND = "No <b>{0}</b> contain <b>{1}</b> subresources. Please add one on your site.";
    var NO_EXISTING_RESOURCE_SELECTED = "No <b>{0}</b> resource selected. Please select one from your site.";
    var NO_METHOD_SELECTED = "Please select method for JQuery request";

    /**
     * @constructor
     * @public
     * @description
     * This class provides the module jquery generator which is responsible to generate queries based on the currently
     * selected fields.
     */
    function JqueryController($scope, $http, generatorsService, registryService, configService, apiFactory, moduleJQueryHighlighter,
                              handlebars, globalLoadingService) {

        var self = this;

        this._$http = $http;
        this._handlebars = handlebars;
        this._generatorsService = generatorsService;
        this._configService = configService;
        this._apiFactory = apiFactory;
        this._registryService = registryService;
        this._globalLoadingService = globalLoadingService;

        this._template = this._getJquerySnippetTemplate();

        this.$scope = $scope;
        this.$scope.moduleJQueryHighlighter = moduleJQueryHighlighter;

        this.$scope.requestTypes = undefined;

        this.$scope.$watch(
            function () {
                return self._generatorsService.data;
            },
            function (data) {
                self.$scope.requestTypes = [
                    {method: 'GET', label: 'GET'}
                ];

                if (data.resourceName && !data.existingResourceId && !data.subresourceName) {
                    self.$scope.requestTypes.push(
                        {method: 'POST', label: 'POST'}
                    );
                }

                if (data.resourceName && data.existingResourceId && !data.subresourceName) {
                    self.$scope.requestTypes.push(
                        {method: 'PUT', label: 'PUT'},
                        {method: 'DELETE', label: 'DELETE'}
                    );
                }

                if (data.resourceName && data.existingResourceId && data.subresourceName && !data.isOneToManyRelation) {
                    self.$scope.requestTypes.push(
                        {method: 'POST', label: 'POST'},
                        {method: 'DELETE', label: 'DELETE'}
                    );
                }

                if (data.resourceName && data.existingResourceId && data.subresourceName && data.isOneToManyRelation) {
                    self.$scope.requestTypes.push(
                        {method: 'POST', label: 'POST'}
                    );
                }

                self.$scope.selectedRequestType = self.$scope.requestTypes[0];
            }
        );

        this.$scope.selectedRequestType = undefined;
        this.$scope.showMethodSelect = undefined;

        this.$scope.defaultMessage = SELECT_FIELDS;
        this.$scope.data = this._generatorsService.data;
        this.$scope.snippet = undefined;
        this.$scope.resourceDescriptor = undefined;

        this.$scope.generateSnippet = function (data) {
            return self._generateSelectFieldAndSnippet(data, self._globalLoadingService);
        };

        this.$scope.$watch(
            function () {
                return self._generatorsService.data;
            },
            function (data) {
                self.$scope.generateSnippet(data);
            });

        this.$scope.generateSnippetFromJQueryTab = function (pSelReq) {
            self.$scope.selectedRequestType = pSelReq;
            self.$scope.generateSnippet(self._generatorsService.data);
        };

        console.log("Module jquery controller instantiated.");
    }

    /**
     * This method gets the handlebars jquery template that will be populated
     * with data.
     * @private
     */
    JqueryController.prototype._getJquerySnippetTemplate = function () {
        var self = this;
        this._$http({
            "url": "/_System/apps/bc-api-discovery/templates/generators/jquery_snippet.tpl",
            "type": "GET",
            "headers": {
                "Authorization": self._configService.api.accessToken
            }
        }).then(function (response) {
            self._template = self._handlebars.compile(response.data);
        });
    };

    /**
     * @private
     * @method
     * @instance
     * @description
     * This method generates a snippet of code based on the newly selected data.
     */
    JqueryController.prototype._generateSelectFieldAndSnippet = function (data, globalLoadingService) {

        var self = this;

        //check for select resource, sub resource fields.
        if (!this._validateInputData(data, this.$scope)) {
            return;
        }

        //if pass validate check show method select input.
        this.$scope.showMethodSelect = true;

        //if already selected hide err msg

        if (this.$scope.selectedRequestType != undefined) {

            this.$scope.defaultMessage = undefined;

            this._apiFactory.getProxy(data.resourceName, data.version).then(function (proxy) {
                self.$scope.resourceDescriptor = proxy.resourceDescriptor;

                if (data.subresourceName) {
                    self.$scope.resourceDescriptor = proxy.getSubresourceDescriptor(data.subresourceName);
                }

                self._generateSnippetRaw(data, self.$scope.resourceDescriptor, globalLoadingService);
            });

        } else {
            this.$scope.defaultMessage = NO_METHOD_SELECTED;
        }
    };

    /**
     * This method returns the template object used in handlebars to render the snippet for GET requests.
     * @param data
     * @param resourceDescriptor
     * @returns {{url: string, methodType: string}}
     * @private
     */
    JqueryController.prototype._generateSnippetForGetRequest = function (data, resourceDescriptor) {

        var templateUrl = this._buildUrl(data.resourceName, data.version, data.existingResourceId, data.subresourceName);

        var queryObject = {};
        var fields = "";
        //add fields, where, limit, skip and order parameters.
        if (data.fields.length != 0) {

            //add field names separated by a comma.
            for (var idx = 0; idx < data.fields.length - 1; idx++) {
                fields += data.fields[idx].name + ",";
            }
            fields += data.fields[data.fields.length - 1].name;

            queryObject["fields"] = fields;
        }

        if (!this._isEmpty(data.where)) {
            queryObject["where"] = data.where;
        }

        queryObject["skip"] = this._configService.limits.skip;
        queryObject["limit"] = this._configService.limits.limit;

        var orderCriteria;

        for (var pkName in resourceDescriptor.fields.identifier) {
            if (pkName == "siteId") {
                continue;
            }
            orderCriteria = pkName;
        }

        queryObject["order"] = orderCriteria;

        var fullUrl = templateUrl + "?fields=" + queryObject['fields'] + "&skip=" + queryObject['skip'] + "&limit=" + queryObject['limit'] + "&order=" + queryObject['order'];
        if (!this._isEmpty(data.where)) {
            fullUrl += "&where=" + JSON.stringify(queryObject["where"]);
        }

        return {
            url: '"' + fullUrl + '"',
            methodType: '"' + this.$scope.selectedRequestType.method + '"'
        };

    };


    /**
     * This function generates the query url needed for pre-populating post and put requests examples.
     * @param data
     * @param resourceDescriptor
     * @returns {string}
     * @private
     */
    JqueryController.prototype._generateUrlForPrepopulateRequest = function (data, resourceDescriptor) {

        //simple resource
        var primaryFields = Object.keys(resourceDescriptor.fields.primary).join(",");
        var identifierFields = Object.keys(resourceDescriptor.fields.identifier).join(",");
        var getUrl = this._buildUrl(data.resourceName, data.version, data.existingResourceId, data.subresourceName, true);

        if (this.$scope.selectedRequestType.method == "POST" && data.subresourceName == undefined && primaryFields != "") {
            getUrl += "?fields=" + primaryFields;
        }

        //subresource
        if ((this.$scope.selectedRequestType.method == "POST" || this.$scope.selectedRequestType.method == "DELETE")
            && data.subresourceName != undefined && identifierFields != "") {
            getUrl += "?fields=" + identifierFields;

            if (primaryFields != "") {
                getUrl += "," + primaryFields;
            }
        }

        //PUT fields (fields selected)
        if (this.$scope.selectedRequestType.method == "PUT") {
            if (data.fields.length != 0) {
                getUrl += "?fields=";

                //add field names separated by a comma.
                for (var idx = 0; idx < data.fields.length - 1; idx++) {
                    getUrl += data.fields[idx].name + ",";
                }
                getUrl += data.fields[data.fields.length - 1].name;
            }
        }

        return getUrl;
    };

    /**
     * @private
     * @method
     * @instance
     * @description
     * This method generates the snippet string which must be displayed to developer.
     */
    JqueryController.prototype._generateSnippetRaw = function (data, resourceDescriptor, globalLoadingService) {

        var self = this;
        var templateUrl = "";

        //For GET form the url using selected fields and query builder
        if (this.$scope.selectedRequestType.method == "GET") {

            templateData = this._generateSnippetForGetRequest(data, resourceDescriptor);

            this.$scope.snippet = this._template(templateData);

        } else {

            templateUrl = this._buildUrl(data.resourceName, data.version, data.existingResourceId, data.subresourceName);

            if (this.$scope.selectedRequestType.method == "POST" || this.$scope.selectedRequestType.method == "PUT"
                || (this.$scope.selectedRequestType.method == "DELETE" && data.subresourceName != undefined )) {

                globalLoadingService.setLoading(true);

                var identifierFields = Object.keys(resourceDescriptor.fields.identifier).join(",");

                var templatePrepopulatedDataTypes = {};
                $.each(resourceDescriptor.fields.identifier, function (key, value) {
                    templatePrepopulatedDataTypes[key] = value.type;
                })

                var getUrl = this._generateUrlForPrepopulateRequest(data, resourceDescriptor);

                this._$http({
                    "url": getUrl,
                    "type": "GET",
                    "headers": {
                        "Authorization": self._configService.api.accessToken
                    }
                }).success(function (response) {

                    globalLoadingService.setLoading(false);

                    self.templatePrepopulatedData = response;

                    if (response.items != undefined && response.items.length > 0) {
                        self.templatePrepopulatedData = response.items[0];
                    } else {
                        if (response.items != undefined && response.items.length == 0) {
                            self.templatePrepopulatedData = templatePrepopulatedDataTypes;
                        }
                    }

                    if (self.templatePrepopulatedData) {

                        //for subresources we need to keep only the requested fields
                        if (data.subresourceName != undefined) {
                            self.templatePrepopulatedData = self._filterResult(self.templatePrepopulatedData, identifierFields);
                        }

                        //add items array to result for post and delete requests
                        if ((self.$scope.selectedRequestType.method == "POST" || self.$scope.selectedRequestType.method == "DELETE")
                            && data.subresourceName != undefined && identifierFields != "") {
                            self.templatePrepopulatedData = {"items": [self.templatePrepopulatedData]};
                        }

                        //for delete the data fields are sent as query params.
                        if (self.$scope.selectedRequestType.method == "DELETE") {
                            templateUrl += "?items=" + JSON.stringify(self.templatePrepopulatedData.items).replace(/\"/g , "'");
                            templateData = {
                                url: '"' + templateUrl + '"',
                                methodType: '"' + self.$scope.selectedRequestType.method + '"'
                            }
                        } else {
                            templateData = {
                                url: '"' + templateUrl + '"',
                                dataFields: "data:" + " JSON.stringify(" + JSON.stringify(self.templatePrepopulatedData) + ")",
                                methodType: '"' + self.$scope.selectedRequestType.method + '"'
                            }
                        }

                        self.$scope.snippet = self._template(templateData);
                    }
                }).error(function (response) {

                    globalLoadingService.setLoading(false);

                    var templateData = {
                        url: '"' + templateUrl + '"',
                        methodType: '"' + self.$scope.selectedRequestType.method + '"'
                    };
                    self.$scope.snippet = self._template(templateData);
                });
            }

            if (this.$scope.selectedRequestType.method == "DELETE" && data.subresourceName == undefined) {

                var templateData = {
                    url: '"' + templateUrl + '"',
                    methodType: '"' + this.$scope.selectedRequestType.method + '"'
                };
                this.$scope.snippet = this._template(templateData);
            }
        }
    };

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    JqueryController.prototype._isEmpty = function (obj) {

        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    };

    JqueryController.prototype._filterResult = function (actualResult, wantedFields) {
        var result = {};

        var fieldsArray = wantedFields.split(",");

        for (var j = 0; j < fieldsArray.length; j++) {
            if (fieldsArray[j] == "siteId") {
                continue;
            }
            result[fieldsArray[j]] = actualResult[fieldsArray[j]];
        }

        return result;
    };

    JqueryController.prototype._replacer = function (key, value) {
        if (key == "privateProperty1") return undefined;
        else if (key == "privateProperty2") return undefined;
        else return value;
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method validates the given input data and updates the code snippet if an error occurs.
     */
    JqueryController.prototype._validateInputData = function (data, scope) {

        this.$scope.snippet = undefined;
        this.$scope.showMethodSelect = undefined;

        if (!data.fields || data.fields.length == 0) {
            this.$scope.defaultMessage = SELECT_FIELDS;

            return false;
        }

        if (data.subresourceName && (!data.sampleResources || data.sampleResources.length == 0)) {
            this.$scope.defaultMessage = NO_SUBRESOURCES_FOUND.replace("{0}", data.resourceName)
                .replace("{1}", data.subresourceName);

            return false;
        }

        if (data.subresourceName && !data.existingResourceId) {
            this.$scope.defaultMessage = NO_EXISTING_RESOURCE_SELECTED.replace("{0}", data.resourceName);

            return false;
        }

        return true;
    };

    /**
     * @param resourceName
     * @param resourceVersion
     * @param resourceId
     * @param subresourceName
     * @param absoluteUrl
     * @returns {string}
     * @private
     * This method builds the base url for requests or for display
     */
    JqueryController.prototype._buildUrl = function (resourceName, resourceVersion, resourceId, subresourceName, absoluteUrl) {

        typeof absoluteUrl !== 'undefined' ? absoluteUrl : false;

        var url = [];

        if (this._configService.api.protocol && this._configService.api.host && absoluteUrl) {
            url.push(this._configService.api.protocol);
            url.push("://");
            url.push(this._configService.api.host);
        }

        url.push(this._configService.bcWebResourcesApp);
        url.push("/api/");
        url.push(resourceVersion);
        url.push("/sites/current/");
        url.push(resourceName);

        if (resourceId) {
            url.push("/" + resourceId);
        }

        if (resourceId && subresourceName) {
            url.push("/" + subresourceName);
        }

        return url.join("");
    };


    app.controller("JqueryController", ["$scope", "$http", "GeneratorsDataService", "BcRegistryService", "ConfigService", "BcApiFactory",
        "ModuleJQueryHighlighterService", "HandlebarsService", "GlobalLoadingService", JqueryController]);
})(DiscoveryApp);