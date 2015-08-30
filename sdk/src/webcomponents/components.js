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
(function($) {
    /**
     * This namespace holds all SDK classes used for creating new components.
     *
     * ![BCAPI Components Overview](assets/ui-sdk-bcapi-components.png)
     *
     * @namespace BCAPI.Components
     */
    BCAPI.Components = BCAPI.Components || {};

    /**
     * This namespace holds all available data sources which can be plugged into UI components. Below, you can find
     * a diagram providing the foundation classes which are provided out of the box.
     *
     * ![BCAPI Datasources Overview](assets/ui-sdk-bcapi-datasources.png)
     *
     * @namespace BCAPI.Components.DataSources
     */
    BCAPI.Components.DataSources = BCAPI.Components.DataSources || {};

    /**
     * This namespace holds all available validators which can be wired or are used directly by components.
     *
     * ![BCAPI Validation Overview](assets/ui-sdk-bcapi-validation.png)
     *
     * @namespace BCAPI.Components.Validation
     */
    BCAPI.Components.Validation = BCAPI.Components.Validation || {};

    /**
     * This namespace holds all security classes which can be reused by all components.
     *
     * ![BCAPI Security Overview](assets/ui-sdk-bcapi-security.png)
     *
     * @namespace BCAPI.Security
     */
    BCAPI.Security = BCAPI.Security || {};

    /**
     * This namespace holds all messaging layers which can be used to communicate between apps and BC environment.
     * Moreover, this provides the classes required to achieve intercommunication between components from the same app.
     *
     * ![BCAPI Messaging Overview](assets/ui-sdk-bcapi-messaging.png)
     *
     * @namespace BCAPI.Messaging
     */
    BCAPI.Messaging = BCAPI.Messaging || {};

    /**
     * This class provides the all common methods inherited by every component.
     *
     * @name  Component
     * @public
     * @constructor
     * @memberof BCAPI.Components
     */
    function Component() {}

    BCAPI.Helper.MicroEvent.mixin(Component.prototype);

    /**
     * This constant holds the dom attribute prefix used to wire custom listeners to component events.
     *
     * @constant
     * @type {String}
     */
    Component.prototype.__BCON_EVT_PREFIX = "onbc-";

    /**
     * This constant holds the type of component which can later on be used to discriminate between regular dom elements
     * and concrete BCAPI components.
     *
     * @constant
     * @type {String}
     */
    Component.prototype.__COMPTYPE__ = "BcApiComponent";

    /**
     * This method standardizes the way components can be configured / altered. Each concrete component must provide an
     * implementation for this method.
     *
     * @public
     * @method configure
     * @instance
     * @abstract
     * @memberof BCAPI.Components.Component
     * @param {Object} opts The object containing all options which must be configured.
     * @returns {undefined} No result.
     * @example
     * var button = document.getElementById("myButton");
     * button.configure({"label": "My first button"});
     */
    Component.configure = function(opts) {};

    /**
     * This method provides a shortcut approach for wiring callbacks to component emitted events.
     *
     * @method wireEvents
     * @public
     * @instance
     * @memberof BCAPI.Components.Component
     * @param {Object} evts A dictionary containing a list of event names and the callbacks which listen to each event.
     * @returns {undefined} No result.
     *
     * @example
     * function onTextFieldChange(evtData) {
     *     console.log(evtData);
     * }
     *
     * function onTextFieldSearch(evtData) {
     *     console.log(evtData);
     * }
     *
     * var component = new BCAPI.Components.TextField();
     * component.wireEvents({
     *     "textfield:change": onTextFieldChange,
     *     "textfield:search": onTextFieldSearch
     * });
     */
    Component.prototype.wireEvents = function(evts) {
        if (evts === undefined || evts === null) {
            throw new BCAPI.Components.Exceptions.WireEventException("You can not wire undefined / null events into component.");
        }

        for (var evtName in evts) {
            if (!evts[evtName]) {
                throw new BCAPI.Components.Exceptions.WireEventException("Event name " + evtName + " does not have callback specified.");
            }

            this.on(evtName, evts[evtName]);
        }
    };

    /**
     * This method can be used in order to determine if a given dom attribute is a bc component or not.
     *
     * @public
     * @method  isBcComponent
     * @instance
     * @memberof BCAPI.Components.Component
     * @return {Boolean} True if the current component inherits from Component and false otherwise.
     */
    Component.prototype.isBcComponent = function() {
        return this.__COMPTYPE__ === "BcApiComponent";
    };

    /**
     * This method wires all component supported custom events declared in dom to custom actions. Each component
     * invoking this method supports wiring of component events to listeners from dom attributes.
     *
     * @returns {undefined} No result.
     * @example
     * // wiring a custom action to custom event named change.
     * <bc-component bcon-change="MyApp.onChange"></bc-component>
     */
    Component.prototype._wireCustomEventsFromDom = function() {
        var self = this;

        $(document).ready(function() {
            self._wireCustomEventsWhenDomReady();
        });
    };

    /**
     * This method wires all listeners to custom events declared using dom attributes.
     *
     * @returns {undefined} No result.
     */
    Component.prototype._wireCustomEventsWhenDomReady = function() {
        var customEvents = this.customEvents || [],
            wiredEvents = {};

        for (var i = 0; i < customEvents.length; i++) {
            var evtName = customEvents[i],
                attrName = this.__BCON_EVT_PREFIX + evtName;
            listener = this.getAttribute(attrName);

            if (!listener) {
                continue;
            }

            var listenerParts = listener.split("."),
                ctx = window[listenerParts[0]],
                action = undefined;

            for (var j = 0; j < listenerParts.length; j++) {
                var partName = listenerParts[j];

                action = (action || window)[partName];
            }

            wiredEvents[evtName] = (function(action, ctx) {
                return function(evtData) {
                    action.call(ctx, evtData);
                };
            })(action, ctx);
        }

        this.wireEvents(wiredEvents);
    };

    /**
     * This class provides the core class from BC SDK used to support components creation.
     * It enforces each component descriptor to inherit several classes in order to create a uniform contract
     * across all web components we provide.
     *
     * @name ComponentsFactory
     * @public
     * @constructor
     * @memberof BCAPI.Components
     * @example
     * var customComponent = {
     *     is: "custom-component"
     * };
     *
     * customComponent = BCAPI.Components.ComponentsFactory.get(obj);
     *
     * Polymer(customComponent);
     */
    function ComponentsFactory() { }

    /**
     * This method extends the given component descriptor with various methods and properties specific to BC.
     *
     * @public
     * @method
     * @param  {Object} component The component object to which we want to add BC features to.
     * @return {Object} The component instance with all methods in place.
     */
    ComponentsFactory.prototype.get = function(component) {
        $.extend(component, Component.prototype);

        return component;
    };

    BCAPI.Components.ComponentsFactory = BCAPI.Components.ComponentsFactory || new ComponentsFactory();
})($);