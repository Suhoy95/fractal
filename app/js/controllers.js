'use strict';

/* Controllers */

var FractalControllers = angular.module('FractalControllers', []);

FractalControllers.controller("dataController", ["$scope", "$http", "itemFactory", "gridMaster", "shower", "linker",
                                                 function($scope, $http, itemFactory, gridMaster, shower, linker){
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

    $scope.linker = linker;
    $scope.shower = shower;

    $scope.getBindingItems = function()
    {
        var items = $scope.shower.filterItems($scope.items);
        var result = gridMaster.createMinGrid(items, $scope.setting);
        return result;
    }

    $scope.setBinding = function(item, relation)
    {
        $scope.shower.setBinding(item, relation);
        $scope.filterItems = $scope.getBindingItems();
    }

    $scope.unsetBinding = function( relation)
    {
        $scope.shower.unsetBinding(relation);
        $scope.filterItems = $scope.getBindingItems();
    }
    
}]);

FractalControllers.controller("settingController", ["$scope", "gridMaster" , 
                                                    function($scope, gridMaster){
   
    $scope.changeSetting = function()
    {
        $scope.items = gridMaster.completeGrid($scope.items, $scope.setting );
        backend.setSetting($scope.setting);
    }
}]);

FractalControllers.controller("gridController", ["$scope", "gridMaster", function($scope, gridMaster){

    $scope.completeGrid = function(){
        $scope.items = gridMaster.completeGrid($scope.items, $scope.setting);
    };
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