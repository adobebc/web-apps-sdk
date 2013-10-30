(function() {
	BCAPI.Config.TestServer = {
		rootUrl: 'http://earth.bc.corp.adobe.com', // 'https://api-dc1.secure-earth.bc.corp.adobe.com',
		siteId: 38604,	// bcapi-integration
		username: 'bcadmin@bc1.local', //'bcapi-integration@mailinator.com',
		password: 'password10', // '123456'
		accessToken: "",
		genericToken: "",
		tokenRequestTimeout: 60 * 1000
	};
	
	BCAPI.Config.MAX_TIMEOUT = 10000;
})();