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

    $scope.linker = {
        active: false,
        relation: '',
        currentItem: { analogy: [], sup: [], sub:[]},
        selectingRelation: function(relation, item)
        {
            this.relation = relation;
            this.active = !this.active;
            this.currentItem = item;
        },
        currentRelation: function(item)
        {
            if(this.currentItem.analogy.indexOf(item.id) >= 0)
                return "analogy";
            if(this.currentItem.sub.indexOf(item.id) >= 0)
                return "sub";
            if(this.currentItem.sup.indexOf(item.id) >= 0)
                return "sup";
            return "none";
        },
        selectItem: function(item)
        {
            this.currentItem.createRel(item, this.relation);
        },
        unselectItem: function(item, relation)
        {
            console.log('asdfd');
            this.currentItem.deleteRel(item, relation);
        },
        isDisabled: function(relation, item_id)
        {
            return this.active && (this.relation != relation || 
                   this.currentItem.id != item_id);
        },
        disable: function()
        {
            this.active = false;
            this.relation = "";
            this.currentItem = { analogy: [], sup: [], sub:[]};
        }
    };
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
        $scope.linker.disable();
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
