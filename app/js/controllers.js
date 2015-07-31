'use strict';

/* Controllers */

var FractalControllers = angular.module('FractalControllers', []);

FractalControllers.controller("dataController", ["$scope", "backend", function($scope, backend){
    $scope.setting = backend.getSetting();
    $scope.items = backend.getItems();
}]);

FractalControllers.controller("settingController", ["$scope", "backend", "gridMaster" , 
                                                    function($scope, backend, gridMaster){
   
    $scope.changeSetting = function()
    {
        $scope.items = gridMaster.completeGrid($scope.items, $scope.setting );
        backend.setSetting($scope.setting);
    }
}]);


FractalControllers.controller("gridController", ["$scope", "gridMaster", function($scope, gridMaster){

    $scope.completeGrid = function(){
        $scope.items = gridMaster.completeGrid($scope.items, $scope.setting );
    }

    $scope.completeGrid();
}]);

FractalControllers.controller("itemController", ["$scope", "backend", function($scope, backend){
   
    $scope.createItem = function(x, y)
    {
        $scope.items[x][y].type = "add";
        $scope.completeGrid();
    }

    $scope.setEmptyItem = function(x, y)
    {
        backend.deleteItem(x, y);
        $scope.items[x][y] = backend.getItem(x, y);
        $scope.completeGrid();
    }

    $scope.createNote = function(x, y)
    {
        $scope.items[x][y] = backend.createNote();
        $scope.items[x][y].type = "edit";
    }
}]);

FractalControllers.controller("noteController", ["$scope", "backend", "dialogs" , 
                                                    function($scope, backend, dialogs){
   
    $scope.editNote = function(x, y)
    {
        $scope.items[x][y].type = "edit";
    }

    $scope.saveNote = function(x, y)
    {
        backend.saveNote(x, y, $scope.items[x][y]);

        $scope.items[x][y] = backend.getItem(x, y);
    }

    $scope.deleteNote = function(x, y)
    {
        var note = $scope.items[x][y];
        if(note.title == "" && note.text == "" || 
           dialogs.confirm("Вы точно хотите удалить заметку?"))
        {
            $scope.setEmptyItem(x, y);   
        }
    }
}]);
