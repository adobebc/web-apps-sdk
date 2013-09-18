(function() {
	BCAPI.Config.TestServer = {
		rootUrl: 'http://earth.bc.corp.adobe.com', // 'https://api-dc1.secure-earth.bc.corp.adobe.com',
		siteId: 38604,	// bcapi-integration
		username: 'bcadmin@bc1.local', //'bcapi-integration@mailinator.com',
		password: 'password9', // '123456'
		genericToken: "dbb34ec283314b4ba0fc428834142c152c65b78e82974308a47cff4f29f41499",
		siteToken: "e3d0f65538a444f7b9a0b12ca0370d7da7832cb40d19416da55e27eec9b7da42",
		tokenRequestTimeout: 60 * 1000
	};
})();