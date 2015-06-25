var OAuthConfig = {
    bcSecureUrl: "https://dc1.worldsecuresystems.com",
    bcAuthorizeEndpoint: "/api/oauth/authorize",
    bcTokenEndpoint: "/api/oauth/token",
    clientId: "radudev-test-service-5",
    version: "0.1",
    redirectUri: "https://simpletest.com/oauth/cb"
};

try {
    if (module && module.exports) {
        module.exports = OAuthConfig;
    }
} catch(e) { }