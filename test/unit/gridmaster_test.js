

describe("grid master service", function(){

    var backend, gridMaster, items, setting;

    beforeEach(function(){
        module("FractalBackend");
        module("FractalGridMaster");

        inject(function($injector){
            backend = $injector.get("backend");
            items = backend.getItems();
            setting = backend.getSetting();
        });

        inject(function($injector){
            gridMaster = $injector.get("gridMaster");
        });
     });

    it("should create a grid by setting", function(){
        items = gridMaster.compliteGrid(items, setting);

        expect(items.length).toBe(setting.width);

        for(var key in items)
            expect(items[key].length).toBe(setting.height);
    });
});