/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
* 
*/
var isNodeJs = false;

try {
    if (module && module.exports) {
        isNodeJs = true;
    }
} catch(e) { }

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
            "&state="+_local_state, "&response_type=code"],
            authorizeUrl = urlParts.join("");

        console.log("Redirecting browser to url: %s", authorizeUrl);
        window.location.href = authorizeUrl;
    };

    /**
     * This method uses all query parameters received and exchanges the authorization code for an access token.
     */
    OAuthTwoLeg.prototype.handleAuthorizationCode = function(req, done) {
        var https = require("https"),
            url = require("url");
        var urlParts = url.parse(req.url, true);
        
        console.log("---------------------------Authenticate partner - start--------------------------------------")
        console.log(req);
        console.log("---------------------------Authenticate partner - end--------------------------------------")

        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

        var requestBody = ["grant_type=authorization_code", 
                "&client_id=", encodeURIComponent(this._config.clientId),
                "&redirect_uri=", encodeURI(this._config.redirectUri), 
                "&client_secret=", encodeURIComponent(this._config.clientSecret),
                "&code=", encodeURIComponent(urlParts.query.code)].join("");

        console.log("Invoking token url with body %s", requestBody);

        var requestOptions = {
            host: this._config.bcSecureHost,
            port: 443,
            path: this._config.bcTokenEndpoint,
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": requestBody.length
            }
        };

        var req = https.request(requestOptions, function(res) {
            
            var body = "";
            res.setEncoding("utf8");

            res.on("data", function(chunk) {
                body += chunk;
            });

            res.on("end", function() {
                var tokenResponse = JSON.parse(body),
                    secureUrls = [];
                
                console.log("---------------- Backend accessible data ----------------");
                console.log(tokenResponse);
                
                console.log("----------This is a test-----------------");
                for (var idx = 0; idx < tokenResponse.additional_info.sites.length; idx++) {
                    var siteInfo = tokenResponse.additional_info.sites[idx];

                    if (siteInfo.site_id == -2) {
                        continue;
                    }

                    secureUrls.push(siteInfo.secure_url);
                }

                console.log("---------------- Frontend accessible data ----------------");
                console.log(tokenResponse);

                done({
                    "accessToken": tokenResponse.access_token,
                    "expiresIn": tokenResponse.expires_in,
                    "secureUrls": secureUrls
                });
            });

            req.on('error', function(e) {
              console.log('problem with request: ' + e.message);
            });
        });

        req.write(requestBody);
        req.end();

        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';
        
         console.log("-----------------END REQUEST-------------");
    };

    return new OAuthTwoLeg(OAuthConfig);
})(!isNodeJs ? OAuthConfig : require("./oauth_config"));

if (isNodeJs) {
    module.exports = OAuth;
}