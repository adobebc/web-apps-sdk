(function() {
	BCAPI.Config.TestServer = {
		rootUrl: 'http://earth.bc.corp.adobe.com', // 'https://api-dc1.secure-earth.bc.corp.adobe.com',
		siteId: 38604,	// bcapi-integration
		username: 'bcadmin@bc1.local', //'bcapi-integration@mailinator.com',
		password: 'password9', // '123456'
		genericToken: "e06e4169df114574bb091ec209674903e6edc48409304d708747e53935d37a8b",
		siteToken: "1f1aada4413e4ecf86309cbf704f0a9dcc3618589bd345d7b0bdf9ac184a23f7",
		tokenRequestTimeout: 60 * 1000
	};
})();