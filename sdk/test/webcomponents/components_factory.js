describe("BCAPI.Components.ComponentsFactory test suite.", function() {
    beforeEach(function() {
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
    });

    it("Make sure a plain object can be correctly extended with component methods using ComponentsFactory implementation.", function() {
        var obj = this._compFactory.get(this._testComponent),
                evtData = {"testAttr": 1};

        expect(obj).not.toBe(undefined);
        expect(typeof obj.isBcComponent).toBe("function");
        expect(obj.isBcComponent()).toBeTruthy();
        expect(typeof obj.wireEvents).toBe("function");

        expect(obj.sayHello).toBe(this._testComponent.sayHello);
        expect(obj.is).toBe(this._testComponent.is);
        expect(typeof obj.executedEvents).toBe("object");

        obj.sayHello();
        expect(obj.registeredCallbacks.length).toBe(1);
        
        obj.trigger("evt", evtData);
        expect(obj.executedEvents.evt).toBe(evtData);

        obj.off("evt", obj.registeredCallbacks[0]);
        obj.trigger("evt", {});
        expect(obj.executedEvents.evt).toBe(evtData);
    });
});