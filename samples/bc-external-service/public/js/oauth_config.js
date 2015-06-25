var OAuthConfig = (function() {
    _bcSecureHost = "dc1.worldsecuresystems.com";

    return {
        bcSecureHost: _bcSecureHost,
        bcSecureUrl: "https://" + _bcSecureHost,
        bcAuthorizeEndpoint: "/api/oauth/authorize",
        bcTokenEndpoint: "/api/oauth/token",
        clientId: "daniel-oauth-api-discovery",
        version: "0.1",
        redirectUri: "https://oauth-api-discovery:3000/oauth/cb"
    };
})();

try {
    if (module && module.exports) {
        module.exports = OAuthConfig;
    }
} catch(e) { }