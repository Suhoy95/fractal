'use strict';

var FractalItemFactory = angular.module("FractalItemFactory", []);

FractalItemFactory.factory('itemFactory', function() {

    var idCounter = 1;

    class emptyItem {
        constructor(){
            this.type = "empty";
        }

        isEmpty(){
            if(typeof(this.type) != "string")
                throw new Error("item is broken");
            return this.type === "empty";
        }
    }

    class baseItem extends emptyItem{
        constructor()
        {
            super();
            this.type = "baseItem";
            this.id = idCounter++;
            this.analogy = [];
            this.sup = [];
            this.sub = [];
        }

        createRel(item, rel)
        {
            var reflectionRel = getReflectionRel(rel);

            if(this[rel].indexOf(item.id) < 0)
                this[rel].push(item.id);
            if(item[reflectionRel].indexOf(this.id) < 0)
                item[reflectionRel].push(this.id);
        
            function getReflectionRel(rel)
            {
                switch(rel){
                    case "analogy": return "analogy";
                    case "sup": return "sub";
                    case "sub": return "sup";
                }
                throw new Error("incorrect relation");
            }
        }
    }

    class noteItem extends baseItem
    {
        constructor(data)
        {
            data = data || {};
            super()
            this.type = "note";
            this.title = "";
            this.text = "";

            for(var key in data)
                this[key] = data[key];
        }
    }

    return {
        
    emptyItem:function(){
            return new emptyItem();
        },
    baseItem: function()
        {
            return new baseItem();
        },
    noteItem:function(data)
        {
            return new noteItem(data);
        }
    };

});