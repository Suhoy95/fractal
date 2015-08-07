describe("Fractal's shower", function() {
    var shower, itemFactory, item, items;

    beforeEach(function(){
        module("FractalShower");
        module("FractalItemFactory");

        inject(function($injector){
            shower = $injector.get("shower");
            itemFactory = $injector.get("itemFactory");

            item = itemFactory.baseItem();
        });
    });

    it("should have state function", function(){
        expect(shower.state()).toBe("grid");
    });

    it("should become relations state when binding is setted method", function(){
        shower.setBinding(item, "analogy");

        expect(shower.state()).toBe("relations");
    });

    it("should become grid state by unsetBinding method", function(){
        shower.setBinding(item, "analogy");
        shower.unsetBinding("analogy");

        expect(shower.state()).toBe("grid");
    });

    beforeEach(function(){
        items = [ [], [], [] ];
        for(var i = 0; i < 3; i++)
        {
            items[0][i] = itemFactory.baseItem();
            items[1][i] = itemFactory.baseItem();
            items[2][i] = itemFactory.baseItem();

            item.bind(items[0][i], "analogy");
            item.bind(items[1][i], "sup");
            item.bind(items[2][i], "sub");
        }
    });

    it("should filter items by filterItems method 0", function(){
        shower.setBinding(item, "analogy");

        expect(shower.filterItems(items)).toEqual(items[0]);
    });

    it("should filter items by filterItems method 1", function(){
        shower.setBinding(item, "sup");
        
        expect(shower.filterItems(items)).toEqual(items[1]);
    });

    it("should filter items by filterItems method 2", function(){
        shower.setBinding(item, "sub");
        
        expect(shower.filterItems(items)).toEqual(items[2]);
    });

    it("should filter mixed binding", function(){
        shower.setBinding(item, "analogy");
        shower.setBinding(item, "sup");

        var result = shower.filterItems(items);
        expect(result.length).toBe(6);
        for(var key in result)
            expect(item.isAnalogy(result[key]) || item.isSup(result[key])).toBe(true);
    });

    it("should clear all active binding", function(){
        shower.setBinding(item, "analogy");
        shower.setBinding(item, "sup");
        shower.clearBinding();

        expect(shower.state()).toBe("grid");
    });


    it("should clear when new element is setting binding", function(){
        shower.setBinding(items[0][0], "analogy");
        shower.setBinding(items[0][0], "sup");

        shower.setBinding(items[0][1], "sup");


        expect(shower.bindings["analogy"]).toBeFalsy();
        expect(shower.bindings["sub"]).toBeFalsy();
        expect(shower.bindings["sup"]).toBeTruthy();
    });
});