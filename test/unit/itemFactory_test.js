
describe("Fractal's itemfactory", function() {
    var itemFactory;

    beforeEach(function(){
        module("FractalItemFactory");

        inject(function($injector){
            itemFactory = $injector.get("itemFactory")
        });
    });

    it("should create empty item", function(){

        var item = itemFactory.emptyItem();

        expect(item.type).toBe("empty");
    });

    it("give empty item with isEmpty method", function(){

        var item = itemFactory.emptyItem();

        expect(item.isEmpty()).toBeTruthy();
    
        item.type = "otherType";
        expect(item.isEmpty()).toBeFalsy();    
    
        item.type = 123;
        expect(item.isEmpty).toThrow();
    });

    it("should give base item", function(){
        var item = itemFactory.baseItem();

        expect( item.type ).toBe("baseItem");
        expect( typeof(item.id) ).toBe("number");
        expect( typeof(item.analogy) ).toBe("object");//arrays
        expect( typeof(item.sup) ).toBe("object");
        expect( typeof(item.sub) ).toBe("object");
    });

    it("give base item with createRelative(analogy) method", function(){
        var item1 = itemFactory.baseItem();
        var item2 = itemFactory.baseItem();

        item1.createRel(item2, 'analogy');

        expect( item1.analogy.indexOf(item2.id) ).not.toBeLessThan(0);
        expect( item2.analogy.indexOf(item1.id) ).not.toBeLessThan(0);
    });

    it("give base item with createRelative(sup) method", function(){
        var item1 = itemFactory.baseItem();
        var item2 = itemFactory.baseItem();

        item1.createRel(item2, 'sup');

        expect( item1.sup.indexOf(item2.id) ).not.toBeLessThan(0);
        expect( item2.sub.indexOf(item1.id) ).not.toBeLessThan(0);
    });

    it("give base item with createRelative(sub) method", function(){
        var item1 = itemFactory.baseItem();
        var item2 = itemFactory.baseItem();

        item1.createRel(item2, 'sub');

        expect( item1.sub.indexOf(item2.id) ).not.toBeLessThan(0);
        expect( item2.sup.indexOf(item1.id) ).not.toBeLessThan(0);
    });

    it("should give note item", function(){
        var item = itemFactory.noteItem();

        expect( item.type ).toBe("note");
        expect( item.title ).toBe("");
        expect( item.text ).toBe("");
    });

    it("give note item with data", function(){
        var item = itemFactory.noteItem({title: "title", text: "text", id: 4});

        expect( item.type ).toBe("note");
        expect( item.id ).toBe(4);
        expect( item.title ).toBe("title");
        expect( item.text ).toBe("text");
    });  
});