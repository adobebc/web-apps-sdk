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
/**
 * This class provides a reusable button component with the same look & feel as BC buttons.
 * From a functionality point of view this component also carries data object for giving developer
 * quick access to the context where the button was clicked.
 *
 * ## Properties
 *
 * Below you can find a complete list of properties which can be configured for this component:
 *
 * | Property name | Property description |
 * | ------------------- | -------------------------- |
 * | style | The style css classes which must be applied to the inner rendered button tag. |
 * | data | The data carried by this object. You can easily access it in all event listeners. |
 *
 * ## Events
 *
 * | Event name.| Event description |
 * |---------------------------------|---------------------------------|
 * | dataChanged | This event is triggered whenever the data attached to the button is changed. |
 *
 * ## Usage
 *
 * ```html
 * <bc-button onclick="MyApp.handleClick" data="{'a': 'b'}">Simple button</bc-button>
 * ```
 *
 * ```javascript
 * var MyApp = (function() {
 *  function MyApp() { }
 *
 *  MyApp.prototype.handleClick = function(btn) {
 *   console.log(btn.data.a);
 *  };
 *
 *  return new MyApp();
 * })();
 * ```
 *
 * @class Button
 * @public
 * @memberof BCAPI.Components
 * @augments BCAPI.Components.Component
 */
var webComponent = {
    is: "bc-button",
    properties: {
        data: {
            type: Object,
            observer: "_onDataChanged"
        },
        style: {
            type: String,
            reflectToAttribute: true
        },
        class: {
            type: String,
            reflectToAttribute: true
        }
    },
    customEvents: [
        "dataChanged"
    ]
};

webComponent = BCAPI.Components.ComponentsFactory.get(webComponent);

$.extend(webComponent, {
    attached: function() {
        this.__base.attached.apply(this);

        //this._rescopeNativeDomEvent("onclick", [this]);
    },
    _onDataChanged: function(newData) {
        this.trigger("data-changed", newData);
    }
});