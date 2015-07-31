
describe("noteController", function() {
    var scope, backend, dialogs;

    beforeEach(function(){
        module("FractalControllers");
        module("FractalBackend");
        module("FractalDialogs");

        inject(function($controller, $injector){
            backend = $injector.get("backend");
            dialogs = $injector.get("dialogs");

            scope = { 
                items: [[backend.createNote()]], 
                setting: backend.getSetting(),
                completeGrid: function(){},
                setEmptyItem: function(){}
            };

            spyOn(backend, "saveNote");
            spyOn(scope, "setEmptyItem");

            $controller("noteController", {$scope: scope, 
                                           backend: backend, 
                                           dialogs: dialogs});
        });
    });

    it("should create funcrions for working with items", function(){

        expect( typeof(scope.editNote) ).toBe("function");
        expect( typeof(scope.saveNote) ).toBe("function");
        expect( typeof(scope.deleteNote) ).toBe("function");
    });

    it("give function editNote which make note-edit", function(){
        scope.editNote(0, 0);
        expect( scope.items[0][0].type ).toBe("edit");
    });

    it("give function saveNote which saving note", function(){
        scope.editNote(0, 0);
        scope.saveNote(0, 0);

        expect( backend.saveNote ).toHaveBeenCalled();
        expect( scope.items[0][0] ).toEqual(backend.getItem(0, 0));
    });

    it("give function deleteNote which delete note if it empty", function(){
        spyOn(dialogs, "confirm");   
        scope.deleteNote(0, 0);

        expect(dialogs.confirm).not.toHaveBeenCalled();
        expect(scope.setEmptyItem).toHaveBeenCalled();
    });

    it("give function deleteNote which delete note if confirm is true", function(){
        scope.items[0][0].title = "title";
        spyOn(dialogs, "confirm").and.callFake(function(){ return true; });

        scope.deleteNote(0, 0);

        expect(dialogs.confirm).toHaveBeenCalled();
        expect(scope.setEmptyItem).toHaveBeenCalled();
    });

    it("give function deleteNote which not delete note if confirm is false", function(){
        scope.items[0][0].title = "title";
        spyOn(dialogs, "confirm").and.callFake(function(){ return false; });

        scope.deleteNote(0, 0);

        expect(dialogs.confirm).toHaveBeenCalled();
        expect(scope.setEmptyItem).not.toHaveBeenCalled();
    });
});