<div class="panel panel-default querybuilder">
    <div class="panel-body content">
            <div class="row">
                <div class="btn-group">
                    <button type="button" class="btn btn-default" ng-repeat="groupOperator in supportedGroupOperators" ng-class="{active: $index == 0}"
                            ng-click="updateSelectedGroupOperator($event, rule, groupOperator); updateQuery()">{{groupOperator.name}}</button>
                </div>

                <button type="button" class="btn btn-default pull-right" ng-click="addNewRule(rule);">Add rule</button>
            </div>

            <div class="row">
                <div ng-repeat="rule in rule.childRules">
                    <div ng-include="'/_System/apps/bc-api-discovery/templates/generators/query_builder_simple_rule.tpl'"></div>
                </div>
            </div>

        <div class="panel-footer clearfix">
            <button type="button" class="btn btn-default" ng-click="removeRule(rule); updateQuery();">Remove rule</button>
        </div>
    </div>
</div>