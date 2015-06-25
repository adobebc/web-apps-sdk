(function(app, BCAPI) {
	var defaultAccessToken = "Bearer _bc_Q2xpZW50SWQ9YmMtbWVldC10aGUtdGVhbTtHckx3a0hpOWFqZWJtcklReVYrOEdJbnFCeU9yOVhFb0g0VURuNmZJUHVDcXRzUldValFjYlZXZjRiWEtOemgvTVlTaEk1ZkNrWGx6dnVCdE9wNFhENW01UUhFcm5ZcEIxUklKQVNKWnQ3RmMySXVWWFBMK0M0ZHNBVUpLcWUwbXhRb2txbWsydlIrU2N2NjV6b3RXY0s0bXpjeVBSR3BBZGVSWlFHcDE0ZWdodFdaQzJVYzNiWVFpQnpiUFAxejJacTg3bGFJTGwzZkdmYzkvdnlKU09FRFppUGk5NnJSb2dLQlBYa0c5c3dSS2JiaGNaYmlKM2xwV2lEcTRkK2hQNGRUM1NrblFUYTNNdjQ2eG4zQmlER0lEK0lmKzJNSkczejJGM3VWeld0cGQvcFlTUCtNdXEzZ0F0eGkrSmo5dkZYakdkQ0xXZzhDS0h2ZEY5N0JrUUE9PQ==",
		defaultHost = "openadmin123.rcosnita-bc.worldsecuresystems.com";
		defaultProtocol = "https";

	/**
	 * @constructor
	 @ description
	 * This class contains all configuraion values required to control various features of BC discovery
	 * app.
	 */
	function ConfigService($window) {
		this.appVersion = "1.0-snapshot",
		this.bcWebResourcesApp = "/webresources",
		this.bcRegistryUrl = this.bcWebResourcesApp + "/api/v3/sites/current/registry";
		this.loaderDisplayDelay = 10;

		this.limits = {
			skip: 0,
			limit: 10
		};
		
		this.api = {
			accessToken: BCAPI.Helper.Site.getAccessToken() || $window.sessionStorage.BCAccessToken,
			host: $window.sessionStorage.SiteUrls.split(",")[0].replace(/.*?:\/\//g, "") /*get the first secure url*/,
			protocol: defaultProtocol
		};

		this.errors = {
			"displayTimeout": 4000
		};
	};

	app.service("ConfigService", ['$window', ConfigService]);
})(DiscoveryApp, BCAPI);