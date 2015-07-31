
describe("settingController", function(){

    var controller, backend, scope, $controller, gridMaster;

    beforeEach(function(){
        module("FractalControllers");
        scope = { setting:{}, items: {} };
        backend = { setSetting:function(){} };
        gridMaster = { completeGrid:function(){} };

        inject(function(_$controller_){
            $controller = _$controller_;
        }); 
    });

    it("should add scope function which save setting and completeGrid", function(){
        spyOn(backend, "setSetting");
        spyOn(gridMaster, "completeGrid");

        controller = $controller("settingController", { $scope: scope, 
                                                        backend: backend, 
                                                        gridMaster: gridMaster});

        expect(typeof(scope.changeSetting)).toBe("function");

        scope.changeSetting();

        expect(backend.setSetting).toHaveBeenCalled();
        expect(gridMaster.completeGrid).toHaveBeenCalled();        
    });
});