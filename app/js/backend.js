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

        getEmptyItem: function(){
            return {
                type: "empty",
                isEmpty: function() { return this.type == "empty"; }
            };
        },

        createItem: function()
        {
            return {
                id: this.idCount++,
                analogyItems:[],
                supItems:[],
                subItems:[]
            }
        },

        createNote: function(x, y, data){
            var items = this.items;
            items[x] = items[x] || [];

            items[x][y] = this.createItem();

            this.editNote(x, y, data);
        },

        editNote: function(x, y, data){
            var items = this.items;

            for(var key in data)
                items[x][y][key] = data[key];

            items[x][y].type = "note";
        }
    };
});