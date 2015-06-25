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
        this.$scope.supportedGroupOperators = this._SUPPORTED_GROUP_OPERATORS;

		this.$scope.resourceFields = [];
		this.$scope.subresources = [];		

		this.$scope.addNewRule = function(parent) {
			self._addNewRule(parent, false);
		};

        this.$scope.addNewGroupRule = function(parent) {
            self._addNewRule(parent, true);
        };

		this.$scope.updateRelationFields = function(rule) {
			self._updateRelationFields(rule);
		};

        this.$scope.updateSelectedGroupOperator = function(event, rule, groupOperator) {
            self._updateSelectedGroupOperator(event, rule, groupOperator);
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
			"operator": undefined
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

    QueryBuilderController.prototype._SUPPORTED_GROUP_OPERATORS = [
        {
            "name": "And",
            "requiresEnum": false,
            "operator": "$and"
        },
        {
            "name": "Or",
            "requiresEnum": false,
            "operator": "$or"
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

		var title = [BUILDER_TITLE, " resource ", data.resourceName];

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
				isSubresource = false;

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
	QueryBuilderController.prototype._addNewRule = function(parent, isGroupRule) {
        var defaultOperator;
        if(isGroupRule) {
            defaultOperator = this._SUPPORTED_GROUP_OPERATORS[0].name;
        }
        else {
            defaultOperator = this._SUPPORTED_OPERATORS[0].name;
        }

        parent = typeof parent == "undefined"? null : parent;

        var rule = {
            "isGroupRule": isGroupRule,
            "subresource": undefined,
            "field": undefined,
            "operator": defaultOperator,
            "value": undefined,
            "subresourceFields": [],
            "parentRule": parent,
            "childRules": []
        };

        // By default, there are 2 simple rules;
        if(isGroupRule) {
            rule.childRules.push({
                "isGroupRule": false,
                "subresource": undefined,
                "field": undefined,
                "operator": defaultOperator,
                "value": undefined,
                "subresourceFields": [],
                "parentRule": rule,
                "childRules": []
            });

            rule.childRules.push({
                "isGroupRule": false,
                "subresource": undefined,
                "field": undefined,
                "operator": defaultOperator,
                "value": undefined,
                "subresourceFields": [],
                "parentRule": rule,
                "childRules": []
            });
        }

        if(parent) {
            parent.childRules.push(rule);
        }
        else {
            this.$scope.rules.push(rule);
        }
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
        var self = this;

		for(var idx = 0; idx < this.$scope.rules.length; idx++) {
			var existingRule = this.$scope.rules[idx];

            if(existingRule == rule) {
                this.$scope.rules.splice(idx, 1);
                break;
            }

            if(self._removeChildRule(existingRule, rule)) {
                break;
            }
		}
	};

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method removes the specified child rule from ui.
     */
    QueryBuilderController.prototype._removeChildRule = function(parentRule, childRule) {
        var self = this;

        for(var idx = 0; idx < parentRule.childRules.length; idx++) {
            var existingRule = parentRule.childRules[idx];

            if(existingRule == childRule) {
                parentRule.childRules.splice(idx, 1);
                return true;
            }

            if(self._removeChildRule(existingRule, childRule)) {
                return true;
            }
        }

        return false;
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method removes the specified child rule from ui.
     */
    QueryBuilderController.prototype._updateSelectedGroupOperator = function(event, rule, groupOperator) {
        rule.operator = groupOperator.name;

        $(event.target).addClass("active").siblings().removeClass("active");
    };

    /**
     * @private
     * @instance
     * @method
     * @description
     * This method is used to generate a query for a child rule.
     * to developers.
     */
    QueryBuilderController.prototype._updateChildRuleQuery = function(rule) {
        var condition = {};

        if(rule.isGroupRule) {
            var operator = null;
            for(var idOp = 0; idOp < this._SUPPORTED_GROUP_OPERATORS.length; idOp++) {
                if(this._SUPPORTED_GROUP_OPERATORS[idOp].name == rule.operator) {
                    operator = this._SUPPORTED_GROUP_OPERATORS[idOp].operator;
                    break;
                }
            }

            condition[operator] = [];

            for(var idx = 0; idx < rule.childRules.length; idx++) {
                var childRule = rule.childRules[idx];

                condition[operator].push(this._updateChildRuleQuery(childRule));
            }
        }
        else if(rule.field && rule.operator && rule.value) {
            var fieldName = [],
                fieldValue;

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

            if(rule.operator.operator) {
                condition[fieldName] = {};
                condition[fieldName][rule.operator.operator] = fieldValue;
            }
            else {
                condition[fieldName] = fieldValue;
            }
        }

        return condition;
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
            var rule = this.$scope.rules[idx];
            var childCondition = this._updateChildRuleQuery(rule);

            for(var key in childCondition) {
                condition[key] = childCondition[key];
            }
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