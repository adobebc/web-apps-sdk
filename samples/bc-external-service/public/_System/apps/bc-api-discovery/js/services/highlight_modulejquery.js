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

(function (app, hljs, $) {
    /**
     * @constructor
     * @description
     * This class provides the algorithm for highlighting module_jquery snippets syntax.
     */
    function ModuleJQueryHighlighter() {
        hljs.initHighlightingOnLoad();
        hljs.configure({useBR: true});
    }

    /**
     * @public
     * @instance
     * @method
     * @description
     * This method highlights the given snippet and colors all keywords for improving text readability.
     */
    ModuleJQueryHighlighter.prototype.highlight = function (snippet, resourceDescriptor) {
        if (!snippet) {
            return;
        }

        var element = document.createElement("code");
        $(element).attr("class", "javascript");

        var identifiers = resourceDescriptor.fields.identifier;

        for (var pkName in identifiers) {
            snippet = snippet.replace(pkName + ",", '<span class="module-data-attr-pk">' + pkName + "</span>,");
            snippet = snippet.replace(pkName + "\"", '<span class="module-data-attr-pk">' + pkName + "</span>\"");
            snippet = snippet.replace(pkName + "&", '<span class="module-data-attr-pk">' + pkName + "</span>&");
        }

        element.innerHTML = snippet;

        hljs.highlightBlock(element);

        return element.innerHTML;
    };

    app.service("ModuleJQueryHighlighterService", [ModuleJQueryHighlighter]);
})(DiscoveryApp, hljs, $);