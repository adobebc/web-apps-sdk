(function() {
	window.DiscoveryApp = angular.module("BcDiscoveryApp", ["ngRoute"]);

	DiscoveryApp.config(function($routeProvider, $locationProvider) {
	  	// configure html5 to get links working on jsfiddle
  		$locationProvider.html5Mode(true);
	});		
})();