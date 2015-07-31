
describe("itemController", function() {
    var scope, backend;

    beforeEach(function(){
        module("FractalControllers");
        module("FractalBackend");

        inject(function($controller, $injector){
            backend = $injector.get("backend");
            scope = { 
                items: [[backend.getEmptyItem()]], 
                setting: backend.getSetting(),
                completeGrid: function(){}
            };

            spyOn(scope, "completeGrid");

            $controller("itemController", {$scope: scope, backend: backend});
        });
    });

    it("should create funcrions for working with items", function(){

        expect( typeof(scope.createItem) ).toBe("function");
        expect( typeof(scope.setEmptyItem) ).toBe("function");
        expect( typeof(scope.createNote) ).toBe("function");
    });

    it("give function createItem function which create item", function(){
        scope.createItem(0, 0);

        expect( scope.items[0][0].type ).toBe("add");
        expect( scope.completeGrid ).toHaveBeenCalled();
    });

    it("give function setEmptyItem which clear item", function(){
        scope.createItem(0, 0);
        scope.setEmptyItem(0, 0);

        expect( scope.items[0][0].isEmpty() ).toBeTruthy();
        expect( scope.completeGrid ).toHaveBeenCalled();
    });

    it("give function createNote function which create note", function(){
        scope.createNote(0, 0);

        var note = backend.createNote();
        note.type = "edit";
        note.id = scope.items[0][0].id;

        expect(scope.items[0][0]).toEqual(note);
    });
});