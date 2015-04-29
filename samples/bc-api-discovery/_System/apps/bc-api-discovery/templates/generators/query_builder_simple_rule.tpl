<select ng-model="rule.subresource"
        ng-options="subresource.name for subresource in subresources"
        ng-change="updateRelationFields(rule); updateQuery();"
        ng-show="subresources.length > 0"></select>

<select ng-model="rule.field"
        ng-options="field.name for field in rule.subresourceFields.length == 0 ? resourceFields : rule.subresourceFields"
        ng-change="updateQuery();"></select>

<select ng-model="rule.operator" ng-options="operator.name for operator in supportedOperators"
        ng-change="updateQuery();"></select>

<input type="text" ng-model="rule.value" placeholder="Provide the filter values ..."
       ng-change="updateQuery();" />

<button type="button" class="btn btn-default" ng-hide="rule.parentRule != null && rule.parentRule.isGroupRule && $index < 2"
        ng-click="removeRule(rule); updateQuery();">Remove rule</button>
