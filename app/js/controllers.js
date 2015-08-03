'use strict';

/* Controllers */

var FractalControllers = angular.module('FractalControllers', []);

FractalControllers.controller("dataController", ["$scope", "$http", "itemFactory", "gridMaster",
                                                 function($scope, $http, itemFactory, gridMaster){
    $http.get("data/root.json").success(function(data) {
        $scope.setting = data.setting;
        $scope.items = data.items;

        for (var x = 0; x < $scope.items.length; x++) 
            for(var y = 0; y < $scope.items[x].length; y++)
            {
                if($scope.items[x][y].type === "note")
                {
                    $scope.items[x][y] = itemFactory.noteItem($scope.items[x][y]);
                    continue;
                }
                $scope.items[x][y] = itemFactory.emptyItem($scope.items[x][y]);
            }
        $scope.items = gridMaster.completeGrid($scope.items, $scope.setting);
    }).error(function(){
        $scope.setting = {
                    minWidth: 4,
                    minHeight: 4,
                    width: 4,
                    height: 4,
                    fixedWidth: false,
                    fixedHeight:false
                };
        $scope.items = [];  
        $scope.items = gridMaster.completeGrid($scope.items, $scope.setting);
    });
    
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
    };

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

        if(item == $scope.linker.currentItem) 
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

FractalControllers.controller("dumpController", ["$scope", function($scope){

    $scope.dump = 
    {
        setting: $scope.setting,
        items: $scope.items
    }
}]);