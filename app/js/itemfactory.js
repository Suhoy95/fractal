'use strict';

var FractalItemFactory = angular.module("FractalItemFactory", []);

FractalItemFactory.factory('itemFactory', function() {

    var idCounter = 1;

    return {
        emptyItem: emptyItem,
        baseItem: baseItem,
        noteItem: noteItem
    };

function emptyItem(data){
    data = data || {};
    for(var key in data)
        data[key] = null;

    data.type = "empty";
    data.isEmpty = function() {return this.type === "empty"; };
    data.create = function() { addItem(this); return this; };

    return data;
}

function addItem(data)
{
    data = data || {};
    data.type = "add";
    data.delete = deleteItem;
    data.createNote = createNote;

    return data;

    function deleteItem()
    {
        emptyItem(this);
        return this;
    }

    function createNote()
    {
        noteItem(this);
        return this;
    }
}

function baseItem(data){
    data = data || {};
    emptyItem(data);
    data.id = data.id || idCounter++;
    data.type = "base";
    data.analogy = data.analogy || [];
    data.sup = data.sup || [];
    data.sub = data.sub || [];
    data.bind = createRel;
    data.unbind = deleteRel;

    return data;

    function createRel(item, rel) {
        var reflectionRel = getReflectionRel(rel);

        var this_index = this[rel].indexOf(item.id);
        var those_index = item[reflectionRel].indexOf(this.id)

        if(this_index < 0)
            this[rel].push(item.id);

        if(those_index < 0)
            item[reflectionRel].push(this.id);
    };

    function deleteRel(item, rel) {
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
        var  relation ={ analogy: "analogy", sup: "sub", sub: "sup" };
        if(relation[rel])
            return relation[rel];

        throw new Error("incorrect relation");
    }
}

function noteItem(data)
{
    data = data || {};
    baseItem(data);

    data.type = "note";
    data.state = "save";
    data.title = data.title || "";
    data.text = data.text || "";
    data.edit = editNote;
    data.save = saveNote;
    data.delete = deleteNote;

    return data;

    function editNote()
    {
        this.state = "edit";
        return this;
    }

    function saveNote()
    {
        this.state = "save";
        return this
    }

    function deleteNote()
    {
        emptyItem(this);
        return this;
    }
} 

});