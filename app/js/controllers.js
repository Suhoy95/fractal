'use strict';

/* Controllers */

var FractalControllers = angular.module('FractalControllers', []);

FractalControllers.controller("dataController", ["$scope", "backend", "gridMaster" , function($scope, backend, gridMaster){
    $scope.setting = backend.getSetting();
    $scope.items = backend.getItems();


    $scope.saveSetting = function()
    {
        backend.setSetting($scope.setting);
        $scope.items = gridMaster.compliteGrid($scope.items, $scope.setting );
    }

}]);


FractalControllers.controller("gridController", ["$scope", "backend", "dialogs", function($scope, backend, dialogs){

    $scope.saveSetting();

    $scope.createItem = function(x, y)
    {
        $scope.items[x][y].type = "add";
    }

    $scope.setEmpty = function(x, y)
    {
        backend.deleteItem(x, y);
        $scope.items[x][y] = backend.getItem(x, y);
    }

    $scope.createNote = function(x, y)
    {
        $scope.items[x][y] = backend.createItem();
        $scope.editNote(x, y);
    }

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
        if(note.title == "" || note.text == "" || 
           dialogs.confirm("Вы точно хотите удалить заметку?"))
        {
            $scope.setEmpty(x, y);   
        }
    }
}]);