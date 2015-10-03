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

        if (!securityCfg.site) {
            throw new BCAPI.Components.Exceptions.BadArgumentException("securityCfg argument does not contain a site.",
                            "securityCfg.site");
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
     * @method
     * @name getBcSecurity
     * @memberof BCAPI.Security
     * @returns {BCAPI.Security.BcSecurityContext} the bc security context which holds all information describing the
     * current session.
     */
    BCAPI.Security.getBcSecurity = BCAPI.Security.getBcSecurity || function() {

    };
})();