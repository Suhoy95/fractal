describe("Fractal's linker", function() {
    var linker, itemFactory, item1, item2;

    beforeEach(function(){
        module("FractalLinker");
        module("FractalItemFactory");

        inject(function($injector){
            linker = $injector.get("linker");
            itemFactory = $injector.get("itemFactory");

            item1 = itemFactory.baseItem();
            item2 = itemFactory.baseItem();
        });
    });

    it("should have isSelecting function", function(){
        expect(linker.isSelecting()).toBeFalsy();
    });

    it("should have select function", function(){
        linker.select(item1, "analogy");

        expect(linker.isSelecting()).toBeTruthy();
        expect(linker.binding).toBe("analogy");
        expect(linker.currentItem).toBe(item1);
    });

    it("should have disable function", function(){
        linker.select(item1, "analogy");
        linker.disable();

        expect(linker.isSelecting()).toBeFalsy();
        expect(linker.binding).toBe("");
        expect(linker.currentItem).toEqual({}); 
    });

    it("should have bind two items", function(){
        linker.select(item1, "analogy");
        linker.bind(item2);

        expect(item1.isAnalogy(item2)).toBeTruthy();
    });

    it("should unbind two items", function(){
        item1.bind(item2, "sub");
        linker.select(item1, "analogy");
        linker.unbind(item2);

        expect(item1.isSub(item2)).toBeFalsy();
    });

});