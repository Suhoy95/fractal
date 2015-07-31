'use strict';




var FractalItemFactory = angular.module("FractalItemFactory", []);




FractalItemFactory.factory('itemFactory', function() {

    var idCounter = 1;

    function emptyItem(){
        this.type = "empty";
    }

    emptyItem.prototype.isEmpty = function() {
        if(typeof(this.type) != "string")
                throw new Error("item is broken");
        return this.type === "empty";
    };

    function baseItem()
    {
        emptyItem.call(this);
        this.type = "baseItem";
        this.id = idCounter++;
        this.analogy = [];
        this.sup = [];
        this.sub = [];    
    };

    baseItem.prototype = Object.create(emptyItem.prototype);

    baseItem.prototype.createRel = function(item, rel) {
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
    };

    function noteItem(data)
    {
        data = data || {};
        baseItem.call(this);
        this.type = "note";
        this.title = "";
        this.text = "";

        for(var key in data)
            this[key] = data[key];
        if(data.id && data.id >= idCounter)
            idCounter = data.id++;
    };

    noteItem.prototype = Object.create(baseItem.prototype);

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