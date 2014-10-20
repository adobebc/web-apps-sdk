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
	 * @constructor
	 * @description
	 * This controller provides the logic for correctly displaying the BC APIs discovery UI. It relies on
	 * BC WebResources API registry in order to fecth accurate data.
	 */
	function HomeController($scope, registryService) {
		this.$scope = $scope;
		this._registryService = registryService;

        this.$scope.resourceSelection = {
          	options: {
            	valueField: 'id',
            	labelField: 'name',
            	searchField: ['name']
          	}
        };

        this.$scope.resources = [];

		this._displayResources();
	};

	/**
	 * @private
	 * @instance
	 * @method
	 * @description
	 * This method displays all available resources currently available in BC.
	 */
	HomeController.prototype._displayResources = function() {
		var self = this;

		this._registryService.getRegistry().then(function(data) {
			for(var resourceName in data) {
				self.$scope.resources.push({"id": resourceName, "name": resourceName});
			}			
		});
	};

	app.controller("HomeController", ["$scope", "BcRegistryService", HomeController]);
})(DiscoveryApp);