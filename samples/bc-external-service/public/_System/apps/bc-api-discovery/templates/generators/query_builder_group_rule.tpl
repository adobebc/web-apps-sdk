<!--
*
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
*
-->

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