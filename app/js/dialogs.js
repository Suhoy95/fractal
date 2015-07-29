var FractalDialogs = angular.module("FractalDialogs", []);

FractalDialogs.factory('dialogs', function() {
    return {
        alert: function(message)
        {
            alert(message);
        },
        confirm: function(message)
        {
            return confirm(message);
        }
    };   
    
});