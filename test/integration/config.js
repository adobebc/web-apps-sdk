(function() {
	BCAPI.Config.TestServer = {
		rootUrl: 'http://earth.bc.corp.adobe.com', // 'https://api-dc1.secure-earth.bc.corp.adobe.com',
		siteId: 38604,	// bcapi-integration
		username: 'bcadmin@bc1.local', //'bcapi-integration@mailinator.com',
		password: 'password9', // '123456'
		genericToken: "",
		siteToken: '',
		tokenRequestTimeout: 60 * 1000
	};
})();