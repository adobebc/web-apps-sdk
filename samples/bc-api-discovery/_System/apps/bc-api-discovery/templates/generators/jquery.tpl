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

<div class="panel panel-default codepanel" ng-hide="!defaultMessage">
    <div class="panel-body ng-binding" ng-bind-html="defaultMessage"></div>
</div>

<div class="col-md-4" ng-show="!defaultMessage">
    <div class="clear-both" ng-hide="showMethodSelect == undefined">
        <select class="form-control clear-after" placeholder="Chose a request method"
                ng-options = "request as request.label for request in requestTypes"
                ng-model = "selectedRequestType"
                ng-change = "generateSnippetFromJQueryTab(selectedRequestType);"></select><br>
    </div>
</div>

<api-code-panel snippet="snippet" resource-descriptor="resourceDescriptor" highlighter="moduleJQueryHighlighter"
        ng-show="!defaultMessage"></api-code-panel>
