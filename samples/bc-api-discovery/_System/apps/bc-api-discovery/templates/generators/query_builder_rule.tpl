<section id="builder-menu">
    <button type="button" class="btn btn-default" ng-click="addNewRule();">Add rule</button>
    <button type="button" class="btn btn-default" ng-click="addNewGroupRule();">Add group</button>
</section>

<section id="builder-ui">
    <div ng-repeat="rule in rules">
        <div ng-switch on="rule.isGroupRule">
            <div ng-switch-when="false">
                <div ng-include="'/_System/apps/bc-api-discovery/templates/generators/query_builder_simple_rule.tpl'"></div>
            </div>
            <div ng-switch-when="true">
                <div ng-include="'/_System/apps/bc-api-discovery/templates/generators/query_builder_group_rule.tpl'"></div>
            </div>
        </div>
    </div>
</section>