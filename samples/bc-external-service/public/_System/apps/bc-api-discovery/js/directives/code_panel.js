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
	/**
	 * @constructor
	 * @description
	 * This class provides the code for displaying snippets of code into a user friendly manner.
	 */
	function CodePanel() {
		this.restrict = "E";
		this.transclude = true;
		this.templateUrl = "/_System/apps/bc-api-discovery/templates/directives/code_panel.html";
		this.scope = {
			"snippet": "&",
			"resourceDescriptor": "&",
			"highlighter": "&"
		};
	};

	/**
	 * @public
	 * @instance
	 * @method
	 * @description
	 * This method is used to transform the code panel dom element into an active angularjs directive.
	 */
	CodePanel.prototype.link = function(scope, element, attrs) {
		scope.snippetFriendly = scope.snippet;

		scope.highlight = function(snippet, identifiers) {
			return scope.highlighter().highlight(snippet, identifiers);
		};

		scope.$parent.$watch(attrs.snippet, function(value) {
			var resourceDescriptor = scope.resourceDescriptor();

			scope.snippetFriendly = scope.highlight(value, resourceDescriptor);
		});
	};

	app.directive("apiCodePanel", function() {
		return new CodePanel();
	});
})(DiscoveryApp);