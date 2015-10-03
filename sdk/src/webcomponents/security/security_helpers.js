/*
 *
 *Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.
 
 *Permission is hereby granted, free of charge, to any person obtaining a
 *copy of this software and associated documentation files (the "Software"),
 *to deal in the Software without restriction, including without limitation
 *the rights to use, copy, modify, merge, publish, distribute, sublicense,
 *and/or sell copies of the Software, and to permit persons to whom the
 *Software is furnished to do so, subject to the following conditions:
 *
 *The above copyright notice and this permission notice shall be included in
 *all copies or substantial portions of the Software.
 *
 *THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *DEALINGS IN THE SOFTWARE.
 *
 */
(function() {
    BCAPI.Security.securityCfg = undefined;
    BCAPI.Security._bcSecurityCtx = undefined;

    /**
     * This method provides a simple way for setting all security details when running an app.
     *
     * @public
     * @method
     * @name configure
     * @memberof BCAPI.Security
     * @param {Object} securityCfg this is the security configuration required by the app.
     * @param {String} securityCfg.site this is the site secure url where api calls will be done.
     * @param {String} securityCfg.accessToken this is the site access token used for api calls.
     * @returns {undefined} does not return a result.
     * @example
     * BCAPI.Security.configure({
     *  bc: {
     *    "site": "https://raducosnita-max2014.worldsecuresystems.com",
     *    "accessToken": "<your access token comes here>"
     *  }
     *});
     */
    BCAPI.Security.configure = BCAPI.Security.configure || function(securityCfg) {
        if (!securityCfg || JSON.stringify(securityCfg) === "{}") {
            throw new BCAPI.Components.Exceptions.BadArgumentException("No securityCfg argument provided.",
                            "securityCfg");
        }

        if (!securityCfg.siteUrl) {
            throw new BCAPI.Components.Exceptions.BadArgumentException("securityCfg argument does not contain a site.",
                            "securityCfg.siteUrl");
        }

        if (!securityCfg.accessToken) {
            throw new BCAPI.Components.Exceptions.BadArgumentException("securityCfg argument does not contain an access token.",
                            "securityCfg.accessToken");
        }

        BCAPI.Security.securityCfg = securityCfg;
    };

    /**
     * This method provides a simple way to obtain the current bc security context.
     *
     * @public
     * @method
     * @name getBcSecurity
     * @memberof BCAPI.Security
     * @returns {Promise} A promise which will be resolved with the bc security context for the current session. Internally
     * it uses a cache so that all subsequent calls to this method work really fast.
     */
    BCAPI.Security.getBcSecurity = BCAPI.Security.getBcSecurity || function() {
        var securityCtxLoader = $.Deferred();
        
        if (BCAPI.Security._bcSecurityCtx) {
            setTimeout(function() {
                securityCtxLoader.resolve(BCAPI.Security._bcSecurityCtx);
            });

            return securityCtxLoader.promise();
        }

        var meDataSource = document.createElement("bc-api");

        meDataSource.configure({
            "bcConfig": BCAPI.Security.securityCfg,
            "apiName": "users",
            "apiVersion": "v3",
            "resourceId": "me",
            "fields": "id,firstName,lastName"
        });

        var response = meDataSource.list();

        response.then(function(userData) {
            var user = new BCAPI.Security.User(userData),
                accessToken = new BCAPI.Security.AccessToken({
                    "userId": user.userId,
                    "user": user,
                    "token": BCAPI.Security.securityCfg.accessToken
                }),
                securityCtx = new BCAPI.Security.BcSecurityContext(accessToken, user);

            BCAPI.Security._bcSecurityCtx = securityCtx;

            securityCtxLoader.resolve(securityCtx);
        });

        return securityCtxLoader.promise();
    };
})();