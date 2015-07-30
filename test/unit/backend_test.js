
describe("Backend service for Fractal's front-end", function() {

    var backend, httpBackend, setLocation;


    beforeEach(function(){

        module('FractalBackend');

        inject(function($injector){
            backend = $injector.get("backend");
        });
    });
 
    it("should give setting", function(){
        var setting = backend.getSetting();

        expect( typeof(setting.width) ).toBe("number");
        expect( typeof(setting.height) ).toBe("number");
        expect( typeof(setting.fixedWidth) ).toBe("boolean");
        expect( typeof(setting.fixedHeight) ).toBe("boolean");
    });

    it("should set setting", function(){
        var setting = backend.getSetting();
        setting.width = 5;
        backend.setSetting(setting);

        var newSetting = backend.getSetting();

        expect( newSetting.width ).toBe(5);
    });

    it("should give empty items", function(){
        var items = backend.getItems();

        expect( typeof(items) ).toBe("object");
        expect( items.length ).toBe(0);
    });

    it("should give empty item", function(){
        var item = backend.getEmptyItem();

        expect( item.type ).toBe("empty");
        expect( item.isEmpty() ).toBe(true);

        item.type = "other type";

        expect( item.isEmpty() ).toBe(false);
    });

    it("should give note item", function(){
        var item = backend.createNote();

        expect( item.type ).toBe("note");
        expect( item.title ).toBe("");
        expect( item.text ).toBe("");

        expect( typeof(item.id) ).toBe("number");
        expect( typeof(item.analogyItems) ).toBe("object");
        expect( typeof(item.supItems) ).toBe("object");
        expect( typeof(item.subItems) ).toBe("object");
    });


    it("should save note", function(){
        backend.saveNote(1, 1, {title: "note", text: "text"});

        var item = backend.getItems()[1][1];
        
        expect( typeof(item.id) ).toBe("number");
        expect( item.type ).toBe("note");
        expect( item.title ).toBe("note");
        expect( item.text ).toBe("text");

        expect( typeof(item.analogyItems) ).toBe("object");
        expect( typeof(item.supItems) ).toBe("object");
        expect( typeof(item.subItems) ).toBe("object");
    });

    it("should delete item", function(){
        backend.saveNote(1, 1, {title: "note", text: "text"});
        backend.deleteItem(1, 1);

        var item = backend.getItems()[1][1];

        expect( item.isEmpty() ).toBe(true);
    });


    it("should save created note", function(){
        backend.saveNote(1, 1, {title: "note", text: "text"});
        backend.saveNote(1, 1, {title: "title"});

        var item = backend.getItems()[1][1];

        expect( item.title ).toBe("title");
        expect( item.text ).toBe("text");
    });
});