'use strict';

/* Controllers */

var FractalControllers = angular.module('FractalControllers', []);

FractalControllers.controller("dataController", ["$scope", "backend", "gridMaster" , function($scope, backend, gridMaster){
    $scope.setting = backend.getSetting();
    $scope.items = backend.getItems();


    $scope.saveSetting = function()
    {
        $scope.items = gridMaster.compliteGrid($scope.items, $scope.setting );
        backend.setSetting($scope.setting);
    }

}]);


FractalControllers.controller("gridController", ["$scope", "backend", "dialogs", function($scope, backend, dialogs){

    $scope.saveSetting();

    $scope.createItem = function(x, y)
    {
        $scope.items[x][y].type = "add";
        $scope.saveSetting();
    }

    $scope.setEmpty = function(x, y)
    {
        backend.deleteItem(x, y);
        $scope.items[x][y] = backend.getItem(x, y);
        $scope.saveSetting();
    }

    $scope.createNote = function(x, y)
    {
        $scope.items[x][y] = backend.createNote();
        $scope.editNote(x, y);
    }

    $scope.editNote = function(x, y)
    {
        $scope.items[x][y].type = "edit";
        $scope.focusedItem = $scope.items[x][y];
    }

    $scope.saveNote = function(x, y)
    {
        backend.saveNote(x, y, $scope.items[x][y]);

        $scope.items[x][y] = backend.getItem(x, y);
        $scope.disableRelatives();
    }

    $scope.deleteNote = function(x, y)
    {
        var note = $scope.items[x][y];
        if(note.title == "" && note.text == "" || 
           dialogs.confirm("Вы точно хотите удалить заметку?"))
        {
            $scope.setEmpty(x, y);   
        }
    }

    $scope.relatives = { analogy: false, sup: false, sub: false };
    $scope.focusedItem = {};

    $scope.isEnabledRelatives = function()
    {
        return $scope.relatives.analogy ||
               $scope.relatives.sup ||
               $scope.relatives.sub;
    }

    $scope.getEnabledRelative = function()
    {
        for(var key in $scope.relatives)
            if($scope.relatives[key])
                return key;
    }

    $scope.disableRelatives = function() {
        $scope.relatives.analogy = false;
        $scope.relatives.sup = false;
        $scope.relatives.sub = false;
    }

    $scope.triggerRelative = function(relative)
    {
        if($scope.isEnabledRelatives() && !$scope.relatives[relative]) return;

        $scope.relatives[relative] = !$scope.relatives[relative];
    }

    $scope.toggleRelative = function(id)
    {
        var relativeArr = $scope.focusedItem[$scope.getEnabledRelative() + "Items"];
        var i = relativeArr.indexOf(id); 
        if( i >=0 )
            relativeArr.splice(i, 1);
        else
            relativeArr.push(id);
    }

}]);