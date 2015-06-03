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
