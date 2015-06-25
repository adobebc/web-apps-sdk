var OAuth = (function(OAuthConfig) {
    /**
     * This class provides the two leg oauth sample implementation. It does not protect against CSRF and does not correctly
     * validate all input parameters received in cb route.
     */
    function OAuthTwoLeg(config) { 
        this._config = config;
    };

    /**
     * This method initiates the authorization procedure. It redirects the user agent to bc secure url.
     */
    OAuthTwoLeg.prototype.initiateAuthorize = function() {
        var urlParts = [this._config.bcSecureUrl, this._config.bcAuthorizeEndpoint, 
            "?client_id=", encodeURIComponent(this._config.clientId),
            "&version=", this._config.version, 
            "&redirect_uri=", encodeURI(this._config.redirectUri),
            "&state=12345", "&response_type=code"],
            authorizeUrl = urlParts.join("");

        console.log("Redirecting browser to url: %s", authorizeUrl);

        window.location.href = authorizeUrl;
    };

    return new OAuthTwoLeg(OAuthConfig);
})(OAuthConfig);