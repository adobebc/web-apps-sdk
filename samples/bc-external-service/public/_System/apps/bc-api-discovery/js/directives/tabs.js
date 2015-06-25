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
    app.directive("apiTabs", function() {
        return {
            restrict: "E",
            transclude: true,
            scope: {},
            controller: function($scope) {
                var panes = $scope.panes = [];

                $scope.select = function(pane) {
                    angular.forEach(panes, function(pane) {
                        pane.selected = false;
                    });

                    pane.selected = true;

                    if(pane.hash) {
                        window.location.hash = pane.hash;
                    }                    
                };

                this.addPane = function(pane) {
                    var currHash = window.location.hash;

                    if((!currHash || !pane.hash) && panes.length == 0) {
                        pane.selected = true;
                    };

                    panes.push(pane);
                };

                this.restoreActive = function() {
                    var currHash = window.location.hash,
                        selected = false;;

                    if(!currHash) {
                        return;
                    }

                    angular.forEach(panes, function(pane) {
                        if(!currHash || !pane.hash) {
                            pane.selected = false;
                            return;
                        }

                        pane.selected = currHash.indexOf(pane.hash) == 0;
                    });

                    if(selected == false && panes && panes.length > 0) {
                        panes[0].selected = true;
                    }
                }
            },
            templateUrl: "/_System/apps/bc-api-discovery/templates/directives/tabs.html"
        };
    });

    app.directive("apiTabPane", function() {
        return {
            require: "^apiTabs",
            restrict: "E",
            transclude: true,
            scope: {
                title: "@",
                hash: "@"
            },
            link: function(scope, element, attrs, tabsCtrl) {
                tabsCtrl.addPane(scope);
                tabsCtrl.restoreActive();
            },
            templateUrl: "/_System/apps/bc-api-discovery/templates/directives/pane.html"
        };
    });

})(DiscoveryApp);