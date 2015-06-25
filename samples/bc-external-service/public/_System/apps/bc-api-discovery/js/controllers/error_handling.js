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
	 * @public
	 * @constructor
	 * @description
	 * This class provides the generic mechanism for handling errors occuring at various layers of the application.
	 */
	function ErrorHandlingController($scope, errorService) {
		var self = this;

		this._errorService = errorService;

		this.$scope = $scope;
		this.$scope.error = undefined;

		this.$scope.$watch(
			function() { return self._errorService.errorData; },
			function(errorData) {
				self.$scope.error = errorData;
			});
	};

	app.controller("ErrorHandlingController", ["$scope", "ErrorHandlingDataService", ErrorHandlingController]);
})(DiscoveryApp);