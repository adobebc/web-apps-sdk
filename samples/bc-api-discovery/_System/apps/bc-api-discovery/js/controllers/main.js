(function(app) {
	/**
	 * @constructor
	 * @description
	 * This class provides the main controller implementation which fetches the web resources registry and displays 
	 * the main interface.
	 */
	function MainController($scope) {
		this.$scope = $scope;
		this.$scope.appVersion = "1.0-snapshot";

		console.log("Controller initialized correctly.");
	}

	app.controller("MainController", ["$scope", MainController])
})(DiscoveryApp);