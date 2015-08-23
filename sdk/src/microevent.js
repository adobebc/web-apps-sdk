/*
 * Microevent library is an open source library provided by jeromeetienne. We added more documentation into the original
 * code so that developers can better understand the API. If you want more information about the microevent implemntation
 * you can visit https://github.com/jeromeetienne/microevent.js.
 */
BCAPI.Helper.MicroEvent = (function() {
    /**
     * MicroEvent class provides and event emitter minimalist implementation which can be
     * used to add on / off / trigger methods to existing classes and literal objects.
     *
     * @public
     * @constructor
     * @memberof BCAPI.Helper
     */
    function MicroEvent() { };

    MicroEvent.prototype = {
        /**
         * This method registers a callback function which is going to be invoked once the specified event is triggered.
         * 
         * @public
         * @method
         * @param  {String} event the event name on which the given callback will be invoked.
         * @param  {Function} fct The callback function which is going to be executed once the event will be triggered.
         * @example
         * function doTask(evtData) {
         *     console.log(evtData);
         * };
         *
         * var comp = document.createElement("bc-component");
         * comp.on("customEvent", doTask);
         */
        on: function(event, fct) {
            this._events = this._events || {};
            this._events[event] = this._events[event]   || [];
            this._events[event].push(fct);
        },
        
        /**
         * This method is used in order to unregister the specified function from being executed once the given event is triggered.
         * @param  {String} event The event name from which we want to unregister the callback.
         * @param  {Function} fct The function we want to unregister from event.
         *
         * @example
         * function doTask(evtData) {
         *     console.log(evtData);
         * };
         *
         * var comp = document.createElement("bc-component");
         * comp.on("customEvent", doTask);
         * comp.off("customEvent", doTask);
         */
        off: function(event, fct) {
            this._events = this._events || {};
            if( event in this._events === false  )  return;
            this._events[event].splice(this._events[event].indexOf(fct), 1);
        },

        /**
         * This method is used in order to trigger an event with a variable set of arguments.
         * @param  {String} event the event name we want to trigger.
         */
        trigger: function(event) {
            this._events = this._events || {};
            if( event in this._events === false  )  return;
            for(var i = 0; i < this._events[event].length; i++){
                this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
            }
        }
    };

    /**
     * mixin will delegate all MicroEvent.js function in the destination object
     *
     * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
     *
     * @param {Object} the object which will support MicroEvent
    */
    MicroEvent.mixin = function(destObject){
        var props   = ['on', 'off', 'trigger'];
        for(var i = 0; i < props.length; i ++){
            if( typeof destObject === 'function' ){
                destObject.prototype[props[i]]  = MicroEvent.prototype[props[i]];
            } else{
                destObject[props[i]] = BCAPI.Helper.MicroEvent.prototype[props[i]];
            }
        }
        
        return destObject;
    };

    return MicroEvent;
})();