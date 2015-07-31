

describe("grid master service", function(){

    var backend, gridMaster, items, setting;

    beforeEach(function(){
        module("FractalBackend");
        module("FractalGridMaster");

        inject(function($injector){
            backend = $injector.get("backend");
            items = backend.getItems();
            setting = backend.getSetting();
            gridMaster = $injector.get("gridMaster");
        });
     });

    it("should complete a grid by setting", function(){
        items = gridMaster.compliteGrid(items, setting);

        expect(items.length).toBe(setting.width);

        for(var key in items)
            expect(items[key].length).toBe(setting.height);
    });

    it("should complete a grid of minimum setting", function(){
        items = gridMaster.compliteGrid(items, setting);

        expect(items.length).not.toBeLessThan(setting.minWidth);

        for(var key in items)
            expect(items[key].length).not.toBeLessThan(setting.minHeight);
    });

    it("should complete the littelst grid", function(){
        setting.minWidth = 5;
        items = gridMaster.compliteGrid(items, setting);

        setting.minWidth = 4;
        items = gridMaster.compliteGrid(items, setting);

        expect(items.length).toBe(setting.minWidth);
    });
});