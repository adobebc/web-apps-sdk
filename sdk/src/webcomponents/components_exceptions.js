(function() {
    /**
     * This namespace provides all custom exceptions which can be used by compeontns in order to notify custom error
     * situations.
     * 
     * @namespace  BCAPI.Components.Exceptions
     */
    BCAPI.Components.Exceptions = {};

    /**
     * This class provides a custom exception which notifies developers about invalid attempt to wire events to 
     * a component.
     * 
     * @public
     * @constructor
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