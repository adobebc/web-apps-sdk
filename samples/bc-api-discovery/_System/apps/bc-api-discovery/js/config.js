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
		this.api = {
			accessToken: "Bearer _bc_Q2xpZW50SWQ9YmMtbWVldC10aGUtdGVhbTtHckx3a0hpOWFqZWJtcklReVYrOEdITUlIQVYyTlZoc3h1TkVqVHpyakhxVk9mZ0pnam9hQUVDODVBL05Sb096TFY5UmdlRnpMamhVbkZPTlQ4bGVqdjJ1SUVHcGJjWmFQSGZPRE9yZXNTQithQ2xHWlNLaVBFSmZYNkhYaWZYZzN5RWZIWlNOTVJGS1BhU1MvRlhGY1RsRWR3eUNkbkRHY0FteEh1ZjJxcVdXa3Z3QkZKUTBtV1MvY3BxeGxpMG8zUkxNRVlWbC9Ydm8xeVpmRWN6WEtPc2VMSkJlUVYraSthZnlTSFIxbGZqWDIwQklRNXNPeW1kWHhmODdZUkZkc1FEVnhQaXZyTytHMG5RWDA2Mmx5SGw5bjlSV0h1OS85S3MyQkx5eFVVbXhpOWFZdnkvTWVnRDlMcUs3eSs4NEt5QlkvTXpxenpJb3JvNGtnN3lQSkE9PQ==",
			host: "bc-meet-the-team-38581-apps.rcosnita-bc.worldsecuresystems.com"
		};
	};

	app.service("ConfigService", [ConfigService]);
})(DiscoveryApp);