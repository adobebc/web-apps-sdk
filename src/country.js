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
(function($) {
    "use strict";

    /**
     * System countries model.
     * 
     * @name Country
     * @class
     * @constructor
     * @memberOf BCAPI.Models
     */
    BCAPI.Models.Country = BCAPI.Models.Model.extend({
        /**
         * This method returns the correct endpoint for system countries.
         *
         * @method
         * @instance
         * @memberOf BCAPI.Models.Country
         */
        endpoint: function() {
            return "/api/v2/admin/system/countries";
        }
    });

    /**
     * This class provides a collection of the countries available in BC. For more information regarding how to interact
     * with the countries {@link BCAPI.Models.Country}.
     *
     * @name CountryCollection
     * @class
     * @constructor
     * @memberOf BCAPI.Models
     * @example
     * var itemCollection = new BCAPI.Models.CountryCollection();
     */
    BCAPI.Models.CountryCollection = BCAPI.Models.Collection.extend({
        model: BCAPI.Models.Country
    });

})(jQuery);
