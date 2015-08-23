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

    it("Ensure a plain object can be correctly extended with component methods using ComponentsFactory implementation.", function() {
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

        obj.wireEvents("evt")
    });

    it("Ensure a plain object correctly wire events using inherited component method.", function() {
        var obj = this._compFactory.get(this._testComponent),
            evtData1 = {"evtName": "evt1", "data": "test"},
            evtData2 = {"evtName": "evt2", "data": "test 2"};

        expect(obj).not.toBe(undefined);
        expect(typeof obj.isBcComponent).toBe("function");
        expect(obj.isBcComponent()).toBeTruthy();
        expect(typeof obj.wireEvents).toBe("function");

        obj.registeredCallbacks.push(function(data) {
            obj.executedEvents[data.evtName] = data;
        });

        obj.wireEvents({
            "evt1": obj.registeredCallbacks[0],
            "evt2": obj.registeredCallbacks[0]
        });

        obj.trigger("evt1", evtData1);
        obj.trigger("evt2", evtData2);

        expect(obj.executedEvents.evt1).toBe(evtData1);
        expect(obj.executedEvents.evt2).toBe(evtData2);
    });
});