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
     * This namespace provides all custom exceptions which can be used by compeontns in order to notify custom error
     * situations.
     *
     * @namespace  BCAPI.Components.Exceptions
     */
    BCAPI.Components.Exceptions = BCAPI.Components.Exceptions || {};

    /**
     * This class provides a custom exception which notifies developers about invalid attempt to wire events to
     * a component.
     *
     * @public
     * @constructor
     * @param {String} msg The message which must be displayed to developers.
     * @memberof BCAPI.Components.Exceptions
     */
    BCAPI.Components.Exceptions.WireEventException = function(msg) {
        Object.defineProperty(this, "msg", {
            writable: false,
            value: msg,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, "errorType", {
            writable: false,
            value: "BCAPI.Components.Exceptions.WireEventException",
            enumerable: true,
            configurable: true
        });
    };

    BCAPI.Components.Exceptions.WireEventException.prototype = new Error();
})();