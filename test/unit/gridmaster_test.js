

describe("grid master service", function(){

    var gridMaster, items, setting;

    beforeEach(function(){
        module("FractalGridMaster");

        inject(function($injector){
            items = [[]];
            setting = {
                        minWidth: 4,
                        minHeight: 4,
                        width: 4,
                        height: 4,
                        fixedWidth: false,
                        fixedHeight:false
                    };
            gridMaster = $injector.get("gridMaster");
        });
     });

    it("should complete a grid by setting", function(){
        items = gridMaster.completeGrid(items, setting);

        expect(items.length).toBe(setting.width);

        for(var key in items)
            expect(items[key].length).toBe(setting.height);
    });

    it("should complete a grid of minimum setting", function(){
        items = gridMaster.completeGrid(items, setting);

        expect(items.length).not.toBeLessThan(setting.minWidth);

        for(var key in items)
            expect(items[key].length).not.toBeLessThan(setting.minHeight);
    });

    it("should complete the littelst grid", function(){
        setting.minWidth = 5;
        items = gridMaster.completeGrid(items, setting);

        setting.minWidth = 4;
        items = gridMaster.completeGrid(items, setting);

        expect(items.length).toBe(setting.minWidth);
    });
});