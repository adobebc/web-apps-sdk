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
     * This controller provides the logic for correctly displaying the BC APIs discovery UI. It relies on
     * BC WebResources API registry in order to fecth accurate data.
     */
    function HomeController($scope, registryService, generatorsService, resourceLoader, globalLoadingService) {
        var self = this;

        this._registryService = registryService;
        this._generatorsService = generatorsService;
        this._resourceLoader = resourceLoader;
        this._globalLoadingService = globalLoadingService;

        this.$scope = $scope;

        this.$scope.resourceSelection = {
            options: {
                valueField: 'id',
                labelField: 'name',
                searchField: ['name']
            }
        };

        this.$scope.versionsSelection = {
            options: {
                valueField: 'id',
                labelField: 'name',
                searchField: ['name']
            }
        };

        this.$scope.subresourceSelection = {
            options: {
                valueField: 'id',
                labelField: 'name',
                searchField: ['name']
            }
        };

        this.$scope.sampleResourcesSelection = {
            options: {
                valueField: 'id',
                labelField: 'id',
                searchField: ['id']
            }
        };

        this.$scope.$watch(
            function () {
                return self.$scope.resourceSelection.value;
            },
            function () {
                self._displayVersions();
            });

        this.$scope.$watch(
            function () {
                return self.$scope.versionsSelection.value;
            },
            function () {
                self._loadSampleResources();
                self._displayResourceFields();
            });

        this.$scope.$watch(
            function () {
                return self.$scope.sampleResourcesSelection.value;
            },
            function () {
                self._displayResourceFields();
                self._displaySubresources();
            });

        this.$scope.$watch(
            function () {
                return self.$scope.subresourceSelection.value;
            },
            function () {
                self._displaySubresourceFields();
            });

        this.$scope.resources = [];
        this.$scope.versions = [];
        this.$scope.subresources = [];
        this.$scope.sampleResources = [];

        this.$scope.fields = [];
        this.$scope.allFieldsSelected = false;
        this.$scope.generatedRequest = undefined;

        this.$scope.displayVersions = function () {
            return self._displayVersions();
        };

        this.$scope.displaySubresources = function () {
            return self._displaySubresources();
        };

        this.$scope.displayResourceFields = function () {
            return self._displayResourceFields();
        };

        this.$scope.displaySubresourceFields = function () {
            return self._displaySubresourceFields();
        };

        this.$scope.selectAllFields = function () {
            return self._selectAllFields();
        };

        this.$scope.updateGeneratorsData = function () {
            return self._updateGeneratorsData();
        };

        this.$scope.getSelectedFields = function () {
            return self._getSelectedFields();
        };

        this.$scope.loadSampleResources = function () {
            return self._loadSampleResources();
        };

        this._displayResources();
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method displays all available resources currently available in BC.
     */
    HomeController.prototype._displayResources = function () {
        var self = this;

        this.$scope.subresourceSelection.value = undefined;
        this.$scope.subresources = [];

        this.$scope.versionsSelection.value = undefined;
        this.$scope.versions = [];

        this._registryService.getRegistry().then(function (data) {
            self.$scope.resources = [];

            for (var resourceName in data) {
                self.$scope.resources.push({"id": resourceName, "name": resourceName});
            }
        });
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method displays all available versions for the selected resource.
     */
    HomeController.prototype._displayVersions = function () {

        var resourceId = this.$scope.resourceSelection.value,
            self = this;

        this.$scope.versionsSelection.value = undefined;
        this.$scope.subresourceSelection.value = undefined;
        this.$scope.sampleResourcesSelection.value = undefined;

        if (!resourceId) {
            return;
        }

        this._registryService.getRegistry().then(function (data) {
            self.$scope.versions = [];
            var selectedVersion;

            for (var version in data[resourceId]) {
                self.$scope.versions.push({"id": version, "name": version});

                selectedVersion = version;
            }

            self.$scope.versionsSelection.value = selectedVersion;
            self._updateGeneratorsData();
        });
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method displays all available subresources for the selected resource.
     */
    HomeController.prototype._displaySubresources = function () {
        var resourceId = this.$scope.resourceSelection.value,
            versionId = this.$scope.versionsSelection.value,
            self = this;

        if (!resourceId || !versionId) {
            return;
        }

        this.$scope.subresourceSelection.value = undefined;
        this.$scope.subresources = [];

        this._registryService.getRegistry().then(function (data) {
            var subresources = self._getSubresources(resourceId, versionId, data);

            for (var subresourceName in subresources) {
                self.$scope.subresources.push({"id": subresourceName, "name": subresourceName,
                                               "isOneToManyRelation": subresources[subresourceName].isOneToMany});
            }
        });

        self._updateGeneratorsData();
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method obtains all available subresources for a given resource identifier and
     * a specified version.
     */
    HomeController.prototype._getSubresources = function (resourceId, version, registry) {
        var resourceDescriptor = registry[resourceId][version];

        return resourceDescriptor.fields.manyRelation;
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method is used to load sample resources for the currently selected resource, resource version
     * and subresource.
     */
    HomeController.prototype._loadSampleResources = function () {

        var data = this._generatorsService.data,
            self = this;

        if (!data || !data.resourceName || !data.version) {
            return;
        }

        var response = this._resourceLoader.loadSampleResources(data.resourceName, data.version,
            data.subresourceName);
        response.then(function (sampleResources) {
            self.$scope.sampleResources = sampleResources;
            data.sampleResources = sampleResources;
        });
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method displays all resource fields identified from bc registry.
     */
    HomeController.prototype._displayResourceFields = function () {
        var resourceId = this.$scope.resourceSelection.value,
            versionId = this.$scope.versionsSelection.value,
            self = this;

        if (!resourceId | !versionId) {
            self.$scope.fields = [];

            return;
        }

        this._registryService.getRegistry().then(function (data) {
            var resourceFields = data[resourceId][versionId].fields,
                fields;

            fields = self._getFieldsObject(resourceFields, "identifier");
            fields = fields.concat(self._getFieldsObject(resourceFields, "primary"));
            fields = fields.concat(self._getFieldsObject(resourceFields, "singleRelation"));

            self.$scope.fields = fields;

            self._updateGeneratorsData();
        });
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method displays all subresource fields in the currenly selected resource context.
     */
    HomeController.prototype._displaySubresourceFields = function () {
        var resourceId = this.$scope.resourceSelection.value,
            versionId = this.$scope.versionsSelection.value,
            subresourceId = this.$scope.subresourceSelection.value;
        self = this;

        if (!resourceId || !subresourceId || !versionId) {
            return;
        }

        this._registryService.getRegistry().then(function (data) {
            var subresource = data[resourceId][versionId].fields.manyRelation[subresourceId],
                subresourceVersion = subresource.version;

            subresourceId = subresource.type;

            var resourceFields = data[subresourceId][subresourceVersion].fields,
                fields;

            fields = self._getFieldsObject(resourceFields, "identifier");
            fields = fields.concat(self._getFieldsObject(resourceFields, "primary"));
            fields = fields.concat(self._getFieldsObject(resourceFields, "singleRelation"));

            self.$scope.fields = fields;

            self._updateGeneratorsData();
        });
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method receives fields object as stored by bc registry and a fields role (identifier,
     * primary or singleRelation) and returns an of field objects for display.
     */
    HomeController.prototype._getFieldsObject = function (fields, fieldsRole) {
        var fieldObjects = [];

        fields = fields[fieldsRole];

        for (var fieldName in fields) {
            fieldObjects.push({"name": fieldName, "type": fields[fieldName].type});
        }

        return fieldObjects;
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method is responsible to update all values from generators data service instance.
     */
    HomeController.prototype._updateGeneratorsData = function () {
        var resourceId = this.$scope.resourceSelection.value,
            versionId = this.$scope.versionsSelection.value,
            subresourceId = this.$scope.subresourceSelection.value,
            sampleResources = this.$scope.sampleResources,
            existingResourceId = this.$scope.sampleResourcesSelection.value;

        var selectedFields = this._getSelectedFields(),
            existingWhere = this._generatorsService.data ? this._generatorsService.data.where : undefined,
            isOneToManyRelation;

        if(this.$scope.subresources && subresourceId) {
            for(var i = 0; i < this.$scope.subresources.length; i++) {
                if(this.$scope.subresources[i].name == subresourceId) {
                    isOneToManyRelation = this.$scope.subresources[i].isOneToManyRelation;
                    break;
                }    
            }
        }
             
        this._generatorsService.data = {
            "resourceName": resourceId,
            "version": versionId,
            "subresourceName": subresourceId,
            "isOneToManyRelation": isOneToManyRelation,
            "sampleResources": sampleResources,
            "existingResourceId": existingResourceId,
            "fields": selectedFields,
            "where": existingWhere
        };

        this.$scope.allFieldsSelected = selectedFields.length == this.$scope.fields.length;
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method select / unselect all fields currently displayed.
     */
    HomeController.prototype._selectAllFields = function () {
        this.$scope.allFieldsSelected = !this.$scope.allFieldsSelected;

        for (var idx = 0; idx < this.$scope.fields.length; idx++) {
            this.$scope.fields[idx].selected = this.$scope.allFieldsSelected;
        }

        this._updateGeneratorsData();
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method returns all selected fields from the interface.
     */
    HomeController.prototype._getSelectedFields = function () {
        var allFields = this.$scope.fields,
            selectedFields = [];

        for (var idx = 0; idx < allFields.length; idx++) {
            if (!allFields[idx].selected) {
                continue;
            }

            selectedFields.push(allFields[idx]);
        }

        return selectedFields;
    };

    app.controller("HomeController", ["$scope", "BcRegistryService", "GeneratorsDataService",
        "ResourceLoaderService", "GlobalLoadingService", HomeController]);
})(DiscoveryApp);