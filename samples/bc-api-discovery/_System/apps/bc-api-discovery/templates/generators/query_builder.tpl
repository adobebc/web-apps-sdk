<div class="panel panel-default querybuilder">
  <div class="panel-heading title">{{title}}</div>
  <div class="panel-body content">
   	<p ng-show="rules.length == 0">{{infoMsg}}</p>

    <div ng-include="'/_System/apps/bc-api-discovery/templates/generators/query_builder_rule.tpl'"></div>

  </div>
</div>