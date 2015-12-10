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
     * This namespace holds all security classes which can be reused by all components. Because modern platforms
     * provides OAuth 2 authorization this namespace also provides helper classes for easily accessing oauth 2
     * specific tokens and for renewing access.
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
     * This method provides a standard implementation so that each component correctly handles attached to dom event.
     * Even though it should be enough for most of the components, if for some reason you need to override it, make
     * sure you first invoke **this.__base.attached();**
     *
     * @name  attached
     * @method
     * @public
     * @instance
     * @memberof BCAPI.Components.Component
     * @returns {undefined} No result.
     */
    Component.prototype.attached = function() {
        this._wireCustomEventsFromDom();

        console.log(this.is + ": attached to dom.");
    };

    /**
     * This method provides the algorithm for changing css classes for specified dom elements.
     *
     * @public
     * @instance
     * @method changeClass
     * @param {String} newClass A whitespace separated list of classes.
     * @param {HTMLDomElement} domElem The dom element instance for which we want to change the classes.
     * @return {undefined} No result.
     * @memberof BCAPI.Components.Component
     */
    Component.prototype.changeClass = function(newClass, domElem) {
        if (!domElem || !newClass) {
            return;
        }

        var classes = newClass.split(" ");

        while (domElem.classList.length > 0) {
            domElem.classList.remove(domElem.classList[0]);
        }

        for (var idx = 0; idx < classes.length; idx++) {
            try {
                domElem.classList.add(classes[idx]);
            } catch (ex) {
                ex = ex;
            }
        }
    };

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
     * This method is designed to allow components to rescope native dom elemenets events to a custom reliable
     * action. We do this, because at the moment, the native dom events have weir behavior on non-chrome browser,
     * though making simple events like onclick unpredictable.
     *
     * @protected
     * @method _rescopeNativeDomEvent
     * @instance
     * @param {String} evtName The native dom event name we want to rescope.
     * @param {Array} args An array of additional arguments we want to pass to the callback method.
     * @memberof BCAPI.Components.Component
     * @returns {function} The new function which is going to handle the event name.
     * @example
     * // from inside a webcomponent (e.g bc-button) you can invoke _rescopeNativeDomEvent method.
     * this._rescopeNativeDomEvent("onclick", [this]);
     */
    Component.prototype._rescopeNativeDomEvent = function(evtName, args) {
        console.log("Rescoping event: " + evtName);

        var actionStr = this.getAttribute(evtName);

        if (!actionStr || actionStr.trim().length === 0) {
            return function() { };
        }

        var actionParts = actionStr.split("."),
            action = undefined,
            ctx = undefined,
            idx = 0;

        do {
            action = (action || window)[actionParts[idx++]];

            if (!action) {
                break;
            }

            if (typeof action === "object") {
                ctx = action;
            }
        } while (action && idx < actionParts.length);

        var callback = function() {
            action.apply(ctx || {}, args);
        };

        this.addEventListener(evtName.substring(2), callback);

        return callback;
    };

    /**
     * This method configures the items from this component by extracting the inner html defined datasource.
     * If the datasource exists, then it is set as component datasource.
     *
     * @protected
     * @instance
     * @method _wireDataSourceFromMarkup
     * @return {undefined} No result.
     * @memberof BCAPI.Components.Component
     */
    Component.prototype._wireDataSourceFromMarkup = function() {
        var dataSource = Polymer.dom(this).querySelector("*[rel='datasource']");

        if (dataSource && dataSource.isDataSource && dataSource.isDataSource()) {
            this.dataSource = dataSource;
        }
    };

    /**
     * This method wires all listeners to custom events declared using dom attributes.
     *
     * @private
     * @instance
     * @method  _wireCustomEventsFromDom
     * @returns {undefined} No result.
     * @memberof BCAPI.Components.Component
     */
    Component.prototype._wireCustomEventsFromDom = function() {
        var customEvents = this.customEvents || [],
            wiredEvents = {};

        for (var i = 0; i < customEvents.length; i++) {
            var evtName = this._getDomEvtName(customEvents[i]),
                attrName = this.__BCON_EVT_PREFIX + evtName;

            if (!this.hasAttribute(attrName)) {
                continue;
            }

            listener = this.getAttribute(attrName);

            var listenerParts = listener.split("."),
                ctx = window[listenerParts[0]],
                action = undefined;

            for (var j = 0; j < listenerParts.length; j++) {
                var partName = listenerParts[j];

                action = (action || window)[partName];

                if (!action) {
                    console.log(this.is + ": Unable to wire " + listener + " to event " + evtName);
                    continue;
                }
            }

            wiredEvents[evtName] = (function(action, ctx) {
                return function(evtData) {
                    action.call(ctx, evtData);
                };
            })(action, ctx);

            console.log(evtName);
        }

        this.wireEvents(wiredEvents);
    };

    /**
     * This method obtains the dom event name for a given custom event name. Custom event names are camel case while in
     * dom they are all lowercase and each part from camelcase is separated by dashes.
     *
     * @private
     * @instance
     * @method  _getDomEvtName
     * @param  {String} evtName Custom event name as defined at component level.
     * @return {String} Dom event name which matches the custom event name.
     * @memberof BCAPI.Components.Component
     */
    Component.prototype._getDomEvtName = function(evtName) {
        var domEvtName = [];

        evtName = evtName || "";

        for (var i = 0; i < evtName.length; i++) {
            var currChar = evtName.charAt(i);

            if (currChar === currChar.toUpperCase()) {
                domEvtName.push("-");
            }

            domEvtName.push(currChar.toLowerCase());
        }

        return domEvtName.join("");
    };

    BCAPI.Components.Component = BCAPI.Components.Component || Component;

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
     * This method extends the given component descriptor with various methods and properties specific to BC. In addition,
     * it creates a special property named **__base** which can be used to access {@link BCAPI.Components.Component} inherited methods.
     *
     * @name  get
     * @public
     * @method
     * @instance
     * @param {Object} component The component descriptor we want to transform to {@link BCAPI.Components.Components}.
     * @return {WebComponent} The component instance with all methods in place.
     * @memberof BCAPI.Components.ComponentsFactory
     * @example
     * var webComp = {
     *     "is": "bc-button",
     *     attached: function() {
     *         this.__base.attached.apply(this);
     *     }
     * };
     *
     * Polymer(BCAPI.Components.ComponentsFactory.get(webComp));
     */
    ComponentsFactory.prototype.get = function(component) {
        var baseComp = new Component();

        $.extend(component, Component.prototype);
        component.__base = baseComp;

        return component;
    };

    BCAPI.Components.ComponentsFactory = BCAPI.Components.ComponentsFactory || new ComponentsFactory();
})($);