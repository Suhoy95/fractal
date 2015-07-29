
var FractalGridMaster = angular.module("FractalGridMaster", []);

FractalGridMaster.factory('gridMaster', ["backend", function(backend) {
    
    var compliteColumns = function(items, amountOfColumn)
        {
            var newItems = [];

            for(var i = 0; i < amountOfColumn; i++)
                newItems[i] = items[i] || [];

            return newItems;   
        };

    var compliteRows = function(items, amountOfRows)
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

    return { 
        compliteGrid: function(items, setting)
        {
            items = items || [];

            items = compliteColumns(items, setting.width);
            items = compliteRows(items, setting.height);
            return items;
        }
    };
}]);