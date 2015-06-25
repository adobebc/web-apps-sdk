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
     * This class provides the algorithm for highlighting module_data snippets syntax.
     */
    function ModuleDataHighlighter() {
    }

    /**
     * @private
     * @constant
     * @description
     * This constant holds the association between module_data reserved tokens and the css classes
     * used to represent the tokens in a friendly manner.
     */
    ModuleDataHighlighter.prototype._TOKENS_CLASSES = {
        /*"{": "module-data-curlybracket-highlight",
         "}": "module-data-curlybracket-highlight",*/
        "resource": "module-data-param-highlight",
        "resourceId": "module-data-param-highlight",
        "subresource": "module-data-param-highlight",
        "version": "module-data-param-highlight",
        "fields": "module-data-param-highlight",
        "skip": "module-data-param-highlight",
        "limit": "module-data-param-highlight",
        "order": "module-data-param-highlight",
        "collection": "module-data-param-highlight",
        "where": "module-data-param-highlight"
    };

    /**
     * @public
     * @instance
     * @method
     * @description
     * This method highlights the given snippet and colors all keywords for improving text readability.
     */
    ModuleDataHighlighter.prototype.highlight = function (snippet, resourceDescriptor) {
        if (!snippet || snippet[0] != "{" || !resourceDescriptor) {
            return snippet;
        }

        var identifiers = resourceDescriptor.fields.identifier;

        for (var pkName in identifiers) {
            snippet = snippet.replace("\"" + pkName + "\"", '"<span class="module-data-attr-pk">' + pkName + "</span>\"");
            snippet = snippet.replace("\"" + pkName + ",", '"<span class="module-data-attr-pk">' + pkName + "</span>,");
            snippet = snippet.replace("," + pkName + ",", ',<span class="module-data-attr-pk">' + pkName + "</span>,");
            snippet = snippet.replace("," + pkName + "\"", ',<span class="module-data-attr-pk">' + pkName + "</span>\"");
        }

        for (var token in this._TOKENS_CLASSES) {
            var cssClass = this._TOKENS_CLASSES[token];

            var replacement = ["<span class='", cssClass, "'>", token, "</span>"].join("");

            snippet = snippet.replace(token, replacement);
        }
        return snippet;
    };

    app.service("ModuleDataHighlighterService", [ModuleDataHighlighter]);
})(DiscoveryApp);