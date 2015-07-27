
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

    it("should create new note", function(){
        backend.createNote(1, 1, {title: "note", text: "text"});

        var item = backend.getItems()[1][1];
        
        expect( typeof(item.id) ).toBe("number");
        expect( item.type ).toBe("note");
        expect( item.title ).toBe("note");
        expect( item.text ).toBe("text");

        expect( typeof(item.analogyItems) ).toBe("object");
        expect( typeof(item.supItems) ).toBe("object");
        expect( typeof(item.subItems) ).toBe("object");
    });


    it("shoud edit created item", function(){
        backend.createNote(1, 1, {title: "note", text: "text"});
        backend.editNote(1, 1, {title: "title"});

        var item = backend.getItems()[1][1];

        expect( item.title ).toBe("title");
        expect( item.text ).toBe("text");
    });
});