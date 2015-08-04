
var FractalGridMaster = angular.module("FractalGridMaster", ["FractalItemFactory"]);

FractalGridMaster.factory('gridMaster', ["itemFactory", function(itemFactory) {

    return { 
        completeGrid: function(items, setting)
        {
            items = items || [];

            setting.width = max(setting.minWidth, findMaxWidth(items));
            setting.height = max(setting.minHeight, findMaxHeight(items));
  
            items = completeColumns(items, setting.width);
            items = completeRows(items, setting.height);
  
            return items;
        }
    };

    function completeColumns(items, amountOfColumn)
    {
        for(var i = 0; i < amountOfColumn; i++)
            items[i] = items[i] || [];

        var amountRmColumn = items.length - amountOfColumn;
        if(amountRmColumn > 0)
            items.splice(amountOfColumn, amountRmColumn);

        return items;   
    };

    function completeRows(items, amountOfRows)
    {
        for(var key in items)
        {
            var tmpColumn = items[key];
            items[key] = [];
            for(var i = 0; i < amountOfRows; i++)
                items[key][i] = tmpColumn[i] || itemFactory.emptyItem();
        }

        return items;
    };

    function findMaxWidth(items)
    {
        for(var x = items.length - 1; x >= 0; x--)
            for(var y = 0; y < items[x].length; y++)
                if(!items[x][y].isEmpty())
                    return x + 2;
        return 0;
    }

    function findMaxHeight(items)
    {
        var max = 0;
        for(var x = 0; x < items.length; x++)
            for(var y = 0; y < items[x].length; y++)
            {
                if(!items[x][y].isEmpty() && y > max)
                    max = y;
            }
        return max + 2;
    }

    function max(a, b)
    {
        return a > b ? a : b;
    }
}]);