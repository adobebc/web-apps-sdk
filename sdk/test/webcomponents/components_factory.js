describe("BCAPI.Components.ComponentsFactory test suite.", function() {
    beforeEach(function() {
        jasmine.addMatchers(ComponentCustomMatchers);

        expect(BCAPI).not.toBe(undefined);
        expect(BCAPI.Components).not.toBe(undefined);
        expect(BCAPI.Components.ComponentsFactory).not.toBe(undefined);

        this._compFactory = BCAPI.Components.ComponentsFactory;
        this._testComponent = {
            executedEvents: {},
            registeredCallbacks: [],
            is: "bc-testcomponent",
            sayHello: function() {
                var self = this;

                this.registeredCallbacks.push(function(evtData) {
                    self.executedEvents.evt = evtData;
                });

                this.on("evt", this.registeredCallbacks[0]);
            },
        };

        this._compInstance = this._compFactory.get(this._testComponent);

        expect(this._compInstance).not.toBe(undefined);
        expect(typeof this._compInstance.isBcComponent).toBe("function");
        expect(this._compInstance.isBcComponent()).toBeTruthy();
        expect(typeof this._compInstance.wireEvents).toBe("function");

    });

    it("Ensure a plain object can be correctly extended with component methods using ComponentsFactory implementation.", function() {
        var evtData = {"testAttr": 1};

        expect(this._compInstance.sayHello).toBe(this._testComponent.sayHello);
        expect(this._compInstance.is).toBe(this._testComponent.is);
        expect(typeof this._compInstance.executedEvents).toBe("object");

        this._compInstance.sayHello();
        expect(this._compInstance.registeredCallbacks.length).toBe(1);
        
        this._compInstance.trigger("evt", evtData);
        expect(this._compInstance.executedEvents.evt).toBe(evtData);

        this._compInstance.off("evt", this._compInstance.registeredCallbacks[0]);
        this._compInstance.trigger("evt", {});
        expect(this._compInstance.executedEvents.evt).toBe(evtData);

        this._compInstance.wireEvents("evt")
    });

    it("Ensure a plain object correctly wire events using inherited component method.", function() {
        var evtData1 = {"evtName": "evt1", "data": "test"},
            evtData2 = {"evtName": "evt2", "data": "test 2"},
            self = this;

        this._compInstance.registeredCallbacks.push(function(data) {
            self._compInstance.executedEvents[data.evtName] = data;
        });

        this._compInstance.wireEvents({
            "evt1": this._compInstance.registeredCallbacks[0],
            "evt2": this._compInstance.registeredCallbacks[0]
        });

        this._compInstance.trigger("evt1", evtData1);
        this._compInstance.trigger("evt2", evtData2);

        expect(this._compInstance.executedEvents.evt1).toBe(evtData1);
        expect(this._compInstance.executedEvents.evt2).toBe(evtData2);
    });

    it("Ensure undefined / null events are causing concrete exceptions for wireEvents method.", function() {
        var self = this;

        expect(function() { 
            self._compInstance.wireEvents(undefined); 
        }).toBeCustomError("BCAPI.Components.Exceptions.WireEventException");

        expect(function() {
            self._compInstance.wireEvents(null);
        }).toBeCustomError("BCAPI.Components.Exceptions.WireEventException");
    });
});