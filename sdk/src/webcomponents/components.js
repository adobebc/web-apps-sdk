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
    /**
     * This namespace holds all SDK classes used for creating new components.
     * 
     * @namespace BCAPI.Components
     */
    BCAPI.Components = {};

    /**
     * This class provides the core class from BC SDK used to support components creation.
     * It enforces each component descriptor to inherit several classes in order to create a uniform contract
     * across all web components we provide.
     * 
     * @public
     * @constructor
     */
    function ComponentsFactory() { };

    /**
     * This method extends the given component descriptor with various methods and properties specific to BC.
     * 
     * @public
     * @method
     * @param  {Object} component The component object to which we want to add BC features to.
     * @return {Object} The component instance with all methods in place.
     */
    ComponentsFactory.prototype.get = function(component) {
        BCAPI.Helper.MicroEvent.mixin(component);

        return component;
    }

    BCAPI.Components.ComponentsFactory = new ComponentsFactory();
})($);