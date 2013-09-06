describe("Helper.Models.WebApp", function() {
        it("CRUD", function() {

            var webApp = new BCAPI.Models.WebApp();
            spyOn(Backbone, "ajax").andCallThrough(function(options) {

            });
            webApp.save();

            Backbone.ajax.andCallThrough(function(options) {

            });
            webApp.remove();
        });
});
