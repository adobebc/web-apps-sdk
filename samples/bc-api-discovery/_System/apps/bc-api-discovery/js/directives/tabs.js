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
	/**
	 * @public
	 * @constructor
	 * @description
	 * This class provides the directive for implementing bootstrap tabs component as an angular
	 * directive in which models can be plugged in.
	 * @example
	 * // tabs.html
	 * <api-tabs class="customeClass" model="tabs" selected=""></api-tabs>
	 *
	 * // tabs.js
	 * function Controller($scope) {
	 * 	$scope.tabs = [{"label": "Tab 1", "href": "#tab1"},
	 *					{"label": "Tab 2", "href": "#tab2", "selected": "true"},
	 *					{"label": "Tab 3", "href": "#tab3"}]
	 * }
	 */
	function TabsDirective() {
		this.templateUrl = "/_System/apps/bc-api-discovery/templates/directives/tabs.html";
		this.restrict = "E";
		this.transclude = true;
		this.scope = {};
	};

	/**
	 * @public
	 * @instance
	 * @method
	 * @description
	 * This method is automatically invoked by angularjs in order to link the current directive to the dom
	 * element.
	 */
	TabsDirective.prototype.link = function(scope, element, attrs) {
		scope.class = attrs.class;
		scope.model = scope.$parent[attrs.model];

		scope.indexedModel = _indexModelByHref(scope.model);
		_activateTabs(scope, scope.indexedModel, element);

		scope.showTab = _showTab;
	};

	/**
	 * @private
	 * @function
	 * @description
	 * This function receives a list of tab descriptor objects and index them by href.
	 */
	function _indexModelByHref(tabs) {
		var indexedTabs = {};

		tabs = tabs || [];

		for(var tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
			var tab = tabs[tabIndex];
			indexedTabs[tab.href] = tab;
		}

		return indexedTabs;
	};

	/**
	 * @private
	 * @function
	 * @description
	 * This function deselect all tabs from the given indexed model of tabs.
	 */
	function _deselectAllTabs(indexedModel) {
		indexedModel = indexedModel || {};

		for(var tabKey in indexedModel) {
			indexedModel[tabKey].selected = false;
		}
	};

	/**
	 * @private
	 * @function
	 * @description
	 * This function activates the tabs from the current given dom element. It relies on bootstrap
	 * tabs plugin.
	 */
	function _activateTabs(scope, indexedModel, element) {
		var currHash = window.location.hash,
			currSelectedTab;

		if(currHash.length > 2) {
			currHash = currHash.substr(2);

			currSelectedTab = indexedModel["#" + currHash];
		}

		if(!currSelectedTab || !indexedModel[currSelectedTab.href]) {
			for(var tabKey in indexedModel) {
				if(!indexedModel[tabKey].selected) {
					continue;
				}

				currSelectedTab = indexedModel[tabKey];
				break;
			}
		}


		_deselectAllTabs(indexedModel);
		currSelectedTab.selected = true;

		window.location.href = currSelectedTab.href;
	};

	/**
	 * @private
	 * @function
	 * @description
	 * This method is invoked automatically when a tab label is clicked.
	 */
	function _showTab(scope, indexedModel, tab) {
		_deselectAllTabs(indexedModel);

		tab.selected = true;

		window.location.hash = tab.href;
	};

	app.directive("apiTabs", function() {
		var tabs = new TabsDirective();
		return tabs;
	});
})(DiscoveryApp);