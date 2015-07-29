
var FractalGridMaster = angular.module("FractalGridMaster", []);

FractalGridMaster.factory('gridMaster', ["backend", function(backend) {

    return { 
        compliteGrid: function(items, setting)
        {
            items = items || [];

            setting.width = max(setting.minWidth, findMaxWidth(items));
            setting.height = max(setting.minHeight, findMaxHeight(items));
  
            items = compliteColumns(items, setting.width);
            items = compliteRows(items, setting.height);
  
            return items;
        }
    };

    function compliteColumns(items, amountOfColumn)
    {
        var newItems = [];

        for(var i = 0; i < amountOfColumn; i++)
            newItems[i] = items[i] || [];

        return newItems;   
    };

    function compliteRows(items, amountOfRows)
    {
        for(var key in items)
        {
            var tmpColumn = items[key];
            items[key] = [];
            for(var i = 0; i < amountOfRows; i++)
                items[key][i] = tmpColumn[i] || backend.getEmptyItem();
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