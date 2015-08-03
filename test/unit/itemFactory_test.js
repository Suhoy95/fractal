
describe("Fractal's itemfactory", function() {
    var itemFactory;

    beforeEach(function(){
        module("FractalItemFactory");

        inject(function($injector){
            itemFactory = $injector.get("itemFactory");
        });
    });

    it("should give empty item", function(){
        var item = itemFactory.emptyItem();

        isEmptyItemProp(item);
        expect(item.type).toBe("empty");
        expect(item.isEmpty()).toBeTruthy();
    });

    it("should give base item", function(){
        var item = itemFactory.baseItem();

        isEmptyItemProp(item);
        isBaseItemProp(item);
        expect(item.type).toBe("base");
    });

    it("should give note item", function(){
        var item = itemFactory.noteItem();

        isEmptyItemProp(item);
        isBaseItemProp(item);
        isNoteItemProp(item);
        expect(item.type).toBe("note");
    });
});


describe("empty <-> add item", function(){
    var item;

    beforeEach(function(){
        module("FractalItemFactory");

        inject(function($injector){
            item = $injector.get("itemFactory").emptyItem();
        });
    });

    it("should be able to get add item", function() 
    {
        item.create();

        isAddEmptyProp(item);
        expect(item.type).toBe("add");
    });

    it("should be able to get empty after getting add", function(){
        item.create().delete();

        isEmptyItemProp(item);
        expect(item.type).toBe("empty");
    });

    it("should be able to get note after getting add", function(){
        item.create().createNote();

        isEmptyItemProp(item);
        isBaseItemProp(item);
        isNoteItemProp(item);
        expect(item.type).toBe("note");
        expect(item.state).toBe("save");
    })
});

describe("baseItem", function(){
    var item1, item2;

    beforeEach(function(){
        module("FractalItemFactory");

        inject(function($injector){
            var factory = $injector.get("itemFactory");
            item1 = factory.baseItem();
            item2 = factory.baseItem();
        });
    });

    it("items have different id", function(){
        expect(item1.id).not.toBe(item2.id);
    });

    it("should bind item1 analogy item2", function(){
        item1.bind(item2, "analogy");

        expect(item1.analogy).toContain(item2.id);
        expect(item2.analogy).toContain(item1.id);
        expect(item1.isAnalogy(item2)).toBeTruthy();
    });

    it("should unbind item1 analogy item2", function(){
        item1.bind(item2, "analogy");
        item1.unbind(item2, "analogy");

        expect(item1.analogy).not.toContain(item2.id);
        expect(item2.analogy).not.toContain(item1.id);
        expect(item1.isAnalogy(item2)).toBeFalsy();
    });

    it("should bind item1 sup item2", function(){
        item1.bind(item2, "sup");

        expect(item1.sup).toContain(item2.id);
        expect(item2.sub).toContain(item1.id);
        expect(item1.isSup(item2)).toBeTruthy();
    });

    it("should unbind item1 sup item2", function(){
        item1.bind(item2, "sup");
        item1.unbind(item2, "sup");

        expect(item1.sup).not.toContain(item2.id);
        expect(item2.sub).not.toContain(item1.id);
        expect(item1.isSup(item2)).toBeFalsy();
    });

    it("should bind item1 sub item2", function(){
        item1.bind(item2, "sub");

        expect(item1.sub).toContain(item2.id);
        expect(item2.sup).toContain(item1.id);
        expect(item1.isSub(item2)).toBeTruthy();
    });

    it("should unbind item1 sub item2", function(){
        item1.bind(item2, "sub");
        item1.unbind(item2, "sub");

        expect(item1.sub).not.toContain(item2.id);
        expect(item2.sup).not.toContain(item1.id);
        expect(item1.isSub(item2)).toBeFalsy(); 
    });

    it("should have whatBinding function", function(){
        item1.bind(item2, "analogy");
        expect(item1.whatBinding(item2)).toBe("analogy");
        item1.unbind(item2, "analogy");


        item1.bind(item2, "sup");
        expect(item1.whatBinding(item2)).toBe("sup");
        item1.unbind(item2, "sup");

        item1.bind(item2, "sub");
        expect(item1.whatBinding(item2)).toBe("sub");
        item1.unbind(item2, "sub");
    });
});

describe("note item", function(){
    var item;

    beforeEach(function(){
        module("FractalItemFactory");

        inject(function($injector){
            item = $injector.get("itemFactory").noteItem();
        });
    });

    it("should be able to get edit state", function(){
        item.edit();

        isEmptyItemProp(item);
        isBaseItemProp(item);
        isNoteItemProp(item);
        expect(item.type).toBe("note");
        expect(item.state).toBe("edit");
    });

    it("should be able to get save state", function(){
        item.edit().save();

        isEmptyItemProp(item);
        isBaseItemProp(item);
        isNoteItemProp(item);
        expect(item.type).toBe("note");
        expect(item.state).toBe("save");
    });

    it("should be able to get emptyItem", function(){
        item.delete();

        isEmptyItemProp(item);
        expect(item.type).toBe("empty");
    });

});


function isEmptyItemProp(item)
{
    expect(typeof(item.type)).toBe("string");
    expect(typeof(item.isEmpty)).toBe("function");
    expect(typeof(item.create)).toBe("function");
}

function isAddEmptyProp(item)
{
    expect(typeof(item.delete)).toBe("function");
    expect(typeof(item.createNote)).toBe("function");   
}

function isBaseItemProp(item)
{
    expect(typeof(item.id)).toBe("number");
    expect(typeof(item.analogy)).toBe("object");
    expect(typeof(item.sup)).toBe("object");
    expect(typeof(item.sub)).toBe("object");
    expect(typeof(item.bind)).toBe("function");
    expect(typeof(item.unbind)).toBe("function");
    expect(typeof(item.isAnalogy)).toBe("function");
    expect(typeof(item.isSup)).toBe("function");
    expect(typeof(item.isSub)).toBe("function");
    expect(typeof(item.whatBinding)).toBe("function");
}

function isNoteItemProp(item)
{
    expect(typeof(item.state)).toBe("string");
    expect(typeof(item.title)).toBe("string");
    expect(typeof(item.text)).toBe("string");
    expect(typeof(item.edit)).toBe("function");
    expect(typeof(item.save)).toBe("function");
    expect(typeof(item.delete)).toBe("function");
}