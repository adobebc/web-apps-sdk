/* 
 *
 * Copyright (c) 2012-2015 Adobe Systems Incorporated. All rights reserved.

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

(function (app) {
    /**
     * @constructor
     * @description
     * This controller provides help logic for BC Discovery app.
     */
    function InstructionsController($scope, configService) {
        this.$scope = $scope;
        this.$scope.message = "Instructions controller initialized.";

        this._configService = configService;

        var self = this;

        this.$scope.uninstallApplication = function () {
            return self._uninstallApplication();
        };
    };

    InstructionsController.prototype._uninstallApplication = function () {

        var self = this;
        var backendFolderPath = "/_System/apps/" + this._configService.webAppName,

            redirected = false;

        var backendFolder = new BCAPI.Models.FileSystem.Folder(backendFolderPath);
        var webapp = new BCAPI.Models.WebApp.App({"name": this._configService.webAppName});


        backendFolder.destroy().always(function () {
            console.log(self._configService.webAppName + " folder was completely removed.");

            if (!redirected) {
                redirected = true;
                self._redirectToDashboard();
            }
        });

        webapp.destroy().always(function () {
            console.log(self._configService.webAppName + " webapp was completely removed.");

            if (!redirected) {
                redirected = true;
                self._redirectToDashboard();
            }
        });
    }

    InstructionsController.prototype._redirectToDashboard = function () {
        var parentLocation = document.referrer,
            dashboardUrl = parentLocation.substring(0, parentLocation.indexOf("/Admin")) + "/Admin/Dashboard_Business.aspx";

        window.parent.location = dashboardUrl;
    }

    app.controller("InstructionsController", ["$scope", "ConfigService", InstructionsController]);
})(DiscoveryApp);