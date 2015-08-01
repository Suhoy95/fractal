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

    function baseItem(data)
    {
        data = data || {};
        emptyItem.call(this);
        this.type = "baseItem";
        this.id = idCounter++;
        this.analogy = data.analogy || [];
        this.sup = data.sup || [];
        this.sub = data.sub || [];    
    };

    baseItem.prototype = Object.create(emptyItem.prototype);

    baseItem.prototype.createRel = function(item, rel) {
        var reflectionRel = getReflectionRel(rel);

        var this_index = this[rel].indexOf(item.id);
        var those_index = item[reflectionRel].indexOf(this.id)

        if(this_index < 0)
            this[rel].push(item.id);

        if(those_index < 0)
            item[reflectionRel].push(this.id);
    };

    baseItem.prototype.deleteRel = function(item, rel) {
        var reflectionRel = getReflectionRel(rel);

        var this_index = this[rel].indexOf(item.id);
        var those_index = item[reflectionRel].indexOf(this.id)

        if(this_index >= 0)
            this[rel].splice(this_index, 1);

        if(those_index >= 0)
            item[reflectionRel].splice(those_index, 1);  
    };

    function getReflectionRel(rel)
    {
        switch(rel){
            case "analogy": return "analogy";
            case "sup": return "sub";
            case "sub": return "sup";
        }
        throw new Error("incorrect relation");
    }

    function noteItem(data)
    {
        data = data || {};
        baseItem.call(this, data);
        this.id = data.id || this.id;
        this.type = "note";
        this.title =  data.title || "";
        this.text = data.text || "";

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