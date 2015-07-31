'use strict';

/* Services */

var FractalBackend = angular.module("FractalBackend", ["FractalItemFactory"]);

FractalBackend.factory('backend', ["itemFactory", function(itemFactory) {
    var  backend  = { 

        setting: {
            minWidth: 4,
            minHeight: 4,
            width: 4,
            height: 4,
            fixedWidth: false,
            fixedHeight: false
        },
        items:  [
                    [
                        {
                            id: 1,
                            type: "note",
                            analogy: [2],
                            title: "title",
                            text: "text",
                        },
                        {
                            id: 2,
                            type: "note",
                            analogy: [1],
                            title: "title",
                            text: "text",
                        }
                    ]
                ],

        getSetting: function(){
            return this.setting;      
        },

        setSetting: function(newSetting){
            this.setting = newSetting;
        },

        getItems: function(){
            return this.items;
        },

        getItem: function(x, y){
            var items = this.items;
            if(items[x] && items[x][y])            
                return this.items[x][y];

            return itemFactory.emptyItem();
        },

        getEmptyItem: function(){
            return itemFactory.emptyItem();
        },

        checkItem: function(x, y)
        {
            var items = this.items;
            items[x] = items[x] || [];
            items[x][y] = items[x][y] || itemFactory.baseItem();
        },

        deleteItem: function(x, y)
        {
            this.checkItem(x, y);
            this.items[x][y] = itemFactory.emptyItem();
        },

        createNote: function(){

            return itemFactory.noteItem();
        },

        saveNote: function(x, y, data){
            this.checkItem(x, y);
            this.items[x][y] = itemFactory.noteItem(data);
        }
    };

    function prepareData(items)
    {
        for(var x = 0; x < items.length; x++)
            for(var y = 0; y < items[x].length; y++)
                items[x][y] = itemFactory.noteItem(items[x][y]);
    }

    prepareData(backend.items);

    return backend;
}]);