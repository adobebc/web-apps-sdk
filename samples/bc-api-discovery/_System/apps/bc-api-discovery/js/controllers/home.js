/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

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

(function(app) {
	/**
	 * @constructor
	 * @description
	 * This controller provides the logic for correctly displaying the BC APIs discovery UI. It relies on
	 * BC WebResources API registry in order to fecth accurate data.
	 */
	function HomeController($scope, registryService) {
		var self = this;

		this.$scope = $scope;
		this._registryService = registryService;

        this.$scope.resourceSelection = {
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

        this.$scope.resources = [];
        this.$scope.subresources = [];
        this.$scope.fields = [];

        this.$scope.displaySubresources = function() {
        	return self._displaySubresources();
        };

        this.$scope.displayResourceFields = function() {
        	return self._displayResourceFields();
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
	HomeController.prototype._displayResources = function() {
		var self = this;

		this._registryService.getRegistry().then(function(data) {
			self.$scope.resources = [];

			for(var resourceName in data) {
				self.$scope.resources.push({"id": resourceName, "name": resourceName});
			}
		});
	};

	/**
	 * @private
	 * @instance
	 * @method
	 * @description
	 * This method displays all available subresources for the selected resource.
	 */
	HomeController.prototype._displaySubresources = function() {
		var resourceId = this.$scope.resourceSelection.value,
			self = this;

		this._registryService.getRegistry().then(function(data) {
			self.$scope.subresources = [];

			var subresources = self._getSubresources(resourceId, "v3", data);

			for(var subresourceName in subresources) {
				self.$scope.subresources.push({"id": subresourceName, "name": subresourceName});
			}
		});
	};

	/**
	 * @private
	 * @instance
	 * @method
	 * @description
	 * This method displays all resource fields identified from bc registry.
	 */
	HomeController.prototype._displayResourceFields = function() {
		var resourceId = this.$scope.resourceSelection.value,
			self = this;

		this._registryService.getRegistry().then(function(data) {
			var resourceFields = data[resourceId]["v3"].fields,
				fields;

			fields = self._getFieldsObject(resourceFields, "identifier");
			fields = fields.concat(self._getFieldsObject(resourceFields, "primary"));
			fields = fields.concat(self._getFieldsObject(resourceFields, "singleRelation"));

			self.$scope.fields = fields;
		});	
	};

	/**
	 * @private
	 * @instance
	 * @method
	 * @description
	 * This method obtains all available subresources for a given resource identifier and
	 * a specified version.
	 */
	HomeController.prototype._getSubresources = function(resourceId, version, registry) {
		var resourceDescriptor = registry[resourceId][version];

		return resourceDescriptor.fields.manyRelation;
	};

	/**
	 * @private
	 * @instance
	 * @method
	 * @description
	 * This method receives fields object as stored by bc registry and a fields role (identifier,
	 * primary or singleRelation) and returns an of field objects for display.
	 */
	HomeController.prototype._getFieldsObject = function(fields, fieldsRole) {
		var fieldObjects = [];

		fields = fields[fieldsRole];

		for(var fieldName in fields) {
			fieldObjects.push({"name": fieldName, "type": fields[fieldName].type});
		}

		return fieldObjects;
	};

	app.controller("HomeController", ["$scope", "BcRegistryService", HomeController]);
})(DiscoveryApp);