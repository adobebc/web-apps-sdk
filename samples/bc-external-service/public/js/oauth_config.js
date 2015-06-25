var OAuthConfig = (function() {
    _bcSecureHost = "dc1.worldsecuresystems.com";
    _appBaseUri = "https://simpletest.com";

    return {
        bcSecureHost: _bcSecureHost,
        bcSecureUrl: "https://" + _bcSecureHost,
        bcAuthorizeEndpoint: "/api/oauth/authorize",
        bcTokenEndpoint: "/api/oauth/token",
        clientId: "radudev-demo-service-10",
        version: "0.1",
        redirectUri: _appBaseUri + "/oauth/cb",
        appIndexPage: _appBaseUri + "/_System/apps/bc-api-discovery/index.html"
    };
})();

try {
    if (module && module.exports) {
        module.exports = OAuthConfig;
    }
} catch(e) { }