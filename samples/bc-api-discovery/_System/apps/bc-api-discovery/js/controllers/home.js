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

        this.$scope.resources = [];
        this.$scope.versions = [];
        this.$scope.subresources = [];
        this.$scope.fields = [];
        this.$scope.allFieldsSelected = false;
        this.$scope.generatedRequest = undefined;

        this.$scope.displayVersions = function() {
        	return self._displayVersions();
        };

        this.$scope.displaySubresources = function() {
        	return self._displaySubresources();
        };

        this.$scope.displayResourceFields = function() {
        	return self._displayResourceFields();
        };

        this.$scope.displaySubresourceFields = function() {
        	return self._displaySubresourceFields();
        };

        this.$scope.selectAllFields = function() {
        	return self._selectAllFields();
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
	 * This method displays all available versions for the selected resource.
	 */
	HomeController.prototype._displayVersions = function() {
		var resourceId = this.$scope.resourceSelection.value,
			self = this;

		self.$scope.versionsSelection.value = undefined;
		self.$scope.subresourceSelection.value = undefined;

		if(!resourceId) {
			return;
		}

		this._registryService.getRegistry().then(function(data) {
			self.$scope.versions = [];
			var selectedVersion;

			for(var version in data[resourceId]) {
				self.$scope.versions.push({"id": version, "name": version});

				selectedVersion = version;
			}

			self.$scope.versionsSelection.value = selectedVersion;
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
			versionId = this.$scope.versionsSelection.value,
			self = this;

		if(!resourceId || !versionId) {
			return;
		}

		self.$scope.subresources = [];

		this._registryService.getRegistry().then(function(data) {
			self.$scope.subresourceSelection.value = undefined;

			var subresources = self._getSubresources(resourceId, versionId, data);

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
	 * This method displays all resource fields identified from bc registry.
	 */
	HomeController.prototype._displayResourceFields = function() {
		var resourceId = this.$scope.resourceSelection.value,
			versionId = this.$scope.versionsSelection.value,
			self = this;

		this.$scope.allFieldsSelected = false;

		if(!resourceId | !versionId) {
			self.$scope.fields = [];

			return;
		}

		this._registryService.getRegistry().then(function(data) {
			var resourceFields = data[resourceId][versionId].fields,
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
	 * This method displays all subresource fields in the currenly selected resource context.
	 */
	HomeController.prototype._displaySubresourceFields = function() {
		var resourceId = this.$scope.resourceSelection.value,
			versionId = this.$scope.versionsSelection.value,
			subresourceId = this.$scope.subresourceSelection.value;
			self = this;

		this.$scope.allFieldsSelected = false;

		if(!resourceId || !subresourceId || !versionId) {
			return;
		}

		this._registryService.getRegistry().then(function(data) {
			var subresource = data[resourceId][versionId].fields.manyRelation[subresourceId],
				subresourceVersion = subresource.version;

			subresourceId = subresource.type;

			var resourceFields = data[subresourceId][subresourceVersion].fields,
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

	/**
	 * @private
	 * @instance
	 * @method
	 * @description
	 * This method select / unselect all fields currently displayed.
	 */
	HomeController.prototype._selectAllFields = function() {
		this.$scope.allFieldsSelected = !this.$scope.allFieldsSelected;

		for(var idx = 0; idx < this.$scope.fields.length; idx++) {
			this.$scope.fields[idx].selected = this.$scope.allFieldsSelected;
		}
	};

	app.controller("HomeController", ["$scope", "BcRegistryService", HomeController]);
})(DiscoveryApp);