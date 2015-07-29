'use strict';

/* Services */

var FractalBackend = angular.module("FractalBackend", []);

FractalBackend.factory('backend', function() {
    return { 

        setting: {
            width: 4,
            height: 4,
            fixedWidth: false,
            fixedHeight: false
        },
        items: [],
        idCount: 1,

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

            return this.getEmptyItem();
        },

        getEmptyItem: function(){
            return {
                type: "empty",
                isEmpty: function() { return this.type == "empty"; }
            };
        },

        createItem: function()
        {
            var item = this.getEmptyItem();

            item.id = this.idCount++;
            item.analogyItems = [];
            item.subItems = [];
            item.supItems = [];

            return item;
        },

        checkItem: function(x, y)
        {
            var items = this.items;
            items[x] = items[x] || [];
            items[x][y] = items[x][y] || this.createItem();
        },

        deleteItem: function(x, y)
        {
            var items = this.items;

            if(items[x] && items[x][y] )
                items[x][y] = this.getEmptyItem();
        },

        createNote: function(x, y, data){
            this.checkItem(x, y);
            this.saveNote(x, y, data);
        },

        saveNote: function(x, y, data){
            this.checkItem(x, y);
            var items = this.items;

            for(var key in data)
                items[x][y][key] = data[key];

            items[x][y].type = "note";
        }
    };
});