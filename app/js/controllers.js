'use strict';

/* Controllers */

var FractalControllers = angular.module('FractalControllers', []);

FractalControllers.controller("dataController", ["$scope", "gridMaster", function($scope, gridMaster){
    $scope.setting = {
                        minWidth: 4,
                        minHeight: 4,
                        width: 4,
                        height: 4,
                        fixedWidth: false,
                        fixedHeight:false
                    };
    $scope.items = gridMaster.completeGrid([], $scope.setting);
}]);

FractalControllers.controller("settingController", ["$scope", "gridMaster" , 
                                                    function($scope, gridMaster){
   
    $scope.changeSetting = function()
    {
        $scope.items = gridMaster.completeGrid($scope.items, $scope.setting );
        backend.setSetting($scope.setting);
    }
}]);


FractalControllers.controller("gridController", ["$scope", "gridMaster", "linker", function($scope, gridMaster, linker){

    $scope.completeGrid = function(){
        $scope.items = gridMaster.completeGrid($scope.items, $scope.setting);
    }

    $scope.completeGrid();
    $scope.linker = linker;
}]);

FractalControllers.controller("itemController", ["$scope", "dialogs", function($scope, dialogs){
    $scope.createItem = function(item)
    {
        item.create();
        $scope.completeGrid();
    }

    $scope.deleteItem = function(item)
    {
        item.delete();
        $scope.completeGrid();
    }

    $scope.deleteNote = function(item)
    {
        if(!(item.title === "" && item.text === "") &&
            !dialogs.confirm("Вы уверены, что хотите заметку?"))
            return;

        if(item == linker.currentItem) 
            $scope.linker.disable();

        item.delete();
        $scope.completeGrid();
    }

    $scope.saveNote = function(item)
    {
        if(item == $scope.linker.currentItem) 
            $scope.linker.disable();
        item.save();
    }
}]);
