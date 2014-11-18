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
	var BUILDER_TITLE = "Query builder for";
	var ADD_RULE_MSG = "Please add a new rule.";

	/**
	 * @constructor
	 * @description
	 * This class provides the controller which provides the algorithm for interactively building BC apis 
	 * queries.
	 */
	function QueryBuilderController($scope, generatorsDataService, apiFactory) {
		var self = this;

		this._generatorsDataService = generatorsDataService;
		this._apiFactory = apiFactory;

		this.$scope = $scope;
		this.$scope.title = undefined;
		this.$scope.infoMsg = ADD_RULE_MSG;
		this.$scope.rules = [];
		this.$scope.generatorsData = generatorsDataService.data;
		this.$scope.supportedOperators = this._SUPPORTED_OPERATORS;

		this.$scope.resourceFields = [];
		this.$scope.subresources = [];		

		this.$scope.addNewRule = function() {
			self._addNewRule();
		};

		this.$scope.updateRelationFields = function(rule) {
			self._updateRelationFields(rule);
		};

		this.$scope.updateQuery = function() {
			self._updateQuery();
		};

		this.$scope.removeRule = function(rule) {
			self._removeRule(rule);
		}

		this.$scope.$watch(
			function() { return self._generatorsDataService.data; },
			function(data, oldData) {
				if(oldData != undefined && data.resourceName == oldData.resourceName && 
					data.version == oldData.version && data.subresourceName == oldData.subresourceName &&
					data.existingResourceId == oldData.existingResourceId) {
					return;
				}

				self._generateTitle(data);
				self._generateOptions(data);
			}
		);

		console.log("Query builder controller instantiated.");
	};

	/**
	 * @private
	 * @instance
	 * @constant
	 * @description
	 * This constant holds all supported operators which can be used for building queries.
	 */
	QueryBuilderController.prototype._SUPPORTED_OPERATORS = [
		{
			"name": "==",
			"requiresEnum": false,
			"operator": "$eq"
		},
		{
			"name": "<>",
			"requiresEnum": false,
			"operator": "$neq"
		},
		{
			"name": "<",
			"requiresEnum": false,
			"operator": "$lt"
		},
		{
			"name": "<=",
			"requiresEnum": false,
			"operator": "$lte"
		},
		{
			"name": ">",
			"requiresEnum": false,
			"operator": "$gt"
		},
		{
			"name": ">=",
			"requiresEnum": false,
			"operator": "$gte"
		},
		{
			"name": "in",
			"requiresEnum": true,
			"operator": "$in"
		},
		{
			"name": "not in",
			"requiresEnum": true,
			"operator": "$nin"
		},
		{
			"name": "starts with",
			"requiresEnum": false,
			"operator": "$beginsWith"
		},
		{
			"name": "contains",
			"requiresEnum": false,
			"operator": "$contains"
		}
	];

	/**
	 * @private
	 * @instance
	 * @method
	 * @description
	 * This method builds the title for query builder section of the ui.
	 */
	QueryBuilderController.prototype._generateTitle = function(data) {
		if(!data.resourceName) {
			return;
		}

		var title = [BUILDER_TITLE, " resource", data.resourceName];

		if(data.version) {
			title.push(", version ");
			title.push(data.version);
		}

		if(data.subresourceName) {
			title.push(", subresource ");
			title.push(data.subresourceName);
		}

		this.$scope.title = title.join("");
	};

	/**
	 * @private
	 * @instance
	 * @method
	 * @description
	 * This method builds the all options required to add rules into ui. Internally it uses
	 * the api factory and bc registry services.
	 */
	QueryBuilderController.prototype._generateOptions = function(data) {
		var self = this;

		this.$scope.rules = [];
		this.$scope.subresources = [];
		this.$scope.resourceFields = [];
		this.$scope.generatorsData = data;
		data.where = {};

		if(!data || !data.resourceName || !data.version) {
			return;
		}

		this._apiFactory.getProxy(data.resourceName, data.version).then(function(proxy) {
			var resourceDescriptor = proxy.resourceDescriptor,
				isSubresource = false;;

			if(data.subresourceName) {
				resourceDescriptor = proxy.getSubresourceDescriptor(data.subresourceName);
				isSubresource = true;
			}
						
			for(var fieldName in resourceDescriptor.fields.identifier) {
				if(fieldName == "siteId") {
					continue;
				}

				var field = resourceDescriptor.fields.identifier[fieldName];
				field.name = fieldName;

				self.$scope.resourceFields.push(field);
			}

			for(var fieldName in resourceDescriptor.fields.primary) {
				var field = resourceDescriptor.fields.primary[fieldName];
				field.name = fieldName;

				self.$scope.resourceFields.push(field);
			}

			if(isSubresource) {
				return;
			}

			for(var fieldName in resourceDescriptor.fields.singleRelation) {
				var field = resourceDescriptor.fields.singleRelation[fieldName];
				field.name = fieldName;
				field.singleRelation = true;

				self.$scope.subresources.push(field);
			}

			for(var fieldName in resourceDescriptor.fields.manyRelation) {
				var field = resourceDescriptor.fields.manyRelation[fieldName];
				field.name = fieldName;
				field.manyRelation = true;

				self.$scope.subresources.push(field);
			}			
		});
	};

	/**
	 * @private
	 * @instance
	 * @method
	 * @description
	 * This method adds a new filtering rule to the current query builder.
	 */
	QueryBuilderController.prototype._addNewRule = function() {
		var defaultOperator = this._SUPPORTED_OPERATORS[0].name;

		this.$scope.rules.push({
			"subresource": undefined,
			"field": undefined,
			"operator": defaultOperator,
			"value": undefined,
			"subresourceFields": []
		});
	};

	/**
	 * @private
	 * @instance
	 * @method
	 * @description
	 * This method populates subresource rule fields with the correct attributes.
	 */
	QueryBuilderController.prototype._updateRelationFields = function(rule) {
		var self = this,
			selectedSubresource = rule.subresource;

		rule.subresourceFields = [];
		rule.field = undefined;
		rule.operator = undefined;
		rule.value = undefined;

		this._apiFactory.getProxy(selectedSubresource.type, selectedSubresource.version).then(function(proxy) {
			var resourceDescriptor = proxy.resourceDescriptor;

			for(var fieldName in resourceDescriptor.fields.identifier) {
				var field = resourceDescriptor.fields.identifier[fieldName];
				field.name = fieldName;

				rule.subresourceFields.push(field);
			}

			for(var fieldName in resourceDescriptor.fields.primary) {
				var field = resourceDescriptor.fields.primary[fieldName];
				field.name = fieldName;

				rule.subresourceFields.push(field);
			}			
		});
	};

	/**
	 * @private
	 * @instance
	 * @method
	 * @description
	 * This method removes the specified rule from ui.
	 */
	QueryBuilderController.prototype._removeRule = function(rule) {
		for(var idx = 0; idx < this.$scope.rules.length; idx++) {
			var existingRule = this.$scope.rules[idx];

			if(existingRule != rule) {
				continue;
			}

			this.$scope.rules.splice(idx, 1);

			break;
		}
	};

	/**
	 * @private
	 * @instance
	 * @method
	 * @description
	 * This method is invoked automatically by each rule change in order to generate a new query which is displayed
	 * to developers.
	 */
	QueryBuilderController.prototype._updateQuery = function() {
		var condition = {};

		for(var idx = 0; idx < this.$scope.rules.length; idx++) {
			var rule = this.$scope.rules[idx],
				fieldName = [],
				fieldValue;

			if(!rule.field || !rule.operator || !rule.value) {
				continue;
			}

			if(rule.subresource) {
				fieldName.push(rule.subresource.name);
				fieldName.push(".");
			}

			if(rule.field) {
				fieldName.push(rule.field.name);
			}

			if(rule.field && rule.value && rule.operator) {
				fieldValue = rule.operator.requiresEnum ? rule.value.split(",") : rule.value;
			}

			fieldName = fieldName.join("");

			condition[fieldName] = {};
			condition[fieldName][rule.operator.operator] = fieldValue;
		}

		var newGeneratorData = {},
			data = this._generatorsDataService.data;

		for(var attrName in data) {
			newGeneratorData[attrName] = data[attrName];
		}

		newGeneratorData["where"] = condition;

		this._generatorsDataService.data = newGeneratorData;
	};

	app.controller("QueryBuilderController", ["$scope", "GeneratorsDataService", "BcApiFactory", 
												QueryBuilderController]);
})(DiscoveryApp);