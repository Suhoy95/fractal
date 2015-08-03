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


FractalControllers.controller("gridController", ["$scope", "gridMaster", function($scope, gridMaster){

    $scope.completeGrid = function(){
        $scope.items = gridMaster.completeGrid($scope.items, $scope.setting);
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
        if(item.title === "" && item.text === "" ||
            dialogs.confirm("Вы уверены, что хотите заметку?"))
        {
            item.delete();
            $scope.completeGrid();
        }
    }
}]);
