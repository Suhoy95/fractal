
describe("the dataController", function() {
    var controller, backend, scope, $controller;

    beforeEach(function(){
        module("FractalControllers");
        scope = {};
        backend = { 
            getSetting:function(){}, 
            getItems:function(){}
        };

        inject(function(_$controller_){
            $controller = _$controller_;
        }); 
    });

    it("should set backend setting to scope", function(){
        var setting = {
            width: 4,
            height: 4,
            otherSetting: true
        };

        spyOn(backend, "getSetting").and.returnValue(setting);
        controller = $controller("dataController", {$scope: scope, backend: backend});

        expect(scope.setting).toEqual(setting);
    });

    it("should set backend items to scope", function(){
        var items = [
            [{type:"item1"}],
            [{type:"item2"}]
        ];

        spyOn(backend, "getItems").and.returnValue(items)
        controller = $controller("dataController", {$scope: scope, backend: backend});

        expect(scope.items).toEqual(items);
    });
});