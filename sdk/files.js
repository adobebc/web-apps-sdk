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
var jsCoreFiles = [
    "src/bcapi.js",
    "src/helper.js",
    "src/config.js",
    "src/models.js",
    "src/category.js",
    "src/country.js",
    "src/file_system.js",
    "src/webapp.js",
    "src/webapp_country.js",
    "src/webapp_customfield.js",
    "src/webapp_item.js",
    "src/webapp_item_category.js",
    "src/webcomponents/components.js",
    "src/webcomponents/components_exceptions.js",
    "src/webcomponents/datasources/datasource.js",
    "src/webcomponents/security/bcsecuritycontext.js",
    "src/webcomponents/security/accesstoken.js",
    "src/webcomponents/security/user.js",
    "src/webcomponents/security/security_helpers.js"
];

var webComponentFiles = [
    "lib/polymer/polymer-micro.html",
    "lib/polymer/polymer-mini.html",
    "lib/polymer/polymer.html",
    "src/webcomponents/buttons/button.html",
    "src/webcomponents/charts/piechart.html",
    "src/webcomponents/datagrid/datagrid-customtpl.html",
    "src/webcomponents/datagrid/datagrid.html",
    "src/webcomponents/datasources/datasource.html",
    "src/webcomponents/datasources/json.html",
    "src/webcomponents/datasources/api.html",
    "src/webcomponents/dropdown/dropdown.html",
    "src/webcomponents/textfield/textfield.html"
];

module.exports = {
    jsCoreFiles: jsCoreFiles,
    webComponentFiles: webComponentFiles
};
