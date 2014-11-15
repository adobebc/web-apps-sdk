(function(app) {
	/**
	 * @constructor
	 @ description
	 * This class contains all configuraion values required to control various features of BC discovery
	 * app.
	 */
	function ConfigService() {
		this.appVersion = "1.0-snapshot";
		this.bcRegistryUrl = "/webresources/api/v3/sites/current/registry";
		this.limits = {
			skip: 0,
			limit: 10
		};
	};

	app.service("ConfigService", [ConfigService]);
})(DiscoveryApp);