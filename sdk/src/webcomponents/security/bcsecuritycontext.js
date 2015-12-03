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
    /**
     * This class provides the bc security context implementation which can be used for accessing bc apis.
     *
     * @name BcSecurityContext
     * @constructor
     * @memberof BCAPI.Security
     * @param {BCAPI.Security.AccessToken} accessToken the current access token used by the application.
     * @param {BCAPI.Security.User} user the current logged in user.
     * @param {Object} config the configuration object used to describe the bc environment for the current session.
     * @param {String} config.siteUrl the secure site url on which api calls can be made.
     * @param {String} config.accessToken the current access token encrypted value.
     */
    function BcSecurityContext(accessToken, user, config) {
        this.accessToken = accessToken;
        this.user = user;
        this.config = config;
    }

    /**
     * This method will be able to renew app access in the future. At the moment this operation is not supported.
     *
     * @name renewAccess
     * @public
     * @method
     * @returns {undefined} Does not return a result at this point.
     */
    BcSecurityContext.prototype.renewAccess = function() {
        throw new BCAPI.Components.Exceptions.NotImplementedException("Not supported at the moment.");
    };

    BCAPI.Security.BcSecurityContext = BcSecurityContext;
})();